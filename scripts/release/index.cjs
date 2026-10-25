const fs = require('node:fs');
const path = require('node:path');
const adapter = require('./uilib.cjs');
const {
  check,
  compareVersions,
  createPlan,
  isReleaseRunPath,
  publicationState,
  tagName,
  tagVersion,
  mainPackage,
} = require('./policy.cjs');
const { githubClient, registryVersion } = require('./http.cjs');
const {
  prefix,
  authorize,
  nativeCI,
  checkSourceRun,
  ensureTag,
  ensureRelease,
  ensurePullRequest,
} = require('./github.cjs');
const {
  exec,
  integrity,
  readPackage,
  writePackage,
  rewriteNativeDependency,
  pack,
  readManifest,
  verifyReleaseCommit,
} = require('./artifact.cjs');
const { renderNotes } = require('./notes.cjs');
const { publishPackages } = require('./publication.cjs');

const directory = path.resolve(process.env.RELEASE_DIR || '.release-artifacts');
const context = {
  repository: process.env.GITHUB_REPOSITORY,
  ref: process.env.GITHUB_REF,
  event: process.env.GITHUB_EVENT_NAME,
  sha: process.env.GITHUB_SHA,
  runId: process.env.GITHUB_RUN_ID,
  runAttempt: process.env.GITHUB_RUN_ATTEMPT,
  actor: process.env.GITHUB_ACTOR,
  triggeringActor: process.env.GITHUB_TRIGGERING_ACTOR,
};

function output(name, value) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

