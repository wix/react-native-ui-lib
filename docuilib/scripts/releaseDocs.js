const exec = require('shell-utils').exec;
const p = require('path');

function run() {
  if (!validateEnv()) {
    console.log('Do not release docs');
    return;
  }

  console.log('Release docs');
  const currentPublished = findCurrentPublishedVersion();
  const packageJson = require('../package.json');
  const newVersion = packageJson.version;

  if (currentPublished !== newVersion) {
    createNpmRc();
    versionTagAndPublish(currentPublished, newVersion);
  }
}

function validateEnv() {
  if (!process.env.CI) {
    throw new Error('releasing is only available from CI');
  }
  return process.env.BUILDKITE_BRANCH === 'master';
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
  console.log(`Trying to publish ${newVersion}...`);
  exec.execSync(`npm publish`);
}

run();
