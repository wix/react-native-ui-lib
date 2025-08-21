let LinearGradientPackage: typeof import('react-native-linear-gradient') | {default: () => null};
try {
  LinearGradientPackage = require('react-native-linear-gradient');
} catch (error) {
  LinearGradientPackage = {default: () => null};
}

export default LinearGradientPackage;
