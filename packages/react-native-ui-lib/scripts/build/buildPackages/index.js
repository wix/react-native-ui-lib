const childProcess = require('child_process');

const path = 'scripts/build/buildPackages';

childProcess.execSync(`node ${path}/buildComponentsPackages`);
childProcess.execSync(`node ${path}/buildCustomPackages`);
