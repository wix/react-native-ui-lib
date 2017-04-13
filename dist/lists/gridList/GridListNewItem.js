Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _GridListItem2=require('./GridListItem');var _GridListItem3=_interopRequireDefault(_GridListItem2);
var _style=require('./style');var _style2=_interopRequireDefault(_style);
var _style3=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var






GridListNewItem=function(_GridListItem){_inherits(GridListNewItem,_GridListItem);function GridListNewItem(){_classCallCheck(this,GridListNewItem);return _possibleConstructorReturn(this,(GridListNewItem.__proto__||Object.getPrototypeOf(GridListNewItem)).apply(this,arguments));}_createClass(GridListNewItem,[{key:'generateStyles',value:function generateStyles()
















{
this.styles=(0,_style2.default)(this.props,customStyle);
}},{key:'renderTop',value:function renderTop()

{
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.topContainer},
this.renderImage()));


}},{key:'renderBottom',value:function renderBottom()

{
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.bottomContainer},
this.renderTitle()));


}},{key:'renderImage',value:function renderImage()

{var _props=
this.props,imageSource=_props.imageSource,disabled=_props.disabled;
if(imageSource){
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.imageContainer},
_react2.default.createElement(_reactNative.Image,{style:[this.styles.image,disabled&&this.styles.imageDisabled],source:imageSource})));


}
return null;
}},{key:'renderTitle',value:function renderTitle()

{var _props2=
this.props,title=_props2.title,disabled=_props2.disabled;
return(
_react2.default.createElement(_reactNative.Text,{style:[this.styles.titleText,disabled&&this.styles.titleTextDisabled]},
title));


}}]);return GridListNewItem;}(_GridListItem3.default);GridListNewItem.displayName='Grid List New Item';GridListNewItem.propTypes={index:_react.PropTypes.number.isRequired,imageSource:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),imageSize:_react.PropTypes.number,title:_react.PropTypes.string,titleStyle:_react.PropTypes.object,onPress:_react.PropTypes.func,height:_react.PropTypes.number};GridListNewItem.defaultProps=_extends({},_GridListItem3.default.defaultProps,{imageSize:46});exports.default=GridListNewItem;


var customStyle={
innerContainerDisabled:{
borderColor:_style3.Colors.dark70,
borderWidth:1,
backgroundColor:'transparent'},

topContainer:{
height:157},

bottomContainer:{
alignItems:'center',
flex:1},

titleTextDisabled:{
color:_style3.Colors.dark60},

imageContainer:{
flex:1,
alignItems:'center',
justifyContent:'center'},

image:{
flex:0},

imageDisabled:{
tintColor:_style3.Colors.dark60}};