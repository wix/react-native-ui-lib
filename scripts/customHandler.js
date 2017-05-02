const path = require('path');
const recast = require('recast');
const { utils } = require('react-docgen');

const { getMemberValuePath, getNameOrValue } = utils;
const {types: {namedTypes: types}} = recast;

const DEFAULT_NAME = '';
const DEFAULT_PROP_NAME = 'custom';

function getStaticMemberValue(path, staticMemberName) {
  let staticMemberValue = null;
  const staticMember = getMemberValuePath(path, staticMemberName);
  if (staticMember && types.Literal.check(staticMember.node)) {
    staticMemberValue = getNameOrValue(staticMember);
  }

  return staticMemberValue || null;
}

// export function createDisplayNameHandler(filePath) {
function createCustomStaticMemberHandler(staticMemberName = DEFAULT_PROP_NAME) {
  return function displayNameHandler(documentation, path) {
    const staticMemberValue = [
      getStaticMemberValue,
      // getNodeIdentifier,
      // getVariableIdentifier,
    ].reduce((name, getValue) => name || getValue(path, staticMemberName), '');

    documentation.set(staticMemberName, staticMemberValue || DEFAULT_NAME);
  };
}

module.exports = createCustomStaticMemberHandler;
