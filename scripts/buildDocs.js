const _ = require('lodash');
const childProcess = require('child_process');
const fs = require('fs');

const COMPONENTS_DOCS_DIR = './docs/components';
const VALID_CATEGORIES = [
  'foundation',
  'basic',
  'assets',
  'navigation',
  'layout',
  'controls',
  'status',
  'media',
  'lists',
  'form',
  'dateTime',
  'overlays',
  'charts',
  'incubator',
  'infra'
];

const result = childProcess.execSync('find ./src ./lib/components -name "*api.json"');
const apiFiles = result.toString().trim().split('\n');

const components = apiFiles.map(filePath => {
  const file = fs.readFileSync(filePath);
  const api = JSON.parse(file.toString());
  return api;
});

if (fs.existsSync(COMPONENTS_DOCS_DIR)) {
  childProcess.execSync(`rm -rf ${COMPONENTS_DOCS_DIR}`);
}

fs.mkdirSync(COMPONENTS_DOCS_DIR);

const compoundComponents = components.filter(c => c.name.includes('.'));
const parentComponents = _.flow(components => _.map(components, c => c.name.split('.')[0]), _.uniq)(compoundComponents);

components.forEach(component => {
  const [componentName, componentParentName] = getComponentNameParts(component.name);
  const isParentComponent = parentComponents.includes(componentName);
  const isIncubatorComponent = component.category === 'incubator';

  if (!VALID_CATEGORIES.includes(component.category)) {
    console.error(`${componentName} has invalid category "${component.category}"`);
  }

  /* Markdown Front Matter */
  let content = '';
  content += '---\n';
  if (isParentComponent) {
    content += 'sidebar_position: 1\n';
  }
  content += `id: ${component.name}\n`;
  content += `title: ${isIncubatorComponent ? 'Incubator.' : ''}${component.name}\n`;
  content += `sidebar_label: ${componentName}\n`;
  content += '---\n\n';

  if (component.docs) {
    content += `import Tabs from '@theme/Tabs';\n`;
    content += `import TabItem from '@theme/TabItem';\n\n`;

    content += `${buildHero(component)}\n`;
    content += `${buildTabs(component)}\n`;
  } else {
    content += `${buildOldDocs(component)}\n`;
  }

  const componentParentDir = componentParentName || isParentComponent ? `/${componentParentName || componentName}` : '';
  const dirPath = `${COMPONENTS_DOCS_DIR}/${component.category}${componentParentDir}`;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true});
  }

  fs.writeFileSync(`${dirPath}/${component.name}.md`, content, {encoding: 'utf8'});
});

function getComponentNameParts(componentName) {
  const parts = componentName.split('.');
  if (parts.length === 1) {
    return [parts[0], undefined];
  } else {
    return [parts[1], parts[0]];
  }
}

function generateExtendsLink(extendsLink) {
  const extendedComponentName = _.last(_.split(extendsLink, '/')); // Incubator/TextField -> TextField
  const extendsText = `[${extendedComponentName}](/docs/components/${extendsLink})`;
  return extendsText;
}

