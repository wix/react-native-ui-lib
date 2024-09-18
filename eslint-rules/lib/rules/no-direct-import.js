const {handleError} = require('../utils');

const RULE_ID = 'no-direct-import';
const MAP_SCHEMA = {
  type: 'object',
  properties: {
    origin: {
      type: 'string'
    },
    destination: {
      type: 'string'
    },
    applyAutofix: {
      type: 'boolean'
    },
    rules: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            origin: {
              type: 'string'
            },
            destination: {
              type: 'string'
            },
            applyAutofix: {
              type: 'boolean'
            }
          }
        }
      ]
    }
  },
  additionalProperties: true
};

module.exports = {
  meta: {
    docs: {
      description: 'Do not import directly from open source project',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: 'Do not import directly from this source. Please use another import source (autofix may be available).'
    },
    fixable: 'code',
    schema: [MAP_SCHEMA]
  },
  create(context) {
    function getErrorMessage(rule, type) {
      const {origin, destination, applyAutofix, customMessage} = rule;
      const autofixMessage = applyAutofix ? ' (autofix available)' : '';
      return customMessage || `Do not ${type} directly from '${origin}'. Please use '${destination}'${autofixMessage}.`;
    }

    function getRules() {
      // To support both structures; single rule or array of rules
      return context.options[0].rules || [context.options[0]];
    }

    function checkImportDeclaration(node) {
      const source = node.source.value;
      const rule = getRules().find((rule) => rule.origin === source);

      if (rule) {
        report(node, rule, 'import', node.source);
      }
    }
    function isRequireFunction(node) {
      return node.callee.type === 'Identifier' &&
                    node.callee.name === 'require' &&
                    node.arguments.length > 0 &&
                    node.arguments[0].type === 'Literal'
    }

    function report(node, rule, type, textToReplace) {
      try {
        const {applyAutofix, destination} = rule;
        const message = getErrorMessage(rule, type);
        context.report({
          node,
          message,
          fix(fixer) {
            if (node && applyAutofix && destination) {
              return fixer.replaceText(textToReplace, `'${destination}'`);
            }
          }
        });
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    function checkRequire(node) {
      if (!isRequireFunction(node)) {
        return;
      }
      const source = node.arguments[0].value;
      const rule = getRules().find((rule) => rule.origin === source);
      if (rule) {
        report(node, rule, 'require', node.arguments[0]);
      }
    }

    return {
      ImportDeclaration: checkImportDeclaration,
      CallExpression: checkRequire
    };
  }
};
