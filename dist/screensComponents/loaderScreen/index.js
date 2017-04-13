Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _style=require('../../style');
var _Constants=require('../../helpers/Constants');var Constants=_interopRequireWildcard(_Constants);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}




var LoaderScreen=function LoaderScreen(_ref){var loaderColor=_ref.loaderColor;return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.ActivityIndicator,{
size:'large',
animating:true,
color:loaderColor||(Constants.isIOS?_style.Colors.dark60:_style.ThemeManager.primaryColor)})));};




LoaderScreen.displayName='LoaderScreen';
LoaderScreen.propTypes={



loaderColor:_react2.default.PropTypes.string};


var styles={
container:{
flex:1,
alignItems:'center',
justifyContent:'center'}};exports.default=



LoaderScreen;