function buildOldDocs(component) {
  let content = '';

  /* General Info */
  content += `${component.description}  \n`;
  if (typeof component.example === 'string') {
    content += `[(code example)](${component.example})\n`;
  } else if (Array.isArray(component.example)) {
    content += '(code examples: ';
    component.example.forEach((example, index) => {
      const slashIndex = example.lastIndexOf('/');
      const dotIndex = example.lastIndexOf('.');
      content += `${index > 0 ? ', ' : ''}[${example.slice(slashIndex + 1, dotIndex)}](${example})`;
    });
    content += ')\n';
  }

  if (component.extends) {
    let extendsText = component.extends?.join(', ');
    if (component.extendsLink) {
      extendsText = `[${extendsText}](${component.extendsLink})`;
    } else {
      extendsText = _.map(component.extends, generateExtendsLink).join(', ');
    }
    content += ':::info\n';
    content += `This component extends **${extendsText}** props.\n`;
    content += ':::\n';
  }

  if (component.modifiers) {
    content += ':::tip\n';
    content += `This component support **${component.modifiers?.join(', ')}** modifiers.\n`;
    content += ':::\n';
  }

  if (component.caution) {
    content += ':::caution\n';
    content += `${component.caution}\n`;
    content += ':::\n';
  }

  if (component.note) {
    content += ':::note\n';
    content += `${component.note}\n`;
    content += ':::\n';
  }

  /* Images */
  content += `<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}>`;
  component.images?.forEach(image => {
    content += `<img style={{maxHeight: '420px'}} src={'${image}'}/>`;
    content += '\n\n';
  });
  content += '</div>\n\n';

  /* Snippet */
  if (component.snippet) {
    content += `### Usage\n`;
    content += '``` jsx live\n';
    content += component.snippet?.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n');
    content += '\n```\n';
  } else {
    console.warn(`${component.name} does not have a snippet`);
  }

  /* Props */
  content += '## API\n';
  _.sortBy(component.props, p => p.name)?.forEach(prop => {
    content += `### ${prop.name}\n`;
    if (prop.note) {
      content += `#### ${prop.note}\n`;
    }
    content += `${prop.description}\n`;
    // content += `<span style={{color: 'grey'}}>${_.escape(prop.type)}</span>\n\n`;
    content += `\`${prop.type} \` \n\n`;
  });

  return content;
}

function getTitleSize(type) {
  switch (type) {
    case 'hero':
      return 48;
    case 'item':
      return 16;
    default:
      return 32;
  }
}

function getTitleWeight(type) {
  switch (type) {
    case 'item':
      return '400';
    default:
      return '700';
  }
}

function getDescriptionColor(type) {
  switch (type) {
    case 'item':
      return '#6E7881';
    default:
      return '#495059';
  }
}

function getCodeExample(component) {
  let content = '';
  content += `<a style={{fontSize: '16px', fontWeight: '700', textDecoration: 'underline'}}>[Code Example](${component.example})</a> \n`;
  return content;
}

function getTitle(type, title) {
  const size = getTitleSize(type);
  const weight = getTitleWeight(type);
  let content = '';
  content += `<span style={{lineHeight: '${size}px', fontSize: ${size}, fontWeight: ${weight}, margin: '0 0 16px 0'}}>${title}</span> \n`;
  content += `<br /> \n`;
  return content;
}

function getHeader(title, description, type, component) {
  let content = '';
  
  switch (type) {
    case 'usage':
      content += `<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 12px 0'}}> \n`;
      content += `${getTitle(type, title)} \n`;
      content += `${getCodeExample(component)} \n`;
      content += `</div> \n`;
      break;
    default:
      content += `<div style={{alignContent: 'start'}}> \n`;
      if (title) {
        content += `${getTitle(type, title)} \n`;
      }
      if (description) {
        const color = getDescriptionColor(type);
        content += `<span style={{display: 'block', margin: '0 40px 40px 0', fontSize: '16px', fontWeight: '400', color: '${color}'}}>${description}</span> \n`;
      }
      content += `</div> \n`;
      break;
  }
  return content;
}

function getContentItem(item, isLast) {
  const data = {
    ...item,
    type: 'item'
  };
  let content = '';
  content += `${getBasicLayout(data)}`;
  if (!isLast) {
    content += `<div style={{height: 40}}/> \n`;
  }
  return content;
}

function getTypeColor(type) {
  let color;
  switch (type) {
    case 'string':
      color = '#FFEEB9';
      break;
    case 'number':
      color = '#B3EBDD';
      break;
    case 'boolean':
      color = '#C4DFFF';
      break;
    default: 
      color = '#E8ECF0';
  }
  return color;
}

function getTag(label, color) {
  let content = '';
  content += `<div style={{display: 'flex', flexDirection: 'row', backgroundColor: '${color}', margin: '4px 12px 4px 0', height: 20, borderRadius: '2px', alignItems: 'center'}}> \n`;
  content += `<span style={{fontSize: 14, fontWeight: 'bold', margin: '6px'}}>${label}</span> \n`;
  content += `</div> \n`;
  return content;
}

