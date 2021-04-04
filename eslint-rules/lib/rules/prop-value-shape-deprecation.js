const _ = require('lodash');
const {findValueNodeOfIdentifier, getComponentName, getPathPrefix, getPathSuffix} = require('../utils_old');

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
      const componentName = getComponentName(node);
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
        const componentName = getComponentName(node);
        _.forEach(deprecations, deprecation => {
          if (_.includes(deprecation.components, componentName)) {
            _.forEach(node.attributes, attribute => {
              _.forEach(deprecation.propNames, deprecationProp => {
                recursiveDeprecation(attribute, deprecationProp, deprecation, deprecationProp, node);
              });
            });
          }
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    function recursiveDeprecation(attribute, deprecationProp, deprecation, deprecationPath, node) {
      const deprecationPrefix = getPathPrefix(deprecationProp);
      const deprecationSuffix = getPathSuffix(deprecationProp);
      let passedProps;
      let attributeName = _.get(attribute, 'name.name') || _.get(attribute, 'key.name');
      if (attribute.type === 'JSXSpreadAttribute' || attribute.type === 'ExperimentalSpreadProperty') {
        const spreadSource = findValueNodeOfIdentifier(attribute.argument.name, context.getScope());
        const spreadSourceName = _.get(spreadSource, 'properties[0].key.name');
        if (deprecationPrefix === spreadSourceName) {
          checkAttributeProperties(spreadSource.properties[0].value.properties, deprecationPath, deprecation, node);
        }
      } else if (!deprecationSuffix && deprecationPrefix === attributeName) {
        const attributeType = _.get(attribute, 'value.expression.type') || _.get(attribute, 'type');
        if (attributeType === 'Identifier') {
          const passedPropsName = _.get(attribute, 'value.expression.name');
          passedProps = findValueNodeOfIdentifier(passedPropsName, context.getScope());
        }
        let attributeProperties = passedProps
          ? _.get(passedProps, 'properties')
          : attributeType === 'Property'
          ? _.get(attribute, 'value.properties')
          : _.get(attribute, 'value.expression.properties');
        if (attributeType === 'Property' && !attributeProperties) {
          const passedPropsName = _.get(attribute, 'value.name');
          passedProps = findValueNodeOfIdentifier(passedPropsName, context.getScope());
          attributeProperties = passedProps.properties;
        }
        checkAttributeProperties(attributeProperties, deprecationPath, deprecation, node);
      } else if (deprecationSuffix) {
        const attributeType = _.get(attribute, 'value.expression.type');
        if (attributeType === 'Identifier') {
          const passedPropsName = _.get(attribute, 'value.expression.name');
          passedProps = findValueNodeOfIdentifier(passedPropsName, context.getScope());
        }
        const attributeProperties = passedProps
          ? _.get(passedProps, 'properties')
          : _.get(attribute, 'value.expression.properties') ||
            _.get(attribute, 'value.properties') ||
            _.get(attribute, 'value.expression.elements[0].properties');
        _.forEach(attributeProperties, attributeProperty => {
          recursiveDeprecation(attributeProperty, deprecationSuffix, deprecation, deprecationPath, node);
        });
      }
    }

    function checkAttributeProperties(attributeProperties, attributeName, deprecation, node) {
      for (let i = 0; i < attributeProperties.length; i++) {
        const propertyType = _.get(attributeProperties[i], 'type');
        if (propertyType === 'ExperimentalSpreadProperty') {
          const spreadProps = findValueNodeOfIdentifier(attributeProperties[i].argument.name, context.getScope());
          checkAttributeProperties(spreadProps.properties, attributeName, deprecation, node);
        }
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
