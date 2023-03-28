let LightDatePackage: typeof import('light-date') | undefined;
try {
  LightDatePackage = require('light-date');
} catch (error) {}

export default LightDatePackage;