function getPropsList(props) {
  if (props) {
    const color = getDescriptionColor('item');

    let content = '';
    _.sortBy(props, p => p.name)?.forEach(prop => {
      const defaultValue = prop.default ? `. Default is ${prop.default}` : '';
      const descriptionMargin = prop.note ? '0 0 12px 0' : '0 0 28px 0';

      content += `<div style={{display: 'flex', flexDirection: 'row', height: 28, margin: '0 0 12px 0'}}> \n`;
      content += `### ${prop.name} \n`;
      content += `${getTag(prop.type, getTypeColor(prop.type))} \n`;
      if (prop.required) {
        content += `${getTag('Required', getTypeColor())} \n`;
      }
      if (prop.platform) {
        content += `${getTag(prop.platform, getTypeColor())} \n`;
      }
      content += `</div> \n`;

      content += `<span style={{display: 'block', margin: '${descriptionMargin}', fontSize: '16px', fontWeight: '400', color: '${color}'}}>${prop.description}${defaultValue}</span> \n`;
      
      if (prop.note) {
        content += `<span style={{display: 'block', margin: '0 0 28px 0', fontSize: '16px', fontWeight: '700'}}>${prop.note}</span> \n`;
      }
      content += `\n`;
    });
    return content;
  }
}

function getTable(section) {
  const columns = section.columns;
  const rows = section.content;
  const numberOfColumns = columns.length;
  const cellWidth = 100 / numberOfColumns;

  let content = '';
  content += `<span style={{fontSize: 20, fontWeight: '700', display: 'block'}}>${section.name}</span> \n`;
  content += `<br /> \n`;

  content += `<table> \n`;
  /** Headers */
  content += `<tr> \n`;
  columns.forEach(column => {
    content += `<th style={{backgroundColor: '#F8F9FA', width: '${cellWidth}%'}}> \n`;
    content += `<span style={{fontSize: 16, fontWeight: 'bold', margin: '8px'}}>${column}</span> \n`;
    content += `</th> \n`;
  }); 
  content += `</tr> \n`;
  /** Rows */
  rows.forEach(row => {
    content += `<tr> \n`;
    content += `<td style={{backgroundColor: 'white', margin: '20px 12px 20px 12px', alignContent: 'start'}}> \n`;
    content += `<span style={{fontSize: 16, fontWeight: '500'}}>${row.title}</span> \n`;
    content += `<br /> \n`;
    content += `<span style={{fontSize: 16, fontWeight: '400', color: '#6E7881'}}>${row.description}</span> \n`;
    content += `</td> \n`;

    row.content.forEach((item, index) => { 
      if (index < numberOfColumns - 1) {
        content += `<td style={{backgroundColor: 'white', padding: '8px 12px 8px 12px'}}> \n`;
        // content += `<img src={'${item}'} style={{display: 'block'}}/> \n`;
        content += getTypedContent(item); // TODO: content types: Image, Figma, Video etc.
        content += `</td> \n`;
      }
    });
    content += `</tr> \n`;
  }); 
  content += `</table> \n`;

  return content;
}

function getSnippet(component) {
  if (component.snippet) {
    let content = '';
    content += '``` jsx live\n';
    content += component.snippet?.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n');
    content += '\n```\n';
    return content;
  }
}

function getInfo(component) {
  if (component.extends) {
    let extendsText = component.extends?.join(', ');
    if (component.extendsLink) {
      extendsText = `[${extendsText}](${component.extendsLink})`;
    } else {
      extendsText = _.map(component.extends, generateExtendsLink).join(', ');
    }

    let content = '';
    content += ':::info\n';
    content += `This component extends **${extendsText}** props.\n`;
    content += ':::\n';
    return content;
  }
}

function getTip(component) {
  if (component.modifiers) {
    let content = '';
    content += ':::tip\n';
    content += `This component support **${component.modifiers?.join(', ')}** modifiers.\n`;
    content += ':::\n';
    return content;
  }
}

// function getCaution(component) {
//   if (component.caution) {
//     let content = '';
//     content += ':::caution\n';
//     content += `${component.caution}\n`;
//     content += ':::\n';
//     return content;
//   }
// }

