let SvgPackage: any;
try {
  SvgPackage = require('react-native-svg');
  let SvgCssUri;
  try {
    SvgCssUri = require('react-native-svg/css').SvgCssUri;
  } catch (error) {
  }
  if (SvgCssUri) {
    SvgPackage.SvgCssUri = SvgCssUri;
  }
  // Sadly we cannot verify with require('react-native-svg-transformer');
} catch (error) {}

export default SvgPackage;
