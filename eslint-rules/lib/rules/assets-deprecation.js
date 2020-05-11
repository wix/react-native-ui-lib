const _ = require('lodash');

const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true,
};

module.exports = {
  meta: {
    docs: {
      description: 'asset is deprecated',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      uiLib: 'This asset is deprecated.',
    },
    fixable: 'code',
    schema: [MAP_SCHEMA],
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
          },
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    const defaultImportName = 'Assets';
    const {deprecations, source} = context.options[0];
    let localImportSpecifier;

    function setLocalImportSpecifier(node) {
      const importSource = node.source.value;
      if (source === importSource) {
        const specifiers = node.specifiers;
        if (specifiers) {
          localImportSpecifier = _.find(specifiers, specifier => specifier.imported && specifier.imported.name === defaultImportName);
          if (localImportSpecifier) {
            localImportSpecifier = localImportSpecifier.local.name;
          }
        }

        if (!localImportSpecifier) { // someone is importing everything (*)
          localImportSpecifier = defaultImportName;
        }
      }
    }

    function getAssetString(node, pathString = '') {
      if (node) {
        if (node.object) {
          if (node.property && node.property.name) {
            pathString = (pathString === '') ? `${node.property.name}` : `${node.property.name}.${pathString}`;
            return getAssetString(node.object, pathString);
          }
        } else if (node.name === localImportSpecifier) {
          pathString = `${node.name}.${pathString}`;
          return pathString;
        }
      }

      return undefined;
    }

    function findAndReportDeprecation(node, possibleDeprecation) {
      possibleDeprecation = possibleDeprecation.replace(localImportSpecifier, defaultImportName);
      const deprecatedObject = _.find(deprecations, {path: possibleDeprecation});
      if (deprecatedObject) {
        reportDeprecatedAssets(node, deprecatedObject);
      }
    }

    function testMemberDeprecation(node) {
      const assetString = getAssetString(node);
      if (assetString) {
        findAndReportDeprecation(node, assetString);
      }
    }

    return {
      ImportDeclaration: node => setLocalImportSpecifier(node),
      MemberExpression: node => localImportSpecifier && testMemberDeprecation(node),


      // VariableDeclarator: node => testVariableDeclarator(node),
      // JSXAttribute: node => testJSXAttribute(node),
      // JSXOpeningElement: node => testJSXOpeningElement(node),
      // JSXSpreadAttribute: node => testJSXSpreadAttribute(node),
      // ObjectExpression: node => testObjectExpression(node),
      // Property: node => testProperty(node),
    };
  },
};
