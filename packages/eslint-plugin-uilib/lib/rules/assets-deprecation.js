const _ = require('lodash');
const {
  organizeDeprecations,
  getLocalizedFix,
  addToImports,
  getComponentLocalName,
  getComponentName,
  handleError
} = require('../utils');

const RULE_ID = 'assets-deprecation';

const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true
};

module.exports = {
  meta: {
    docs: {
      description: 'asset is deprecated',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: 'This asset is deprecated.'
    },
    fixable: 'code',
    schema: [MAP_SCHEMA]
  },
  create(context) {
    function reportDeprecatedAssets(node, options) {
      try {
        const {dueDate} = context.options[0];
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        const msg = `'${options.path}' is deprecated. ${options.message}${dueDateNotice}`;
        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (options.fix) {
              return fixer.replaceText(node, options.fix);
            }
          }
        });
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    const {deprecations, source} = context.options[0];
    const organizedDeprecations = organizeDeprecations(deprecations, source);
    const imports = [];

    function deprecationCheck(node) {
      imports.forEach(currentImport => {
        const source = Object.keys(currentImport)[0];
        const componentLocalName = getComponentLocalName(node);
        if (componentLocalName) {
          const deprecationSource = organizedDeprecations[source];
          if (deprecationSource) {
            // There are deprecations from this source
            const componentName = getComponentName(componentLocalName, imports);
            const foundDeprecations = deprecationSource.filter(
              currentDeprecationSource => currentDeprecationSource.path === componentName
            );

            if (foundDeprecations.length > 0) {
              const localizedFix = getLocalizedFix(foundDeprecations[0].fix, currentImport);
              reportDeprecatedAssets(node, {...foundDeprecations[0], fix: localizedFix});
            }
          }
        }
      });
    }

    return {
      ImportDeclaration: node => addToImports(node, imports),
      VariableDeclarator: node => addToImports(node, imports),
      MemberExpression: node => deprecationCheck(node)
    };
  }
};
