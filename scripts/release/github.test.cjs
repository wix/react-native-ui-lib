const { test } = require('node:test');
const assert = require('node:assert/strict');
const adapter = require('./uilib.cjs');
const {
  authorize,
  nativeCI,
  checkSourceRun,
  ensureTag,
  ensurePullRequest,
  ensureRelease,
  pullRequestBody,
} = require('./github.cjs');

const sourceSha = 'a'.repeat(40);
const manifest = (version = '9.1.4', changes = {}) => ({
  sourceSha,
  releaseSha: sourceSha,
  runId: '12345',
  packages: [
    { name: 'uilib-native', version: '5.1.3', npmTag: 'latest' },
    { name: adapter.packageName, version, npmTag: 'latest' },
  ],
  ...changes,
});
const context = {
  repository: adapter.repository,
  ref: `refs/heads/${adapter.branch}`,
  event: 'workflow_dispatch',
  sha: sourceSha,
  runId: '12345',
  runAttempt: '1',
  actor: 'release-admin',
  triggeringActor: 'approver-admin',
};

function mockGitHub(handler) {
  const calls = [];
  return {
    calls,
    request: async (...args) => {
      calls.push(args);
      return handler(...args);
    },
  };
}

test('authorize requires admin permission for both workflow actors and rejects permission request failures', async () => {
  const github = mockGitHub((_method, path) => {
    if (path.endsWith('/release-admin/permission')) return { permission: 'admin' };
    if (path.endsWith('/approver-admin/permission')) return { permission: 'admin' };
    throw new Error('unexpected request');
  });
  await authorize(github, context);
  assert.equal(github.calls.length, 2);
  assert.ok(github.calls.every(([method]) => method === 'GET'));

  for (const deniedActor of ['release-admin', 'approver-admin']) {
    const deniedGitHub = mockGitHub((_method, path) =>
      path.endsWith(`/${deniedActor}/permission`)
        ? { permission: 'write' }
        : { permission: 'admin' }
    );
    await assert.rejects(authorize(deniedGitHub, context), /must have repository admin permission/);
    assert.equal(deniedGitHub.calls.length, deniedActor === context.actor ? 1 : 2);
  }
  const failed = mockGitHub(() => {
    throw new Error('GitHub unavailable');
  });
  await assert.rejects(authorize(failed, context), /GitHub unavailable/);
});

test('native CI reads the exact commit status history and returns the newest Buildkite status', async () => {
  const expected = {
    context: adapter.nativeStatus,
    state: 'success',
    target_url: `${adapter.nativeStatusUrl}2671`,
    creator: adapter.nativeStatusCreator,
  };
  const github = mockGitHub((_method, path) => {
    assert.equal(path, `/repos/${adapter.repository}/commits/${sourceSha}/statuses?per_page=100`);
    return [{ context: 'other', state: 'failure' }, expected];
  });
  assert.equal(await nativeCI(github, sourceSha), expected);
  assert.equal(github.calls.length, 1);
  await assert.rejects(nativeCI(github, 'master'), /exact source SHA/);
  assert.equal(github.calls.length, 1, 'invalid refs must not reach GitHub');
});

