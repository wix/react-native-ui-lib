const {handleError, addToImports} = require('../utils');

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

    function checkAndReport(node, type, importedModuleNameToReplace) {
      const imports = [];
      addToImports(node, imports);
      const modules = new Set(collectModulesFromImports(imports));
      const rule = getRules().find((rule) => modules.has(rule.origin));
      if (!rule) {
        return;
      }
      try {
        const {applyAutofix, destination} = rule;
        const message = getErrorMessage(rule, type);
        context.report({
          node,
          message,
          fix(fixer) {
            if (node && applyAutofix && destination) {
              return fixer.replaceText(importedModuleNameToReplace, `'${destination}'`);
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

    function collectModulesFromImports(imports) {
      const collection = [];
      imports.forEach((moduleImports) => {
        collection.push(...Object.keys(moduleImports));
      });
      return collection;
    }

    function getModuleNameFromRequire(node) {
      return (node.init?.object ? node.init.object.arguments : node.init?.arguments)?.[0];
    }

    function getModuleNameFromImport(node) {
      return node.source;
    }

    return {
      ImportDeclaration: (node) => checkAndReport(node, 'import', getModuleNameFromImport(node)),
      VariableDeclarator: (node) => checkAndReport(node, 'require', getModuleNameFromRequire(node)),
    };
  }
};
