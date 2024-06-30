const fs = require('fs');

class Builder {
  _folders;
  _parser;
  _componentsNames = [];

  constructor(folders, parser) {
    this._folders = folders;
    this._parser = parser;
  }

  buildComponents({prefixToAdd, prefixToInclude} = {}) {
    this._parse();
    this._componentsNames = this._componentsNames.concat(this._parser._componentsWithImports.map(component => component.defaultExport));
    this._removeAndRenameComponents(prefixToInclude);
    this._addPrefix(prefixToAdd);
  }

  writeToFile(fileFullPath) {
    if (fs.existsSync(fileFullPath)) {
      fs.rmSync(fileFullPath);
    }
    fs.writeFileSync(fileFullPath, JSON.stringify(this._parser._componentsWithImports, null, 2));
  }

  readFromFile(fileName, prefix) {
    this._parser.clear();
    this._parser._componentsWithImports = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    this._addPrefix(prefix);
    this._componentsNames = this._componentsNames.concat(this._parser._componentsWithImports.map(component => component.defaultExport));
  }

  _addPrefix(prefix) {
    if (!prefix) {
      return;
    }

    for (let i = 0; i < this._parser._componentsWithImports.length; ++i) {
      this._parser._componentsWithImports[i].defaultExport =
        prefix + this._parser._componentsWithImports[i].defaultExport;
      for (let j = 0; j < this._parser._componentsWithImports[i].imports.length; ++j) {
        this._parser._componentsWithImports[i].imports[j] = prefix + this._parser._componentsWithImports[i].imports[j];
      }
    }
  }

  _removeAndRenameComponents(prefixToInclude) {
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
            !currentImport.endsWith('New') &&
            (!prefixToInclude || !currentImport.startsWith(prefixToInclude)))
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
