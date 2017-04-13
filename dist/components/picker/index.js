Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _style=require('../../style');
var _inputs=require('../inputs');
var _PickerModal=require('./PickerModal');var _PickerModal2=_interopRequireDefault(_PickerModal);
var _PickerItem=require('./PickerItem');var _PickerItem2=_interopRequireDefault(_PickerItem);
var _PickerPresenter=require('./PickerPresenter');var PickerPresenter=_interopRequireWildcard(_PickerPresenter);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var ItemType=_react.PropTypes.shape({value:_react.PropTypes.any,label:_react.PropTypes.string});var




Picker=function(_TextInput){_inherits(Picker,_TextInput);









































function Picker(props){_classCallCheck(this,Picker);var _this=_possibleConstructorReturn(this,(Picker.__proto__||Object.getPrototypeOf(Picker)).call(this,
props));

_this.onDoneSelecting=_this.onDoneSelecting.bind(_this);
_this.toggleItemSelection=_this.toggleItemSelection.bind(_this);
_this.appendPropsToChildren=_this.appendPropsToChildren.bind(_this);
_this.cancelSelect=_this.cancelSelect.bind(_this);

_this.state=_extends({},
_this.state,{
showModal:false});


if(props.mode===Picker.modes.SINGLE&&Array.isArray(props.value)){
console.warn('Picker in SINGLE mode cannot accpet an array for value');
}

if(props.mode===Picker.modes.MULTI&&!Array.isArray(props.value)){
console.warn('Picker in MULTI mode must accpet an array for value');
}return _this;
}_createClass(Picker,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nexProps){
this.setState({
value:nexProps.value});

}},{key:'toggleItemSelection',value:function toggleItemSelection(

item){var
value=this.state.value;
var newValue=_lodash2.default.xorBy(value,[item],'value');
this.setState({
value:newValue});

}},{key:'onDoneSelecting',value:function onDoneSelecting(

item){
this.onChangeText(item);
this.toggleExpandableModal(false);
_lodash2.default.invoke(this.props,'onChange',item);
}},{key:'cancelSelect',value:function cancelSelect()

{
this.setState({
value:this.props.value});

this.toggleExpandableModal(false);
}},{key:'appendPropsToChildren',value:function appendPropsToChildren()

{var _this2=this;var _props=
this.props,children=_props.children,mode=_props.mode;var
value=this.state.value;
var childrenWithProps=_react2.default.Children.map(children,
function(child){return _react2.default.cloneElement(child,{
isSelected:PickerPresenter.isItemSelected(child.props.value,value),
onPress:mode===Picker.modes.MULTI?_this2.toggleItemSelection:_this2.onDoneSelecting});});



return childrenWithProps;
}},{key:'getLabel',value:function getLabel()

{var
value=this.state.value;
if(_lodash2.default.isArray(value)){
return _lodash2.default.chain(value).map('label').join(', ').value();
}
return _lodash2.default.get(value,'label');
}},{key:'renderExpandableInput',value:function renderExpandableInput()

{var _this3=this;
var typography=this.getTypography();
var color=this.extractColorValue()||_style.Colors.dark10;
var label=this.getLabel();

return(
_react2.default.createElement(_reactNative.Text,{
style:[this.styles.input,typography,{color:color}],
numberOfLines:3,
onPress:function onPress(){return _this3.toggleExpandableModal(true);}},

label));


}},{key:'renderExpandableModal',value:function renderExpandableModal()

{var _this4=this;var _props2=
this.props,mode=_props2.mode,enableModalBlur=_props2.enableModalBlur;var
showExpandableModal=this.state.showExpandableModal;
return(
_react2.default.createElement(_PickerModal2.default,{
visible:showExpandableModal,
onCancel:this.cancelSelect,
onDone:mode===Picker.modes.MULTI?function(){return _this4.onDoneSelecting(_this4.state.value);}:undefined,
enableModalBlur:enableModalBlur},

this.appendPropsToChildren(this.props.children)));

}}]);return Picker;}(_inputs.TextInput);Picker.displayName='Picker';Picker.modes={SINGLE:'SINGLE',MULTI:'MULTI'};Picker.propTypes=_extends({},_inputs.TextInput.propTypes,{value:_react.PropTypes.oneOfType(ItemType,_react.PropTypes.arrayOf(ItemType)),onChange:_react.PropTypes.func,mode:_react.PropTypes.oneOf(Object.keys(Picker.modes)),enableModalBlur:_react.PropTypes.bool,testId:_react.PropTypes.string});Picker.defaultProps=_extends({},_inputs.TextInput.defaultProps,{mode:Picker.modes.SINGLE,enableModalBlur:true,expandable:true,text70:true,floatingPlaceholder:true});


Picker.Item=_PickerItem2.default;exports.default=
Picker;