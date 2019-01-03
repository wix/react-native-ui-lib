module.exports = {
  rules: {
    'no-hard-coded-color': require('./lib/rules/no-hard-coded-color'),
    'component-deprecation': require('./lib/rules/component-deprecation'),
    'no-direct-import': require('./lib/rules/no-direct-import'),
    'assets-deprecation': require('./lib/rules/assets-deprecation'),
  },
};
