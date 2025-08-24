let LinearGradientPackage: typeof import('react-native-linear-gradient') | undefined;
try {
  LinearGradientPackage = require('react-native-linear-gradient');
} catch (error) {}

export default LinearGradientPackage;
