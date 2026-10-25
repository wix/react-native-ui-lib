const { test } = require('node:test');
const assert = require('node:assert/strict');
const adapter = require('./uilib.cjs');
const {
  version,
  compareVersions,
  tagName,
  tagVersion,
  mainPackage,
  createPlan,
  validateManifest,
  publicationState,
  assertNativeCI,
  assertReleaseContext,
  isReleaseRunPath,
} = require('./policy.cjs');

const context = {
  repository: 'wix/react-native-ui-lib',
  ref: 'refs/heads/master',
  event: 'workflow_dispatch',
  sha: 'a'.repeat(40),
  runId: '12345',
  runAttempt: '1',
  actor: 'admin',
  triggeringActor: 'admin',
};
const inputs = { operation: 'publish', kind: 'release', version: '9.1.4', npmTag: 'latest' };
const current = { 'react-native-ui-lib': '9.0.0', 'uilib-native': '5.1.2' };
const latest = { 'react-native-ui-lib': '9.1.3', 'uilib-native': '5.1.2' };
const integrity = `sha512-${Buffer.alloc(64).toString('base64')}`;
const packed = (pkg) => ({ ...pkg, filename: `${pkg.name}-${pkg.version}.tgz`, integrity });

test('versions are strict semver, including prerelease ordering', () => {
  for (const invalid of ['v9.1.4', '09.1.4', '9.1', '9.1.4;echo x', '9.1.4-01', '9.1.4+build']) {
    assert.throws(() => version(invalid));
  }
  assert.equal(compareVersions('9.1.4-rc.2', '9.1.4-rc.10'), -1);
  assert.equal(compareVersions('9.1.4-rc.10', '9.1.4'), -1);
  assert.equal(compareVersions('9.1.4', '9.0.99'), 1);
});

test('git tags are package-qualified', () => {
  assert.equal(tagName({ name: 'uilib-native', version: '5.1.3' }), 'uilib-native@5.1.3');
  assert.equal(tagVersion('react-native-ui-lib@9.1.2'), '9.1.2');
  assert.throws(() => tagVersion('9.1.2'));
  assert.throws(() => tagVersion('uilib-native@5.1.2'));
});

test('a release is exact versions that cannot regress latest; native is optional', () => {
  const plan = createPlan(inputs, context, current, latest);
  assert.deepEqual(
    plan.packages.map((pkg) => pkg.name),
    ['react-native-ui-lib']
  );
  assert.equal(mainPackage(plan).version, '9.1.4');
  assert.equal(plan.nativeDependency, '5.1.2', 'npm latest of uilib-native when not published');

  const both = createPlan({ ...inputs, nativeVersion: '5.1.3' }, context, current, latest);
  assert.deepEqual(
    both.packages.map((pkg) => `${pkg.name}@${pkg.version}`),
    ['uilib-native@5.1.3', 'react-native-ui-lib@9.1.4']
  );
  assert.equal(both.nativeDependency, '5.1.3', 'planned native version when published together');

  assert.throws(() => createPlan({ ...inputs, version: '9.1.3' }, context, current, latest));
  assert.throws(() => createPlan({ ...inputs, version: '' }, context, current, latest));
  assert.throws(() => createPlan({ ...inputs, nativeVersion: '5.1.2' }, context, current, latest));
  assert.throws(() => createPlan({ ...inputs, version: '9.1.4-rc.1' }, context, current, latest));
  assert.throws(() =>
    createPlan({ ...inputs, nativeVersion: '5.1.3-rc.1' }, context, current, latest)
  );
  assert.throws(() => createPlan({ ...inputs, npmTag: 'other' }, context, current, latest));
  const pre = createPlan(
    { ...inputs, version: '9.2.0-rc.1', nativeVersion: '5.2.0-rc.1', npmTag: 'next' },
    context,
    current,
    latest
  );
  assert.ok(pre.packages.every((pkg) => pkg.npmTag === 'next'));
});

test('snapshots publish both packages with a collision-free identity that survives a rerun', () => {
  const args = { operation: 'publish', kind: 'snapshot', npmTag: 'snapshot', version: '' };
  const first = createPlan(args, context, current, latest);
  const rerun = createPlan(args, { ...context, runAttempt: '2' }, current, latest);
  assert.deepEqual(
    first.packages.map((pkg) => `${pkg.name}@${pkg.version}`),
    ['uilib-native@5.1.2-snapshot.gha.12345', 'react-native-ui-lib@9.1.3-snapshot.gha.12345']
  );
  assert.deepEqual(first.packages, rerun.packages);
  assert.equal(first.nativeDependency, '5.1.2-snapshot.gha.12345');
  assert.throws(() => createPlan({ ...args, nativeVersion: '5.1.3' }, context, current, latest));
  assert.throws(() => createPlan({ ...args, version: '9.1.4' }, context, current, latest));
  assert.throws(() => createPlan({ ...args, npmTag: 'latest' }, context, current, latest));
});

