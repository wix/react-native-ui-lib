let SvgPackage: any;
let svgCssForPackage14Higher: any;
try {
  SvgPackage = require('react-native-svg');
  svgCssForPackage14Higher = require('react-native-svg/css');
  // Sadly we cannot verify with require('react-native-svg-transformer');
} catch (error) {}

export const SvgCssUri = svgCssForPackage14Higher?.SvgCssUri ?? SvgPackage?.SvgCssUri;
export default SvgPackage;
