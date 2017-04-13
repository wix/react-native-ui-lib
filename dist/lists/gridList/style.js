Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=




createStyles;var _reactNative=require('react-native');var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _Constants=require('../../helpers/Constants');var Constants=_interopRequireWildcard(_Constants);var _style=require('../../style');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function createStyles(props,overrides){var
index=props.index,height=props.height,imageSize=props.imageSize;
var isLeftItem=index%2===0;
return _reactNative.StyleSheet.create(_lodash2.default.merge({
container:_extends({
width:Constants.screenWidth/2,
paddingRight:isLeftItem?0:7.5,
paddingLeft:!isLeftItem?0:7.5,
marginTop:15,
height:height,
backgroundColor:'transparent'},
_style.Shadows.white10.bottom),

innerContainer:{
height:height,
marginHorizontal:7.5,
backgroundColor:_style.Colors.white,
borderRadius:_style.BorderRadiuses.br30,
overflow:'hidden'},

topContainer:{
height:117},

bottomContainer:{
justifyContent:'space-around',
alignItems:'center',
paddingTop:7,
paddingBottom:14,
flex:1},

titleText:_extends({},
_style.Typography.text70,{
fontWeight:'400',
color:_style.ThemeManager.titleColor}),

secondaryTitleText:_extends({},
_style.Typography.text70,{
color:_style.ThemeManager.titleColor}),

subtitleText:_extends({},
_style.Typography.text90,{
color:_style.ThemeManager.subtitleColor}),

imageContainer:{
flex:1},

image:{
flex:1,
height:imageSize,
width:imageSize}},

overrides));
}