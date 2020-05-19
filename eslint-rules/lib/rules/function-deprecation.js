const _ = require("lodash");
const utils = require("../utils");

const MAP_SCHEMA = {
  type: "object",
  additionalProperties: true,
};

const FIX_TYPES = {
  PROP_NAME: "propName",
  FUNCTION_NAME: "functionName",
};

module.exports = {
  meta: {
    docs: {
      description: "function or some of the props sent to it are deprecated",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      uiLib: "This function is deprecated or contains deprecated props.",
    },
    fixable: "code",
    schema: [MAP_SCHEMA],
  },
  create(context) {
    function reportDeprecatedFunction(node, options) {
      try {
        const { dueDate } = context.options[0];
        const dueDateNotice = dueDate
          ? ` Please fix this issue by ${dueDate}!`
          : "";
        const msg =
          options.prop === undefined
            ? `The '${options.name}' function is deprecated. ${options.message}${dueDateNotice}`
            : `The '${options.name}' function's prop '${options.prop}' is deprecated. ${options.message}${dueDateNotice}`;

        context.report({
          node,
          message: `${msg}`,
          fix(fixer) {
            if (options.fix) {
              const type = Object.keys(options.fix)[0];
              const fix = Object.values(options.fix)[0];
              let fixed;
              // console.warn('fix');
              switch (type) {
                case FIX_TYPES.PROP_NAME:
                  // Fix for prop name change only (when prop's value and type does not change)
                  // console.warn('fix prop');
                  // console.warn('from', node.arguments[options.argumentIndex]);
                  const prop = _.find(node.arguments[options.argumentIndex].properties, prop => prop.key.name === options.prop);
                  const propIndex = node.arguments[options.argumentIndex].properties.indexOf(prop);
                  fixed = fixer.replaceText(node.arguments[options.argumentIndex].properties[propIndex], fix)
                  // console.warn('to', fixed);
                  return fixed;
                case FIX_TYPES.FUNCTION_NAME:
                  if (node.type === "ImportDeclaration") {
                    // console.warn('fix function import');
                    const index = utils.getSpecifierIndex(node, options.name);
                    // console.warn('from', node.specifiers[index]);
                    fixed = fixer.replaceText(node.specifiers[index], fix);
                    // console.warn('to', fixed);
                    return fixed;
                  }

                  // console.warn('fix function not import');
                  // console.warn('from', node.callee.name);
                  fixed = fixer.replaceText(node.callee, fix)
                  // console.warn('to', fixed);
                  return fixed;
                default:
                  break;
              }
            }
          },
        });
      } catch (err) {
        console.log("Found error in: ", err, context.getFilename());
      }
    }

    const { deprecations, source } = context.options[0];
    const relevantDeprecationsData = [];
    let everythingIsImported = false;

    function getDeprecation(value) {
      if (value && value.name) {
        const name = value.name;
        return _.find(
          deprecations,
          (deprecation) => deprecation.function === name
        );
      }
    }

    function searchForPossibleDeprecation(node) {
      const importSource = node.source.value;
      if (source === importSource) {
        const specifiers = node.specifiers;
        if (specifiers) {
          _.map(specifiers, (specifier) => {
            const deprecation = getDeprecation(specifier.imported);
            if (deprecation) {
              let type = FIX_TYPES.PROP_NAME;
              if (!deprecation.arguments) {
                type = FIX_TYPES.FUNCTION_NAME;
                reportDeprecatedFunction(node, {
                  name: deprecation.function,
                  message: deprecation.message,
                  fix: deprecation.fix,
                });
              }

              relevantDeprecationsData.push({
                localFunctionName: specifier.local.name,
                type,
                deprecation,
              });
            }
          });
        }
        
        if (relevantDeprecationsData.length === 0) { // someone is importing everything (*)
          everythingIsImported = true;
          _.map(deprecations, deprecation => {
            relevantDeprecationsData.push({
              localFunctionName: deprecation.function,
              type: deprecation.arguments ? FIX_TYPES.PROP_NAME : FIX_TYPES.FUNCTION_NAME,
              deprecation,
            });
          });
        }
      }
    }

    function findRelevantDeprecation(functionName) {
      return _.find(
        relevantDeprecationsData,
        (relevantDeprecationData) =>
        relevantDeprecationData.localFunctionName === functionName
      );
    }

    function getArgumentsSent(node) {
      const argumentsSent = [];
      _.map(node.arguments, argument => {
        const propsSentToArgument = [];
        if (argument.properties) {
          _.map(argument.properties, prop => {
            if (prop.key && prop.key.name) {
              propsSentToArgument.push(prop.key.name);
            }
          });
        }
        
        argumentsSent.push(propsSentToArgument);
      });

      return argumentsSent;
    }

    function getFunctionName(node) {
      const propName = everythingIsImported ? 'callee.property.name' : 'callee.name';
      return _.get(node, propName);
    }

    function testCallExpression(node) {
      const functionName = getFunctionName(node);
      if (functionName) {
        const relevantDeprecation = findRelevantDeprecation(functionName);
        if (relevantDeprecation) {
          if (relevantDeprecation.type === FIX_TYPES.PROP_NAME) {
            const argumentsSent = getArgumentsSent(node);
            _.map(relevantDeprecation.deprecation.arguments, (argument, index) => {
              if (argument.props && argument.props.length > 0 && argumentsSent.length >= index) {
                const deprecationProps = argument.props;
                const sentProps = argumentsSent[index];
                _.map(sentProps, sentProp => {
                  const deprecationProp = _.find(deprecationProps, deprecationProp => deprecationProp.prop === sentProp);
                  if (deprecationProp) {
                    reportDeprecatedFunction(node, {
                      name: functionName,
                      message: deprecationProp.message,
                      argumentIndex: index,
                      prop: deprecationProp.prop,
                      fix: deprecationProp.fix,
                    });
                  }
                });
              }
            });
          } else {
            reportDeprecatedFunction(node, {
              name: relevantDeprecation.deprecation.function,
              message: relevantDeprecation.deprecation.message,
              fix: relevantDeprecation.deprecation.fix,
            });
          }
        }
      }
    }

    return {
      ImportDeclaration: (node) => searchForPossibleDeprecation(node),
      CallExpression: (node) => relevantDeprecationsData.length > 0 && testCallExpression(node),

      // MemberExpression: node => localImportSpecifier && testMemberDeprecation(node),
      // JSXAttribute: node => testJSXAttribute(node),
      // JSXOpeningElement: node => testJSXOpeningElement(node),
      // ObjectExpression: node => testObjectExpression(node),
      // VariableDeclarator: node => testVariableDeclarator(node),
      // Property: node => testProperty(node),
      // JSXSpreadAttribute: node => testJSXSpreadAttribute(node)
    };
  },
};
