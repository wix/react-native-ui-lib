/**
 * @fileoverview Rule to disallow hard coded font style
 * @author Inbal Tish
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const utils = require('../utils')

const { findAndReportHardCodedValues } = utils

module.exports = {
  meta: {
    docs: {
      description: 'disallow hard coded font style',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      avoidName: 'Please do not use hard coded fontSize prop in style objects, instead use Typography presets'
    },
    fixable: 'code',
    schema: [] // no options
  },
  create (context) {
    function reportAndFixHardCodedFont (node) {
      context.report({
        node,
        message: 'Please do not use hard coded fontSize prop in style objects, instead use Typography presets'
      })
    }

    function isPropFont (propName) {
      return (['fontSize', 'fontWeight', 'lineHeight', 'fontFamily'].indexOf(propName) !== -1)
    }
    function noHardCodedFont (node) {
      node.properties.forEach((property) => {
        if (property.key) {
          const propName = property.key.name
          if (isPropFont(propName)) {
            findAndReportHardCodedValues(property.value, reportAndFixHardCodedFont, context.getScope())
          }
        }
      })
    }

    return {
      'CallExpression[callee.object.name=StyleSheet][callee.property.name=create] ObjectExpression': node => noHardCodedFont(node),
      'JSXAttribute[name.name = style] ObjectExpression': node => noHardCodedFont(node)
    }
  }
}
