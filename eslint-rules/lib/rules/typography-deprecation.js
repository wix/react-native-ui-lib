const _ = require('lodash');
const {
  organizeDeprecations,
  getLocalizedFix,
  addToImports,
  getComponentLocalName,
  getComponentName,
  handleError
} = require('../utils');

const RULE_ID = 'typography-deprecation';
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
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    const {deprecations, source} = context.options[0];
    const organizedDeprecations = organizeDeprecations(deprecations, source);

    const imports = [];

    function isComponentRelevant(node, components) {
      let isComponentRelevant = true;
      if (!_.isEmpty(components)) {
        if (_.get(node, 'parent.type') === 'JSXOpeningElement') {
          return components.includes(_.get(node, 'parent.name.name'));
        }
      }

      return isComponentRelevant;
    }

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
              const foundDeprecation = foundDeprecations[0];
              if (isComponentRelevant(node, foundDeprecation.components)) {
                const fix = useDefaultImport
                  ? foundDeprecation.fix
                  : getLocalizedFix(foundDeprecation.fix, currentImport);
                reportDeprecatedTypography(node, {...foundDeprecation, fix}, useShortVersion);
              }
            }
          }
        }
      });
    }

    function testMemberDeprecation(node) {
      findAndReportDeprecation(node, false, false);
    }

    function testJSXAttribute(node) {
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
