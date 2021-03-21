function findValueNodeOfIdentifier(identifierName, context) {
  const scope = context.getScope();
  const {variables} = scope;
  let valueNode = false;
  variables.forEach(variable => {
    if (variable.name === identifierName) {
      if (variable.defs) {
        valueNode = variable.defs[variable.defs.length - 1].node.init;
      }
    }
  });

  return valueNode;
}

module.exports = {
  findValueNodeOfIdentifier
};
