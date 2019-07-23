module.exports = {
  rules: {
    'no-hard-coded-color': require('./lib/rules/no-hard-coded-color'),
    'no-direct-import': require('./lib/rules/no-direct-import'),
    'component-deprecation': require('./lib/rules/component-deprecation'),
    'assets-deprecation': require('./lib/rules/assets-deprecation'),
    // for duplicate rules usage
    'component-deprecation_warn': require('./lib/rules/component-deprecation'),
    'assets-deprecation_warn': require('./lib/rules/assets-deprecation'),
    'component-deprecation_error': require('./lib/rules/component-deprecation'),
    'assets-deprecation_error': require('./lib/rules/assets-deprecation'),
  },
};
