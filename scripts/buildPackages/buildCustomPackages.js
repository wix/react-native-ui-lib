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
    filename: 'constants.js',
    content: `module.exports = require('./src/commons/Constants').default;\n`
  },
  {
    filename: 'textField.js',
    content: `module.exports = require('./src/components/textField/TextFieldMigrator').default;\n`
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
    typings = `import ${typings} from './src';\nexport ${typings};\n`;
  }

  fs.writeFileSync(package.filename, content);
  if (!_.isEmpty(typings)) {
    const filename = `${package.filename.substring(0, package.filename.indexOf('.js'))}.d.ts`;
    fs.writeFileSync(filename, typings);
  }
});
