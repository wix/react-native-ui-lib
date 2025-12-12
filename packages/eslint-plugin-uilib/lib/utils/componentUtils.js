const {getPrefix} = require('./generalUtils');

function getComponentLocalName(node) {
  if (!node) return;
  const name = node.name || node;
  if (typeof name === 'string') return name;
  if (!name.object) return name.name; // <Avatar/>
  const start = getComponentLocalName(name.object);
  const end = name.property.name || node.property.value;
  return `${start}.${end}`; // <List.Part/> OR <module.List.Part/> etc.
}

function isNamespace(currentImport, componentLocalName) {
  const components = Object.values(currentImport)[0];
  const prefix = getPrefix(componentLocalName);
  if (prefix && components[prefix]) {
    return components[prefix].isNamespace;
  }

  return false;
}

function getComponentName(componentLocalName, imports) {
  for (let index = 0; index < imports.length; ++index) {
    const currentImport = imports[index];
    const components = Object.values(currentImport)[0];
    if (components[componentLocalName]) {
      return components[componentLocalName];
    } else if (componentLocalName.indexOf('.') > 0) {
      const prefix = getPrefix(componentLocalName);
      if (components[prefix]) {
        if (components[prefix].isNamespace) {
          const indexOfDot = componentLocalName.indexOf('.');
          return componentLocalName.slice(indexOfDot + 1);
        } else {
          return componentLocalName.replace(prefix, components[prefix]);
        }
      }
    }
  }
}

module.exports = {
  // The local name of the component (List as L --> L)
  getComponentLocalName,
  // Get the real name of the component
  getComponentName,
  // Is the localName comes from a namespace (module.Component)
  isNamespace
};
