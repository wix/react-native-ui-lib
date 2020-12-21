const _ = require('lodash');

const MAP_SCHEMA = {
  type: 'object',
  properties: {
    component: {
      type: 'string'
    },
    props: {
      type: 'array',
      items: {
        type: 'object',
        required: ['prop', 'value'],
        properties: {
          prop: {
            type: 'string'
          },
          value: {
            type: 'array',
            items: {
              type: 'object',
              required: ['prop', 'message', 'fix'],
              properties: {
                prop: {
                  type: 'string'
                },
                message: {
                  type: 'string'
                },
                fix: {
                  type: 'object',
                  additionalProperties: true
                }
              }
            }
          }
        }
      }
    }
  },
  additionalProperties: true
};

module.exports = {
  meta: {
    docs: {
      description: "Detect deprecation of prop's value shape",
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: "This prop's value shape is deprecated."
    },
    fixable: 'code',
    schema: [MAP_SCHEMA]
  },
  create(context) {
    function testJSXAttributes(node) {
      try {
        const {deprecations} = _.get(context, 'options[0]');
        const nodeName = _.get(node, 'name.name');
        const deprecation = nodeName && deprecations && _.find(deprecations, ['component', nodeName]);
        if (deprecation.component && nodeName === deprecation.component) {
          _.forEach(node.attributes, attribute => {
            const attributeName = _.get(attribute, 'name.name');
            const deprecationProps = _.get(deprecation, 'props');
            const deprecationProp =
              attributeName && deprecationProps && _.find(deprecationProps, ['prop', attributeName]);
            const deprecationPropName = _.get(deprecationProp, 'prop');
            if (deprecationPropName && attributeName === deprecationPropName) {
              const attributeProperties = _.get(attribute, 'value.expression.properties');
              for (let i = 0; i <= attributeProperties.length; i++) {
                const propertyName = _.get(attributeProperties[i], 'key.name');
                const origin =
                  deprecationProp.value && propertyName && _.find(deprecationProp.value, ['prop', propertyName]);
                if (origin.prop && propertyName === origin.prop) {
                  const destination = _.get(origin, 'fix.propName');
                  const message = `The shape of '${deprecationPropName}' prop of '${deprecation.component}' doesn't contain '${origin.prop}' anymore. Please use '${destination}' instead (fix is available).`;
                  context.report({
                    node,
                    message,
                    fix(fixer) {
                      if (destination && attributeProperties[i].key) {
                        return fixer.replaceText(attributeProperties[i].key, destination);
                      }
                    }
                  });
                }
              }
            }
          });
        }
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    return {
      JSXOpeningElement: testJSXAttributes
    };
  }
};
