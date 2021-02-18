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
    }
  },
  additionalProperties: false
};

module.exports = {
  meta: {
    docs: {
      description: 'Do not import directly from open source project',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      uiLib: 'Do not import directly from this source. Please use another import source (autofix may be available).',
    },
    fixable: 'code',
    schema: [
      MAP_SCHEMA,
    ],
  },
  create(context) {
    function reportDirectImport(node) {
      try {
        const origin = context.options[0].origin;
        const destination = context.options[0].destination;
        const applyAutofix = context.options[0].applyAutofix;
        const autofixMessage = applyAutofix ? ' (autofix available)' : '';
        const message = `Do not import directly from '${origin}'. Please use '${destination}'${autofixMessage}.`;
        context.report({
          node,
          message,
          fix(fixer) {
            if (node && applyAutofix && destination) {
              return fixer.replaceText(node.source, `'${destination}'`);
            }
          },
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    function checkImportDeclaration(node) {
      const origin = context.options[0].origin;
      const source = node.source.value;
      if (source && origin && source === origin) {
        reportDirectImport(node);
      }
    }

    return {
      ImportDeclaration: checkImportDeclaration
    };
  },
};
