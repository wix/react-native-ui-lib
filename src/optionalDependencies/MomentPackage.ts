let MomentPackage: typeof import('moment') | undefined;

try {
  MomentPackage = require('moment');
} catch (error) {}

export default MomentPackage;
