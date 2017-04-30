const path = require('path');
const recast = require('recast');
const { utils } = require('react-docgen');

const { getMemberValuePath, getNameOrValue } = utils;
const {types: {namedTypes: types}} = recast;

const DEFAULT_NAME = 'UnknownComponent';

function getStaticDisplayName(path) {
  let displayName = null;
  const staticMember = getMemberValuePath(path, 'displayName');
  if (staticMember && types.Literal.check(staticMember.node)) {
    displayName = getNameOrValue(staticMember);
  }

  return displayName || null;
}

function getNodeIdentifier(path) {
  let displayName = null;
  if (
    types.FunctionExpression.check(path.node) ||
    types.FunctionDeclaration.check(path.node) ||
    types.ClassExpression.check(path.node) ||
    types.ClassDeclaration.check(path.node)
  ) {
    displayName = getNameOrValue(path.get('id'));
  }

  return displayName || null;
}

function getVariableIdentifier(path) {
  let displayName = null;
  let searchPath = path;

  while (searchPath !== null) {
    if (types.VariableDeclarator.check(searchPath.node)) {
      displayName = getNameOrValue(searchPath.get('id'));
      break;
    }
    searchPath = searchPath.parentPath;
  }

  return displayName || null;
}

function getNameFromFilePath(filePath = '') {
  let displayName = null;

  const filename = path.basename(filePath, path.extname(filePath));
  if (filename === 'index') {
    const parts = path.dirname(filePath).split(path.sep);
    displayName = parts[parts.length - 1];
  } else {
    displayName = filename;
  }

  return displayName
    .charAt(0).toUpperCase()
    .concat(displayName.slice(1))
    .replace(/-([a-z])/, (_, match) => match.toUpperCase());
}

export function createDisplayNameHandler(filePath) {
  return function displayNameHandler(documentation, path) {
    let displayName = [
      getStaticDisplayName,
      getNodeIdentifier,
      getVariableIdentifier,
    ].reduce((name, getDisplayName) => name || getDisplayName(path), '');

    if (!displayName) {
      displayName = getNameFromFilePath(filePath);
    }

    documentation.set('displayName', displayName || DEFAULT_NAME);
  };
}

module.exports = createDisplayNameHandler('');
