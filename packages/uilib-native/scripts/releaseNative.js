const exec = require('shell-utils').exec;
const p = require('path');

// Export buildkite variables for Release build
// We cast toString() because function returns 'object'
const IS_SNAPSHOT = process.env.BUILDKITE_MESSAGE?.match(/^snapshot$/i);
const VERSION_TAG = IS_SNAPSHOT ? 'snapshot' : 'latest';

function run() {
  if (!validateEnv()) {
    console.log('Do not release native');
    return;
  }

  console.log('Release native');
  const packageJsonVersion = require('../package.json').version;
  const currentPublished = findCurrentPublishedVersion();
  const newVersion = IS_SNAPSHOT
    ? `${packageJsonVersion}-snapshot.${process.env.BUILDKITE_BUILD_NUMBER}`
    : packageJsonVersion;

  if (currentPublished !== packageJsonVersion) {
    createNpmRc();
    versionTagAndPublish(currentPublished, newVersion);
  }
}

function validateEnv() {
  if (!process.env.CI) {
    throw new Error('releasing is only available from CI');
  }
  return process.env.BUILDKITE_BRANCH === 'master' || process.env.BUILDKITE_MESSAGE === 'snapshot';
}

function createNpmRc() {
  exec.execSync('rm -f package-lock.json');
  const npmrcPath = p.resolve(`${__dirname}/.npmrc`);
  exec.execSync(`cp -rf ${npmrcPath} .`);
}

function versionTagAndPublish(currentPublished, newVersion) {
  console.log(`current published version: ${currentPublished}`);
  console.log(`Publishing version: ${newVersion}`);
  tryPublishAndTag(newVersion);
}

function findCurrentPublishedVersion() {
  return exec.execSyncRead(`npm view ${process.env.npm_package_name} dist-tags.latest`);
}

function tryPublishAndTag(version) {
  try {
    tagAndPublish(version);
    console.log(`Released ${version}`);
  } catch (err) {
    console.log(`Failed to release ${version}`, err);
  }
}

function tagAndPublish(newVersion) {
  console.log(`trying to publish ${newVersion}...`);
  if (IS_SNAPSHOT) {
    exec.execSync(`npm --no-git-tag-version version ${newVersion}`);
  }
  exec.execSync(`npm publish --tag ${VERSION_TAG} --workspace uilib-native`);
  if (!IS_SNAPSHOT) {
    exec.execSync(`git tag -a ${newVersion} -m "${newVersion}"`);
  }
  exec.execSyncSilent(`git push deploy ${newVersion} || true`);
}

run();
