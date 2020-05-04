const _ = require('lodash');

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
    function reportDeprecatedTypography(node, options) {
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
      const importSource = node.source.value;
      if (source === importSource) {
        const specifiers = node.specifiers;
        if (specifiers) {
          localImportSpecifier = _.find(specifiers, specifier => specifier.imported.name === defaultImportName);
          if (localImportSpecifier) {
            localImportSpecifier = localImportSpecifier.local.name;
          }
        }
      }
    }

    function findAndReportDeprecation(node, possibleDeprecation) {
      const path = `${defaultImportName}.${possibleDeprecation}`;
      const foundDeprecation = _.find(deprecations, {path});
      if (foundDeprecation) {
        reportDeprecatedTypography(node, foundDeprecation);
      }
    }

    function testMemberDeprecation(node) {
      if (node && node.object && node.property && node.object.name === localImportSpecifier) {
        findAndReportDeprecation(node, node.property.name);
      }
    }

    function testJSXAttribute(node) {
      if (node && node.name) {
        findAndReportDeprecation(node, node.name.name);
      }
    }

    return {
      ImportDeclaration: node => setLocalImportSpecifier(node),
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
