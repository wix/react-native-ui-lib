const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true,
};

const FIX_TYPES = {
  PROP_NAME: 'propName',
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
    fixable: 'code',
    schema: [
      MAP_SCHEMA,
    ],
  },
  create(context) {
    
    function reportDeprecatedComponentOrProps(node, options) {
      try {
        const {dueDate} = context.options[0];
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        const msg = options.prop === undefined ?
          `The '${options.name}' component is deprecated. ${options.message}${dueDateNotice}` :
          `The '${options.name}' component's prop '${options.prop}' is deprecated. ${options.message}${dueDateNotice}`;
        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (options.fix) {
              const type = Object.keys(options.fix)[0];
              const fix = Object.values(options.fix)[0];
              switch (type) {
                case FIX_TYPES.PROP_NAME:
                  // Fix for prop name change only (when prop's value and type does not change)
                  return fixer.replaceText(node.name, fix);
                default: break;
              }
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
        if (isComponentImportMatch(deprecatedComponent)) {
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
    }

    let importSpecifiers = {};

    function createImportsObject(node) {
      const source = node.source.value;
      if (Object.keys(deprecationSources).indexOf(source) !== -1) {
        if (!(source in importSpecifiers)) {
          importSpecifiers[source] = [];
        }
        const specifiers = node.specifiers;
        if (specifiers) {
          specifiers.forEach((s) => {
            importSpecifiers[source].push(s.local.name);
          });
        }
      }
    }

    const {deprecations} = context.options[0];
    const deprecationSources = createDeprecationSourcesObject();

    function createDeprecationSourcesObject() {
      const obj = {};
      if (!deprecations) { return obj; }
      deprecations.forEach((element) => {
        if (!(element.source in obj)) {
          obj[element.source] = [element.component];
        } else {
          obj[element.source].push(element.component);
        }
      });
      return obj;
    }

    function isComponentDeprecated(component) {
      var values = [].concat.apply([], Object.values(deprecationSources));
      return (values.indexOf(component) !== -1);
    }
    
    function isComponentImportMatch(component) {
      if (component.source in importSpecifiers) {
        return importSpecifiers[component.source].indexOf(component.component) !== -1;
      }
      return false;
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
      ImportDeclaration: node => createImportsObject(node)
    };
  },
};
