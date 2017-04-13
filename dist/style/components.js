Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require('react-native');
var _colors=require('./colors');var _colors2=_interopRequireDefault(_colors);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var Components=_reactNative.StyleSheet.create({
accessoryIndicator:{
width:10,
height:10,
marginLeft:10,
backgroundColor:'transparent',
borderTopWidth:3/_reactNative.PixelRatio.get(),
borderRightWidth:3/_reactNative.PixelRatio.get(),
borderColor:_colors2.default.dark60,
transform:[{
rotate:'45deg'}]}});exports.default=




Components;