const _ = require('lodash');
const utils = require('../utils');

const MAP_SCHEMA = {
  type: 'object',
  properties: {
    components: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    propNames: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    shape: {
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
        _.forEach(deprecations, deprecation => {
          if (_.includes(deprecation.components, nodeName)) {
            _.forEach(node.attributes, attribute => {
              const attributeName = _.get(attribute, 'name.name');
              if (attribute.type === 'JSXSpreadAttribute') {
                const spreadSource = utils.findValueNodeOfIdentifier(attribute.argument.name, context.getScope());
                const spreadSourceName = _.get(spreadSource, 'properties[0].key.name');
                checkAttributeProperties(
                  spreadSource.properties[0].value.properties,
                  spreadSourceName,
                  deprecation,
                  nodeName,
                  node,
                  context
                );
              } else if (_.includes(deprecation.propNames, attributeName)) {
                const attributeType = _.get(attribute, 'value.expression.type');
                if (attributeType === 'Identifier') {
                  const passedProp = utils.findValueNodeOfIdentifier(
                    attribute.value.expression.name,
                    context.getScope()
                  );
                  if (passedProp && passedProp.properties) {
                    checkAttributeProperties(
                      passedProp.properties,
                      attributeName,
                      deprecation,
                      nodeName,
                      node,
                      context
                    );
                  }
                }
                const attributeProps = _.get(attribute, 'value.expression.properties');
                for (let index = 0; index < attributeProps.length; index++) {
                  const spreadElementType = _.get(attribute, `value.expression.properties[${index}].type`);
                  if (attributeType === 'ObjectExpression' && spreadElementType === 'ExperimentalSpreadProperty') {
                    const spreadSource = utils.findValueNodeOfIdentifier(
                      attribute.value.expression.properties[index].argument.name,
                      context.getScope()
                    );
                    if (spreadSource && spreadSource.properties) {
                      checkAttributeProperties(spreadSource.properties, attributeName, deprecation, nodeName, node, context);
                    }
                  }
                }
                const attributeProperties = _.get(attribute, 'value.expression.properties');
                checkAttributeProperties(attributeProperties, attributeName, deprecation, nodeName, node, context);
              }
            });
          }
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    function checkAttributeProperties(attributeProperties, attributeName, deprecation, nodeName, node, context) {
      for (let i = 0; i <= attributeProperties.length; i++) {
        const propertyName = _.get(attributeProperties[i], 'key.name');
        const origin = propertyName && _.find(deprecation.shape, ['prop', propertyName]);
        if (origin && origin.prop && propertyName === origin.prop) {
          const destination = _.get(origin, 'fix.propName');
          const message = `The shape of '${attributeName}' prop of '${nodeName}' doesn't contain '${origin.prop}' anymore. Please use '${destination}' instead (fix is available).`;
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

    return {
      JSXOpeningElement: testJSXAttributes
    };
  }
};
