const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const adapter = require('./uilib.cjs');
const {
  exec,
  integrity,
  readPackage,
  writePackage,
  validatePackageFiles,
  verifyReleaseCommit,
} = require('./artifact.cjs');

const repository = { url: 'https://github.com/wix/react-native-ui-lib' };
const nativeFiles = [
  ...adapter.packages['uilib-native'].requiredFiles,
  'ios/reactnativeuilib/safearea/SafeAreaManager.m',
  'android/src/main/java/com/wix/reactnativeuilib/UiLibPackageList.java',
];
const nativePkg = { name: 'uilib-native', repository, main: 'components/index' };
const mainFiles = [
  ...adapter.packages['react-native-ui-lib'].requiredFiles,
  'lib/ios/reactnativeuilib/safearea/SafeAreaManager.m',
];
const mainPkg = {
  name: 'react-native-ui-lib',
  repository,
  main: 'src/index.js',
  types: 'src/index.d.ts',
  devDependencies: { 'uilib-native': '5.1.3' },
};

test('package checks cover both packages, workspace ranges, shipped scripts, and credentials', () => {
  validatePackageFiles(nativeFiles, nativePkg);
  validatePackageFiles(mainFiles, mainPkg, { nativeDependency: '5.1.3' });
  validatePackageFiles(mainFiles, { ...mainPkg, repository: { url: `${repository.url}.git` } });
  assert.throws(() => validatePackageFiles(mainFiles, { ...mainPkg, name: 'other' }), /Unexpected/);
  assert.throws(
    () =>
      validatePackageFiles(
        nativeFiles.filter((f) => !f.startsWith('ios/')),
        nativePkg
      ),
    /iOS/
  );
  assert.throws(() => validatePackageFiles(nativeFiles, { ...nativePkg, main: 'missing' }), /Unresolvable/);
  assert.throws(
    () => validatePackageFiles(mainFiles, { ...mainPkg, types: './missing.d.ts' }),
    /Unresolvable/
  );
  assert.throws(
    () =>
      validatePackageFiles(mainFiles, { ...mainPkg, devDependencies: { 'uilib-native': 'workspace:*' } }),
    /workspace/
  );
  assert.throws(
    () => validatePackageFiles(mainFiles, mainPkg, { nativeDependency: '5.1.2' }),
    /differs from the release plan/
  );
  assert.throws(
    () => validatePackageFiles(mainFiles, { ...mainPkg, repository: { url: 'https://github.com/fork/x' } }),
    /npm trust/
  );
  for (const bad of [
    'scripts/release/index.cjs',
    'scripts/release/.npmrc',
    'lib/android/.gradle/cache',
    '.npmrc',
    'ios/key.keystore',
    'demo/index.js',
    '../escape',
  ]) {
    assert.throws(() => validatePackageFiles([...mainFiles, bad], mainPkg));
  }
  assert.throws(
    () =>
      validatePackageFiles([...nativeFiles, 'scripts/release/prReleaseNotesCommon.js'], nativePkg),
    /development file/
  );
});

test('integrity detects changes to saved package bytes', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'uilib-integrity-'));
  try {
    const file = path.join(folder, 'package.tgz');
    fs.writeFileSync(file, 'original');
    const first = integrity(file);
    fs.writeFileSync(file, 'changed');
    assert.notEqual(integrity(file), first);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

test('real git bundles permit only the planned version changes on the validated source', () => {
  const previousCwd = process.cwd();
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'uilib-release-git-'));
  const write = (name, pkg) => {
    const file = path.join(adapter.packages[name].directory, 'package.json');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, `${JSON.stringify(pkg, null, 4)}\n`);
  };
  try {
    process.chdir(folder);
    exec('git', ['init', '-q']);
    exec('git', ['config', 'user.name', 'Release test']);
    exec('git', ['config', 'user.email', 'release@example.test']);
    write('uilib-native', { name: 'uilib-native', version: '5.0.0' });
    write('react-native-ui-lib', { name: 'react-native-ui-lib', version: '1.0.0' });
    exec('git', ['add', '.']);
    exec('git', ['commit', '-qm', 'source']);
    const sourceSha = exec('git', ['rev-parse', 'HEAD']).trim();

    const main = readPackage('react-native-ui-lib');
    main.version = '1.0.1';
    writePackage('react-native-ui-lib', main);
    assert.match(
      fs.readFileSync('packages/react-native-ui-lib/package.json', 'utf8'),
      /^    "version": "1\.0\.1"/m,
      'keeps the package.json indentation'
    );
    exec('git', ['commit', '-qam', 'version']);
    const releaseSha = exec('git', ['rev-parse', 'HEAD']).trim();
    exec('git', ['bundle', 'create', 'release.bundle', 'HEAD', `^${sourceSha}`]);
    const packages = [{ name: 'react-native-ui-lib', version: '1.0.1' }];
    verifyReleaseCommit({ sourceSha, releaseSha, packages }, folder);
    assert.throws(
      () =>
        verifyReleaseCommit(
          { sourceSha, releaseSha, packages: [{ name: 'uilib-native', version: '5.0.1' }, ...packages] },
          folder
        ),
      /version mismatch for uilib-native/
    );

    write('uilib-native', { name: 'uilib-native', version: '5.0.1' });
    exec('git', ['commit', '-qam', 'unplanned native bump']);
    exec('git', ['bundle', 'create', 'release.bundle', 'HEAD', `^${sourceSha}`]);
    assert.throws(
      () =>
        verifyReleaseCommit(
          { sourceSha, releaseSha: exec('git', ['rev-parse', 'HEAD']).trim(), packages },
          folder
        ),
      /Release commit must have the validated source as its parent/
    );

    exec('git', ['checkout', '-q', releaseSha]);
    fs.writeFileSync('runtime.js', 'unexpected code');
    exec('git', ['add', 'runtime.js']);
    exec('git', ['commit', '--amend', '-qm', 'unexpected mutation']);
    const changedSha = exec('git', ['rev-parse', 'HEAD']).trim();
    exec('git', ['bundle', 'create', 'release.bundle', 'HEAD', `^${sourceSha}`]);
    assert.throws(
      () => verifyReleaseCommit({ sourceSha, releaseSha: changedSha, packages }, folder),
      /Unexpected release source change/
    );
  } finally {
    process.chdir(previousCwd);
    fs.rmSync(folder, { recursive: true, force: true });
  }
});
