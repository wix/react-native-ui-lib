// no-hard-coded-color
const colorProps = [
  'color', 'backgroundColor', 'borderColor', 'borderRightColor',
  'borderBottomColor', 'borderEndColor', 'borderLeftColor', 'borderStartColor',
  'borderTopColor', 'textShadowColor', 'textDecorationColor', 'tintColor',
  'placeholderTextColor', 'selectionColor', 'underlineColorAndroid',
];

const colorExceptions = [
  'transparent',
];

function findAndReportHardCodedValues(value, reporter, scope, depthOfSearch = 4) {
  if (depthOfSearch === 0) return;
  if (value === undefined || value === false) return;
  if (isLiteral(value.type)) {
    reporter(value);
  } else if (value.type === 'ConditionalExpression') {
    findAndReportHardCodedValues(value.consequent, reporter, scope, depthOfSearch - 1);
    findAndReportHardCodedValues(value.alternate, reporter, scope, depthOfSearch - 1);
  } else if (value.type === 'Identifier') {
    findAndReportHardCodedValues(findValueNodeOfIdentifier(value.name, scope), reporter, scope, depthOfSearch - 1);
  }
}

function propIsColor(propName) {
  return colorProps.indexOf(propName) !== -1;
}

function isColorException(colorString) {
  const lowerCaseColorString = colorString.toLowerCase();
  return colorExceptions.indexOf(lowerCaseColorString) !== -1;
}

// no-hard-coded-font-styles
const fontProps = ['fontSize', 'fontWeight', 'lineHeight', 'fontFamily'];

function isPropFont(propName) {
  return (fontProps.indexOf(propName) !== -1);
}

// GENERAL
function isLiteral(type) {
  return (type === 'Literal' || type === 'TemplateLiteral');
}

function findValueNodeOfIdentifier(identifierName, scope) {
  const varsInScope = scope.variables;
  let valueNode = false;
  varsInScope.forEach((variable) => {
    if (variable.name === identifierName) {
      if (variable.defs) {
        valueNode = variable.defs[variable.defs.length - 1].node.init;
      }
    }
  });
  return valueNode;
}

module.exports = {
  isPropFont,
  findAndReportHardCodedValues,
  propIsColor,
  isColorException,
  isLiteral,
  findValueNodeOfIdentifier,
};
