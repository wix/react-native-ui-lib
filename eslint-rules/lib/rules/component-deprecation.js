const _ = require('lodash');
const utils = require('../utils');
const {addToImports, organizeDeprecations, OrganizationType, getComponentLocalName, getComponentName} = utils;

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
        console.log('Found error in: ', context.getFilename());
      }
    }

    const {deprecations} = context.options[0];
    const organizedDeprecations = organizeDeprecations(deprecations, OrganizationType.SOURCE);

    const imports = [];

    function importDeprecationCheck(node) {
      const previousImports = _.cloneDeep(imports);
      addToImports(node, imports);
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
              let fixNode;
              if (node.type === 'ImportDeclaration') {
                fixNode = node.specifiers.filter(
                  specifier => _.get(specifier, 'imported.name') === foundDeprecation.component
                )[0].imported;
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
            const componentName = getComponentName(componentLocalName, imports);
            const foundDeprecations = deprecationSource.filter(
              currentDeprecationSource => currentDeprecationSource.component === componentName
            );

            if (foundDeprecations.length > 0) {
              const foundDeprecation = foundDeprecations[0];

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
