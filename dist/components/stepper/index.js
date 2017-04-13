Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');



var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _style=require('./style');var _style2=_interopRequireDefault(_style);
var _commons=require('../../commons');
var _StepperButton=require('./StepperButton');var _StepperButton2=_interopRequireDefault(_StepperButton);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




Stepper=function(_BaseComponent){_inherits(Stepper,_BaseComponent);




























function Stepper(props){_classCallCheck(this,Stepper);var _this=_possibleConstructorReturn(this,(Stepper.__proto__||Object.getPrototypeOf(Stepper)).call(this,
props));
_this.state={
value:props.initialValue};return _this;

}_createClass(Stepper,[{key:'generateStyles',value:function generateStyles()

{
this.styles=(0,_style2.default)(this.props.size);
}},{key:'getLabel',value:function getLabel()

{
return[this.state.value,this.props.label].join(' ');
}},{key:'getDisabledState',value:function getDisabledState()

{
var minusDisabled=this.state.value===this.props.min;
var plusDisabled=this.state.value===this.props.max;
return{minusDisabled:minusDisabled,plusDisabled:plusDisabled};
}},{key:'updateValue',value:function updateValue(

value){var _this2=this;
var newValue=_lodash2.default.max([value,this.props.min]);
newValue=_lodash2.default.min([newValue,this.props.max]);
if(this.state.value!==newValue){
this.setState({
value:newValue},
function(){
if(_this2.props.onValueChange){
_this2.props.onValueChange(newValue);
}
});
}
}},{key:'render',value:function render()

{var _this3=this;var _getDisabledState=
this.getDisabledState(),minusDisabled=_getDisabledState.minusDisabled,plusDisabled=_getDisabledState.plusDisabled;
return(
_react2.default.createElement(_reactNative.View,{style:[this.styles.container,this.props.containerStyle]},
_react2.default.createElement(_reactNative.View,{style:this.styles.title},
_react2.default.createElement(_reactNative.Text,{testID:'label',style:this.styles.titleText},this.getLabel())),

_react2.default.createElement(_reactNative.View,{style:this.styles.buttons},
_react2.default.createElement(_StepperButton2.default,{
label:'-',
testId:'decrease',
styles:this.styles,
disabled:minusDisabled,
onPress:function onPress(){return _this3.updateValue(_this3.state.value-1);}}),

_react2.default.createElement(_reactNative.View,{style:this.styles.separator}),
_react2.default.createElement(_StepperButton2.default,{
label:'+',
testId:'increase',
styles:this.styles,
disabled:plusDisabled,
onPress:function onPress(){return _this3.updateValue(_this3.state.value+1);}}))));




}}]);return Stepper;}(_commons.BaseComponent);Stepper.displayName='Stepper';Stepper.propTypes={label:_react2.default.PropTypes.string,min:_react2.default.PropTypes.number.isRequired,max:_react2.default.PropTypes.number,containerStyle:_react2.default.PropTypes.object,onValueChange:_react2.default.PropTypes.func,initialValue:_react2.default.PropTypes.number.isRequired};exports.default=Stepper;