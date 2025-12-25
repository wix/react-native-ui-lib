const fs = require('fs');
const {defineConfig} = require(`@yarnpkg/types`);
const {logDebug, logError} = require('./scripts/utils');

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

module.exports = defineConfig({
  constraints: async () => {
    checkYarnLock();
    checkYarnRc();
  }
});
