function findAndReportHardCodedValues(value, reporter, scope) {
    if (isLiteral(value.type)) {
      reporter(value)
    } else if (value.type === "ConditionalExpression") { 
      findAndReportHardCodedValues(value.consequent, reporter, scope)
      findAndReportHardCodedValues(value.alternate, reporter, scope)
    } else if (value.type === "Identifier") {
      findAndReportHardCodedValues(findValueNodeOfIdentifier(value.name, scope), reporter, scope)
    }
  }

function isLiteral(type) {
  return (type === 'Literal' || type === 'TemplateLiteral')
}

function findValueNodeOfIdentifier(identifierName, scope) {
  const varsInScope = scope.variables
  let valueNode = false;
  varsInScope.forEach(variable => {
    if (variable.name === identifierName) {
      valueNode = variable.defs[variable.defs.length - 1].node.init
    }
  })
  return valueNode
}

const colorProps = [
  'color', 'backgroundColor', 'borderColor', 'borderRightColor',
  'borderBottomColor', 'borderEndColor', 'borderLeftColor', 'borderStartColor',
  'borderTopColor', 'textShadowColor', 'textDecorationColor', 'tintColor',
  'placeholderTextColor', 'selectionColor', 'underlineColorAndroid', 
]

module.exports = {
    colorProps,
    findAndReportHardCodedValues,
    isLiteral,
    findValueNodeOfIdentifier,
}