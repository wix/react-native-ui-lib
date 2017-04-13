Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=



createStyles;var _reactNative=require('react-native');var _Constants=require('../../helpers/Constants');var Constants=_interopRequireWildcard(_Constants);var _style=require('../../style');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function createStyles(){
var separatorColor=_style.Colors.dark70;
var bottomTextMargin=4;
return _reactNative.StyleSheet.create({
container:{
flexDirection:'row',
alignItems:'center'},



buttons:{
flexDirection:'row',
borderRadius:Constants.isIOS?21:2,
borderWidth:1,
borderColor:separatorColor,
width:Constants.isIOS?100:98,
height:Constants.isIOS?42:35},

button:{
flex:0.5,
alignItems:'center',
justifyContent:'center'},

title:{
justifyContent:'center',
flex:0.6,
height:Constants.isIOS?70:68},

titleText:_extends({},
_style.Typography.text70,{
color:_style.Colors.dark10}),

separator:{
marginTop:Constants.isIOS?4:2,
height:Constants.isIOS?32:30,
borderWidth:Constants.isIOS?1/_reactNative.PixelRatio.get():undefined,
borderLeftWidth:Constants.isIOS?undefined:1,
borderColor:separatorColor},

buttonText:{
fontSize:30,
fontWeight:'200',
color:_style.ThemeManager.primaryColor,
backgroundColor:'transparent',
marginBottom:bottomTextMargin},

disableText:{
color:_style.Colors.dark70,
marginBottom:bottomTextMargin}});


}