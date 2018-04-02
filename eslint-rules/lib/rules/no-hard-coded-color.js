const utils = require('../utils');

const { findAndReportHardCodedValues, colorProps } = utils;
const _ = require('lodash');


module.exports = {
  meta: {
    docs: {
      description: 'disallow hard coded colors',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      uiLib: 'Use UILib colors instead of hardcoded colors.',
    },
    fixable: 'whitespace',
    schema: [], // no options
  },
  create(context) {
    // Helpers
    function propIsColor(propName) {
      return colorProps.indexOf(propName) !== -1;
    }

    function reportAndFixHardCodedColorString(node) {
      context.report({
        node,
        message: 'Use UILib colors instead of hardcoded colors.',
        fix(fixer) {
          if (node.extra) {
            const colorString = node.extra.rawValue;
            const validColors = _.get(context, 'settings.uiLib.validColors');
            if (validColors) {
              const invertedColorsDict = _.invert(validColors);
              if (invertedColorsDict[colorString]) {
                return fixer.replaceText(node, `Colors.${invertedColorsDict[colorString]}`);
              }
            }
          }
        },
      });
    }

    function noHardCodedColors(node) {
      node.properties.forEach((property) => {
        if (property.key) {
          const propName = property.key.name;
          if (propIsColor(propName)) {
            findAndReportHardCodedValues(property.value, reportAndFixHardCodedColorString, context.getScope());
          }
        }
      });
    }

    return {
      'CallExpression[callee.object.name=StyleSheet][callee.property.name=create] ObjectExpression': node =>
        noHardCodedColors(node),
      'JSXAttribute[name.name = style] ObjectExpression': node => noHardCodedColors(node),
    };
  },
};
