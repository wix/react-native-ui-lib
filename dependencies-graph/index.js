const cloneDeep = require('lodash/cloneDeep');
const Parser = require('./parser');

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

const MyParser = new Parser();
for (let i = 2; i < process.argv.length; ++i) {
  MyParser.parse(process.argv[i]);
}

const componentsWithImports = cloneDeep(MyParser._componentsWithImports);
const components = componentsWithImports.map(component => component.defaultExport);
for (let i = 0; i < componentsWithImports.length; ++i) {
  for (let j = componentsWithImports[i].imports.length - 1; j >= 0; --j) {
    const currentImport = componentsWithImports[i].imports[j];
    if (
      // MyParser._functions.has(currentImport) ||
      MyParser._enums.has(currentImport) ||
      MyParser._interfaces.has(currentImport) ||
      MyParser._types.has(currentImport) ||
      !components.includes(currentImport)
    ) {
      componentsWithImports[i].imports.splice(j, 1);
    }
  }
}

let dotString = '';
const componentsWithNoOutgoingEdges = [];
componentsWithImports.forEach(component => {
  let hasOutgoingEdges = false;
  let label = (component.incubator ? 'Incubator.' : '') + component.defaultExport;
  const popular = [];
  component.imports.forEach(imported => {
    if (POPULAR_COMPONENTS.includes(imported)) {
      popular.push(imported);
    } else {
      hasOutgoingEdges = true;
    }
  });

  if (popular.length > 0) {
    label += ` (${popular.join(', ')})`;
  }

  if (!hasOutgoingEdges) {
    if (!POPULAR_COMPONENTS.includes(component.defaultExport) && component.defaultExport !== label) {
      componentsWithNoOutgoingEdges.push({component: component.defaultExport, label: `"${label}"`});
    }
  } else {
    component.imports.forEach(imported => {
      if (!POPULAR_COMPONENTS.includes(imported)) {
        dotString += `${component.defaultExport}[label="${label}"]->${imported}[color="${stringToColor(label)}"];\n`;
      }
    });
  }
});

componentsWithNoOutgoingEdges.forEach(({component, label}) => {
  dotString = dotString.replace(`->${component}`, `->${label}`);
});

dotString = 'digraph {' + dotString + '}';

console.log(dotString);
