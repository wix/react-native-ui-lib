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
            type: 'object'
          }
        }
      }
    }
  }
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
    function reportPropValueShapeDeprecation(propKey, prop, deprecation, node) {
      const componentName = utils.getComponentName(node);
      const newProp = _.get(deprecation, 'fix.propName');
      const fixMessage = _.get(deprecation, 'message') ? ' ' + _.get(deprecation, 'message') : '';
      const message = `The shape of '${prop}' prop of '${componentName}' doesn't contain '${deprecation.prop}' anymore.${fixMessage}`;
      context.report({
        node,
        message,
        fix(fixer) {
          if (newProp && propKey) {
            return fixer.replaceText(propKey, newProp);
          }
        }
      });
    }

    function testJSXAttributes(node) {
      try {
        const {deprecations} = _.get(context, 'options[0]');
        const componentName = utils.getComponentName(node);
        _.forEach(deprecations, deprecation => {
          if (_.includes(deprecation.components, componentName)) {
            _.forEach(node.attributes, attribute => {
              const attributeName = _.get(attribute, 'name.name');
              if (attribute.type === 'JSXSpreadAttribute') {
                const spreadSource = utils.findValueNodeOfIdentifier(attribute.argument.name, context.getScope());
                const spreadSourceName = _.get(spreadSource, 'properties[0].key.name');
                checkAttributeProperties(
                  spreadSource.properties[0].value.properties,
                  spreadSourceName,
                  deprecation,
                  node,
                  context
                );
              } else if (_.includes(deprecation.propNames, attributeName)) {
                checkAttribute(attribute, deprecation, node);
              }
            });
          }
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    function checkAttribute(attribute, deprecation, node) {
      const attributeName = _.get(attribute, 'name.name');
      const attributeType = _.get(attribute, 'value.expression.type');
      if (attributeType === 'Identifier') {
        const passedProp = utils.findValueNodeOfIdentifier(attribute.value.expression.name, context.getScope());
        if (passedProp && passedProp.properties) {
          checkAttributeProperties(passedProp.properties, attributeName, deprecation, node, context);
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
            checkAttributeProperties(spreadSource.properties, attributeName, deprecation, node);
          }
        }
      }
      const attributeProperties = _.get(attribute, 'value.expression.properties');
      checkAttributeProperties(attributeProperties, attributeName, deprecation, node);
    }

    function checkAttributeProperties(attributeProperties, attributeName, deprecation, node) {
      for (let i = 0; i <= attributeProperties.length; i++) {
        const propertyName = _.get(attributeProperties[i], 'key.name');
        const origin = propertyName && _.find(deprecation.shape, ['prop', propertyName]);
        if (origin && origin.prop && propertyName === origin.prop) {
          reportPropValueShapeDeprecation(attributeProperties[i].key, attributeName, origin, node);
        }
      }
    }

    return {
      JSXOpeningElement: testJSXAttributes
    };
  }
};
