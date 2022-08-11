let SvgPackage: any;
try {
  console.log('before svg require:', SvgPackage);
  SvgPackage = require('react-native-svg');
  // Sadly we cannot verify with require('react-native-svg-transformer');
  console.log('SvgPackage:', SvgPackage);
  
} catch (error) {
  console.error(error, SvgPackage);
  
}
console.log('default exported');
export default SvgPackage;

