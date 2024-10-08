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
  
  content += `<div> \n`;
  content += type === 'hero' ? `# ${title} \n` : type === undefined ? `#### ${title} \n` : `## ${title} \n`;
  content += `${description} \n`;
  content += `</div> \n`;
  content += `<div style={{height: 40}}/> \n`;
  
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

function getContent(data, type, layout) { // TODO: content types: Image, Figma, Video etc.
  let content = '';
  
  if (type === 'list') {
    data.forEach((item, index) => {
      const isLast = index === data.length - 1;
      content += `${getContentItem(item, layout, isLast)} \n`;
    });
  } else {
    content += `<div style={{backgroundColor: '#E8ECF0', border: '1px'}}> \n`;
    data.forEach(item => {
      content += `<div> \n`;
      content += `<img src={'${item}'}/> \n`;
      content += `</div> \n`;
    });
    content += `</div> \n`;
  }

  content += `\n`;

  return content;
}

function getBasicLayout(data, type, layout) {
  let content = '';

  if (type !== 'list' && layout === 'horizontal') {
    content += `<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> \n`;
  } else {
    content += `<div> \n`;
  }

  content += `${getTitle(data.title, data.description, type)}`;
  content += `${getContent(data.content, type, layout)}`;
  
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
        content += `${getBasicLayout(section, section.type, section.layout)}`;
        content += divider;
      });
    }
  }

  return content;
}