// function getNote(component) {
//   if (component.note) {
//     let content = '';
//     content += ':::note\n';
//     content += `${component.note}\n`;
//     content += ':::\n';
//     return content;
//   }
// }

function getFigmaEmbed(item, height = 450) {
  let content = '';
  content += `<iframe width={'100%'} height={${height}} src={'${item}'} allowfullscreen></iframe> \n`;
  return content;
}

function getImage(item) {
  let content = '';
  content += `<img src={'${item}'} style={{display: 'block'}}/> \n`;
  return content;
}

function getTypedContent(item) {
  let content = '';
  if (typeof item === 'string' && item.includes('www.figma.com')) {
    content += getFigmaEmbed(item);
  } else {
    content += getImage(item);
  }
  return content;
}

function getContent(section, component) { // TODO: content types: Image, Figma, Video etc.
  let content = '';
  switch (section.type) {
    case 'usage':
      content += `${getSnippet(component)} \n`;
      break;
    case 'info':
      content += `${getInfo(component)} \n`;
      break;
    case 'tip':
      content += `${getTip(component)} \n`;
      break;
    // case 'note':
    //   content += `${getNote(component)} \n`;
    //   break;
    // case 'caution':
    //   content += `${getCaution(component)} \n`;
    //   break;
    case 'table':
      content += `${getTable(section)} \n`;
      break;
    case 'props':
      content += `${getPropsList(component.props)} \n`;
      break;
    case 'list':
      section.content.forEach((item, index) => {
        const isLast = index === section.content.length - 1;
        content += `${getContentItem(item, isLast)} \n`;
      });
      break;
    default:
      content += `<div> \n`;
      section.content.forEach((item, index) => {
        const isLast = index === section.content.length - 1;
        const margin = isLast ? '0' : '0 0 40px 0';
        content += `<div style={{border: '1px solid #F8F9FA', margin: '${margin}'}}> \n`;
        content += getTypedContent(item);
        content += `</div> \n`;
      });
      content += `</div>`;
  }
  content += `\n`;
  return content;
}

function getBasicLayout(section, component) {
  let content = '';
  if (section.type !== 'list' && section.layout === 'horizontal') {
    content += `<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> \n`;
  } else {
    content += `<div> \n`;
  }

  content += `${getHeader(section.title, section.description, section.type, component)}`;
  content += `${getContent(section, component)}`;
  
  content += `</div> \n`;
  return content;
}

function getDivider(section) {
  let content = '';
  if (section.type === 'table' || section.type === 'list') {
    content += `<div style={{height: 1, width: '100%', backgroundColor: '#E8ECF0', margin: '60px 0 60px 0'}}/> \n`;
  } else {
    content += `<div style={{height: 60}}/> \n`;
  }
  return content;
}

function buildDocsSections(tab, component) {
  const sections = tab.sections;
  let content = '';
  if (sections) {
    sections.forEach(section => {
      content += `${getBasicLayout(section, component)}`;
      content += `${getDivider(section)}`;
    });
  }
  return content;
}

function buildTabs(component) {
  const tabs = component.docs?.tabs;
  if (tabs) {
    let content = '';
    content += `<Tabs className="main-tabs">\n`;
    tabs.forEach((tab, index) => {
      content += `<TabItem value="${index}" label="${tab.title}" attributes={{className: "single-tab"}}>\n`;
      if (tab.sections) {
        content += `${buildDocsSections(tab, component)}\n`;
      } else {
        content += `Coming soon... 👩🏻‍💻\n`;
      }
      content += `</TabItem>\n`;
    });
    content += `</Tabs>\n`;
    return content;
  }
}

function buildHero(component) {
  const hero = component.docs?.header;
  
  if (hero) {
    // const isIncubatorComponent = component.category === 'incubator';
    // const name = isIncubatorComponent ? `Incubator.${component.name}` : component.name;
    const section = {
      // title: name,
      layout: 'horizontal',
      ...hero,
      type: 'hero'
    };
    
    let content = '';
    content += `${getBasicLayout(section, component)}`;
    return content;
  }
}
