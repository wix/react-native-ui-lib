const _ = require('lodash');
const utils = require('../utils');
const {
  organizeDeprecations,
  OrganizationType,
  getLocalizedFix,
  addToImports,
  getComponentLocalName,
  getComponentName
} = utils;

const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true
};

module.exports = {
  meta: {
    docs: {
      description: 'typography is deprecated',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: 'This typography is deprecated.'
    },
    fixable: 'code',
    schema: [MAP_SCHEMA]
  },
  create(context) {
    const defaultImportName = 'Typography';

    function reportDeprecatedTypography(node, options, useShortVersion) {
      try {
        const {dueDate} = context.options[0];
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        const msg = `'${options.path}' is deprecated. ${options.message}${dueDateNotice}`;
        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (options.fix) {
              const fix = useShortVersion ? options.fix.substr(`${defaultImportName}.`.length) : options.fix;
              return fixer.replaceText(node, fix);
            }
          }
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    const {deprecations, source} = context.options[0];
    const organizedDeprecations = organizeDeprecations(deprecations, OrganizationType.SOURCE, source);

    const imports = [];

    function findAndReportDeprecation(node, useDefaultImport, useShortVersion) {
      imports.forEach(currentImport => {
        const source = Object.keys(currentImport)[0];
        const prefix = useDefaultImport ? `${defaultImportName}.` : '';
        const componentLocalName = `${prefix}${getComponentLocalName(node)}`;
        if (componentLocalName) {
          const deprecationSource = organizedDeprecations[source];
          if (deprecationSource) {
            // There are deprecations from this source
            const componentName = getComponentName(componentLocalName, imports) || componentLocalName; // this (|| componentLocalName) is only needed in JSXAttribute but seem to cause no harm in MemberExpression
            const foundDeprecations = deprecationSource.filter(
              currentDeprecationSource => currentDeprecationSource.path === componentName
            );

            if (foundDeprecations.length > 0) {
              const fix = useDefaultImport
                ? foundDeprecations[0].fix
                : getLocalizedFix(foundDeprecations[0].fix, currentImport);
              reportDeprecatedTypography(node, {...foundDeprecations[0], fix}, useShortVersion);
            }
          }
        }
      });
    }

    function testMemberDeprecation(node) {
      findAndReportDeprecation(node, false, false);
    }

    function testJSXAttribute(node) {
      if (node.value) return; // so we only have truthy props (title and not title={'Text'})
      findAndReportDeprecation(node, true, true);
    }

    return {
      ImportDeclaration: node => addToImports(node, imports),
      VariableDeclarator: node => addToImports(node, imports),
      MemberExpression: node => testMemberDeprecation(node),
      JSXAttribute: node => testJSXAttribute(node)
    };
  }
};
