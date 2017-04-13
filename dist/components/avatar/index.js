Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _commons=require('../../commons');
var _style=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




Avatar=function(_BaseComponent){_inherits(Avatar,_BaseComponent);function Avatar(){_classCallCheck(this,Avatar);return _possibleConstructorReturn(this,(Avatar.__proto__||Object.getPrototypeOf(Avatar)).apply(this,arguments));}_createClass(Avatar,[{key:'generateStyles',value:function generateStyles()










































{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _props=
this.props,label=_props.label,imageSource=_props.imageSource,isOnline=_props.isOnline,testId=_props.testId;
var containerStyle=this.extractContainerStyle(this.props);
return(
_react2.default.createElement(_reactNative.View,{style:[this.styles.container,containerStyle],testId:testId},
_react2.default.createElement(_reactNative.View,{style:this.styles.initialsContainer},
_react2.default.createElement(_reactNative.Text,{numberOfLines:1,style:this.styles.initials},
label)),



_react2.default.createElement(_reactNative.Image,{style:this.styles.image,source:imageSource}),
isOnline&&
_react2.default.createElement(_reactNative.View,{style:this.styles.onlineBadge},
_react2.default.createElement(_reactNative.View,{style:this.styles.onlineBadgeInner}))));



}}]);return Avatar;}(_commons.BaseComponent);Avatar.displayName='Avatar';Avatar.propTypes={backgroundColor:_react.PropTypes.string,containerStyle:_react.PropTypes.object,imageSource:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),label:_react.PropTypes.string,labelColor:_react.PropTypes.string,isOnline:_react.PropTypes.bool,size:_react.PropTypes.number,testId:_react.PropTypes.string};Avatar.defaultProps={backgroundColor:_style.Colors.dark80,size:50,labelColor:_style.Colors.dark10};exports.default=Avatar;


function createStyles(_ref){var size=_ref.size,backgroundColor=_ref.backgroundColor,labelColor=_ref.labelColor,imageSource=_ref.imageSource;
var borderRadius=size/2;
var fontSizeToImageSizeRatio=0.32;
var styles=_reactNative.StyleSheet.create({
container:{
alignItems:'center',
justifyContent:'center',
width:size,
height:size,
backgroundColor:backgroundColor,
borderRadius:borderRadius},

initialsContainer:{
alignItems:'center',
justifyContent:'center'},

initials:{
fontSize:size*fontSizeToImageSizeRatio,
color:labelColor,
backgroundColor:'rgba(0,0,0,0)'},

defaultImage:{
width:size,
height:size,
borderRadius:borderRadius},

image:_extends({},
_reactNative.StyleSheet.absoluteFillObject,{
position:'absolute',
width:size,
height:size,
borderRadius:borderRadius}),

onlineBadge:{
height:13.5,
width:13.5,
padding:1.5,
borderRadius:999,
backgroundColor:imageSource?_style.Colors.white:'transparent',
position:'absolute',
right:imageSource?-1.5:0,
top:-1},

onlineBadgeInner:{
flex:1,
borderRadius:999,
backgroundColor:_style.Colors.green30},

fixAbsolutePosition:{
position:undefined,
left:undefined,
bottom:undefined}});



return styles;
}