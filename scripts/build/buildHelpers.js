#!/usr/bin/env node

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

console.info('## Building react-native-ui-lib for Metro bundler ##');

const BABEL_OPTIONS = `--config-file ./src/.babelrc.json --extensions '.ts,.tsx' --ignore "src/**/*.d.ts"`;

const directories = [
  'src/helpers',
  'src/commons',
  'src/style', 
  'src/services',
  'src/incubator',
  'src/hooks',
  'src/assets',
  'src/components'
];

try {
  // Build all source directories
  for (const dir of directories) {
    console.info(`## Transpiling ${dir} ##`);
    childProcess.execSync(`./node_modules/.bin/babel ${dir} --out-dir ${dir} ${BABEL_OPTIONS}`, {stdio: 'inherit'});
  }

  // Build main index file
  console.info('## Transpiling main index file ##');
  childProcess.execSync(`./node_modules/.bin/babel src/index.ts --out-file src/index.js ${BABEL_OPTIONS}`, {stdio: 'inherit'});

  // Fix import extensions for Metro compatibility
  console.info('## Fixing import extensions for Metro bundler ##');
  const helpersIndexPath = path.join(__dirname, '../../src/helpers/index.js');
  let helpersIndexContent = fs.readFileSync(helpersIndexPath, 'utf8');
  
  // Add .js extensions to relative imports for Metro bundler compatibility
  helpersIndexContent = helpersIndexContent
    .replace('from "./AvatarHelper"', 'from "./AvatarHelper.js"')
    .replace('from "./Profiler"', 'from "./Profiler.js"');
  
  fs.writeFileSync(helpersIndexPath, helpersIndexContent, 'utf8');

  // Update package.json to point to JS file
  console.info('## Updating package.json main entry ##');
  const packagePath = path.join(__dirname, '../../package.json');
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (package.main !== 'src/index.js') {
    package.main = 'src/index.js';
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2), {encoding: 'utf8'});
    console.info('## Updated package.json main entry to src/index.js ##');
  } else {
    console.info('## package.json main entry already correct ##');
  }

  console.info('## ✅ Complete build successful! ##');
  console.info('## The library should now work correctly with Metro bundler ##');
} catch (error) {
  console.error('## ❌ Build failed ##');
  console.error(error.message);
  process.exit(1);
}
