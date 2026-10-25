const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { execFileSync } = require('node:child_process');
const adapter = require('./uilib.cjs');
const { check, compareVersions, validateManifest } = require('./policy.cjs');

function exec(command, args, options = {}) {
  return execFileSync(command, args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, ...options });
}

function integrity(file) {
  return `sha512-${createHash('sha512').update(fs.readFileSync(file)).digest('base64')}`;
}

function packageFile(name) {
  return path.join(adapter.packages[name].directory, 'package.json');
}

function readPackage(name) {
  return JSON.parse(fs.readFileSync(packageFile(name), 'utf8'));
}

// Keeps each package.json's own indentation so the version PR diff is one line.
function writePackage(name, pkg) {
  const file = packageFile(name);
  const indent = /^([ \t]+)"/m.exec(fs.readFileSync(file, 'utf8'))?.[1] || '  ';
  fs.writeFileSync(file, `${JSON.stringify(pkg, null, indent)}\n`);
}

function rewriteNativeDependency(nativeDependency) {
  const pkg = readPackage(adapter.packageName);
  check(
    pkg.devDependencies?.[adapter.nativePackageName],
    `${adapter.packageName} must declare a ${adapter.nativePackageName} devDependency`
  );
  pkg.devDependencies[adapter.nativePackageName] = nativeDependency;
  writePackage(adapter.packageName, pkg);
}

