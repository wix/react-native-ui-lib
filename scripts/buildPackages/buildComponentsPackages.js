const fs = require('fs');
const _ = require('lodash');

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
          `import {${componentName}} from './src';\nexport default ${componentName};\n`);
      });
  }
});
