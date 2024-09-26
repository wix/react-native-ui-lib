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

  /* First Tab */

  let firstTabContent = '';

  /* General Info */
  firstTabContent += `${component.description}  \n`;
  if (typeof component.example === 'string') {
    firstTabContent += `[(code example)](${component.example})\n`;
  } else if (Array.isArray(component.example)) {
    firstTabContent += '(code examples: ';
    component.example.forEach((example, index) => {
      const slashIndex = example.lastIndexOf('/');
      const dotIndex = example.lastIndexOf('.');
      firstTabContent += `${index > 0 ? ', ' : ''}[${example.slice(slashIndex + 1, dotIndex)}](${example})`;
    });
    firstTabContent += ')\n';
  }

  if (component.extends) {
    let extendsText = component.extends?.join(', ');
    if (component.extendsLink) {
      extendsText = `[${extendsText}](${component.extendsLink})`;
    } else {
      extendsText = _.map(component.extends, generateExtendsLink).join(', ');
    }
    firstTabContent += `:::info\n`;
    firstTabContent += `This component extends **${extendsText}** props.\n`;
    firstTabContent += `:::\n`;
  }

  if (component.modifiers) {
    firstTabContent += `:::tip\n`;
    firstTabContent += `This component support **${component.modifiers?.join(', ')}** modifiers.\n`;
    firstTabContent += `:::\n`;
  }

  if (component.caution) {
    firstTabContent += `:::caution\n`;
    firstTabContent += `${component.caution}\n`;
    firstTabContent += `:::\n`;
  }

  if (component.note) {
    firstTabContent += `:::note\n`;
    firstTabContent += `${component.note}\n`;
    firstTabContent += `:::\n`;
  }

  /* Images */
  firstTabContent += `<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}>`;
  component.images?.forEach(image => {
    firstTabContent += `<img style={{maxHeight: '420px'}} src={'${image}'}/>`;
    firstTabContent += '\n\n';
  });
  firstTabContent += '</div>\n\n';

  /* Snippet */
  if (component.snippet) {
    firstTabContent += `### Usage\n`;
    firstTabContent += '``` jsx live\n';
    firstTabContent += component.snippet?.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n');
    firstTabContent += '\n```\n';
  }

  /* Props */
  firstTabContent += `## API\n`;
  _.sortBy(component.props, p => p.name)?.forEach(prop => {
    firstTabContent += `### ${prop.name} \n`;
    if (prop.note) {
      firstTabContent += `#### ${prop.note} \n`;
    }
    firstTabContent += `${prop.description}  \n`;
    // firstTabContent += `<span style={{color: 'grey'}}>${_.escape(prop.type)}</span>\n\n`;
    firstTabContent += `\`${prop.type} \` \n\n`;
  });


  /* Page */

  let content = '';

  /* Markdown Front Matter */
  content += `---\n`;
  if (isParentComponent) {
    content += `sidebar_position: 1\n`;
  }
  content += `id: ${component.name}\n`;
  content += `title: ${isIncubatorComponent ? 'Incubator.' : ''}${component.name}\n`;
  content += `sidebar_label: ${componentName}\n`;
  content += `---\n\n`;

  content += `import Tabs from '@theme/Tabs';\n`;
  content += `import TabItem from '@theme/TabItem';\n\n`;
  content += `<Tabs>
    <TabItem value="api" label="API" default>
      ${firstTabContent}
    </TabItem>
    <TabItem value="guidelines" label="Guidelines">
      Coming soon... 👩🏻‍💻
    </TabItem>
    <TabItem value="playground" label="Playground">
      Coming soon... 🤹🏻‍♀️
    </TabItem>
  </Tabs>`;

  content += '\n\n';

  /* Generate files */
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
