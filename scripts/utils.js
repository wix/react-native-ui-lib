const chalk = require('chalk');

function logDebug() {
  console.log(chalk.gray(...arguments));
}

function logGreen() {
  console.log(chalk.green(...arguments));
}

function logError() {
  // eslint-disable-next-line no-restricted-syntax
  console.error(chalk.red(...arguments));
}


module.exports = {
  logDebug,
  logGreen,
  logError
};
