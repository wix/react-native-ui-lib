Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactNative=require('react-native');
var _Constants=require('../../helpers/Constants');var Constants=_interopRequireWildcard(_Constants);
var _style=require('../../style');
var _commons=require('../../commons');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




StateScreen=function(_BaseComponent){_inherits(StateScreen,_BaseComponent);function StateScreen(){_classCallCheck(this,StateScreen);return _possibleConstructorReturn(this,(StateScreen.__proto__||Object.getPrototypeOf(StateScreen)).apply(this,arguments));}_createClass(StateScreen,[{key:'generateStyles',value:function generateStyles()




























{var
imageSource=this.props.imageSource;
var isRemoteImage=_lodash2.default.isObject(imageSource)&&Boolean(imageSource.uri);
this.styles=createStyles(isRemoteImage);
}},{key:'render',value:function render()

{var _props=
this.props,title=_props.title,subtitle=_props.subtitle,imageSource=_props.imageSource,ctaLabel=_props.ctaLabel,onCtaPress=_props.onCtaPress,testId=_props.testId;
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.container,testID:testId},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Image,{style:this.styles.image,resizeMode:'contain',source:imageSource})),

_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:[this.styles.title]},title),
_react2.default.createElement(_reactNative.Text,{style:[this.styles.subtitle]},subtitle)),

_react2.default.createElement(_reactNative.View,{style:this.styles.cta},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:onCtaPress},
_react2.default.createElement(_reactNative.Text,{style:this.styles.ctaLabel},
Constants.isAndroid?_lodash2.default.toUpper(ctaLabel):ctaLabel)))));





}}]);return StateScreen;}(_commons.BaseComponent);StateScreen.displayName='StateScreen';StateScreen.propTypes={imageSource:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),title:_react.PropTypes.string.isRequired,subtitle:_react.PropTypes.any,ctaLabel:_react.PropTypes.string,onCtaPress:_react.PropTypes.func,testId:_react.PropTypes.string};exports.default=StateScreen;


function createStyles(isRemoteImage){
var imageStyle=_lodash2.default.merge({height:200},isRemoteImage&&{width:Constants.screenWidth*0.9});
return _reactNative.StyleSheet.create({
container:{
flex:1,
paddingTop:80,
justifyContent:'flex-start',
alignItems:'center'},

image:imageStyle,
title:_extends({
textAlign:'center'},
_style.Typography.text50,{
color:_style.ThemeManager.titleColor,
fontWeight:'300'}),

subtitle:_extends({
textAlign:'center'},
_style.Typography.text70,{
color:_style.ThemeManager.subtitleColor,
fontWeight:'300',
marginTop:12}),

cta:{
marginTop:30},

ctaLabel:_extends({
color:_style.ThemeManager.primaryColor},
_style.Typography.text70)});


}