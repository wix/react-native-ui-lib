const exec = require('shell-utils').exec;
const p = require('path');

// Export buildkite variables for Release build
// We cast toString() because function returns 'object'
let IS_RELEASE;
let VERSION_TAG;

function run() {
  if (!validateEnv()) {
    return;
  }
  IS_RELEASE = process.env.BUILDKITE_MESSAGE.match(/^release$/i);
  VERSION_TAG = IS_RELEASE ? 'latest' : 'snapshot';

  const latest = findPublishedVersion('latest');
  const packageJson = require('../package.json');
  const current = findPublishedVersion(VERSION_TAG);
  const newVersion = IS_RELEASE ? packageJson.version : `${latest}-snapshot.${process.env.BUILDKITE_BUILD_NUMBER}`;

  if (current !== newVersion) {
    createNpmRc();
    versionTagAndPublish(newVersion);
  }
}

function validateEnv() {
  if (!process.env.CI) {
    throw new Error('releasing is only available from CI');
  }
  return true;
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

function findPublishedVersion(tag) {
  return exec.execSyncRead(`npm view ${process.env.npm_package_name} dist-tags.${tag}`);
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
  exec.execSync(`npm --no-git-tag-version version ${newVersion}`);
  exec.execSync(`npm publish --tag ${VERSION_TAG}`);
  if (IS_RELEASE) {
    exec.execSync(`git tag -a ${newVersion} -m "${newVersion}"`);
  }
  exec.execSyncSilent(`git push deploy ${newVersion} || true`);
}

run();
