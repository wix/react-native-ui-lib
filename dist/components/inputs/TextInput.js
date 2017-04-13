Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _BaseInput2=require('./BaseInput');var _BaseInput3=_interopRequireDefault(_BaseInput2);
var _text=require('../text');var _text2=_interopRequireDefault(_text);
var _style=require('../../style');
var _helpers=require('../../helpers');
var _screensComponents=require('../../screensComponents');
var _TextArea=require('./TextArea');var _TextArea2=_interopRequireDefault(_TextArea);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TextInput=function(_BaseInput){_inherits(TextInput,_BaseInput);





































function TextInput(props){_classCallCheck(this,TextInput);var _this=_possibleConstructorReturn(this,(TextInput.__proto__||Object.getPrototypeOf(TextInput)).call(this,
props));

_this.onChangeText=_this.onChangeText.bind(_this);
_this.onContentSizeChange=_this.onContentSizeChange.bind(_this);
_this.updateFloatingPlaceholderState=_this.updateFloatingPlaceholderState.bind(_this);
_this.toggleExpandableModal=_this.toggleExpandableModal.bind(_this);
_this.onDoneEditingExpandableInput=_this.onDoneEditingExpandableInput.bind(_this);

var typography=_this.getTypography();
_this.state={
inputWidth:typography.fontSize*2,
widthExtendBreaks:[],
value:props.value,
floatingPlaceholderState:new _reactNative.Animated.Value(_this.hasText(props.value)?1:0),
showExpandableModal:false};return _this;

}_createClass(TextInput,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
this.setState({
value:nextProps.value},
this.updateFloatingPlaceholderState);
}},{key:'generateStyles',value:function generateStyles()

{
this.styles=createStyles(this.props);
}},{key:'getUnderlineStyle',value:function getUnderlineStyle()

{var
focused=this.state.focused;var
error=this.props.error;
if(error){
return this.styles.errorUnderline;
}else if(focused){
return this.styles.focusedUnderline;
}

return null;
}},{key:'hasText',value:function hasText(

value){
return!_lodash2.default.isEmpty(value||this.state.value);


}},{key:'renderPlaceholder',value:function renderPlaceholder()

{var _this2=this;var
floatingPlaceholderState=this.state.floatingPlaceholderState;var _props=
this.props,floatingPlaceholder=_props.floatingPlaceholder,centered=_props.centered,expandable=_props.expandable,placeholder=_props.placeholder;
var typography=this.getTypography();

if(!floatingPlaceholder&&!centered&&!expandable){
return null;
}

if(centered&&this.hasText()){
return null;
}

return(
_react2.default.createElement(_reactNative.Animated.Text,{
style:[
this.styles.placeholder,
typography,
centered&&this.styles.placeholderCentered,
!centered&&{
top:floatingPlaceholderState.interpolate({
inputRange:[0,1],
outputRange:[20,0]}),

fontSize:floatingPlaceholderState.interpolate({
inputRange:[0,1],
outputRange:[typography.fontSize,_style.Typography.text80.fontSize]}),

lineHeight:this.hasText()?_style.Typography.text80.lineHeight:typography.lineHeight}],


onPress:function onPress(){return expandable&&_this2.toggleExpandableModal(true);}},

placeholder));


}},{key:'renderError',value:function renderError()

{var _props2=
this.props,enableErrors=_props2.enableErrors,error=_props2.error;
if(enableErrors){
return(
_react2.default.createElement(_text2.default,{style:this.styles.errorMessage},error));

}
}},{key:'renderExpandableModal',value:function renderExpandableModal()

{var _this3=this;var
showExpandableModal=this.state.showExpandableModal;
return(
_react2.default.createElement(_screensComponents.Modal,{
animationType:'slide',
visible:showExpandableModal,
onRequestClose:function onRequestClose(){return _this3.toggleExpandableModal(false);}},

_react2.default.createElement(_screensComponents.Modal.TopBar,{
onCancel:function onCancel(){return _this3.toggleExpandableModal(false);},
onDone:this.onDoneEditingExpandableInput}),

_react2.default.createElement(_reactNative.View,{style:this.styles.expandableModalContent},
_react2.default.createElement(_TextArea2.default,_extends({
ref:function ref(textarea){_this3.expandableInput=textarea;}},
this.props,{
value:this.state.value})))));




}},{key:'renderExpandableInput',value:function renderExpandableInput()

{var _this4=this;
var typography=this.getTypography();var
value=this.state.value;

return(
_react2.default.createElement(_text2.default,{
style:[this.styles.input,typography],
numberOfLines:3,
onPress:function onPress(){return _this4.toggleExpandableModal(true);}},

value));


}},{key:'renderTextInput',value:function renderTextInput()

{var _this5=this;
var color=this.props.color||this.extractColorValue();
var typography=this.getTypography();var _props3=
this.props,style=_props3.style,placeholder=_props3.placeholder,floatingPlaceholder=_props3.floatingPlaceholder,centered=_props3.centered,multiline=_props3.multiline,others=_objectWithoutProperties(_props3,['style','placeholder','floatingPlaceholder','centered','multiline']);var _state=
this.state,inputWidth=_state.inputWidth,value=_state.value;
var inputStyle=[
this.styles.input,
typography,
color&&{color:color},
style,
{height:multiline&&!centered?typography.lineHeight*3:typography.lineHeight},
centered&&{width:inputWidth}];


return(
_react2.default.createElement(_reactNative.TextInput,_extends({},
others,{
value:value,
placeholder:floatingPlaceholder||centered?undefined:placeholder,
underlineColorAndroid:'transparent',
style:inputStyle,
multiline:centered||multiline,
onChangeText:this.onChangeText,
onContentSizeChange:this.onContentSizeChange,
onFocus:this.onFocus,
onBlur:this.onBlur,
ref:function ref(input){_this5.input=input;}})));


}},{key:'render',value:function render()

{var _props4=
this.props,expandable=_props4.expandable,containerStyle=_props4.containerStyle;
var underlineStyle=this.getUnderlineStyle();

return(
_react2.default.createElement(_reactNative.View,{style:[this.styles.container,underlineStyle,containerStyle]},
_react2.default.createElement(_reactNative.View,{style:this.styles.innerContainer},
this.renderPlaceholder(),
expandable?this.renderExpandableInput():this.renderTextInput(),
this.renderExpandableModal()),

this.renderError()));


}},{key:'toggleExpandableModal',value:function toggleExpandableModal(

value){
this.setState({showExpandableModal:value});
}},{key:'updateFloatingPlaceholderState',value:function updateFloatingPlaceholderState(

withoutAnimation){
if(withoutAnimation){
this.state.floatingPlaceholderState.setValue(this.hasText()?1:0);
}else{
_reactNative.Animated.spring(
this.state.floatingPlaceholderState,
{
toValue:this.hasText()?1:0,
duration:150}).

start();
}
}},{key:'onDoneEditingExpandableInput',value:function onDoneEditingExpandableInput()

{
var expandableInputValue=_lodash2.default.get(this.expandableInput,'state.value');
this.setState({
value:expandableInputValue});

this.state.floatingPlaceholderState.setValue(expandableInputValue?1:0);
_lodash2.default.invoke(this.props,'onChangeText',expandableInputValue);
this.toggleExpandableModal(false);
}},{key:'onChangeText',value:function onChangeText(

text){
_lodash2.default.invoke(this.props,'onChangeText',text);

this.setState({
value:text},
this.updateFloatingPlaceholderState);var _state2=

this.state,widthExtendBreaks=_state2.widthExtendBreaks,width=_state2.width;
if(text.length<_lodash2.default.last(widthExtendBreaks)){
var typography=this.getTypography();
this.setState({
inputWidth:width-typography.fontSize,
widthExtendBreaks:widthExtendBreaks.slice(-1)});

}
}},{key:'onContentSizeChange',value:function onContentSizeChange(

event){var _props5=
this.props,multiline=_props5.multiline,centered=_props5.centered;
if(multiline&&!centered)return;
var typography=this.getTypography();
var initialHeight=typography.lineHeight+10;var _event$nativeEvent$co=
event.nativeEvent.contentSize,width=_event$nativeEvent$co.width,height=_event$nativeEvent$co.height;var _state3=
this.state,widthExtendBreaks=_state3.widthExtendBreaks,value=_state3.value;
if(height>initialHeight){
this.setState({
inputWidth:width+typography.fontSize,
widthExtendBreaks:widthExtendBreaks.concat(value.length)});

}
}}]);return TextInput;}(_BaseInput3.default);TextInput.displayName='TextInput';TextInput.propTypes=_extends({},_reactNative.TextInput.propTypes,_BaseInput3.default.propTypes,{floatingPlaceholder:_react.PropTypes.bool,hideUnderline:_react.PropTypes.bool,centered:_react.PropTypes.bool,error:_react.PropTypes.string,enableErrors:_react.PropTypes.bool,expandable:_react.PropTypes.bool,testId:_react.PropTypes.string});TextInput.defaultProps={placeholderTextColor:_style.Colors.dark60,enableErrors:true};exports.default=TextInput;


function createStyles(_ref){var placeholderTextColor=_ref.placeholderTextColor,hideUnderline=_ref.hideUnderline,centered=_ref.centered;
return _reactNative.StyleSheet.create({
container:{},

innerContainer:{
flexDirection:'row',
borderBottomWidth:hideUnderline?0:1,
borderColor:_style.Colors.dark80,
justifyContent:centered?'center':undefined,
paddingTop:20},

focusedUnderline:{
borderColor:_style.Colors.blue30},

errorUnderline:{
borderColor:_style.Colors.red30},

input:{
flex:centered&&_helpers.Constants.isIOS?undefined:1,
marginBottom:10,
padding:0,
textAlign:centered?'center':undefined,
minWidth:40,
backgroundColor:'transparent'},

placeholder:{
position:'absolute',
color:placeholderTextColor},

placeholderCentered:{
left:0,
right:0,
textAlign:'center'},

errorMessage:_extends({
color:_style.Colors.red30},
_style.Typography.text90,{
height:_style.Typography.text90.lineHeight,
textAlign:centered?'center':undefined,
marginTop:1}),

expandableModalContent:{
flex:1,
paddingTop:15,
paddingHorizontal:20}});


}