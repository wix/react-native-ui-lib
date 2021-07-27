const _ = require('lodash');

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
  if (_.isNil(valueNode) || valueNode.value !== undefined) {
    if (scope.block.body.length > 0) {
      scope.block.body.forEach(scopeNode => {
        if (scopeNode.type === 'ExpressionStatement') {
          const variableName = _.get(scopeNode, 'expression.left.name');
          if (variableName === identifierName) {
            valueNode = scopeNode.expression.right;
          }
        }
      });
    }
  }
  if (scope.upper === null) {
    return valueNode;
  }
  return valueNode || findValueNodeOfIdentifier(identifierName, scope.upper);
}

function handleError(ruleId, error, fileName) {
  console.log(`Found error in rule: ${ruleId}\n`, `Error: ${error}\n`, `In file: ${fileName}`);
}


module.exports = {
  getPrefix,
  getSuffix,
  findValueNodeOfIdentifier,
  handleError
};
