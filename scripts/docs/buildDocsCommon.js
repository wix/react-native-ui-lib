/**
 * This script generate markdown pages for each of our components based on the api.json files
 */
const _ = require('lodash');
const childProcess = require('child_process');
const fs = require('fs');

const COMPONENTS_DOCS_DIR = './docs/components';
const SERVICES_DOCS_DIR = './docs/services';
const FOUNDATION_DOCS_DIR = './docs/foundation';

const VALID_COMPONENTS_CATEGORIES = [
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
  'infra',
  // non components categories
  'services'
];

function buildDocs(apiFolders, componentsPreProcess) {
  let components = readComponentsFromApiFiles(apiFolders);

  logStatistics(components);

  components = componentsPreProcess?.(components) ?? components;
  resetDocsDir();
  processComponents(components);
}

function readComponentsFromApiFiles(apiFolders) {
  let apiFiles = childProcess.execSync(`find ${apiFolders} -name "*api.json"`);
  apiFiles = apiFiles.toString().trim().split('\n');

  return apiFiles.map(filePath => {
    const file = fs.readFileSync(filePath);
    const api = JSON.parse(file.toString());
    return api;
  });
}

function resetDocsDir() {
  if (fs.existsSync(COMPONENTS_DOCS_DIR)) {
    childProcess.execSync(`rm -rf ${COMPONENTS_DOCS_DIR}`);
  }
  fs.mkdirSync(COMPONENTS_DOCS_DIR, {recursive: true});
}

function isCompoundComponent(componentName) {
  return componentName.includes('.');
}

function processComponents(components) {
  /** Break into compound components (TabController.TabPage) and parent components (TabController) */
  const compoundComponents = components.filter(c => isCompoundComponent(c.name));
  const parentComponents = _.flow(components => _.map(components, c => c.name.split('.')[0]),
    _.uniq)(compoundComponents);

  components.forEach(component => {
    const [componentName, componentParentName] = getComponentNameParts(component.name);
    const isParentComponent = parentComponents.includes(componentName);
    const isIncubatorComponent = component.category === 'incubator';

    if (!VALID_COMPONENTS_CATEGORIES.includes(component.category)) {
      console.error(`${componentName} has invalid category "${component.category}"`);
    }

    /* Markdown Front Matter */
    let content = '';
    content += '---\n';
    if (isParentComponent) {
      content += 'sidebar_position: 1\n';
    }
    const title = component.docs?.hero ? '""' : `${isIncubatorComponent ? 'Incubator.' : ''}${component.name}`;
    content += `id: ${component.name}\n`;
    content += `title: ${title}\n`;
    content += `sidebar_label: ${componentName}\n`;
    content += '---\n\n';

    content += `import ComponentPage from '@site/src/components/ComponentPage';\n\n`;
    const componentObject = JSON.stringify(component);
    content += `<ComponentPage component={${componentObject}}/>\n`;

    let dirPath;
    switch (component.category) {
      case 'services': {
        dirPath = `${SERVICES_DOCS_DIR}`;
        break;
      }
      case 'foundation': {
        dirPath = `${FOUNDATION_DOCS_DIR}`;
        break;
      }
      default: {
        const componentParentDir =
          componentParentName || isParentComponent ? `/${componentParentName || componentName}` : '';
        dirPath = `${COMPONENTS_DOCS_DIR}/${component.category}${componentParentDir}`;
        break;
      }
    }

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {recursive: true});
    }

    fs.writeFileSync(`${dirPath}/${component.name.replaceAll(' ', '_')}.md`, content, {encoding: 'utf8'});
  });
}

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

function logStatistics(components) {
  const groupedComponents = _.countBy(components, 'name');
  const duplicateComponents = Object.entries(groupedComponents)
    .filter(([_, count]) => count > 1)
    .map(([name, count]) => `${name} (${count} times)`);

  if (duplicateComponents.length > 0) {
    console.log('Components with multiple occurrences:\n-', duplicateComponents.join('\n- '));
  }

  const componentsWithoutSnippet = components.filter(c => !c.snippet).map(c => c.name);
  if (componentsWithoutSnippet.length > 0) {
    console.log('Components missing snippet:\n-', componentsWithoutSnippet.join('\n- '));
  }
}

module.exports = {buildDocs};
