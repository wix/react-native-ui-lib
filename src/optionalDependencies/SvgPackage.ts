let SvgPackage: any;
let SvgCssUriPackage14Higher;
try {
  SvgPackage = require('react-native-svg');
  SvgCssUriPackage14Higher = require('react-native-svg/css').SvgCssUri;
  // Sadly we cannot verify with require('react-native-svg-transformer');
} catch (error) {}

if (SvgCssUriPackage14Higher) {
  SvgPackage.SvgCssUri = SvgCssUriPackage14Higher;
}
export default SvgPackage;
