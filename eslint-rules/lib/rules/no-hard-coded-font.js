const utils = require('../utils');

const { findAndReportHardCodedValues, isPropFont } = utils;

module.exports = {
  meta: {
    docs: {
      description: 'disallow hard coded font style',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      avoidName: 'Please do not use hard coded font style objects.',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    function reportAndFixHardCodedFont(node) {
      if (node.value) {
        context.report({
          node,
          message: `Found value '${node.value}' in font style prop. Use UILib typography instead of hardcoded font styles.`,
        });
      }
    }

    function noHardCodedFont(node) {
      node.properties.forEach((property) => {
        if (property.key) {
          const propName = property.key.name;
          if (isPropFont(propName)) {
            findAndReportHardCodedValues(property.value, reportAndFixHardCodedFont, context.getScope());
          }
        }
      });
    }

    return {
      'CallExpression[callee.object.name=StyleSheet][callee.property.name=create] ObjectExpression':
        node => noHardCodedFont(node),
      'JSXAttribute[name.name = style] ObjectExpression': node => noHardCodedFont(node),
    };
  },
};