test('checkSourceRun validates workflow identity and selects the newest retained matching artifact', async () => {
  const validRun = {
    event: 'workflow_dispatch',
    head_branch: adapter.branch,
    path: `${adapter.workflow}@master`,
    repository: { full_name: adapter.repository },
    head_repository: { full_name: adapter.repository },
    status: 'completed',
  };
  const github = mockGitHub((_method, path) => {
    if (path.endsWith('/actions/runs/12345')) return validRun;
    if (path.endsWith('/artifacts?per_page=100&page=1'))
      return {
        artifacts: [
          { id: 4, name: 'release-12345-1', expired: false },
          { id: 10, name: 'release-12345-2', expired: true },
          { id: 12, name: 'unrelated', expired: false },
          { id: 8, name: 'release-12345-2', expired: false },
        ],
      };
    throw new Error(`unexpected request ${path}`);
  });
  const result = await checkSourceRun(github, '12345');
  assert.equal(result.run, validRun);
  assert.equal(result.artifact.id, 8);

  for (const patch of [
    { path: 'elsewhere.yml' },
    { path: `${adapter.workflow}@feature` },
    { path: `${adapter.workflow}@refs/heads/feature` },
    { head_branch: 'feature' },
    { repository: { full_name: 'fork/project' }, head_repository: { full_name: 'fork/project' } },
    { status: 'in_progress' },
  ]) {
    const invalid = mockGitHub((_method, path) =>
      path.endsWith('/actions/runs/12345') ? { ...validRun, ...patch } : { artifacts: [] }
    );
    await assert.rejects(
      checkSourceRun(invalid, '12345'),
      /completed upstream master release workflow/
    );
    assert.equal(invalid.calls.length, 1, 'invalid run should not trigger artifact lookup');
  }
  const expired = mockGitHub((_method, path) =>
    path.endsWith('/actions/runs/12345')
      ? validRun
      : { artifacts: [{ id: 9, name: 'release-12345-1', expired: true }] }
  );
  await assert.rejects(checkSourceRun(expired, '12345'), /No retained release artifact/);
});

test('ensureTag reuses matching annotated and lightweight tags and rejects conflicts', async () => {
  const tag = 'react-native-ui-lib@9.1.4';
  const annotatedSha = 'b'.repeat(40);
  const annotated = mockGitHub((_method, path) => {
    if (path.endsWith(`/git/ref/tags/${tag}`)) return { object: { type: 'tag', sha: 'tag-object' } };
    if (path.endsWith('/git/tags/tag-object')) return { object: { sha: sourceSha } };
    throw new Error(`unexpected request ${path}`);
  });
  await ensureTag(annotated, tag, sourceSha);
  assert.equal(annotated.calls.length, 2);

  const lightweight = mockGitHub(() => ({ object: { type: 'commit', sha: sourceSha } }));
  await ensureTag(lightweight, tag, sourceSha);
  assert.equal(lightweight.calls.length, 1);
  const conflict = mockGitHub((_method, path) =>
    path.endsWith(`/git/ref/tags/${tag}`) ? { object: { type: 'commit', sha: annotatedSha } } : undefined
  );
  await assert.rejects(ensureTag(conflict, tag, sourceSha), /different commit/);
  assert.equal(conflict.calls.length, 1);

  const created = mockGitHub((method, path, body) => {
    if (method === 'GET') return undefined;
    if (path.endsWith('/git/tags')) return { sha: 'new-tag-object' };
    return body;
  });
  await ensureTag(created, tag, sourceSha);
  assert.deepEqual(created.calls[1][2], { tag, message: tag, object: sourceSha, type: 'commit' });
  assert.deepEqual(created.calls[2][2], { ref: `refs/tags/${tag}`, sha: 'new-tag-object' });
});

