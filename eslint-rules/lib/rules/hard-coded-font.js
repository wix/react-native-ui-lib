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
    fixable: 'code',
    schema: [], // no options
  },
  create: function(context) {
    return {
      ObjectExpression: node => {
        const properties = node.properties;
        properties.forEach(prop => {
          if (prop.key.name === 'fontSize') {
            context.report({
              message: `Please don't use hard coded fontSize prop in style objects, instead use Typography presets`,
              node: prop,
            });
          }
        });
      },
    };
  },
};