function summary(text) {
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY)
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`);
}

function readPlan() {
  return JSON.parse(fs.readFileSync(path.join(directory, 'plan.json'), 'utf8'));
}

function writeJSON(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function describe(manifest) {
  return manifest.packages.map((pkg) => `${pkg.name}@${pkg.version}`).join(', ');
}

async function guard(github, publishing = false) {
  await authorize(github, context);
  check(
    ['dry-run', 'publish', 'resume'].includes(process.env.RELEASE_OPERATION),
    'Invalid operation'
  );
  if (publishing || process.env.RELEASE_OPERATION !== 'dry-run') {
    check(
      process.env.RELEASE_PUBLISH_ENABLED === 'true',
      'Set repository variable RELEASE_PUBLISH_ENABLED=true after configuring npm trust and the release environment'
    );
  }
}

async function verifyOrigin(github, manifest) {
  const run = await github.request('GET', `${prefix}/actions/runs/${manifest.runId}`);
  check(
    run.event === 'workflow_dispatch' &&
      isReleaseRunPath(run.path) &&
      run.head_branch === adapter.branch &&
      run.repository.full_name === adapter.repository &&
      run.head_repository.full_name === adapter.repository &&
      run.head_sha === manifest.sourceSha &&
      run.actor.login === manifest.actor &&
      Number(run.run_attempt) >= Number(manifest.runAttempt),
    'Artifact does not match its originating release workflow'
  );
  exec('git', ['merge-base', '--is-ancestor', manifest.sourceSha, context.sha]);
}

async function verifiedArtifact(github) {
  await guard(github, true);
  const manifest = readManifest(directory, { publishing: true });
  await verifyOrigin(github, manifest);
  await nativeCI(github, manifest.sourceSha);
  verifyReleaseCommit(manifest, directory);
  return manifest;
}

async function plan(github) {
  await guard(github);
  check(
    exec('git', ['rev-parse', 'HEAD']).trim() === context.sha,
    'Checkout differs from workflow source SHA'
  );
  const current = {};
  const latest = {};
  for (const name of adapter.order) {
    current[name] = readPackage(name).version;
    latest[name] = (await registryVersion(name, 'latest')).version;
  }
  const manifest = createPlan(
    {
      operation: process.env.RELEASE_OPERATION,
      kind: process.env.RELEASE_KIND,
      version: process.env.RELEASE_VERSION,
      nativeVersion: process.env.RELEASE_NATIVE_VERSION,
      npmTag: process.env.RELEASE_NPM_TAG,
    },
    context,
    current,
    latest
  );
  for (const pkg of manifest.packages) {
    const existing = await registryVersion(pkg.name, pkg.version, { allow404: true });
    check(
      !existing,
      `${pkg.name}@${pkg.version} already exists. Use resume with the original publishing run.`
    );
  }
  try {
    manifest.nativeCI = await nativeCI(github, context.sha);
  } catch (error) {
    if (manifest.operation !== 'dry-run') throw error;
    summary(
      `Native CI is not ready for publication: ${error.message}. This dry run only verifies package preparation.`
    );
  }
  const pkg = mainPackage(manifest);
  const tags = exec('git', ['tag', '--merged', context.sha, '--list', `${pkg.name}@*`])
    .trim()
    .split('\n')
    .filter((tag) => {
      try {
        const tagged = tagVersion(tag);
        return !/-/.test(tagged) && compareVersions(tagged, pkg.version) < 0;
      } catch {
        return false;
      }
    })
    .sort((a, b) => compareVersions(tagVersion(a), tagVersion(b)));
  manifest.previousTag = tags.at(-1) || '';
  // Snapshots never create a GitHub release, and their version precedes the
  // npm latest tag, so they need no baseline.
  check(
    manifest.kind === 'snapshot' || manifest.previousTag,
    'No preceding reachable stable tag; define the initial release baseline before publishing'
  );
  writeJSON(path.join(directory, 'plan.json'), manifest);
  summary(
    `Planned ${describe(manifest)} → ${pkg.npmTag}\n\nNative dependency: ${manifest.nativeDependency}\n\nSource: ${manifest.sourceSha}\n\nOperation: ${manifest.operation}`
  );
}

// The ui-lib build rewrites package sources in place, so the release commit is
// created from the clean tree before the build runs. Only version fields change.
function setVersion() {
  const manifest = readPlan();
  check(
    !exec('git', ['status', '--porcelain', '--untracked-files=all']).trim(),
    'Install changed files; refusing to create a release commit from a dirty tree'
  );
  for (const pkg of manifest.packages) {
    const source = readPackage(pkg.name);
    source.version = pkg.version;
    writePackage(pkg.name, source);
    exec('git', ['add', '--', path.join(adapter.packages[pkg.name].directory, 'package.json')]);
  }
  const date = exec('git', ['show', '-s', '--format=%cI', manifest.sourceSha]).trim();
  exec(
    'git',
    [
      '-c',
      'user.name=github-actions[bot]',
      '-c',
      'user.email=41898282+github-actions[bot]@users.noreply.github.com',
      'commit',
      '--allow-empty',
      '--no-verify',
      '-m',
      `Release ${describe(manifest)}`,
    ],
    {
      env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
    }
  );
  manifest.releaseSha = exec('git', ['rev-parse', 'HEAD']).trim();
  check(
    !exec('git', ['status', '--porcelain', '--untracked-files=all']).trim(),
    'Version update changed files outside the permitted release commit'
  );
  exec('git', [
    'bundle',
    'create',
    path.join(directory, 'release.bundle'),
    'HEAD',
    `^${manifest.sourceSha}`,
  ]);
  writeJSON(path.join(directory, 'plan.json'), manifest);
}

async function prepareArtifact(github) {
  const manifest = readPlan();
  await guard(github);
  check(
    exec('git', ['rev-parse', 'HEAD']).trim() === manifest.releaseSha,
    'Checkout is not at the release commit'
  );
  rewriteNativeDependency(manifest.nativeDependency);
  for (const pkg of manifest.packages) {
    Object.assign(pkg, pack(directory, pkg.name, { nativeDependency: manifest.nativeDependency }));
  }
  const commits = manifest.previousTag
    ? exec('git', ['rev-list', `${manifest.previousTag}..${manifest.sourceSha}`])
        .trim()
        .split('\n')
        .filter(Boolean)
    : [];
  const prs = [];
  for (const commit of commits) {
    for (let page = 1; ; page++) {
      const batch = await github.request(
        'GET',
        `${prefix}/commits/${commit}/pulls?per_page=100&page=${page}`
      );
      prs.push(...batch.filter((pr) => pr.base.repo.full_name === adapter.repository));
      if (batch.length < 100) break;
    }
  }
  const notes = renderNotes({
    version: mainPackage(manifest).version,
    previousTag: manifest.previousTag,
    sourceSha: manifest.sourceSha,
    pullRequests: prs,
  });
  fs.writeFileSync(path.join(directory, 'notes.md'), notes);
  manifest.files = Object.fromEntries(
    ['notes.md', 'release.bundle'].map((file) => [file, integrity(path.join(directory, file))])
  );
  writeJSON(path.join(directory, 'manifest.json'), manifest);
  fs.unlinkSync(path.join(directory, 'plan.json'));
  readManifest(directory);
  verifyReleaseCommit(manifest, directory);
  summary(
    `Prepared ${manifest.packages
      .map((pkg) => `${pkg.filename} (${pkg.integrity})`)
      .join(', ')}\n\nRelease commit: ${manifest.releaseSha}\n\n${notes}`
  );
}

async function record(github) {
  const manifest = await verifiedArtifact(github);
  if (manifest.kind === 'snapshot') return;
  const branch = `ci/update-version-${mainPackage(manifest).version}`;
  const existing = await github.request('GET', `${prefix}/git/ref/heads/${branch}`, undefined, {
    allow404: true,
  });
  if (existing) {
    check(
      existing.object.sha === manifest.releaseSha,
      `Release branch ${branch} conflicts with this artifact`
    );
    return;
  }
  // Supply Git authentication only to this process, never in the remote URL or
  // persistent git config. No force push and no branch-protection bypass.
  exec('git', ['push', 'origin', `${manifest.releaseSha}:refs/heads/${branch}`], {
    env: {
      ...process.env,
      GIT_CONFIG_COUNT: '1',
      GIT_CONFIG_KEY_0: 'http.https://github.com/.extraheader',
      GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${Buffer.from(
        `x-access-token:${process.env.GH_TOKEN}`
      ).toString('base64')}`,
    },
  });
}

