/**
 * @fileoverview Rule to disallow hard coded font style
 * @author Inbal Tish
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow hard coded font style',
      category: 'Possible Errors',
      recommended: true,
    },
    messages: {
      reportMessage: 'Please do not use hard coded fontSize prop in style objects, instead use Typography presets',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    return {
      ObjectExpression: function (node) {
        node.properties.forEach((property) => {
          if (property.key) {
            const propName = property.key.name;
            if (propName === 'fontSize') {
              if (property.value.type === 'CallExpression') {
                return;
              }
              if (property.value.type === 'MemberExpression') {
                const objectName = property.value.object.object.name;
                if (objectName.toLowerCase() === 'typography') {
                  return;
                }
              }
              // console.log(`${property.value.value} should be fixed!`);
              context.report({
                node,
                messageId: 'reportMessage',
              });
            }
          }
        });
      },
    };
  },
};
