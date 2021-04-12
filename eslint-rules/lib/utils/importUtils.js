const _ = require('lodash');

function _addToImports_aggregate(imports, source, newImports) {
  if (source && !_.isEmpty(newImports)) {
    const existingIndex = imports
      .map((currentImport, index) => (Object.keys(currentImport).includes(source) ? index : undefined))
      .filter(currentImport => !_.isUndefined(currentImport));
    if (!_.isEmpty(existingIndex)) {
      imports[existingIndex[0]] = {[source]: {...imports[existingIndex[0]][source], ...newImports}};
    } else {
      imports.push({[source]: newImports});
    }
  }
}

function _addToImports_fromImport(node, imports) {
  const specifiers = node.specifiers;
  if (specifiers) {
    const newImports = {};
    specifiers.forEach(specifier => {
      if (specifier.type === 'ImportSpecifier' || specifier.type === 'ImportNamespaceSpecifier') {
        const isNamespace = specifier.type === 'ImportNamespaceSpecifier';
        const value = _.get(specifier, 'imported.name') || _.get(specifier, 'local.name');
        newImports[specifier.local.name] = isNamespace ? {value, isNamespace} : value;
      }
    });

    const source = node.source.value;
    _addToImports_aggregate(imports, source, newImports);
  }
}

function _getSourceForComponent(component, imports) {
  for (let index = 0; index < imports.length; ++index) {
    if (Object.keys(Object.values(imports[index])[0]).includes(component)) {
      return Object.keys(imports[index])[0];
    }
  }
}

function _addToImports_fromSpreading(midSource, newImports, imports, parents) {
  if (midSource) {
    const source = _getSourceForComponent(midSource, imports);
    if (source) {
      _addToImports_aggregate(imports, source, newImports);
      if (parents) {
        _.forEach(Object.keys(newImports), currentImport => {
          if (!parents.includes(currentImport)) {
            parents.push({[currentImport]: midSource});
          }
        });
      }
    }
  }
}

function _getImportsFromProperties(node) {
  const newImports = {};
  _.map(node.id.properties, property => {
    if (property.type === 'Property') {
      newImports[property.value.name] = property.key.name;
    }
  });

  return newImports;
}

function _addToImports_fromDeclaration(node, imports, parents) {
  let newImports, source, midSource;
  if (_.get(node, 'init.type') === 'CallExpression' && _.get(node, 'init.callee.name') === 'require') {
    source = node.init.arguments[0].value;
    if (_.get(node, 'id.properties')) {
      newImports = _getImportsFromProperties(node);
    } else if (_.get(node, 'id.name')) {
      newImports = {[node.id.name]: node.id.name};
    }
  } else if (_.get(node, 'init.type') === 'MemberExpression' && node.init.object) {
    const {object} = node.init;
    if (object.type === 'CallExpression' && object.callee && object.callee.name === 'require') {
      source = object.arguments[0].value;
      const localName = _.get(node, 'id.typeAnnotation.typeAnnotation.id.name') || node.id.name;
      newImports = {[localName]: node.init.property.name};
    } else if (object.type === 'Identifier') {
      midSource = object.name;
      newImports = {[node.init.property.name]: node.init.property.name};
    }
  } else if (_.get(node, 'id.type') === 'ObjectPattern' && _.get(node, 'id.properties') && _.get(node, 'init.name')) {
    midSource = node.init.name;
    newImports = _getImportsFromProperties(node);
  }

  _addToImports_aggregate(imports, source, newImports);
  _addToImports_fromSpreading(midSource, newImports, imports, parents);
}

/**
 * Aggregate all components, from 'import', 'require' or 'spreading' of other components\imports
 * to a single object.
 */
function addToImports(node, imports, parents) {
  if (!node) return;
  if (node.type === 'ImportDeclaration') {
    _addToImports_fromImport(node, imports); // import
  } else if (node.type === 'VariableDeclarator') {
    _addToImports_fromDeclaration(node, imports, parents); // require + spreading of sub-components etc
  } else {
    console.log('Debug', 'addToImports', 'unknown type:', node.type);
  }
}

module.exports = {
  addToImports
};