async function publish(github) {
  const manifest = await verifiedArtifact(github);
  check(
    process.env.ACTIONS_ID_TOKEN_REQUEST_URL && process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN,
    'Publishing requires GitHub OIDC credentials (id-token: write)'
  );
  check(
    compareVersions(exec('npm', ['--version']).trim(), '11.5.1') >= 0,
    'Trusted publishing requires npm >=11.5.1'
  );
  await publishPackages(manifest.packages, {
    lookup: (name, selected) => registryVersion(name, selected, { allow404: true }),
    report: summary,
    publish: async (pkg) => {
      check(
        context.sha === manifest.sourceSha,
        'An unpublished version must run at its original source SHA for npm provenance. Re-run failed jobs of the original publishing run.'
      );
      const npmrc = path.join(directory, 'oidc.npmrc');
      fs.writeFileSync(npmrc, 'registry=https://registry.npmjs.org/\n');
      const env = { ...process.env, NPM_CONFIG_USERCONFIG: npmrc };
      delete env.NPM_TOKEN;
      delete env.NODE_AUTH_TOKEN;
      exec(
        'npm',
        [
          'publish',
          path.join(directory, pkg.filename),
          '--ignore-scripts',
          '--access',
          'public',
          '--tag',
          pkg.npmTag,
        ],
        { cwd: directory, env, stdio: 'inherit' }
      );
    },
  });
}

async function finalize(github) {
  const manifest = await verifiedArtifact(github);
  for (const pkg of manifest.packages) {
    check(
      publicationState(pkg, await registryVersion(pkg.name, pkg.version, { allow404: true })) ===
        'complete',
      'Cannot finalize an unpublished package'
    );
  }
  if (manifest.kind === 'snapshot') {
    summary('Snapshot publication verified; no Git tag or version PR is created.');
    return;
  }
  // The release commit exists only on the squash-merged version PR branch; tag the master commit that was built and published.
  for (const pkg of manifest.packages) await ensureTag(github, tagName(pkg), manifest.sourceSha);
  const release = await ensureRelease(
    github,
    manifest,
    fs.readFileSync(path.join(directory, 'notes.md'), 'utf8')
  );
  const pr = await ensurePullRequest(github, manifest);
  summary(`Release: ${release.html_url}\n\nVersion PR: ${pr.html_url}`);
}

// Local/PR check: build must have run; the workspace range is replaced with the
// source uilib-native version so the packed package.json is publishable as-is.
function packCheck() {
  const nativeDependency = readPackage(adapter.nativePackageName).version;
  rewriteNativeDependency(nativeDependency);
  for (const name of adapter.order) {
    const pkg = pack(directory, name, { nativeDependency });
    summary(`Verified package ${pkg.filename} (${pkg.integrity})`);
  }
}

async function main() {
  const command = process.argv[2];
  if (command === 'pack-check') return packCheck();
  if (command === 'set-version') return setVersion();
  const github = githubClient(process.env.GH_TOKEN);
  if (command === 'authorize') return guard(github);
  if (command === 'plan') return plan(github);
  if (command === 'prepare-artifact') return prepareArtifact(github);
  if (command === 'record') return record(github);
  if (command === 'publish') return publish(github);
  if (command === 'finalize') return finalize(github);
  if (command === 'resume-info') {
    await guard(github, true);
    const { artifact } = await checkSourceRun(github, process.env.RELEASE_SOURCE_RUN_ID);
    output('artifact_id', artifact.id);
    output('source_run_id', process.env.RELEASE_SOURCE_RUN_ID);
    return;
  }
  if (command === 'verify-resume') {
    const manifest = await verifiedArtifact(github);
    check(
      manifest.runId === process.env.RELEASE_SOURCE_RUN_ID,
      'Resume artifact belongs to a different run'
    );
    summary(`Resuming ${describe(manifest)} from run ${manifest.runId}; new version inputs are ignored.`);
    return;
  }
  throw new Error(`Unknown release command: ${command}`);
}

main().catch((error) => {
  // Child-process errors may embed command output. Print the message only; never
  // serialize environment or the entire error object.
  console.error(error.message);
  process.exitCode = 1;
});
