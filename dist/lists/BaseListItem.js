Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeAnimatable=require('react-native-animatable');var Animatable=_interopRequireWildcard(_reactNativeAnimatable);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _commons=require('../commons');
var _style=require('../style');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




BaseListItem=function(_BaseComponent){_inherits(BaseListItem,_BaseComponent);function BaseListItem(){_classCallCheck(this,BaseListItem);return _possibleConstructorReturn(this,(BaseListItem.__proto__||Object.getPrototypeOf(BaseListItem)).apply(this,arguments));}_createClass(BaseListItem,[{key:'renderLeft',value:function renderLeft()





{
return null;
}},{key:'renderMiddle',value:function renderMiddle()

{
return(
_react2.default.createElement(_reactNative.View,null,
this.renderMiddleTop(),
this.renderMiddleBottom()));


}},{key:'renderMiddleTop',value:function renderMiddleTop()

{
return null;
}},{key:'renderMiddleBottom',value:function renderMiddleBottom()

{
return null;
}},{key:'renderRight',value:function renderRight()

{
return null;
}},{key:'generateStyles',value:function generateStyles(

overrides){
this.styles=createStyles(overrides);
}},{key:'render',value:function render()

{var
onPress=this.props.onPress;
var Container=onPress?_reactNative.TouchableOpacity:_reactNative.View;
var animationProps=this.extractAnimationProps();

return(
_react2.default.createElement(Container,{style:this.styles.container,onPress:onPress},
_react2.default.createElement(Animatable.View,_extends({style:this.styles.innerContainer},animationProps),
_react2.default.createElement(_reactNative.View,{style:this.styles.leftContainer},
this.renderLeft()),

_react2.default.createElement(_reactNative.View,{style:this.styles.middleContainer},
this.renderMiddle()),

_react2.default.createElement(_reactNative.View,{style:this.styles.rightContainer},
this.renderRight()))));




}}]);return BaseListItem;}(_commons.BaseComponent);BaseListItem.displayName='BaseList';BaseListItem.propTypes={onPress:_react.PropTypes.func};exports.default=BaseListItem;


function createStyles(overrides){
return _reactNative.StyleSheet.create(_lodash2.default.merge({
container:{},

innerContainer:{
flexDirection:'row',
flex:1},

leftContainer:{},

middleContainer:{
flex:1,
justifyContent:'center',
paddingRight:19,
borderBottomWidth:1,
borderColor:_style.ThemeManager.dividerColor},

middleTopContainer:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginBottom:3},

middleBottomContainer:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'},

rightContainer:{}},

overrides));
}