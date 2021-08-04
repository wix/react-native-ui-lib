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
    function reportDirectImport(node, rule) {
      try {
        const origin = rule.origin;
        const destination = rule.destination;
        const applyAutofix = rule.applyAutofix;
        const autofixMessage = applyAutofix ? ' (autofix available)' : '';
        const message = `Do not import directly from '${origin}'. Please use '${destination}'${autofixMessage}.`;
        context.report({
          node,
          message,
          fix(fixer) {
            if (node && applyAutofix && destination) {
              return fixer.replaceText(node.source, `'${destination}'`);
            }
          }
        });
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    function getRules() {
      // To support both structures; single rule or array of rules
      return context.options[0].rules || [context.options[0]];
    }

    function checkImportDeclaration(node) {
      const source = node.source.value;
      const rule = getRules().find((rule) => rule.origin === source);
      
      if (rule) {
        reportDirectImport(node, rule);
      }
    }

    return {
      ImportDeclaration: checkImportDeclaration
    };
  }
};
