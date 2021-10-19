const exec = require('shell-utils').exec;
const cp = require('child_process');
const semver = require('semver');
const _ = require('lodash');
const p = require('path');

// Workaround JS

// Export buildkite variables for Release build
// We cast toString() because function returns 'object'
let isRelease, VERSION;
if (process.env.BUILDKITE_MESSAGE.match(/^release$/i)) {
  isRelease = cp.execSync(`buildkite-agent meta-data get release-build`).toString();
  isRelease = (isRelease === 'true');
  VERSION = cp.execSync(`buildkite-agent meta-data get version`).toString();
  if (isRelease && Number(VERSION) === 0) {
    throw new Error('Version can not be 0. Please specify the correct version...')
  }
}


// const isRelease = process.env.RELEASE_BUILD === 'true';
const branch = process.env.BUILDKITE_BRANCH;

// const ONLY_ON_BRANCH = `origin/${branch || 'master'}`;
const VERSION_TAG = isRelease ? 'latest' : 'snapshot';
const VERSION_INC = 'patch';

function run() {
  if (!validateEnv()) {
    return;
  }
  setupGit();
  createNpmRc();
  versionTagAndPublish();
}

function validateEnv() {
  if (!process.env.CI) {
    throw new Error('releasing is only available from CI');
  }

  // if (!process.env.JENKINS_MASTER) {
  //   console.log('not publishing on a different build');
  //   return false;
  // }

  // if (process.env.GIT_BRANCH !== ONLY_ON_BRANCH) {
  //   console.log(`not publishing on branch ${process.env.GIT_BRANCH}`);
  //   return false;
  // }

  return true;
}

function setupGit() {
  exec.execSyncSilent('git config --global push.default simple');
  exec.execSyncSilent(`git config --global user.email "${process.env.GIT_EMAIL}"`);
  exec.execSyncSilent(`git config --global user.name "${process.env.GIT_USER}"`);
  const remoteUrl = new RegExp('https?://(\\S+)').exec(exec.execSyncRead('git remote -v'))[1];
  exec.execSyncSilent(`git remote add deploy "https://${process.env.GIT_USER}:${process.env.GIT_TOKEN}@${remoteUrl}"`);
  // exec.execSync(`git checkout ${ONLY_ON_BRANCH}`);
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
  // exec.execSync(`npm --no-git-tag-version version ${newVersion}`);
  // exec.execSync(`npm publish --tag ${VERSION_TAG}`);
  if (isRelease) {
    // exec.execSync(`git tag -a ${newVersion} -m "${newVersion}"`);
  }
  // exec.execSyncSilent(`git push deploy ${newVersion} || true`);
}

run();
