const _ = require('lodash');
const {addToImports, organizeDeprecations, getComponentLocalName, getPossibleDeprecations, handleError} = require('../utils');

const RULE_ID = 'component-deprecation';
const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true
};

module.exports = {
  meta: {
    docs: {
      description: 'component is deprecated',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: 'This component is deprecated.'
    },
    fixable: 'code',
    schema: [MAP_SCHEMA]
  },
  create(context) {
    function reportDeprecatedComponent(node, data) {
      try {
        const {dueDate} = context.options[0];
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        const msg = `The '${data.component}' component is deprecated. ${data.message}${dueDateNotice}`;
        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (data.fix && data.fixNode) {
              return fixer.replaceText(data.fixNode, data.fix.componentName);
            }
          }
        });
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    const {deprecations} = context.options[0];
    const organizedDeprecations = organizeDeprecations(deprecations);

    const imports = [];
    const parents = [];

    function getParent(localName) {
      const foundParents = parents.filter(parent => Object.keys(parent)[0] === localName);
      return !_.isEmpty(foundParents) ? foundParents[0][localName] : undefined;
    }

    function isParent(foundDeprecation, localName) {
      if (foundDeprecation.parent) {
        const parent = getParent(localName);
        if (foundDeprecation.parent === parent) {
          return true;
        }
      }

      return false;
    }

    function importDeprecationCheck(node) {
      const previousImports = _.cloneDeep(imports);
      addToImports(node, imports, parents);
      const addedImports = _.differenceWith(imports, previousImports, _.isEqual);
      addedImports.forEach(currentImport => {
        const source = Object.keys(currentImport)[0];
        const deprecationSource = organizedDeprecations[source];
        if (deprecationSource) {
          // There are deprecations from this source
          const components = currentImport[source];
          const foundDeprecations = deprecationSource.filter(currentDeprecationSource =>
            Object.values(components).includes(currentDeprecationSource.component)
          );

          if (foundDeprecations.length > 0) {
            foundDeprecations.forEach(foundDeprecation => {
              const localName = Object.keys(components).find(key => components[key] === foundDeprecation.component);
              if (isParent(foundDeprecation, localName)) {
                return;
              }

              let fixNode;
              if (node.type === 'ImportDeclaration') {
                const foundSpecifiers = node.specifiers.filter(
                  specifier => _.get(specifier, 'imported.name') === foundDeprecation.component
                );

                if (foundSpecifiers.length > 0) {
                  fixNode = foundSpecifiers[0].imported;
                }
              } else if (node.type === 'VariableDeclarator') {
                const properties = _.get(node, 'id.properties');
                if (properties) {
                  fixNode = properties.filter(property => _.get(property, 'key.name') === foundDeprecation.component)[0]
                    .key;
                }
              }

              reportDeprecatedComponent(node, {...foundDeprecation, fixNode});
            });
          }
        }
      });
    }

    function usageDeprecationCheck(node) {
      imports.forEach(currentImport => {
        const source = Object.keys(currentImport)[0];
        const componentLocalName = getComponentLocalName(node);
        if (componentLocalName) {
          const deprecationSource = organizedDeprecations[source];
          if (deprecationSource) {
            // There are deprecations from this source
            const foundDeprecations = getPossibleDeprecations(
              componentLocalName,
              imports,
              currentImport,
              deprecationSource
            );

            if (foundDeprecations.length > 0) {
              const foundDeprecation = foundDeprecations[0];
              if (isParent(foundDeprecation, componentLocalName)) {
                return;
              }

              // This is a little hacky, is there a better way?
              if (componentLocalName.includes(foundDeprecation.component)) {
                let fixNode;
                const dotCount = (componentLocalName.match(/\./g) || []).length;
                if (dotCount <= 1) {
                  fixNode =
                    componentLocalName === foundDeprecation.component
                      ? _.get(node, 'name')
                      : _.get(node, 'name.property');
                }

                reportDeprecatedComponent(node, {...foundDeprecation, fixNode});
              }
            }
          }
        }
      });
    }

    return {
      ImportDeclaration: node => importDeprecationCheck(node),
      VariableDeclarator: node => importDeprecationCheck(node),
      JSXOpeningElement: node => usageDeprecationCheck(node)
    };
  }
};

// Testing support for List.Part deprecations (module.List.Part)
// let fixNode = _.get(node, 'name');
// if (componentLocalName !== foundDeprecation.component) {
//   const objectCount = (componentLocalName.replace(`${foundDeprecation.component}`, '').match(/\./g) || []).length;
//   const objects = '.object'.repeat(objectCount);
//   fixNode = _.get(node, `name${objects}.property`);
// }
