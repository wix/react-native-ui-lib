Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeBlur=require('react-native-blur');
var _commons=require('../../commons');
var _helpers=require('../../helpers');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

CardSection=function(_BaseComponent){_inherits(CardSection,_BaseComponent);function CardSection(){_classCallCheck(this,CardSection);return _possibleConstructorReturn(this,(CardSection.__proto__||Object.getPrototypeOf(CardSection)).apply(this,arguments));}_createClass(CardSection,[{key:'generateStyles',value:function generateStyles()























{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _props=
this.props,enableBlur=_props.enableBlur,blurOptions=_props.blurOptions,style=_props.style;
var Container=_helpers.Constants.isIOS&&enableBlur?_reactNativeBlur.BlurView:_reactNative.View;
return(
_react2.default.createElement(Container,_extends({},blurOptions,{style:[this.styles.container,style]}),
this.props.children));


}}]);return CardSection;}(_commons.BaseComponent);CardSection.displayName='Card Section';CardSection.propTypes={enableBlur:_react.PropTypes.bool,blurOptions:_react.PropTypes.object,body:_react.PropTypes.bool,footer:_react.PropTypes.bool,testId:_react.PropTypes.string};exports.default=CardSection;


function createStyles(_ref){var body=_ref.body,footer=_ref.footer;
return _reactNative.StyleSheet.create({
container:{
flexDirection:body?undefined:'row',
justifyContent:body?undefined:'space-between',
alignItems:body?undefined:'center',
marginBottom:footer||body?undefined:10,
padding:body?21:undefined}});


}