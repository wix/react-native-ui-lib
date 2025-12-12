const exec = require('shell-utils').exec;
const semver = require('semver');
const _ = require('lodash');
const p = require('path');
const cp = require('child_process');

// Workaround JS

const isRelease = process.env.BUILDKITE_MESSAGE.match(/^release$/i);
let VERSION;
if (isRelease) {
  VERSION = cp.execSync(`buildkite-agent meta-data get version`).toString();
}

const VERSION_TAG = isRelease ? 'latest' : 'snapshot';
const VERSION_INC = 'patch';

function run() {
  if (!validateEnv()) {
    console.log('Do not release demo');
    return;
  }

  console.log('Release demo');
  createNpmRc();
  versionTagAndPublish();
}

function validateEnv() {
  if (!process.env.CI) {
    throw new Error('releasing is only available from CI');
  }
  return (
    process.env.BUILDKITE_BRANCH === 'master' ||
    process.env.BUILDKITE_BRANCH === 'release' ||
    process.env.BUILDKITE_MESSAGE === 'snapshot'
  );
}

function createNpmRc() {
  exec.execSync('rm -f package-lock.json');
  const npmrcPath = p.resolve(`${__dirname}/.npmrc`);
  exec.execSync(`cp -rf ${npmrcPath} .`);
}

function versionTagAndPublish() {
  const currentPublished = findCurrentPublishedVersion();
  console.log(`current published version: ${currentPublished}`);

  const version = isRelease ? VERSION : `${currentPublished}-snapshot.${process.env.BUILDKITE_BUILD_NUMBER}`;
  console.log(`Publishing version: ${version}`);

  tryPublishAndTag(version);
}

function findCurrentPublishedVersion() {
  return exec.execSyncRead(`npm view ${process.env.npm_package_name} dist-tags.latest`);
}

function tryPublishAndTag(version) {
  let theCandidate = version;
  for (let retry = 0; retry < 5; retry++) {
    try {
      tagAndPublish(theCandidate);
      console.log(`Released ${theCandidate}`);
      return;
    } catch (err) {
      const alreadyPublished = _.includes(err.toString(), 'You cannot publish over the previously published version');
      if (!alreadyPublished) {
        throw err;
      }
      console.log(`previously published. retrying with increased ${VERSION_INC}...`);
      theCandidate = semver.inc(theCandidate, VERSION_INC);
    }
  }
}

function tagAndPublish(newVersion) {
  console.log(`trying to publish ${newVersion}...`);
  exec.execSync(`npm --no-git-tag-version version ${newVersion}`);
  exec.execSync(`npm publish --tag ${VERSION_TAG}`);
}

run();