test('publishing context excludes forks, other events, and non-master branches', () => {
  assertReleaseContext(context);
  for (const change of [
    { repository: 'attacker/react-native-ui-lib' },
    { ref: 'refs/heads/feature' },
    { event: 'pull_request_target' },
    { sha: 'master' },
  ])
    assert.throws(() => assertReleaseContext({ ...context, ...change }));
});

test('release run path accepts only the workflow on master', () => {
  for (const path of [
    adapter.workflow,
    `${adapter.workflow}@master`,
    `${adapter.workflow}@refs/heads/master`,
  ]) {
    assert.equal(isReleaseRunPath(path), true);
  }
  for (const path of [
    `${adapter.workflow}@feature`,
    `${adapter.workflow}@refs/heads/feature`,
    `${adapter.workflow}@master-extra`,
    'elsewhere.yml@master',
  ]) {
    assert.equal(isReleaseRunPath(path), false);
  }
});

test('native CI requires the latest matching status from the verified Buildkite creator', () => {
  const status = {
    context: adapter.nativeStatus,
    state: 'success',
    target_url: `${adapter.nativeStatusUrl}2671`,
    creator: adapter.nativeStatusCreator,
  };
  assert.equal(assertNativeCI([status], context.sha), status);
  assert.throws(() => assertNativeCI([], context.sha));
  assert.throws(() => assertNativeCI([status], 'master'), /exact source SHA/);
  assert.throws(
    () => assertNativeCI({ statuses: [status] }, context.sha),
    /Invalid commit statuses response/
  );
  for (const state of ['pending', 'failure', 'error']) {
    assert.throws(() => assertNativeCI([{ ...status, state }, status], context.sha));
  }
  assert.throws(() =>
    assertNativeCI([{ ...status, creator: { ...status.creator, id: 1 } }, status], context.sha)
  );
  assert.throws(() =>
    assertNativeCI(
      [{ ...status, creator: { ...status.creator, login: 'impostor[bot]' } }, status],
      context.sha
    )
  );
  assert.throws(() =>
    assertNativeCI([{ ...status, target_url: 'https://example.com/builds/1' }], context.sha)
  );
});

test('recovery matches integrity and never chooses a different version', () => {
  const pkg = { name: 'react-native-ui-lib', version: '9.1.4', integrity: 'sha512-same' };
  assert.equal(publicationState(pkg, null), 'publish');
  assert.equal(
    publicationState(pkg, {
      name: pkg.name,
      version: pkg.version,
      dist: { integrity: pkg.integrity },
    }),
    'complete'
  );
  assert.throws(() =>
    publicationState(pkg, {
      name: pkg.name,
      version: pkg.version,
      dist: { integrity: 'sha512-other' },
    })
  );
  assert.throws(() =>
    publicationState(pkg, { name: pkg.name, version: '9.1.5', dist: { integrity: pkg.integrity } })
  );
});

test('resume rejects dry-run records, foreign packages, wrong order, and unsafe artifact paths', () => {
  const plan = createPlan({ ...inputs, nativeVersion: '5.1.3' }, context, current, latest);
  const manifest = {
    ...plan,
    releaseSha: 'b'.repeat(40),
    packages: plan.packages.map(packed),
  };
  validateManifest(manifest);
  const [native, main] = manifest.packages;
  validateManifest({ ...manifest, packages: [main], nativeDependency: '5.1.2' });
  assert.throws(() =>
    validateManifest({ ...manifest, operation: 'dry-run' }, { publishing: true })
  );
  assert.throws(() => validateManifest({ ...manifest, packages: [{ ...main, name: 'other' }] }));
  assert.throws(() => validateManifest({ ...manifest, packages: [main, native] }), /order/);
  assert.throws(() => validateManifest({ ...manifest, packages: [native] }));
  assert.throws(() =>
    validateManifest({ ...manifest, packages: [native, { ...main, filename: '../package.tgz' }] })
  );
  assert.throws(() => validateManifest({ ...manifest, nativeDependency: '5.1.2' }), /Native/);
  assert.throws(() => validateManifest({ ...manifest, nativeDependency: 'workspace:*' }));
  const snapshot = createPlan(
    { operation: 'publish', kind: 'snapshot', npmTag: 'snapshot' },
    context,
    current,
    latest
  );
  const snapshotManifest = {
    ...snapshot,
    releaseSha: 'b'.repeat(40),
    packages: snapshot.packages.map(packed),
  };
  validateManifest(snapshotManifest);
  assert.throws(
    () => validateManifest({ ...snapshotManifest, packages: [snapshotManifest.packages[1]] }),
    /every package/
  );
});