test('version PR body satisfies the PR description check without template placeholders', () => {
  const body = pullRequestBody(manifest());
  for (const header of ['## Description', '## Changelog', '## Additional info']) {
    const content = body.split(header)[1].split(/^##/m)[0].trim();
    assert.ok(content, `${header} must not be empty`);
  }
  assert.match(body, /uilib-native@5\.1\.3 and react-native-ui-lib@9\.1\.4/);
  assert.match(body, /actions\/runs\/12345/);
  assert.doesNotMatch(body, /Enter description|Add a quick message|If applicable/);
});

test('ensurePullRequest reuses matching open or merged PRs, applies labels, and rejects unsafe PRs', async () => {
  for (const existing of [
    { number: 51, state: 'open', merged_at: null },
    { number: 52, state: 'closed', merged_at: '2026-01-01T00:00:00Z' },
  ]) {
    const pr = {
      ...existing,
      head: { ref: 'ci/update-version-9.1.4', sha: sourceSha },
      base: { ref: adapter.branch },
    };
    const github = mockGitHub((_method, path) => {
      if (path.includes('/pulls?')) return [pr];
      if (path.endsWith(`/labels/${adapter.label}`)) return { name: adapter.label };
      if (path.endsWith(`/issues/${existing.number}/labels`)) return undefined;
      throw new Error(`unexpected request ${path}`);
    });
    assert.equal(await ensurePullRequest(github, manifest()), pr);
    const labelCall = github.calls.find(
      ([method, path]) => method === 'POST' && path.endsWith(`/issues/${existing.number}/labels`)
    );
    assert.deepEqual(labelCall[2], { labels: [adapter.label] });
    assert.equal(
      github.calls.filter(([method, path]) => method === 'POST' && path.endsWith('/pulls')).length,
      0
    );
  }

  const created = mockGitHub((method, path, body) => {
    if (path.includes('/pulls?')) return [];
    if (method === 'POST' && path.endsWith('/pulls')) return { number: 60, ...body };
    if (path.endsWith(`/labels/${adapter.label}`)) return { name: adapter.label };
    return undefined;
  });
  const pr = await ensurePullRequest(created, manifest());
  assert.equal(pr.title, 'Release: update version to 9.1.4');
  assert.equal(pr.head, 'ci/update-version-9.1.4');
  assert.match(pr.body, /## Changelog\nnone/);

  for (const pr of [
    {
      number: 53,
      state: 'closed',
      merged_at: null,
      head: { ref: 'ci/update-version-9.1.4', sha: sourceSha },
      base: { ref: adapter.branch },
    },
    {
      number: 54,
      state: 'open',
      merged_at: null,
      head: { ref: 'ci/update-version-9.1.4', sha: 'c'.repeat(40) },
      base: { ref: adapter.branch },
    },
  ]) {
    const github = mockGitHub((_method, path) => (path.includes('/pulls?') ? [pr] : undefined));
    await assert.rejects(
      ensurePullRequest(github, manifest()),
      pr.number === 53 ? /closed without merging/ : /no longer matches/
    );
    assert.equal(github.calls.length, 1, 'invalid PR should not be labeled or changed');
  }
});

test('ensureRelease uses package-qualified tags, bare names, and never moves latest backward', async () => {
  const github = mockGitHub((method, path, body) => {
    if (path.endsWith('/releases/tags/react-native-ui-lib@9.1.4')) return undefined;
    if (path.endsWith('/releases/latest')) return { tag_name: 'react-native-ui-lib@9.1.5' };
    if (method === 'POST' && path.endsWith('/releases')) return body;
    throw new Error(`unexpected request ${path}`);
  });
  const release = await ensureRelease(github, manifest(), 'notes');
  assert.equal(release.make_latest, 'false');
  assert.equal(release.tag_name, 'react-native-ui-lib@9.1.4');
  assert.equal(release.name, '9.1.4');
  assert.equal(release.target_commitish, sourceSha, 'targets the source commit, not the release commit');

  for (const latestTag of ['react-native-ui-lib@9.1.3', '8.5.1']) {
    const newerGitHub = mockGitHub((method, path, body) => {
      if (path.endsWith('/releases/tags/react-native-ui-lib@9.1.4')) return undefined;
      if (path.endsWith('/releases/latest')) return { tag_name: latestTag };
      if (method === 'POST' && path.endsWith('/releases')) return body;
      throw new Error(`unexpected request ${path}`);
    });
    const newer = await ensureRelease(
      newerGitHub,
      manifest('9.1.4', { releaseSha: 'b'.repeat(40) }),
      'notes'
    );
    assert.equal(newer.make_latest, 'true', latestTag);
    assert.equal(newer.target_commitish, sourceSha);
  }

  const existing = mockGitHub((_method, path) =>
    path.endsWith('/releases/tags/react-native-ui-lib@9.1.4')
      ? { draft: false, prerelease: false, html_url: 'existing' }
      : undefined
  );
  assert.equal((await ensureRelease(existing, manifest(), 'notes')).html_url, 'existing');
  assert.equal(existing.calls.length, 1);
});
