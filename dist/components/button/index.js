Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _helpers=require('../../helpers');
var _commons=require('../../commons');
var _text=require('../text');var _text2=_interopRequireDefault(_text);
var _style=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




Button=function(_BaseComponent){_inherits(Button,_BaseComponent);function Button(){_classCallCheck(this,Button);return _possibleConstructorReturn(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));}_createClass(Button,[{key:'generateStyles',value:function generateStyles()




















































































{
this.styles=createStyles(this.props);
}},{key:'renderIcon',value:function renderIcon()

{var _props=
this.props,iconSource=_props.iconSource,iconStyle=_props.iconStyle,label=_props.label,link=_props.link,disabled=_props.disabled;
if(iconSource){
return(
_react2.default.createElement(_reactNative.Image,{
source:iconSource,
style:[
this.styles.icon,
link&&disabled&&this.styles.iconDisabled,
label&&this.styles.iconSpacing,
iconStyle]}));


}
return null;
}},{key:'renderLabel',value:function renderLabel()

{var _props2=
this.props,label=_props2.label,labelStyle=_props2.labelStyle,link=_props2.link,disabled=_props2.disabled;
var typography=this.extractTypographyValue();
var color=this.extractColorValue();
if(label){
return(
_react2.default.createElement(_text2.default,{
style:[
this.styles.text,
link&&disabled&&this.styles.textDisabled,
color&&{color:color},_extends({},
typography),
labelStyle],

numberOfLines:1},

_helpers.Constants.isAndroid?_lodash2.default.toUpper(label):label));


}
return null;
}},{key:'render',value:function render()

{var _props3=
this.props,onPress=_props3.onPress,disabled=_props3.disabled,link=_props3.link,enableShadow=_props3.enableShadow,style=_props3.style,testId=_props3.testId;
var containerStyle=this.extractContainerStyle(this.props);
var shadowStyle=enableShadow?this.styles.shadowStyle:{};var _state=
this.state,backgroundColor=_state.backgroundColor,margins=_state.margins;

return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
style:[
this.styles.container,
shadowStyle,
margins,
containerStyle],
activeOpacity:0.6,
onPress:onPress,
disabled:disabled,
testId:testId},

_react2.default.createElement(_reactNative.View,{
style:[
this.styles.innerContainer,
backgroundColor&&{backgroundColor:backgroundColor},
disabled&&this.styles.innerContainerDisabled,
link&&this.styles.innerContainerLink,
style]},


this.props.children,
this.renderIcon(),
this.renderLabel())));



}}]);return Button;}(_commons.BaseComponent);Button.displayName='Button';Button.propTypes=_extends({},_text2.default.propTypes,{label:_react.PropTypes.string,iconSource:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),iconStyle:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number,_react.PropTypes.array]),backgroundColor:_react.PropTypes.string,size:_react.PropTypes.oneOf(['small','medium','large']),borderRadius:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.oneOf(_lodash2.default.keys(_style.BorderRadiuses))]),onPress:_react.PropTypes.func,disabled:_react.PropTypes.bool,outline:_react.PropTypes.bool,outlineColor:_react.PropTypes.string,link:_react.PropTypes.bool,containerStyle:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number,_react.PropTypes.array]),labelStyle:_react.PropTypes.object,enableShadow:_react.PropTypes.bool,testId:_react.PropTypes.string});Button.defaultProps={containerStyle:{},labelStyle:{},backgroundColor:_style.ThemeManager.CTABackgroundColor,borderRadius:_helpers.Constants.isIOS?_style.BorderRadiuses.br100:_style.BorderRadiuses.br10,size:'large',outline:false,outlineColor:_style.Colors.dark70};Button.sizes={small:'small',medium:'medium',large:'large'};exports.default=Button;


function createStyles(_ref){var backgroundColor=_ref.backgroundColor,borderRadius=_ref.borderRadius,outline=_ref.outline,outlineColor=_ref.outlineColor,link=_ref.link,color=_ref.color,size=_ref.size;
var textStyleBySize={
large:{paddingHorizontal:36},
medium:{paddingHorizontal:24},
small:{paddingHorizontal:15}};


var containerStyleBySize={
large:{paddingVertical:16,minWidth:138},
medium:{paddingVertical:11,minWidth:125},
small:{paddingVertical:5,minWidth:74}};


var customBorderRadius=_lodash2.default.isString(borderRadius)?_style.BorderRadiuses[borderRadius]:borderRadius;
var showBorder=outline&&!link;
var haveBackground=!outline&&!link;
var textTypography=size==='large'?_style.Typography.text70:_style.Typography.text80;
return _reactNative.StyleSheet.create({
container:{
backgroundColor:'transparent'},

innerContainer:_extends({
backgroundColor:haveBackground?backgroundColor:undefined,
borderWidth:showBorder?1:0,
borderColor:showBorder?outlineColor:undefined,
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
borderRadius:customBorderRadius},
containerStyleBySize[size]),

innerContainerDisabled:{
backgroundColor:_style.Colors.dark60},

innerContainerLink:{
minWidth:undefined,
paddingHorizontal:undefined,
paddingVertical:undefined,
borderRadius:_style.BorderRadiuses.br0,
backgroundColor:undefined},

shadowStyle:{
shadowColor:'#3082C8',
shadowOffset:{height:5,width:0},
shadowOpacity:0.35,
shadowRadius:9.5},

text:_extends({
backgroundColor:'transparent',
flex:0,
flexDirection:'row',
color:outline||link?_style.Colors.dark10:_style.ThemeManager.CTATextColor},
textTypography,{
fontWeight:'100',
paddingHorizontal:link?0:textStyleBySize[size].paddingHorizontal}),

textSmall:_extends({},
_style.Typography.text80),

textDisabled:{
color:_style.Colors.dark60},

icon:{
width:18,
resizeMode:'contain',
tintColor:color},

iconDisabled:{
tintColor:_style.Colors.dark60},

iconSpacing:{
marginRight:7,
marginBottom:2,
paddingRight:0}});


}