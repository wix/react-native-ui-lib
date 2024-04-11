const fs = require('fs');
const path = require('path');

class Builder {
  _folders;
  _parser;
  _componentsNames;
  _wasBuilt = false;

  constructor(folders, parser) {
    this._folders = folders;
    this._parser = parser;
  }

  buildComponents() {
    if (this._wasBuilt) {
      return;
    }

    this._parse();
    this._componentsNames = this._parser._componentsWithImports.map(component => component.defaultExport);
    this._removeAndRenameComponents();
    this._wasBuilt = true;
  }

  writeToFile() {
    this.buildComponents();
    fs.writeFileSync(path.join(__dirname, '/components.json'),
      JSON.stringify(this._parser._componentsWithImports, null, 2));
  }

  readFromFile(fileName) {
    this._parser.clear();
    this._parser._componentsWithImports = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    this._componentsNames = this._parser._componentsWithImports.map(component => component.defaultExport);
  }

  _removeAndRenameComponents() {
    for (let i = 0; i < this._parser._componentsWithImports.length; ++i) {
      for (let j = this._parser._componentsWithImports[i].imports.length - 1; j >= 0; --j) {
        const currentImport = this._parser._componentsWithImports[i].imports[j];
        if (
          // this._parser._functions.has(currentImport) ||
          this._parser._enums.has(currentImport) ||
          this._parser._interfaces.has(currentImport) ||
          this._parser._types.has(currentImport) ||
          (!this._componentsNames.includes(currentImport) &&
            !currentImport.endsWith('Old') &&
            !currentImport.endsWith('New'))
        ) {
          this._parser._componentsWithImports[i].imports.splice(j, 1);
        } else if (
          !this._componentsNames.includes(currentImport) &&
          (currentImport.endsWith('Old') || currentImport.endsWith('New')) &&
          this._componentsNames.includes(currentImport.slice(0, -3))
        ) {
          this._parser._componentsWithImports[i].imports[j] = currentImport.slice(0, -3);
        }
      }
    }
  }

  _parse() {
    for (let i = 0; i < this._folders.length; ++i) {
      this._parser.parse(this._folders[i]);
    }
  }
}

module.exports = Builder;
