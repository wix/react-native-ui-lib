const fs = require('fs');
const _ = require('lodash');

const packages = [
  {
    filename: 'keyboard.js',
    content: `module.exports = require('./lib/components/Keyboard').default;\n`
  },
  {
    filename: 'config.js',
    content: `module.exports = require('./src/commons/Config').default;\n`
  },
  {
    filename: 'core.js',
    components: ['View', 'Text', 'Image', 'TouchableOpacity', 'Button'],
    styleComponents: [
      'Colors',
      'Typography',
      'Spacings',
      'BorderRadiuses',
      'Shadows',
      'ThemeManager',
      'Scheme'
    ]
  },
  {
    filename: 'style.js',
    styleComponents: [
      'Colors',
      'Typography',
      'BorderRadiuses',
      'Shadows',
      'Spacings',
      'ThemeManager',
      'Scheme'
    ]
  }
];

/* Write custom packages */
function addTyping(typings, component) {
  if (_.isEmpty(typings)) {
    typings += `{${component}`;
  } else {
    typings += `, ${component}`;
  }

  return typings;
}

packages.forEach((package) => {
  let content = package.content || '';
  let typings = '';

  if (package.components || package.styleComponents) {
    content += 'module.exports = {\n';
    _.forEach(package.components, (component) => {
      content += `get ${component}() {\n`;
      content += `return require('./src/components/${_.camelCase(component)}').default;`;
      content += `},\n`;

      typings = addTyping(typings, component);
    });

    _.forEach(package.styleComponents, (component) => {
      content += `get ${component}() {\n`;
      content += `return require('./src/style/${_.camelCase(component)}').default;`;
      content += `},\n`;

      typings = addTyping(typings, component);
    });
    content += '};\n';
    typings += '}';
    typings = `import ${typings} from './generatedTypes';\nexport ${typings};\n`;
  }

  fs.writeFileSync(package.filename, content);
  if (!_.isEmpty(typings)) {
    const filename = `${package.filename.substring(0, package.filename.indexOf('.js'))}.d.ts`;
    fs.writeFileSync(filename, typings);
  }
});

/* Write all components as separate packages */
const path = './src/components';
fs.readdir(path, (err, files) => {
  if (!err) {
    files
      .filter((f) => f !== 'index.js')
      .forEach((file) => {
        fs.writeFileSync(`${file}.js`,
          `module.exports = require('${path}/${file}').default;\n`);
        const componentName = _.upperFirst(file);
        fs.writeFileSync(`${file}.d.ts`,
          `import {${componentName}} from './generatedTypes';\nexport default ${componentName};\n`);
      });
  }
});
