const fs = require('fs');
const {defineConfig} = require(`@yarnpkg/types`);
const {logError} = require('./scripts/utils');

function checkYarnLock() {
  const yarnLock = fs.readFileSync('./yarn.lock', 'utf8');
  const matches = yarnLock.match(/npm.dev/);

  if (matches !== null) {
    logError('Yarn lock contains unwanted dependencies');
    process.exit(1);
  }
}

module.exports = defineConfig({
  constraints: async () => {
    checkYarnLock();
  }
});
