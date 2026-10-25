const adapter = require('./uilib.cjs');
const {
  check,
  assertReleaseContext,
  isReleaseRunPath,
  assertNativeCI,
  compareVersions,
  tagName,
  mainPackage,
} = require('./policy.cjs');
const prefix = `/repos/${adapter.repository}`;

async function authorize(github, context) {
  assertReleaseContext(context);
  for (const actor of new Set([context.actor, context.triggeringActor])) {
    check(/^[a-zA-Z0-9-]+(?:\[bot\])?$/.test(actor), 'Invalid GitHub actor');
    const user = await github.request(
      'GET',
      `${prefix}/collaborators/${encodeURIComponent(actor)}/permission`
    );
    check(user.permission === 'admin', `${actor} must have repository admin permission`);
  }
}

async function nativeCI(github, sha) {
  check(/^[a-f0-9]{40}$/.test(sha), 'Native CI requires an exact source SHA');
  const statuses = await github.request('GET', `${prefix}/commits/${sha}/statuses?per_page=100`);
  return assertNativeCI(statuses, sha);
}

async function checkSourceRun(github, runId) {
  check(/^[1-9]\d*$/.test(runId), 'Resume requires a numeric source_run_id');
  const run = await github.request('GET', `${prefix}/actions/runs/${runId}`);
  check(
    run.event === 'workflow_dispatch' &&
      run.head_branch === adapter.branch &&
      isReleaseRunPath(run.path) &&
      run.repository.full_name === adapter.repository &&
      run.head_repository.full_name === adapter.repository &&
      run.status === 'completed',
    'Resume source must be a completed upstream master release workflow'
  );
  const artifacts = [];
  for (let page = 1; ; page++) {
    const batch = await github.request(
      'GET',
      `${prefix}/actions/runs/${runId}/artifacts?per_page=100&page=${page}`
    );
    artifacts.push(...batch.artifacts);
    if (batch.artifacts.length < 100) break;
  }
  const candidates = artifacts
    .filter((item) => new RegExp(`^release-${runId}-[1-9]\\d*$`).test(item.name) && !item.expired)
    .sort((a, b) => Number(b.id) - Number(a.id));
  check(candidates.length, 'No retained release artifact; automatic resume is unavailable');
  return { run, artifact: candidates[0] };
}

async function ensureTag(github, tag, sha) {
  const existing = await github.request('GET', `${prefix}/git/ref/tags/${tag}`, undefined, {
    allow404: true,
  });
  if (existing) {
    const target =
      existing.object.type === 'tag'
        ? await github.request('GET', `${prefix}/git/tags/${existing.object.sha}`)
        : existing;
    check(target.object.sha === sha, `Tag ${tag} already points to a different commit`);
    return;
  }
  const object = await github.request('POST', `${prefix}/git/tags`, {
    tag,
    message: tag,
    object: sha,
    type: 'commit',
  });
  await github.request('POST', `${prefix}/git/refs`, { ref: `refs/tags/${tag}`, sha: object.sha });
}

// GitHub releases exist only for react-native-ui-lib: name is the bare version,
// tag is package-qualified (9.1.0 → react-native-ui-lib@9.1.0).
async function ensureRelease(github, manifest, notes) {
  const pkg = mainPackage(manifest);
  const tag = tagName(pkg);
  const existing = await github.request('GET', `${prefix}/releases/tags/${tag}`, undefined, {
    allow404: true,
  });
  if (existing) {
    check(
      !existing.draft && existing.prerelease === (pkg.npmTag !== 'latest'),
      'Existing GitHub release has conflicting state'
    );
    return existing;
  }
  // Resuming an old release must never replace a newer GitHub "latest" release.
  const latest = await github.request('GET', `${prefix}/releases/latest`, undefined, {
    allow404: true,
  });
  let makeLatest = pkg.npmTag === 'latest';
  if (makeLatest && latest) {
    try {
      // Older GitHub releases used bare version tags (8.5.1); newer ones are qualified.
      makeLatest =
        compareVersions(pkg.version, String(latest.tag_name).replace(`${pkg.name}@`, '')) > 0;
    } catch {
      makeLatest = false;
    }
  }
  return github.request('POST', `${prefix}/releases`, {
    tag_name: tag,
    target_commitish: manifest.sourceSha,
    name: pkg.version,
    body: notes,
    draft: false,
    prerelease: pkg.npmTag !== 'latest',
    make_latest: makeLatest ? 'true' : 'false',
  });
}

// The body must satisfy .github/workflows/pr-description-check.yml: non-empty
// Description, Changelog, and Additional info sections without template text.
function pullRequestBody(manifest) {
  const published = manifest.packages.map((pkg) => `${pkg.name}@${pkg.version}`).join(' and ');
  return [
    '## Description',
    `Updates the package versions after publishing ${published} from ${manifest.sourceSha}.`,
    'The release workflow verified the package tarballs and registry integrity; no source changes are included.',
    '',
    '## Changelog',
    'none',
    '',
    '## Additional info',
    `Release run: https://github.com/${adapter.repository}/actions/runs/${manifest.runId}`,
    '',
  ].join('\n');
}

async function ensurePullRequest(github, manifest) {
  const pkg = mainPackage(manifest);
  const branch = `ci/update-version-${pkg.version}`;
  const results = await github.request(
    'GET',
    `${prefix}/pulls?state=all&head=wix:${branch}&base=${adapter.branch}&per_page=100`
  );
  const existing = results.find((pr) => pr.head.ref === branch && pr.base.ref === adapter.branch);
  let pr = existing;
  if (existing) {
    check(
      existing.head.sha === manifest.releaseSha,
      'Version PR no longer matches the release commit'
    );
    check(
      existing.state === 'open' || existing.merged_at,
      'Version PR was closed without merging; resolve it manually'
    );
  } else {
    pr = await github.request('POST', `${prefix}/pulls`, {
      title: `Release: update version to ${pkg.version}`,
      head: branch,
      base: adapter.branch,
      body: pullRequestBody(manifest),
    });
  }
  const label = await github.request('GET', `${prefix}/labels/${adapter.label}`, undefined, {
    allow404: true,
  });
  if (!label)
    await github.request('POST', `${prefix}/labels`, {
      name: adapter.label,
      color: '0e8a16',
      description: 'Release metadata and publishing',
    });
  await github.request('POST', `${prefix}/issues/${pr.number}/labels`, { labels: [adapter.label] });
  return pr;
}

module.exports = {
  prefix,
  authorize,
  nativeCI,
  checkSourceRun,
  ensureTag,
  ensureRelease,
  ensurePullRequest,
  pullRequestBody,
};
