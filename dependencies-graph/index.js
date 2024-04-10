const Builder = require('./builder');

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

const builder = new Builder();
builder.buildComponents();

let dotString = '';
const componentsWithNoOutgoingEdges = [];
const allImports = new Set();
builder._parser._componentsWithImports.forEach(component => {
  let hasOutgoingEdges = false;
  let label = component.defaultExport;
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
      allImports.add(imported);
      if (!POPULAR_COMPONENTS.includes(imported)) {
        dotString += `${component.defaultExport}[label="${label}"]->${imported}[color="${stringToColor(label)}"];\n`;
      }
    });
  }
});

componentsWithNoOutgoingEdges.forEach(({component, label}) => {
  dotString = dotString.replace(`->${component}[`, `->${label}[`);
});

componentsWithNoOutgoingEdges.forEach(({component, label}) => {
  if (!allImports.has(component)) {
    // No edges at all
    dotString += `${component}[label=${label}]->OnlyPopularImports[color="${stringToColor(label)}"];\n`;
  }
});

dotString = 'digraph {' + dotString + '}';

console.log(dotString);
