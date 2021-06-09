let SvgPackage;

try {
  SvgPackage = require('react-native-svg'); // Sadly we cannot verify with require('react-native-svg-transformer');
} catch (error) {}

export default SvgPackage;