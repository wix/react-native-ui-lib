const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../../..');

jest.setTimeout(30000);

function revertPackageJsons() {
  const cmd = 'git checkout -- packages/react-native-ui-lib/package.json packages/uilib-native/package.json';
  execSync(cmd, {cwd: REPO_ROOT, stdio: 'pipe'});
}

function setPackageJsonVersion(pkgName, version) {
  const pkgPath = path.join(REPO_ROOT, 'packages', pkgName, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n');
}

function npmLatest(pkgName) {
  return execSync(`npm view ${pkgName} dist-tags.latest`, {encoding: 'utf8'}).trim();
}

function runRelease(flags) {
  const out = execSync(`node scripts/release/release.js ${flags.join(' ')}`, {
    cwd: REPO_ROOT,
    env: {...process.env, CI: '1', BUILDKITE_BUILD_NUMBER: '99999'},
    encoding: 'utf8'
  });
  const match = out.match(/Packages information:\s*(\[[\s\S]*?\n\])/);
  if (!match) {
    throw new Error('Could not parse Packages information JSON from output:\n' + out);
  }
  return JSON.parse(match[1]);
}

const find = (pkgs, name) => pkgs.find(p => p.name === name);

afterEach(() => revertPackageJsons());

describe('react-native-ui-lib', () => {
  test('release: BK version > npm latest -> releases at BK version', () => {
    const pkgs = runRelease(['-release', '-bkVersion=99.0.0']);
    const p = find(pkgs, 'react-native-ui-lib');
    expect(p.shouldRelease).toBe(true);
    expect(p.version).toBe('99.0.0');
  });

  test('release: BK version == npm latest -> does NOT release', () => {
    const latest = npmLatest('react-native-ui-lib');
    const pkgs = runRelease(['-release', `-bkVersion=${latest}`]);
    expect(find(pkgs, 'react-native-ui-lib').shouldRelease).toBe(false);
  });

  test('release: package.json > npm latest -> releases (OR-fallback gate)', () => {
    setPackageJsonVersion('react-native-ui-lib', '99.0.0');
    const pkgs = runRelease(['-release', '-bkVersion=0.0.0']);
    expect(find(pkgs, 'react-native-ui-lib').shouldRelease).toBe(true);
  });

  test('master -> releases a snapshot', () => {
    const pkgs = runRelease(['-master']);
    const p = find(pkgs, 'react-native-ui-lib');
    expect(p.shouldRelease).toBe(true);
    expect(p.version).toMatch(/-snapshot\.99999$/);
  });

  test('snapshot -> releases a snapshot', () => {
    const pkgs = runRelease(['-snapshot']);
    const p = find(pkgs, 'react-native-ui-lib');
    expect(p.shouldRelease).toBe(true);
    expect(p.version).toMatch(/-snapshot\.99999$/);
  });
});

describe('uilib-native', () => {
  test('release: BK version > npm latest -> does NOT release (BK does not apply)', () => {
    const pkgs = runRelease(['-release', '-bkVersion=99.0.0']);
    expect(find(pkgs, 'uilib-native').shouldRelease).toBe(false);
  });

  test('release: BK version == npm latest -> does NOT release', () => {
    const latest = npmLatest('react-native-ui-lib');
    const pkgs = runRelease(['-release', `-bkVersion=${latest}`]);
    expect(find(pkgs, 'uilib-native').shouldRelease).toBe(false);
  });

  test('release: package.json > npm latest -> releases at package.json version', () => {
    setPackageJsonVersion('uilib-native', '99.0.0');
    const pkgs = runRelease(['-release', '-bkVersion=0.0.0']);
    const p = find(pkgs, 'uilib-native');
    expect(p.shouldRelease).toBe(true);
    expect(p.version).toBe('99.0.0');
  });

  test('master -> does NOT release', () => {
    const pkgs = runRelease(['-master']);
    expect(find(pkgs, 'uilib-native').shouldRelease).toBe(false);
  });

  test('snapshot -> releases a snapshot', () => {
    const pkgs = runRelease(['-snapshot']);
    const p = find(pkgs, 'uilib-native');
    expect(p.shouldRelease).toBe(true);
    expect(p.version).toMatch(/-snapshot\.99999$/);
  });
});
