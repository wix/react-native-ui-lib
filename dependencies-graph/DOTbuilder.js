const POPULAR_COMPONENTS = ['Button', 'Image', 'Text', 'TouchableOpacity', 'View'];

// https://stackoverflow.com/a/16348977/4759619
const stringToColor = str => {
  let hash = 0;
  str.split('').forEach(char => {
    // eslint-disable-next-line no-bitwise
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let color = '#';
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }
  return color;
};

class DOTBuilder {
  _builder;
  _dotString = '';
  _componentsWithNoOutgoingEdges = [];
  _allImports = new Set();

  constructor(builder, {additionalPopularComponents, prefix} = {}) {
    this._builder = builder;
    this._popularComponents = POPULAR_COMPONENTS.map(component => (prefix ?? '') + component).concat(additionalPopularComponents);
  }

  buildDOTString() {
    this._mainBuild();
    this._handleComponentsWithNoOutgoingEdges();
  }

  getDOTString() {
    return 'digraph {' + this._dotString + '}';
  }

  _mainBuild() {
    this._builder._parser._componentsWithImports.forEach(component => {
      let hasOutgoingEdges = false;
      let label = component.defaultExport;
      const popular = [];
      component.imports.forEach(imported => {
        if (this._popularComponents.includes(imported)) {
          popular.push(imported);
        } else {
          hasOutgoingEdges = true;
        }
      });

      if (popular.length > 0) {
        label += ` (${popular.join(', ')})`;
      }

      if (!hasOutgoingEdges) {
        if (!this._popularComponents.includes(component.defaultExport) && component.defaultExport !== label) {
          this._componentsWithNoOutgoingEdges.push({
            component: component.defaultExport,
            label: `"${label}"`
          });
        }
      } else {
        component.imports.forEach(imported => {
          this._allImports.add(imported);
          if (!this._popularComponents.includes(imported)) {
            this._dotString += `${component.defaultExport}[label="${label}"]`;
            this._dotString += '->';
            this._dotString += `${imported}[color="${stringToColor(label)}"]`;
            this._dotString += ';\n';
          }
        });
      }
    });
  }

  _handleComponentsWithNoOutgoingEdges() {
    this._componentsWithNoOutgoingEdges.forEach(({component, label}) => {
      this._dotString = this._dotString.replace(`->${component}[`, `->${label}[`);
    });

    this._componentsWithNoOutgoingEdges.forEach(({component, label}) => {
      if (!this._allImports.has(component)) {
        // No edges at all
        this._dotString += `${component}[label=${label}]->OnlyPopularImports[color="${stringToColor(label)}"];\n`;
      }
    });
  }
}

module.exports = DOTBuilder;
