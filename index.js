if (process.env.DEV_MODE === 'true') {
  module.exports = require('./src/index');
} else {
  module.exports = require('./dist/index');
}
