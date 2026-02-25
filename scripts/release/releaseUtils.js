const exec = require('shell-utils').exec;
const semver = require('semver');
const childProcess = require('child_process');
const path = require('path');
const {logDebug, logGreen} = require('../utils');
const rootDir = path.resolve(__dirname, '../..');

let dryRun =
  (process.argv?.find(arg => arg.toLowerCase().includes('-dry'))?.length ?? 0) > 0 ||
  (process.argv?.find(arg => arg.toLowerCase().includes('-dry-run'))?.length ?? 0) > 0 ||
  (process.argv?.find(arg => arg.toLowerCase().includes('-dryrun'))?.length ?? 0) > 0 ||
  (process.argv?.find(arg => arg.toLowerCase().includes('-d'))?.length ?? 0) > 0;

const testRelease =
  (process.argv?.find(arg => arg.toLowerCase().includes('-release'))?.length ?? 0) > 0 ||
  (process.argv?.find(arg => arg.toLowerCase().includes('-r'))?.length ?? 0) > 0;

const testMaster =
  (process.argv?.find(arg => arg.toLowerCase().includes('-master'))?.length ?? 0) > 0 ||
  (process.argv?.find(arg => arg.toLowerCase().includes('-m'))?.length ?? 0) > 0;

let testSnapshot =
  (process.argv?.find(arg => arg.toLowerCase().includes('-snapshot'))?.length ?? 0) > 0 ||
  (process.argv?.find(arg => arg.toLowerCase().includes('-snap'))?.length ?? 0) > 0 ||
  (process.argv?.find(arg => arg.toLowerCase().includes('-s'))?.length ?? 0) > 0;

if (testRelease || testMaster || testSnapshot) {
  dryRun = true;
}

if (dryRun && !testMaster && !testRelease) {
  testSnapshot = true;
}

const isMaster = dryRun ? testMaster : process.env.BUILDKITE_BRANCH === 'master';
const isRelease = dryRun ? testRelease : process.env.BUILDKITE_MESSAGE?.match?.(/^release$/i);
const isSnapshot = dryRun ? testSnapshot : process.env.BUILDKITE_MESSAGE?.match?.(/^snapshot$/i);
const versionTag = isRelease ? 'latest' : 'snapshot';

logGreen(`Starting monorepo release process${dryRun ? ' (dry run' : ''}${isMaster ? ' for master' : ''}${isRelease ? ' for release' : ''}${isSnapshot ? ' for snapshot' : ''}${dryRun ? ')' : ''}`);

function getPublishedVersion(packageName, tag = versionTag, silent = false) {
  if (!silent) {
    logDebug(`Getting published version for ${packageName} with tag ${tag}`);
  }
  return exec.execSyncRead(`npm view ${packageName} dist-tags.${tag}`, true);
}

function getPackageJsonVersion(packageName) {
  return require(path.join(rootDir, `packages/${packageName}/package.json`)).version;
}

function getShouldRelease(package) {
  return isMaster || isRelease ? semver.gt(package.packageJsonVersion, package.publishedVersion) : !!isSnapshot;
}

function getVersion(package, dryRun) {
  let releaseVersion;
  switch (package.releaseVersionStrategy) {
    case 'packageJsonVersion':
      releaseVersion = package.packageJsonVersion;
      break;
    case 'buildKiteVersion':
      releaseVersion = dryRun
        ? `${semver.inc(package.packageJsonVersion, 'patch')}-dry-run`
        : childProcess.execSync(`buildkite-agent meta-data get version`).toString();
      break;
  }
  const latestVersion = getPublishedVersion(package.name, 'latest', true);
  const snapshotVersion = `${latestVersion}-snapshot.${process.env.BUILDKITE_BUILD_NUMBER}`;
  return isRelease ? releaseVersion : snapshotVersion;
}

function setupGit(dryRun) {
  if (dryRun) {
    logDebug('Dry run - not setting up git configuration');
    return;
  }
  logGreen('Setting up git configuration...');
  exec.execSyncSilent('git config --global push.default simple');
  exec.execSyncSilent(`git config --global user.email "${process.env.GIT_EMAIL}"`);
  exec.execSyncSilent(`git config --global user.name "${process.env.GIT_USER}"`);
  const remoteUrl = new RegExp('https?://(\\S+)').exec(exec.execSyncRead('git remote -v'))[1];
  exec.execSyncSilent(`git remote add deploy "https://${process.env.GIT_USER}:${process.env.GIT_TOKEN}@${remoteUrl}"`);
  logGreen('Git configured');
}

function createNpmRc(dryRun) {
  if (dryRun) {
    logDebug('Dry run - not setting up npm configuration');
    return;
  }
  logGreen('Setting up npm configuration...');
  exec.execSync('rm -f package-lock.json');
  const npmrcPath = path.resolve(`${__dirname}/.npmrc`);
  exec.execSync(`cp -rf ${npmrcPath} .`);
  logGreen('npmrc configured');
}

module.exports = {
  dryRun,
  isMaster,
  isRelease,
  isSnapshot,
  versionTag,
  getPublishedVersion,
  getPackageJsonVersion,
  getShouldRelease,
  getVersion,
  setupGit,
  createNpmRc
};
