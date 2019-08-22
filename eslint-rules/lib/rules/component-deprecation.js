const _ = require('lodash');
const utils = require('../utils');

const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true,
};

const FIX_TYPES = {
  PROP_NAME: 'propName',
  COMPONENT_NAME: 'componentName'
};

module.exports = {
  meta: {
    docs: {
      description: "component or some of the component's props are deprecated",
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      uiLib: 'This component is deprecated or containes deprecated props.',
    },
    fixable: 'code',
    schema: [MAP_SCHEMA],
  },
  create(context) {
    function reportDeprecatedComponentOrProps(node, options) {
      try {
        const {dueDate} = context.options[0];
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        const msg =
          options.prop === undefined
            ? `The '${options.name}' component is deprecated. ${options.message}${dueDateNotice}`
            : `The '${options.name}' component's prop '${options.prop}' is deprecated. ${options.message}${dueDateNotice}`;
        
        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (options.fix) {
              const type = Object.keys(options.fix)[0];
              const fix = Object.values(options.fix)[0];

              switch (type) {
                case FIX_TYPES.PROP_NAME:
                  // Fix for prop name change only (when prop's value and type does not change)
                  return fixer.replaceText(node.name, fix);
                case FIX_TYPES.COMPONENT_NAME:
                  if (node.type === 'ImportDeclaration') {
                    const index = getSpecifierIndex(node, options.name);
                    return fixer.replaceText(node.specifiers[index], fix);
                  }
                  return fixer.replaceText(node.name, fix);
                default:
                  break;
              }
            }
          },
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    function getSpecifierIndex(node, name) {
      let matchIndex;
      if (node && node.specifiers) {
        _.forEach(node.specifiers, (s, index) => {
          const x = _.get(s, 'imported.name');
          if (x === name) {
            matchIndex = index;
          }
        });
      }
      return matchIndex;
    }

    function checkPropDeprecation(node, propName, deprecatedPropList, componentName) {
      const deprecatedProp = _.find(deprecatedPropList, {prop: propName});
      if (deprecatedProp) {
        const {prop, message, fix} = deprecatedProp;
        reportDeprecatedComponentOrProps(node, {name: componentName, prop, message, fix});
      }
    }

    function deprecationCheck(node, componentName) {
      let component = componentName;
      if (!componentName && node.name) {
        if (node.name.object) {
          component = `${node.name.object.name}.${node.name.property.name}`;
        } else {
          component = node.name.name;
        }
      }
      if (component) {
        if (isComponentDeprecated(component)) {
          const deprecatedComponent = getDeprecatedObject(component);
          if (isComponentImportMatch(deprecatedComponent)) {
            const name = deprecatedComponent.component;
            const message = deprecatedComponent.message;
            const fix = deprecatedComponent.fix;
            const props = deprecatedComponent.props;
  
            if (!props) {
              reportDeprecatedComponentOrProps(node, {name, message, fix});
            } else {
              const nodeAttributes = node.attributes;
              nodeAttributes.forEach((att) => {
                if (att.type === 'JSXAttribute') {
                  checkPropDeprecation(att, att.name.name, props, name);
                } else if (att.type === 'JSXSpreadAttribute') {
                  const spreadSource = utils.findValueNodeOfIdentifier(att.argument.name, context.getScope());
                  if (spreadSource) {
                    _.forEach(spreadSource.properties, (property) => {
                      const key = _.get(property, 'key');
                      const propName = _.get(property, 'key.name');
                      checkPropDeprecation(key, propName, props, name);
                    });
                  }
                }
              });
            }
          }
        }
      }
    }

    const importSpecifiers = {};

    function createImportsObject(node) {
      const source = node.source.value;
      if (Object.keys(deprecationSources).indexOf(source) !== -1) {
        if (!(source in importSpecifiers)) {
          importSpecifiers[source] = [];
        }
        const specifiers = node.specifiers;
        if (specifiers) {
          specifiers.forEach((s) => {
            importSpecifiers[source].push(s.local.name);
            checkSpecifier(s.local.name, node);
          });
        }
      }
    }

    function checkSpecifier(name, node) {
      const deprecatedComponent = getDeprecatedObject(name);
      if (deprecatedComponent && !deprecatedComponent.props) {
        deprecationCheck(node, name);
      }
    }

    const {deprecations} = context.options[0];
    const deprecationSources = createDeprecationSourcesObject();

    function createDeprecationSourcesObject() {
      const obj = {};
      if (!deprecations) {
        return obj;
      }
      deprecations.forEach((element) => {
        if (!(element.source in obj)) {
          obj[element.source] = [element.component];
        } else {
          obj[element.source].push(element.component);
        }
      });
      return obj;
    }

    function isComponentDeprecated(component) {
      const values = _.chain(deprecationSources)
        .values()
        .flatten()
        .value();
      return _.includes(values, component);
    }

    function isComponentImportMatch(component) {
      // in case it's a sub component like List.Item
      const componentName = _.split(component.component, '.')[0];
      if (component.source in importSpecifiers) {
        return _.includes(importSpecifiers[component.source], componentName);
      }
      return false;
    }

    function getDeprecatedObject(component) {
      let jsonElement;
      deprecations.forEach((element) => {
        if (element.component === component) {
          jsonElement = element;
        }
      });
      return jsonElement;
    }

    return {
      ImportDeclaration: node => createImportsObject(node),
      JSXOpeningElement: node => deprecationCheck(node),
    };
  },
};
