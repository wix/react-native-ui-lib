const fs = require('fs');
const {defineConfig} = require(`@yarnpkg/types`);
const {logDebug, logError} = require('./scripts/utils');
const childProcess = require('child_process');
const {getBranchPrefixes} = require('./scripts/release/prReleaseNotesCommon');

const UNWANTED_DEPENDENCIES = 'npm.dev';

function hasUnwantedDependencies(file) {
  const fileContent = fs.readFileSync(file, 'utf8');
  const matches = fileContent.match(new RegExp(`${UNWANTED_DEPENDENCIES}`, 'g'));

  if (matches !== null) {
    logError('Unwanted dependencies found in ' + file);
    return true;
  }

  return false;
}

function checkYarnLock() {
  if (hasUnwantedDependencies('./yarn.lock')) {
    logDebug('You can fix this by running `node scripts/fixYarnLock.js`');
    process.exit(1);
  }
}

function checkYarnRc() {
  if (hasUnwantedDependencies('./.yarnrc.yml')) {
    process.exit(1);
  }
}

function checkBranchPrefix() {
  try {
    const currentBranch = childProcess.execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8'
    }).trim();

    const hasValidPrefix = getBranchPrefixes().some(prefix => currentBranch.startsWith(prefix));

    if (!hasValidPrefix) {
      logError(`Branch "${currentBranch}" does not start with a valid prefix.`);
      logError(`Valid prefixes are:  "${getBranchPrefixes().join('"  "')}"`);
      logDebug('Please rename your branch to use one of the valid prefixes (e.g., feat/your-feature-name)');
      process.exit(1);
    }
  } catch (error) {
    logError(`Error checking branch name: ${error.message}`);
  }
}

module.exports = defineConfig({
  constraints: async () => {
    checkYarnLock();
    checkYarnRc();
    checkBranchPrefix();
  }
});
