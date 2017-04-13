Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeAnimatable=require('react-native-animatable');var Animatable=_interopRequireWildcard(_reactNativeAnimatable);
var _style=require('../../style');
var _commons=require('../../commons');

var _ListItemPart=require('./ListItemPart');var _ListItemPart2=_interopRequireDefault(_ListItemPart);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

ListItem=function(_BaseComponent){_inherits(ListItem,_BaseComponent);


























function ListItem(props){_classCallCheck(this,ListItem);var _this=_possibleConstructorReturn(this,(ListItem.__proto__||Object.getPrototypeOf(ListItem)).call(this,
props));
_this.state={
pressed:false};return _this;

}_createClass(ListItem,[{key:'generateStyles',value:function generateStyles()

{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _this2=this;var _props=
this.props,style=_props.style,onPress=_props.onPress,testId=_props.testId;var
pressed=this.state.pressed;
var containerStyle=this.extractContainerStyle(this.props);
var animationProps=this.extractAnimationProps();
var Container=onPress?_reactNative.TouchableHighlight:_reactNative.View;

return(
_react2.default.createElement(Container,{
activeOpacity:1,
style:[this.styles.container,containerStyle],
onPress:onPress,testId:testId,
onHideUnderlay:function onHideUnderlay(){return _this2.setState({pressed:false});},
onShowUnderlay:function onShowUnderlay(){return _this2.setState({pressed:true});}},

_react2.default.createElement(Animatable.View,_extends({},
animationProps,{
style:[this.styles.innerContainer,style,pressed&&this.styles.pressed]}),

this.props.children)));



}}]);return ListItem;}(_commons.BaseComponent);ListItem.displayName='ListItem';ListItem.propTypes={height:_react.PropTypes.number,onPress:_react.PropTypes.func,containerStyle:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),testId:_react.PropTypes.string};ListItem.defaultProps={height:63};


function createStyles(_ref){var height=_ref.height;
return _reactNative.StyleSheet.create({
container:{},

pressed:{
backgroundColor:_style.Colors.dark70},

innerContainer:{
flexDirection:'row',
backgroundColor:_style.Colors.white,
height:height}});


}

ListItem.Part=_ListItemPart2.default;exports.default=

ListItem;