const fs = require('fs');

const packages = [
  {
    filename: 'keyboard.js',
    content: `module.exports = require('./lib/components/Keyboard').default;\n`
  }
];

packages.forEach((package) => {
  fs.writeFileSync(package.filename, package.content);
});
