function getPrefix(str) {
  const indexOfDot = str.indexOf('.');
  return indexOfDot === -1 ? str : str.substring(0, indexOfDot);
}

function getSuffix(str) {
  const indexOfDot = str.indexOf('.');
  return indexOfDot === -1 ? undefined : str.substring(indexOfDot + 1);
}

function findValueNodeOfIdentifier(identifierName, scope) {
  const varsInScope = scope.variables;
  let valueNode = false;
  varsInScope.forEach((variable) => {
    if (variable.name === identifierName) {
      if (variable.defs && variable.defs.length > 0) {
        valueNode = variable.defs[variable.defs.length - 1].node.init;
      }
    }
  });
  if (scope.upper === null) {
    return valueNode;
  }
  return valueNode || findValueNodeOfIdentifier(identifierName, scope.upper);
}


module.exports = {
  getPrefix,
  getSuffix,
  findValueNodeOfIdentifier
};
