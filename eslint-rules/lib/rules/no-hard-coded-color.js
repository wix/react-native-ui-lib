const _ = require('lodash');
const {findAndReportHardCodedValues, handleError} = require('../utils');

const RULE_ID = 'no-hard-coded-color';
const MAP_SCHEMA = {
  type: 'object',
  additionalProperties: true
};

module.exports = {
  meta: {
    docs: {
      description: 'disallow hard coded colors',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      uiLib: 'Use UILib colors instead of hardcoded colors.'
    },
    fixable: 'whitespace',
    schema: [MAP_SCHEMA]
  },
  create(context) {
    function reportAndFixHardCodedColorString(node) {
      try {
        const colorString = _.get(node, 'extra.rawValue') || _.get(node, 'value');
        const dueDate = _.get(context, 'options[0].dueDate');
        const dueDateNotice = dueDate ? ` Please fix this issue by ${dueDate}!` : '';
        if (!isColorException(colorString)) {
          context.report({
            node,
            message: `Found '${colorString}'. Use UILib colors instead of hardcoded colors.${dueDateNotice}`,
            fix(fixer) {
              if (node) {
                const {validColors} = context.options[0];
                const {customColors: extraColors} = context.options[0];
                if (validColors) {
                  const validColorsDic = _.chain(validColors)
                    .mapValues(value => value.toLowerCase())
                    .invert()
                    .value();
                  const invertedColorsDict = _.assign({}, validColorsDic, extraColors);
                  const lowerCaseColorString = colorString.toLowerCase().replace(/ /g, '');
                  if (invertedColorsDict[lowerCaseColorString]) {
                    return fixer.replaceText(node, `Colors.${invertedColorsDict[lowerCaseColorString]}`);
                  }
                }
              }
            }
          });
        }
      } catch (err) {
        handleError(RULE_ID, err, context.getFilename());
      }
    }

    const colorProps = [
      'color',
      'backgroundColor',
      'borderColor',
      'borderRightColor',
      'borderBottomColor',
      'borderEndColor',
      'borderLeftColor',
      'borderStartColor',
      'borderTopColor',
      'textShadowColor',
      'textDecorationColor',
      'tintColor',
      'placeholderTextColor',
      'selectionColor',
      'underlineColorAndroid'
    ];

    function propIsColor(propName) {
      return colorProps.indexOf(propName) !== -1;
    }

    const colorExceptions = ['transparent'];

    function isColorException(colorString) {
      const lowerCaseColorString = colorString.toLowerCase();
      return colorExceptions.indexOf(lowerCaseColorString) !== -1;
    }

    function noHardCodedColors(node) {
      node.properties.forEach(property => {
        if (property.key) {
          const propName = property.key.name;
          if (propIsColor(propName)) {
            findAndReportHardCodedValues(property.value, reportAndFixHardCodedColorString, context);
          }
        }
      });
    }

    return {
      'CallExpression[callee.object.name=StyleSheet][callee.property.name=create] ObjectExpression': node =>
        noHardCodedColors(node),
      'JSXAttribute[name.name = style] ObjectExpression': node => noHardCodedColors(node)
    };
  }
};
