Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _BaseInput2=require('./BaseInput');var _BaseInput3=_interopRequireDefault(_BaseInput2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TextArea=function(_BaseInput){_inherits(TextArea,_BaseInput);function TextArea(){_classCallCheck(this,TextArea);return _possibleConstructorReturn(this,(TextArea.__proto__||Object.getPrototypeOf(TextArea)).apply(this,arguments));}_createClass(TextArea,[{key:'generateStyles',value:function generateStyles()

{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var
value=this.state.value;
var typography=this.getTypography();
var inputStyle=[this.styles.input,typography];
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.container},
_react2.default.createElement(_reactNative.TextInput,_extends({},
this.props,{
value:value,
multiline:true,
style:inputStyle,
onChangeText:this.onChangeText}))));



}}]);return TextArea;}(_BaseInput3.default);exports.default=TextArea;


function createStyles(){
return _reactNative.StyleSheet.create({
container:{
flex:1},

input:{
flex:1,
justifyContent:'flex-start',
alignItems:'flex-start',
textAlignVertical:'top'}});


}