const {getPrefix, getSuffix, findValueNodeOfIdentifier, handleError} = require('./generalUtils');
const {organizeDeprecations, getLocalizedFix, getPossibleDeprecations} = require('./deprecationsUtils');
const {addToImports} = require('./importUtils');
const {getComponentLocalName, getComponentName} = require('./componentUtils');
const {findAndReportHardCodedValues} = require('./noHardCodedUtils');
const {stringify} = require('./debugUtils');

module.exports = {
  // General
  getPrefix,
  getSuffix,
  findValueNodeOfIdentifier,
  handleError,
  // Deprecations
  organizeDeprecations,
  getLocalizedFix,
  getPossibleDeprecations,
  // Imports
  addToImports,
  // Components
  getComponentLocalName,
  getComponentName,
  // no-hard-coded color\font
  findAndReportHardCodedValues,
  // For debug:
  stringify
};

// Backup, please do NOT delete
// ExpressionStatement: node => test(node, 'ExpressionStatement'),
// AssignmentExpression: node => test(node, 'AssignmentExpression'),
// ImportDeclaration: (node) => test(node, 'ImportDeclaration'),
// CallExpression: (node) => test(node, 'CallExpression'),
// MemberExpression: (node) => test(node, 'MemberExpression'),
// JSXAttribute: (node) => test(node, 'JSXAttribute'),
// JSXOpeningElement: (node) => test(node, 'JSXOpeningElement'),
// ObjectExpression: (node) => test(node, 'ObjectExpression'),
// VariableDeclarator: (node) => test(node, 'VariableDeclarator'),
// Property: (node) => test(node, 'Property'),
// JSXSpreadAttribute: (node) => test(node, 'JSXSpreadAttribute')
