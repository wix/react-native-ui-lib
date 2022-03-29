const childProcess = require('child_process');

console.info('## Start RNUILib Build ##');

console.info('## Build Typescript ##');
childProcess.execSync('tsc --p tsconfig.build.json');

console.info('## Build src files ##');
childProcess.execSync(`./node_modules/.bin/babel src --out-dir src --config-file ./src/.babelrc.json --extensions '.ts,.tsx' --ignore 'src/index.ts'`);

console.info('## Build lib (native component) files ##');
childProcess.execSync(`./node_modules/.bin/babel lib --out-dir lib --config-file ./src/.babelrc.json --extensions '.ts,.tsx'`);

console.info('## Build standalone components packages ##');
require('./buildPackages');

console.info('## Complete RNUILib Build ##');
