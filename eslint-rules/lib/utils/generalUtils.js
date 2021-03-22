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
  if (scope.upper === null) {
    return valueNode;
  }
  return valueNode || findValueNodeOfIdentifier(identifierName, scope.upper);
}


module.exports = {
  findValueNodeOfIdentifier
};
