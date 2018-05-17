const MAP_SCHEMA = {
  type: 'array',
  additionalProperties: true,
};

module.exports = {
  meta: {
    docs: {
      description: 'component or some of the component\'s props are deprecated',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      uiLib: 'This component is deprecated or containes deprecated props.',
    },
    fixable: 'whitespace',
    schema: [
      MAP_SCHEMA,
    ],
  },
  create(context) {
    function reportDeprecatedComponentOrProps(node, options) {
      try {
        const msg = options.prop === undefined ?
          `The '${options.name}' component is deprecated. ${options.message}` :
          `The '${options.name}' component's prop '${options.prop}' is deprecated. ${options.message}`;
        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (options.fix) { // todo!
              // console.log('node.name.name - ', node.name.name);
              return fixer.replaceText(node.name.name, options.fix);
            }
          },
        });
      } catch (err) {
        console.log('Found error in: ', context.getFilename());
      }
    }

    function deprecationCheck(node) {
      const component = node.name.name;
      if (component && isComponentDeprecated(component)) {
        const deprecatedComponent = getDeprecatedObject(component);
        const name = deprecatedComponent.component;
        let message = deprecatedComponent.message;
        let fix = deprecatedComponent.fix;
        const props = deprecatedComponent.props;

        if (!props) {
          reportDeprecatedComponentOrProps(node, {name, message, fix});
        } else {
          const nodeAttributes = node.attributes;
          nodeAttributes.forEach((att) => {
            if (att.type === 'JSXAttribute') {
              props.forEach((p) => {
                if (att.name.name === p.prop) {
                  const prop = p.prop;
                  message = p.message;
                  fix = p.fix;
                  reportDeprecatedComponentOrProps(att, {name, prop, message, fix});
                }
              });
            }
          });
        }
      }
    }

    const deprecations = context.options[0];
    const deprecatedComponentsList = getDeprecatedComponentsList();

    function getDeprecatedComponentsList() {
      const arr = [];
      if (!deprecations) { return arr; }
      deprecations.forEach((element) => {
        arr.push(element.component);
      });
      return arr;
    }

    function isComponentDeprecated(component) {
      return (deprecatedComponentsList.indexOf(component) !== -1);
    }

    function getDeprecatedObject(component) {
      let jsonElement;
      deprecations.forEach((element) => {
        if (element.component === component) {
          jsonElement = element;
        }
      });
      return jsonElement;
    }

    return {
      JSXOpeningElement: node => deprecationCheck(node),
    };
  },
};
