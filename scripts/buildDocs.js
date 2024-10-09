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

  content += `import Tabs from '@theme/Tabs';\n`;
  content += `import TabItem from '@theme/TabItem';\n\n`;
  content += `<Tabs>
    <TabItem value="api" label="API" default>
      ${getFirstTab(component)}
    </TabItem>
    <TabItem value="guidelines" label="Guidelines">
      Coming soon... 👩🏻‍💻
      ${getSecondTab(component)}
    </TabItem>
    <TabItem value="playground" label="Playground">
      Coming soon... 🤹🏻‍♀️
    </TabItem>
  </Tabs>\n`;

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

function getFirstTab(component) {
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

function getTitle(title, description, type) {
  let content = '';
  
  content += `<div style={{margin: '0 48px 40px 0'}}> \n`;
  content += type === undefined ? `#### ${title} \n` : type === 'hero' ? `# ${title} \n` : `## ${title} \n`;
  content += `${description} \n`;
  content += `</div> \n`;
  
  return content;
}

function getContentItem(item, layout, isLast) {
  let content = '';
  
  content += `${getBasicLayout(item, undefined, layout)}`;
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
    let content = '';
    
    _.sortBy(props, p => p.name)?.forEach(prop => {
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

      content += `${prop.description} \n`;
      if (prop.default) {
        content += `<span style={{fontSize: 14, fontWeight: 'bold', margin: '0 0 6px 0'}}>Default: ${prop.default}</span> \n`;
      }
      // content += `${prop.note} \n`;

      content += `\n`;
    });
  
    return content;
  }
}

// function getTable(section) {
//   let content = '';
//   return content;
// }

function getContent(section, component) { // TODO: content types: Image, Figma, Video etc.
  let content = '';
  
  switch (section.type) {
    // case 'table':
    //   content += `${getTable(section)} \n`;
    //   break;
    case 'props':
      content += `${getPropsList(component.props)} \n`;
      break;
    case 'list':
      section.content.forEach((item, index) => {
        const isLast = index === section.length - 1;
        content += `${getContentItem(item, section.layout, isLast)} \n`;
      });
      break;
    default:
      content += `<div style={{border: '1px solid #E8ECF0'}}> \n`;
      section.content.forEach(item => {
        content += `<div> \n`;
        content += `<img src={'${item}'}/> \n`;
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

  content += `${getTitle(section.title, section.description, section.type)}`;
  content += `${getContent(section, component)}`;
  
  content += `</div> \n`;

  return content;
}

function getSecondTab(component) {
  let content = '';

  /* Docs */
  if (component.docs) {
    const divider = `<div style={{height: 3, width: '100%', backgroundColor: '#E8ECF0', margin: '60px 0 60px 0'}}/> \n`;
    const sections = component.docs.sections;

    if (sections) {
      sections.forEach(section => {
        content += `${getBasicLayout(section, component)}`;
        content += divider;
      });
    }
  }

  return content;
}
