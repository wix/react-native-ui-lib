// @ts-ignore
const _ = require('lodash');
const {
  organizeDeprecations,
  addToImports,
  getComponentLocalName,
  getComponentName,
  getPossibleDeprecations,
  findValueNodeOfIdentifier,
  handleError
} = require('../utils');

const RULE_ID = 'component-prop-deprecation';
const MAP_SCHEMA = {
  type: 'object',
  properties: {
    component: {
      type: 'string'
    },
    source: {
      type: 'string'
    },
    props: {
      type: 'array',
      items: {
        type: 'object',
        required: ['prop', 'message'],
        properties: {
          prop: {
            type: 'string'
          },
          message: {
            type: 'string'
          },
          isRequired: {
            type: 'boolean'
          },
          fix: {
            type: 'object',
            required: ['propName'],
            properties: {
              propName: {
                type: 'string'
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
      description: "Some of the component's props are deprecated",
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: 'This component contains deprecated props.'
    },
    fixable: 'code',
    schema: [MAP_SCHEMA]
  },
  create(context) {
    function reportDeprecatedProps(data) {
      try {
        const {dueDate} = context.options[0];
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        const message = `The '${data.name}' component's prop '${data.prop}' is deprecated. ${data.message}${dueDateNotice}`;

        context.report({
          node: data.node,
          message,
          fix(fixer) {
            if (data.fix) {
              return fixer.replaceText(data.fixNode, data.fix.propName);
            }
          }
        });
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    function reportRequiredProps({node, name, prop, message: customMessage}) {
      try {
        const message = `The '${name}' component's prop '${prop}' is required. ${customMessage}`;
        context.report({
          node: node,
          message
        });
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    const {deprecations} = context.options[0];
    const organizedDeprecations = organizeDeprecations(deprecations);

    const imports = [];

    function checkPropDeprecation(node, fixNode, propName, deprecatedPropList, componentName) {
      const deprecatedProp = _.find(deprecatedPropList, {prop: propName});
      if (deprecatedProp && !deprecatedProp.isRequired) {
        const {prop, message, fix} = deprecatedProp;
        reportDeprecatedProps({node, name: componentName, prop, message, fixNode, fix});
      }

      return !!deprecatedProp;
    }

    function testAttributeForDeprecation(attribute, deprecatedPropList, componentName) {
      let wasFound = false;
      if (attribute.type === 'JSXAttribute') {
        wasFound = checkPropDeprecation(attribute, attribute.name, attribute.name.name, deprecatedPropList, componentName);
      } else if (attribute.type === 'JSXSpreadAttribute') {
        const spreadSource = findValueNodeOfIdentifier(attribute.argument.name, context.getScope());
        if (spreadSource) {
          _.forEach(spreadSource.properties, property => {
            const key = _.get(property, 'key');
            const propName = _.get(property, 'key.name');
            wasFound = checkPropDeprecation(key, key, propName, deprecatedPropList, componentName);
          });
        }
      }
      return wasFound;
    }

    function deprecationCheck(node) {
      imports.forEach(currentImport => {
        const source = Object.keys(currentImport)[0];
        const componentLocalName = getComponentLocalName(node);
        if (componentLocalName) {
          const deprecationSource = organizedDeprecations[source];
          if (deprecationSource) {
            // There are deprecations from this source
            const componentName = getComponentName(componentLocalName, imports);
            const foundPossibleDeprecations = getPossibleDeprecations(
              componentLocalName,
              imports,
              currentImport,
              deprecationSource
            );

            foundPossibleDeprecations.forEach(foundPossibleDeprecation => {
              const deprecatedPropList = [...foundPossibleDeprecation.props];
              const requiredPropList = _.remove(deprecatedPropList, p => !!p.isRequired);
              const attributes = node.attributes;

              /* handle deprecated props */
              if (!_.isEmpty(deprecatedPropList)) {
                attributes.forEach(attribute => {
                  testAttributeForDeprecation(attribute, deprecatedPropList, componentName);
                });
              }

              /* handle required props */
              let foundAttribute = false;
              attributes.forEach(attribute => {
                foundAttribute = foundAttribute || testAttributeForDeprecation(attribute, requiredPropList, componentName);
              });
              
              if (!foundAttribute && requiredPropList[0])  {
                const prop = requiredPropList[0];
                reportRequiredProps({node, name: componentName, prop: prop.prop, message: prop.message})
              }
            });
          }
        }
      });
    }

    return {
      ImportDeclaration: node => addToImports(node, imports),
      VariableDeclarator: node => addToImports(node, imports),
      JSXOpeningElement: node => deprecationCheck(node)
    };
  }
};
