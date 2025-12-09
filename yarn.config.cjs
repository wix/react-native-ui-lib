const fs = require('fs');
const {defineConfig} = require(`@yarnpkg/types`);
const {logError} = require('./scripts/utils');

const UNWANTED_DEPENDENCIES = 'npm.dev';

function checkUnwantedDependencies(file) {
  const fileContent = fs.readFileSync(file, 'utf8');
  const matches = fileContent.match(new RegExp(`${UNWANTED_DEPENDENCIES}`, 'g'));

  if (matches !== null) {
    logError('Unwanted dependencies found in ' + file);
    process.exit(1);
  }
}

function checkYarnLock() {
  checkUnwantedDependencies('./yarn.lock');
}

function checkYarnRc() {
  checkUnwantedDependencies('./.yarnrc.yml');
}

module.exports = defineConfig({
  constraints: async () => {
    checkYarnLock();
    checkYarnRc();
  }
});
