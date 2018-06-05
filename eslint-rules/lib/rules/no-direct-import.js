module.exports = {
  meta: {
    docs: {
      description: 'Do not import directly from open source project',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      uiLib: "Do not import directly from the open source project. Please use 'wix-react-native-ui-lib' (autofix available).",
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {

    function reportDirectImport(node, options) {
      try {
        const msg = "Do not import directly from the open source project. Please use 'wix-react-native-ui-lib' (autofix available).";
        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (node) {
              const source = options[0];
              return fixer.replaceText(node.source, `'wix-${source}'`);
            }
          },
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    function checkImportDeclaretion(node) {
      const source = node.source.value;
      if (source && source === 'react-native-ui-lib') {
        reportDirectImport(node, [source]);
      }
    }

    return {
      ImportDeclaration: node => checkImportDeclaretion(node)
    };
  }
};