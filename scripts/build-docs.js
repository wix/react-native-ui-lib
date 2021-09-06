const childProcess = require('child_process');
const fs = require('fs');

const result = childProcess.execSync('find ./src -name "api.json"');
const apiFiles = result.toString().trim().split('\n');

const components = apiFiles.map(filePath => {
  const file = fs.readFileSync(filePath);
  const api = JSON.parse(file.toString());
  return api;
});

components.forEach(component => {
  let content = `${component.description}\n`;
  content += `## API\n`;
  component.props.forEach(prop => {
    content += `### ${prop.name}\n`;
    content += `${prop.description}  \n`;
    content += `${prop.type}\n`;
  });
  fs.writeFileSync(`./docs/components/${component.name}.md`, content, {encoding: 'utf8'});
});
