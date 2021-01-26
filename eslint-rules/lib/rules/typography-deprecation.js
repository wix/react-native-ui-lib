const _ = require('lodash');
const utils = require('../utils');

const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true,
};

module.exports = {
  meta: {
    docs: {
      description: 'typography is deprecated',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      uiLib: 'This typography is deprecated.',
    },
    fixable: 'code',
    schema: [MAP_SCHEMA],
  },
  create(context) {
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
          },
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    const defaultImportName = 'Typography';
    const {deprecations, source} = context.options[0];
    let localImportSpecifier;

    function setLocalImportSpecifier(node) {
      localImportSpecifier = utils.getLocalImportSpecifier(node, source, defaultImportName);
    }

    function isComponentRelevant(node, components) {
      let isComponentRelevant = true;
      if (!_.isEmpty(components)) {
        if (_.get(node, 'parent.type') === 'JSXOpeningElement') {
          return components.includes(_.get(node, 'parent.name.name'));
        }
      }

      return isComponentRelevant;
    }

    function findAndReportDeprecation(node, possibleDeprecation, useShortVersion) {
      const path = `${defaultImportName}.${possibleDeprecation}`;
      const foundDeprecation = _.find(deprecations, {path});
      if (foundDeprecation && isComponentRelevant(node, foundDeprecation.components)) {
        reportDeprecatedTypography(node, foundDeprecation, useShortVersion);
      }
    }

    function testMemberDeprecation(node) {
      if (node && node.object && node.property && node.object.name === localImportSpecifier) {
        findAndReportDeprecation(node, node.property.name, false);
      }
    }

    function testJSXAttribute(node) {
      if (node && node.name) {
        findAndReportDeprecation(node, node.name.name, true);
      }
    }

    return {
      ImportDeclaration: node => !localImportSpecifier && setLocalImportSpecifier(node),
      MemberExpression: node => localImportSpecifier && testMemberDeprecation(node),
      JSXAttribute: node => testJSXAttribute(node),


      // JSXOpeningElement: node => testJSXOpeningElement(node),
      // ObjectExpression: node => testObjectExpression(node),
      // VariableDeclarator: node => testVariableDeclarator(node),
      // Property: node => testProperty(node),
      // JSXSpreadAttribute: node => testJSXSpreadAttribute(node)
    };
  },
};
