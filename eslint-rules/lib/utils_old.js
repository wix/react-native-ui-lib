const _ = require('lodash');

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

function getLocalImportSpecifier(node, source, defaultImportName) {
  let localImportSpecifier;
  const importSource = node.source.value;
  if (source === importSource) {
    const specifiers = node.specifiers;
    if (specifiers) {
      localImportSpecifier = _.find(specifiers, specifier => specifier.imported && specifier.imported.name === defaultImportName);
      if (localImportSpecifier) {
        localImportSpecifier = localImportSpecifier.local.name;
      }
    }

    if (!localImportSpecifier) { // someone is importing everything (*)
      localImportSpecifier = defaultImportName;
    }
  }

  return localImportSpecifier;
}

function getSpecifierIndex(node, name) {
  let matchIndex;
  if (node && node.specifiers) {
    _.forEach(node.specifiers, (s, index) => {
      const x = _.get(s, 'imported.name');
      if (x === name) {
        matchIndex = index;
      }
    });
  }
  return matchIndex;
}

function getComponentName(node) {
  const nodeProperty = _.get(node, 'name.property.name');
  const nodeName = nodeProperty ? _.get(node, 'name.object.name') : _.get(node, 'name.name');
  return nodeProperty ? (nodeName + '.' + nodeProperty) : nodeName;
}

module.exports = {
  isPropFont,
  findAndReportHardCodedValues,
  propIsColor,
  isColorException,
  isLiteral,
  findValueNodeOfIdentifier,
  getLocalImportSpecifier,
  getSpecifierIndex,
  getComponentName
};
