const childProcess = require('child_process');

const BABEL_OPTIONS = `--config-file ./src/.babelrc.json --extensions '.ts,.tsx' --ignore "src/**/*.d.ts"`;

console.info('## Start RNUILib Build ##');

console.info('## Build Typescript ##');
childProcess.execSync('tsc --p tsconfig.build.json');

console.info('## Build src files - convert TS to JS files ##');
childProcess.execSync(`./node_modules/.bin/babel src --out-dir src ${BABEL_OPTIONS}`);

console.info('## Build lib (native component) files - convert TS to JS files ##');
childProcess.execSync(`./node_modules/.bin/babel lib --out-dir lib ${BABEL_OPTIONS}`);

console.info('## Build standalone components packages ##');
require('./buildPackages');

console.info('## Complete RNUILib Build ##');
