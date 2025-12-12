const {getPrefix} = require('./generalUtils');
const {getComponentName, isNamespace} = require('./componentUtils');

function _organizeDeprecationsBySource(deprecations, defaultSource) {
  const obj = {};
  deprecations.forEach(deprecation => {
    const {source = defaultSource, ...others} = deprecation;
    if (!(source in obj)) {
      obj[source] = [others];
    } else {
      obj[source].push(others);
    }
  });

  return obj;
}

function organizeDeprecations(deprecations, defaultSource) {
  if (!deprecations) {
    return {};
  }

  return _organizeDeprecationsBySource(deprecations, defaultSource);
}

function getLocalizedFix(fix, currentImport) {
  if (!fix) {
    return;
  }

  let localizedFix = fix;
  const indexOfDot = fix.indexOf('.');
  if (indexOfDot > 0) {
    const components = currentImport[Object.keys(currentImport)[0]];
    const prefix = fix.slice(0, indexOfDot);
    if (!components[prefix]) {
      const newPrefix = Object.keys(components).find(key => components[key] === prefix);
      if (newPrefix) {
        const suffix = fix.slice(indexOfDot + 1);
        localizedFix = `${newPrefix}.${suffix}`;
      }
    }
  }

  return localizedFix;
}

function getPossibleDeprecations(componentLocalName, imports, currentImport, deprecationSource) {
  const source = Object.keys(currentImport)[0];
  const components = currentImport[source];
  const componentName = getComponentName(componentLocalName, imports);
  const prefix = getPrefix(componentLocalName);
  return deprecationSource.filter(currentDeprecationSource => {
    return (
      (isNamespace(currentImport, componentLocalName) ||
        components[componentLocalName] ||
        (prefix && components[prefix])) &&
      currentDeprecationSource.component === componentName
    );
  });
}

module.exports = {
  organizeDeprecations,
  getLocalizedFix,
  getPossibleDeprecations
};
