Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _style=require('../../style');
var _commons=require('../../commons');
var _assets=require('../../assets');var Assets=_interopRequireWildcard(_assets);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var


PickerItem=function(_BaseComponent){_inherits(PickerItem,_BaseComponent);function PickerItem(){_classCallCheck(this,PickerItem);return _possibleConstructorReturn(this,(PickerItem.__proto__||Object.getPrototypeOf(PickerItem)).apply(this,arguments));}_createClass(PickerItem,[{key:'generateStyles',value:function generateStyles()













{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _props=
this.props,label=_props.label,value=_props.value,isSelected=_props.isSelected,_onPress=_props.onPress;
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.5,style:this.styles.container,onPress:function onPress(){return _onPress({value:value,label:label});}},
_react2.default.createElement(_reactNative.Text,{style:this.styles.labelText},label),
isSelected&&_react2.default.createElement(_reactNative.Image,{style:this.styles.checkIcon,source:Assets.icons.check})));


}}]);return PickerItem;}(_commons.BaseComponent);PickerItem.propTypes={label:_react.PropTypes.string,value:_react.PropTypes.any,isSelected:_react.PropTypes.bool,onPress:_react.PropTypes.func};


function createStyles(){
return _reactNative.StyleSheet.create({
container:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
height:56.5,
paddingHorizontal:23,
borderColor:_style.Colors.rgba(_style.Colors.dark10,0.1),
borderBottomWidth:1},

labelText:_extends({},
_style.Typography.text70,{
color:_style.Colors.dark10}),

checkIcon:{
tintColor:_style.ThemeManager.primaryColor}});


}exports.default=

PickerItem;