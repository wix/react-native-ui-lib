Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _commons=require('../../commons');
var _style=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

BaseInput=function(_BaseComponent){_inherits(BaseInput,_BaseComponent);




















function BaseInput(props){_classCallCheck(this,BaseInput);var _this=_possibleConstructorReturn(this,(BaseInput.__proto__||Object.getPrototypeOf(BaseInput)).call(this,
props));

_this.onChangeText=_this.onChangeText.bind(_this);
_this.onFocus=_this.onFocus.bind(_this);
_this.onBlur=_this.onBlur.bind(_this);

var typography=_this.getTypography();
_this.state={
inputWidth:typography.fontSize*2,
widthExtendBreaks:[],
value:props.value,
floatingPlaceholderState:new _reactNative.Animated.Value(props.value?1:0),
showExpandableModal:!false};return _this;

}_createClass(BaseInput,[{key:'getTypography',value:function getTypography()

{
return this.extractTypographyValue()||_style.Typography.text70;
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
}},{key:'hasText',value:function hasText()

{var
value=this.state.value;
return value&&value.length>0;
}},{key:'onFocus',value:function onFocus()

{for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
_lodash2.default.invoke.apply(_lodash2.default,[this.props,'onFocus'].concat(args));
this.setState({focused:true});
}},{key:'onBlur',value:function onBlur()

{for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}
_lodash2.default.invoke.apply(_lodash2.default,[this.props,'onBlur'].concat(args));
this.setState({focused:false});
}},{key:'onChangeText',value:function onChangeText(

text){
_lodash2.default.invoke(this.props,'onChangeText',text);

this.setState({
value:text});

}}]);return BaseInput;}(_commons.BaseComponent);BaseInput.displayName='TextInput';BaseInput.propTypes=_extends({},_reactNative.TextInput.propTypes,_commons.BaseComponent.propTypes,{color:_react.PropTypes.string,containerStyle:_react.PropTypes.object,testId:_react.PropTypes.string});BaseInput.defaultProps={placeholderTextColor:_style.Colors.dark60};exports.default=BaseInput;