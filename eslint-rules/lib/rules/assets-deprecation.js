const _ = require('lodash');
const utils = require('../utils');

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

    function setLocalImportSpecifierFromImport(node) {
      localImportSpecifier = utils.getLocalImportSpecifier(node, source, defaultImportName);
    }

    function setLocalImportSpecifierFromRequire(node) {    
      if (node.init && node.init.callee && node.init.callee.name === 'require') {
        if (node.id && node.id.properties) {
          _.map(node.id.properties, property => {
            if (property.key && property.key.name === defaultImportName) {
              if (property.value && property.value.name) {
                localImportSpecifier = property.value.name;
              } else {
                localImportSpecifier = property.key.name;
              }
            }
          });
        } 
      }
    }

    function getAssetString(node, pathString = '') {
      if (node) {
        if (node.object) {
          if (node.property) {
            let name;
            if (node.property.type === 'Identifier' && node.property.name) {
              name = node.property.name;
            } else if (node.property.type === 'Literal' && node.property.value) {
              name = node.property.value;
            } else if (node.property.type === 'CallExpression' && node.property.callee && node.property.callee.name) {
              // TODO: ¯\_(ツ)_/¯
            }

            if (name) {
              pathString = (pathString === '') ? `${name}` : `${name}.${pathString}`;
              return getAssetString(node.object, pathString);
            }
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
      ImportDeclaration: node => !localImportSpecifier && setLocalImportSpecifierFromImport(node),
      VariableDeclarator: node => !localImportSpecifier && setLocalImportSpecifierFromRequire(node),
      MemberExpression: node => localImportSpecifier && testMemberDeprecation(node),

      // ExpressionStatement: node => testExpressionStatement(node),
      // AssignmentExpression: node => testAssignmentExpression(node),
      // JSXAttribute: node => testJSXAttribute(node),
      // JSXOpeningElement: node => testJSXOpeningElement(node),
      // JSXSpreadAttribute: node => testJSXSpreadAttribute(node),
      // ObjectExpression: node => testObjectExpression(node),
      // Property: node => testProperty(node),
    };
  },
};
