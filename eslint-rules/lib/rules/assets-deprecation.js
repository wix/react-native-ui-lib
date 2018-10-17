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
              // const fix = Object.values(options.fix);
              // fixer.replaceText(node, `${fix}`);
              // fixer.replaceTextRange(node.range, fix);
              // fixer.remove(node.object);
            }
          },
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    // Path
    let pathString = '';

    function deprecationCheck(node) {
      if (node) {
        const check = isAssetsObject(node);
        if (check && pathString !== '') {
          const deprecatedObject = getDeprecatedObject(pathString);
          if (deprecatedObject) {
            const path = deprecatedObject.path;
            const message = deprecatedObject.message;
            const fix = deprecatedObject.fix;
            reportDeprecatedAssets(node, {path, message, fix});
          }
        }
      }
    }

    function isAssetsObject(node) {
      if (node) {
        if (node.object) {
          if (node.property && node.property.name) {
            pathString = (pathString === '') ? `${node.property.name}` : `${node.property.name}.${pathString}`;
            return isAssetsObject(node.object);
          }
        } else if (node.name && node.name === assetsName) {
          pathString = `${node.name}.${pathString}`;
          return true;
        }
      }
      pathString = '';
      return false;
    }

    const {deprecations} = context.options[0];

    function getDeprecatedObject(path) {
      let jsonElement;
      deprecations.forEach((element) => {
        if (element.path === path) {
          jsonElement = element;
        }
      });
      return jsonElement;
    }

    function checkSpreadAttribute(node) {
      const spreadSource = utils.findValueNodeOfIdentifier(node.argument.name, context.getScope());
      _.forEach(spreadSource.properties, (property) => {
        deprecationCheck(property);
      });
    }

    // Import    
    const {source} = context.options[0];
    const assetsName = 'Assets';
    let shouldCheckDeprecation = false;

    function checkAssetsImport(node) {
      const importSource = node.source.value;
      
      if (source === importSource) {
        const specifiers = node.specifiers;
        if (specifiers) {
          specifiers.forEach((s) => {
            if (s.local.name === assetsName) {
              shouldCheckDeprecation = true;
            }
          });
        }
      }
    }

    return {
      ImportDeclaration: node => checkAssetsImport(node),
      // MemberExpression: node => shouldCheckDeprecation && deprecationCheck(node),
      VariableDeclarator: node => shouldCheckDeprecation && deprecationCheck(node.init),
      Property: node => shouldCheckDeprecation && deprecationCheck(node.value),
      JSXAttribute: node => shouldCheckDeprecation && node.value && deprecationCheck(node.value.expression),
      JSXSpreadAttribute: node => shouldCheckDeprecation && checkSpreadAttribute(node),
    };
  },
};
