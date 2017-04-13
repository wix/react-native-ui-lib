Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeBlur=require('react-native-blur');
var _style=require('../../style');
var _helpers=require('../../helpers');
var _commons=require('../../commons');
var _screensComponents=require('../../screensComponents');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

PickerModal=function(_BaseComponent){_inherits(PickerModal,_BaseComponent);function PickerModal(){_classCallCheck(this,PickerModal);return _possibleConstructorReturn(this,(PickerModal.__proto__||Object.getPrototypeOf(PickerModal)).apply(this,arguments));}_createClass(PickerModal,[{key:'generateStyles',value:function generateStyles()







{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _props=
this.props,visible=_props.visible,onCancel=_props.onCancel,onDone=_props.onDone,enableModalBlur=_props.enableModalBlur,children=_props.children;
var Container=_helpers.Constants.isIOS&&enableModalBlur?_reactNativeBlur.BlurView:_reactNative.View;
return(
_react2.default.createElement(_screensComponents.Modal,{
animationType:'slide',
transparent:_helpers.Constants.isIOS&&enableModalBlur,
visible:visible,
onRequestClose:onCancel},

_react2.default.createElement(Container,{style:this.styles.container,blurType:'light'},
_react2.default.createElement(_screensComponents.Modal.TopBar,{onDone:onDone,onCancel:onCancel}),
_react2.default.createElement(_reactNative.View,{style:this.styles.modalBody},
children))));




}}]);return PickerModal;}(_commons.BaseComponent);PickerModal.propTypes=_extends({onCancel:_react.PropTypes.func,onDone:_react.PropTypes.func},_screensComponents.Modal.propTypes);


function createStyles(){
return _reactNative.StyleSheet.create({
container:{
flex:1},

modalHeader:{
height:32+_helpers.Constants.statusBarHeight,
flexDirection:'row'},

modalHeaderPart:{
flex:1,
flexDirection:'row',
alignItems:'flex-end'},

modalHeaderLeft:{
paddingLeft:20},

modalHeaderMiddle:{
justifyContent:'center'},

modalHeaderRight:{
justifyContent:'flex-end',
paddingRight:20},

headerText:_extends({},
_style.Typography.text70,{
color:_style.Colors.dark10}),

headerActionText:_extends({},
_style.Typography.text70,{
color:_style.ThemeManager.primaryColor}),

modalBody:{
paddingTop:30}});


}exports.default=

PickerModal;