function validatePackageFiles(files, pkg, { nativeDependency } = {}) {
  const policy = adapter.packages[pkg.name];
  check(policy, `Unexpected packed package name: ${pkg.name}`);
  const names = new Set(files);
  for (const file of policy.requiredFiles) check(names.has(file), `Package is missing ${file}`);
  if (policy.native) {
    check(
      files.some((file) => file.startsWith('ios/') && /\.(m|mm|cpp)$/.test(file)),
      'Package is missing iOS implementation'
    );
    check(
      files.some((file) => file.startsWith('android/') && /\.(java|kt)$/.test(file)),
      'Package is missing Android implementation'
    );
  }
  for (const file of files) {
    check(
      !file.startsWith('/') && !file.split('/').includes('..') && !file.includes('\\'),
      `Unsafe package path: ${file}`
    );
    check(
      !/(^|\/)(node_modules|\.npmrc|\.git|\.github|\.buildkite|\.gradle|\.yarn|DerivedData)(\/|$)/.test(
        file
      ),
      `Unexpected private/build path: ${file}`
    );
    check(
      policy.allowedScripts.includes(file) ||
        !/^(scripts|demo|docuilib|expoDemo|webDemo|coverage)\//.test(file),
      `Unexpected development file: ${file}`
    );
    check(
      !/\.(apk|aab|ipa|jks|keystore)$/.test(file),
      `Unexpected native binary/credential: ${file}`
    );
  }
  check(
    /^(git\+)?https:\/\/github\.com\/wix\/react-native-ui-lib(\.git)?$/.test(pkg.repository?.url),
    'Package repository must match npm trust'
  );
  check(!JSON.stringify(pkg).includes('workspace:'), 'Packed package.json still has workspace: ranges');
  if (nativeDependency && pkg.name === adapter.packageName) {
    check(
      pkg.devDependencies?.[adapter.nativePackageName] === nativeDependency,
      `Packed ${adapter.nativePackageName} dependency differs from the release plan`
    );
  }
  const entries = [pkg.main, pkg.types, pkg['react-native'], ...Object.values(pkg.bin || {})];
  for (const value of Object.values(pkg.exports || {})) {
    if (typeof value === 'string') entries.push(value);
    else entries.push(...Object.values(value));
  }
  for (const entry of entries.filter((value) => value !== undefined)) {
    const file = typeof entry === 'string' ? entry.replace(/^\.\//, '') : '';
    check(file && (names.has(file) || names.has(`${file}.js`)), `Unresolvable package entry: ${entry}`);
  }
}

function pack(directory, name, options) {
  check(
    compareVersions(exec('npm', ['--version']).trim(), '11.17.0') >= 0,
    'Package preparation requires npm >=11.17.0 (Node 24.19.0); older npm can run prepare despite --ignore-scripts'
  );
  fs.mkdirSync(directory, { recursive: true });
  const output = exec(
    'npm',
    ['pack', '--ignore-scripts', '--json', '--pack-destination', path.resolve(directory)],
    { cwd: adapter.packages[name].directory }
  );
  const results = JSON.parse(output);
  check(results.length === 1, `Expected one ${name} tarball`);
  const result = results[0];
  const pkg = readPackage(name);
  check(pkg.name === name, `Packed ${name} from the wrong directory`);
  validatePackageFiles(
    result.files.map((file) => file.path),
    pkg,
    options
  );
  const actual = integrity(path.join(directory, result.filename));
  check(actual === result.integrity, 'npm pack integrity mismatch');
  return { name: pkg.name, version: pkg.version, filename: result.filename, integrity: actual };
}

function readManifest(directory, options) {
  const manifest = validateManifest(
    JSON.parse(fs.readFileSync(path.join(directory, 'manifest.json'), 'utf8')),
    options
  );
  for (const pkg of manifest.packages) {
    const tarball = path.join(directory, pkg.filename);
    check(fs.lstatSync(tarball).isFile(), 'Package artifact must be a regular file');
    check(integrity(tarball) === pkg.integrity, `Artifact integrity mismatch for ${pkg.name}`);
    const names = exec('tar', ['-tzf', tarball])
      .trim()
      .split('\n')
      .map((name) => {
        check(name.startsWith('package/'), 'Unexpected tarball root');
        return name.slice('package/'.length);
      })
      .filter(Boolean);
    const packed = JSON.parse(exec('tar', ['-xOzf', tarball, 'package/package.json']));
    check(packed.name === pkg.name, 'Packed name differs from release manifest');
    validatePackageFiles(names, packed, { nativeDependency: manifest.nativeDependency });
    check(packed.version === pkg.version, 'Packed version differs from release manifest');
  }
  for (const [filename, expected] of Object.entries(manifest.files || {})) {
    check(['release.bundle', 'notes.md'].includes(filename), 'Unexpected manifest sidecar');
    check(
      integrity(path.join(directory, filename)) === expected,
      `Artifact integrity mismatch for ${filename}`
    );
  }
  check(
    manifest.files?.['release.bundle'] && manifest.files?.['notes.md'],
    'Missing release artifact sidecars'
  );
  return manifest;
}

function verifyReleaseCommit(manifest, directory) {
  exec('git', ['bundle', 'verify', path.join(directory, 'release.bundle')], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  exec('git', ['fetch', '--no-tags', path.join(directory, 'release.bundle'), 'HEAD']);
  check(
    exec('git', ['rev-parse', 'FETCH_HEAD']).trim() === manifest.releaseSha,
    'Bundle does not contain the release commit'
  );
  check(
    exec('git', ['rev-parse', `${manifest.releaseSha}^`]).trim() === manifest.sourceSha,
    'Release commit must have the validated source as its parent'
  );
  const allowed = Object.keys(adapter.packages).map(packageFile);
  const changed = exec('git', ['diff', '--name-only', manifest.sourceSha, manifest.releaseSha])
    .trim()
    .split('\n')
    .filter(Boolean);
  for (const file of changed) {
    check(allowed.includes(file), `Unexpected release source change: ${file}`);
  }
  for (const name of Object.keys(adapter.packages)) {
    const file = packageFile(name);
    const before = JSON.parse(exec('git', ['show', `${manifest.sourceSha}:${file}`]));
    const after = JSON.parse(exec('git', ['show', `${manifest.releaseSha}:${file}`]));
    const planned = manifest.packages.find((pkg) => pkg.name === name);
    check(
      after.version === (planned ? planned.version : before.version),
      `Release commit version mismatch for ${name}`
    );
    after.version = before.version;
    check(
      JSON.stringify(after) === JSON.stringify(before),
      `Release may only change the ${name} package.json version`
    );
  }
}

module.exports = {
  exec,
  integrity,
  readPackage,
  writePackage,
  rewriteNativeDependency,
  validatePackageFiles,
  pack,
  readManifest,
  verifyReleaseCommit,
};
