const fs = require('fs');
const _ = require('lodash');

const packages = [
  {
    filename: 'keyboard.js',
    content: `module.exports = require('./lib/components/Keyboard').default;\n`
  },
  {
    filename: 'core.js',
    components: ['View', 'Text', 'Image', 'TouchableOpacity', 'Button']
  }
];

/* Write custom packages */
packages.forEach((package) => {
  let content = package.content || '';

  if (package.components) {
    content += 'module.exports = {\n';
    package.components.forEach((component) => {
      content += `get ${component}() {\n`;
      content += `return require('./src/components/${_.camelCase(
        component
      )}').default;`;
      content += `},\n`;
    });
    content += '};\n';
  }

  fs.writeFileSync(package.filename, content);
});

/* Write all components as separate packages */
const path = './src/components';
fs.readdir(path, (err, files) => {
  if (!err) {
    files
      .filter((f) => f !== 'index.js')
      .forEach((file) => {
        fs.writeFileSync(
          `${file}.js`,
          `module.exports = require('${path}/${file}').default;\n`
        );
      });
  }
});
