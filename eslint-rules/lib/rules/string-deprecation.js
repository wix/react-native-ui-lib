const {
  handleError,
  stringify
} = require('../utils');

const RULE_ID = 'string-deprecation';

const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true
};

module.exports = {
  meta: {
    docs: {
      description: 'string is deprecated',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: 'The string is deprecated.'
    },
    schema: [MAP_SCHEMA]
  },
  create(context) {
    function reportDeprecatedString(node, options) {
      try {
        const {dueDate} = context.options[0];
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        const msg = `'${options.string}' is deprecated. ${options.message}${dueDateNotice}`;
        context.report({
          node,
          message: `${msg}`
        });
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    const {deprecations} = context.options[0];

    function onCodePathStart(_codePath, node) {
      deprecations.forEach(deprecation => {
        if (stringify(node).includes(deprecation.string)) {
          reportDeprecatedString(node, deprecation);
        }
      });
    }

    return {
      onCodePathStart
    };
  }
};
