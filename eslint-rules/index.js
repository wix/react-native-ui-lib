module.exports = {
  rules: {
    'no-hard-coded-color': require('./lib/rules/no-hard-coded-color'),
    'no-direct-import': require('./lib/rules/no-direct-import'),
    'component-deprecation': require('./lib/rules/component-deprecation'),
    'component-prop-deprecation': require('./lib/rules/component-prop-deprecation'),
    'assets-deprecation': require('./lib/rules/assets-deprecation'),
    'typography-deprecation': require('./lib/rules/typography-deprecation'),
    'function-deprecation': require('./lib/rules/function-deprecation'),
    'prop-value-shape-deprecation': require('./lib/rules/prop-value-shape-deprecation'),
    // for duplicate rules usage
    'no-direct-import_warn': require('./lib/rules/no-direct-import'),
    'no-direct-import_error': require('./lib/rules/no-direct-import'),
    'component-deprecation_warn': require('./lib/rules/component-deprecation'),
    'component-prop-deprecation_warn': require('./lib/rules/component-prop-deprecation'),
    'assets-deprecation_warn': require('./lib/rules/assets-deprecation'),
    'typography-deprecation_warn': require('./lib/rules/typography-deprecation'),
    'function-deprecation_warn': require('./lib/rules/function-deprecation'),
    'prop-value-shape-deprecation_warn': require('./lib/rules/prop-value-shape-deprecation'),
    'component-deprecation_error': require('./lib/rules/component-deprecation'),
    'component-prop-deprecation_error': require('./lib/rules/component-prop-deprecation'),
    'assets-deprecation_error': require('./lib/rules/assets-deprecation'),
    'typography-deprecation_error': require('./lib/rules/typography-deprecation'),
    'function-deprecation_error': require('./lib/rules/function-deprecation'),
    'prop-value-shape-deprecation_error': require('./lib/rules/prop-value-shape-deprecation')
  }
};
