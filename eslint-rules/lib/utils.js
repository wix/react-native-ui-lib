const colorProps = [
  'color', 'backgroundColor', 'borderColor', 'borderRightColor',
  'borderBottomColor', 'borderEndColor', 'borderLeftColor', 'borderStartColor',
  'borderTopColor', 'textShadowColor', 'textDecorationColor', 'tintColor',
  'placeholderTextColor', 'selectionColor', 'underlineColorAndroid',
];

const colorExceptions = [
  'transparent', 'rgba(0,0,0,0)',
];

const extraColorsDict = {
  black: 'black',
  white: 'white',
  green: 'green30',
  red: 'red30',
  blue: 'blue30',
  '#000': 'black',
  '#fff': 'white',
  '#ddd': 'dark70',
};

function findAndReportHardCodedValues(value, reporter, scope, depthOfSearch = 4) {
  if (depthOfSearch === 0) return;
  if (value === undefined || value === false) return;
  if (isLiteral(value.type)) {
    reporter(value);
  } else if (value.type === 'ConditionalExpression') {
    findAndReportHardCodedValues(value.consequent, reporter, scope, depthOfSearch - 1)
    findAndReportHardCodedValues(value.alternate, reporter, scope, depthOfSearch - 1)
  } else if (value.type === 'Identifier') {
    findAndReportHardCodedValues(findValueNodeOfIdentifier(value.name, scope), reporter, scope, depthOfSearch - 1)
  }
}

function propIsColor(propName) {
  return colorProps.indexOf(propName) !== -1;
}

function isLiteral(type) {
  return (type === 'Literal' || type === 'TemplateLiteral');
}

function isColorException(colorString) {
  const lowerCaseColorString = colorString.toLowerCase();
  return colorExceptions.indexOf(lowerCaseColorString) !== -1;
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
  findAndReportHardCodedValues,
  propIsColor,
  isLiteral,
  isColorException,
  findValueNodeOfIdentifier,
  extraColorsDict,
};
