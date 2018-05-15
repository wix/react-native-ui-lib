const cp = require('child_process');
const p = require('path');
const semver = require('semver');

function execSync(cmd) {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
}

function execSyncRead(cmd) {
  return String(cp.execSync(cmd, { stdio: ['inherit', 'pipe', 'inherit'] })).trim();
}

function execSyncSilently(cmd) {
  cp.execSync(cmd, { stdio: ['ignore', 'ignore', 'ignore'] });
}

function validateEnv() {
  if (!process.env.CI || !process.env.TRAVIS) {
    throw new Error(`releasing is only available from Travis CI`);
  }

  if (process.env.TRAVIS_BRANCH !== 'master') {
    console.error(`not publishing on branch ${process.env.TRAVIS_BRANCH}`);
    return false;
  }

  if (process.env.TRAVIS_PULL_REQUEST !== 'false') {
    console.error(`not publishing as triggered by pull request ${process.env.TRAVIS_PULL_REQUEST}`);
    return false;
  }

  return true;
}

function calcNewVersion() {
  const latestVersion = execSyncRead(`npm view ${process.env.npm_package_name}@latest version`);
  console.log(`latest version is: ${latestVersion}`);
  console.log(`package version is: ${process.env.npm_package_version}`);
  if (semver.gt(process.env.npm_package_version, latestVersion)) {
    return semver.inc(process.env.npm_package_version, 'patch');
  } else {
    return semver.inc(latestVersion, 'patch');
  }
}

function copyNpmRc() {
  execSync(`rm -f package-lock.json`);
  const npmrcPath = p.resolve(`${__dirname}/.npmrc`);
  execSync(`cp -rf ${npmrcPath} .`);
}

function tagAndPublish(newVersion) {
  console.log(`new version is: ${newVersion}`);
  execSync(`npm version ${newVersion} -m "v${newVersion} [ci skip]"`);
  execSync(`npm publish --tag latest`);
  execSyncSilently(`git push deploy --tags`);
}

function run() {
  if (!validateEnv()) {
    return;
  }
  copyNpmRc();
  tagAndPublish(calcNewVersion());
}

run();
