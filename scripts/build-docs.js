const childProcess = require('child_process');
const fs = require('fs');

const COMPONENTS_DOCS_DIR = './docs/components';

const result = childProcess.execSync('find ./src -name "api.json"');
const apiFiles = result.toString().trim().split('\n');

const components = apiFiles.map(filePath => {
  const file = fs.readFileSync(filePath);
  const api = JSON.parse(file.toString());
  return api;
});

if (!fs.existsSync(COMPONENTS_DOCS_DIR)) {
  fs.mkdirSync(COMPONENTS_DOCS_DIR);
}

components.forEach(component => {
  let content = `${component.description}\n`;
  content += `## API\n`;
  component.props.forEach(prop => {
    content += `### ${prop.name}\n`;
    content += `${prop.description}  \n`;
    content += `${prop.type}\n`;
  });

  if (!fs.existsSync(`${COMPONENTS_DOCS_DIR}/${component.category}`)) {
    fs.mkdirSync(`${COMPONENTS_DOCS_DIR}/${component.category}`);
  }

  fs.writeFileSync(`${COMPONENTS_DOCS_DIR}/${component.category}/${component.name}.md`, content, {encoding: 'utf8'});
});
