const fs = require('fs');
const {parse, AST_NODE_TYPES} = require('@typescript-eslint/typescript-estree');
const {traverse} = require('eslint/lib/shared/traverser');

const OUR_STATIC_IMPORTS = ['commons', 'helpers', 'utils', 'hooks', 'optionalDeps', 'services', 'style'];

function isType(importName) {
  return importName.startsWith('import type ') || importName.indexOf('Type') > 0 || importName.indexOf('Prop') >= 0;
}

function isConst(importName) {
  return importName.toUpperCase() === importName;
}

function isHook(importName) {
  return importName.startsWith('use');
}

function isIncubator(path) {
  return path.includes('incubator');
}

class Parser {
  _verbose;
  _componentsWithImports = [];
  // Ignoring functions will ignore some components, leaving them for now
  // _functions = new Set();
  _hooks = new Set();
  _enums = new Set();
  _interfaces = new Set();
  _types = new Set();

  constructor(verbose = false) {
    this._verbose = verbose;
  }

  clear() {
    this._componentsWithImports.length = 0;
    // this._functions.clear();
    this._hooks.clear();
    this._enums.clear();
    this._interfaces.clear();
    this._types.clear();
  }

  parse(path) {
    this._parseDirectory(path);
  }

  _parseContent(fileContent, fullPath) {
    try {
      const code = parse(fileContent, {comment: false, jsx: true});
      let from,
        imports = [],
        defaultExportString,
        defaultExport;
      const possibleExports = [],
        // functions = new Set(),
        hooks = new Set(),
        enums = new Set(),
        interfaces = new Set(),
        types = new Set();
      traverse(code, {
        enter(node) {
          switch (node.type) {
            case AST_NODE_TYPES.ImportDeclaration:
              from = node.source.raw.replace(/['"]/g, '');
              if (OUR_STATIC_IMPORTS.includes(from) || from.indexOf(`./`) === 0 || from.indexOf(`../`) === 0) {
                imports = imports.concat(node.specifiers
                  .map(imp => {
                    let importName = imp.imported?.name ?? imp.local.name;
                    if (isHook(importName)) {
                      hooks.add(importName);
                    }

                    if (
                      (isIncubator(node.source.raw) ||
                          (isIncubator(fullPath) && !node.source.raw.includes('components'))) &&
                        !importName.startsWith('Incubator')
                    ) {
                      importName = `Incubator${importName}`;
                    }

                    return importName;
                  })
                  .filter(importName => !isType(importName) && !isConst(importName) && !isHook(importName)));
              }
              break;
            case AST_NODE_TYPES.ClassDeclaration:
              defaultExport = node.id.name;
              break;
            case AST_NODE_TYPES.VariableDeclarator:
              if (
                node.init?.type === AST_NODE_TYPES.ArrowExpression ||
                node.init?.type === AST_NODE_TYPES.ArrowFunctionExpression ||
                node.init?.type === AST_NODE_TYPES.CallExpression
              ) {
                possibleExports.push(node.id.name);
              }
              break;
            case AST_NODE_TYPES.FunctionDeclaration:
              // functions.add(node.id.name);
              if (node.id.name) {
                possibleExports.push(node.id.name);
              }
              break;
            case AST_NODE_TYPES.TSInterfaceDeclaration:
              interfaces.add(node.id.name);
              break;
            case AST_NODE_TYPES.TSTypeAliasDeclaration:
              types.add(node.id.name);
              break;
            case AST_NODE_TYPES.TSEnumDeclaration:
              enums.add(node.id.name);
              break;
            case AST_NODE_TYPES.ExportDefaultDeclaration:
              defaultExportString = JSON.stringify(node);
              break;
            // default:
            //   console.log('type:', node.type);
            //   break;
          }
        }
      });

      // functions.forEach(f => this._functions.add(f));
      hooks.forEach(h => this._hooks.add(h));
      enums.forEach(e => this._enums.add(e));
      interfaces.forEach(i => this._interfaces.add(i));
      types.forEach(t => this._types.add(t));

      if (!defaultExport && possibleExports.length > 0) {
        for (let i = 0; i < possibleExports.length; ++i) {
          if (defaultExportString.includes(possibleExports[i])) {
            defaultExport = possibleExports[i];
            break;
          }
        }
      }

      if (isHook(defaultExport)) {
        defaultExport = undefined;
      }

      if (!defaultExport) {
        if (this._verbose) {
          console.error('No default export found');
        }
        return undefined;
      }
      if (imports.length === 0) {
        if (this._verbose) {
          console.error('No imports found');
        }
        return undefined;
      }

      defaultExport = `${isIncubator(fullPath) ? 'Incubator' : ''}${defaultExport}`;

      return {defaultExport, imports};
    } catch (e) {
      if (this._verbose) {
        console.error('Error parsing content', e);
      }
    }
  }

  _isHidden(fileOrDirectory) {
    return fileOrDirectory.startsWith('.');
  }

  _isDirectory(fileOrDirectoryFullPath) {
    return fs.statSync(fileOrDirectoryFullPath).isDirectory();
  }

  _isRelevantFile(fileOrDirectory) {
    return (
      (fileOrDirectory.endsWith('.js') || fileOrDirectory.endsWith('.ts') || fileOrDirectory.endsWith('.tsx')) &&
      !(
        fileOrDirectory.endsWith('.web.js') ||
        fileOrDirectory.endsWith('.web.ts') ||
        fileOrDirectory.endsWith('.web.tsx')
      ) &&
      !fileOrDirectory.endsWith('.d.ts') &&
      !fileOrDirectory.includes('driver')
    );
  }

  _parseDirectory(directoryFullPath) {
    const dirContent = fs.readdirSync(directoryFullPath);
    if (dirContent.length > 0) {
      dirContent.forEach(fileOrDirectory => {
        if (!this._isHidden(fileOrDirectory)) {
          const fileOrDirectoryFullPath = `${directoryFullPath}/${fileOrDirectory}`;
          if (this._isDirectory(fileOrDirectoryFullPath)) {
            if (!fileOrDirectory.endsWith('__tests__')) {
              this._parseDirectory(fileOrDirectoryFullPath);
            }
          } else if (this._isRelevantFile(fileOrDirectory)) {
            const fileContent = fs.readFileSync(fileOrDirectoryFullPath).toString();
            const result = this._parseContent(fileContent, fileOrDirectoryFullPath);
            if (result) {
              this._componentsWithImports.push({...result, extraData: {fileOrDirectory, fileOrDirectoryFullPath}});
            }
          }
        }
      });
    }
  }
}

module.exports = Parser;
