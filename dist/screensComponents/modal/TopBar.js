Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeUiLib=require('react-native-ui-lib');
var _commons=require('../../commons');
var _helpers=require('../../helpers');
var _assets=require('../../assets');var Assets=_interopRequireWildcard(_assets);
var _style=require('../../style');

var _button=require('../../components/button');var _button2=_interopRequireDefault(_button);
var _text=require('../../components/text');var _text2=_interopRequireDefault(_text);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TopBar=function(_BaseComponent){_inherits(TopBar,_BaseComponent);function TopBar(){_classCallCheck(this,TopBar);return _possibleConstructorReturn(this,(TopBar.__proto__||Object.getPrototypeOf(TopBar)).apply(this,arguments));}_createClass(TopBar,[{key:'generateStyles',value:function generateStyles()



















{
this.styles=createStyles(this.props);
}},{key:'renderDone',value:function renderDone()

{var _props=
this.props,doneLabel=_props.doneLabel,doneIcon=_props.doneIcon,onDone=_props.onDone;
if(onDone&&(doneLabel||doneIcon)){
return(
_react2.default.createElement(_button2.default,{link:true,onPress:onDone},
_react2.default.createElement(_reactNative.Image,{style:this.styles.icon,source:doneIcon}),
_react2.default.createElement(_text2.default,{blue30:true,text70:true},doneLabel)));


}
return null;
}},{key:'renderCancel',value:function renderCancel()

{var _props2=
this.props,cancelLabel=_props2.cancelLabel,cancelIcon=_props2.cancelIcon,onCancel=_props2.onCancel;
if(onCancel&&(cancelLabel||cancelIcon)){
return(
_react2.default.createElement(_button2.default,{link:true,onPress:onCancel},
_react2.default.createElement(_reactNative.Image,{style:this.styles.icon,source:cancelIcon}),
_react2.default.createElement(_text2.default,{blue30:true,text70:true},cancelLabel)));


}
return null;
}},{key:'render',value:function render()

{var
title=this.props.title;

return(
_react2.default.createElement(_reactNative.View,{style:this.styles.container},
_react2.default.createElement(_reactNative.View,{style:[this.styles.part,this.styles.leftPart]},
this.renderCancel()),

_react2.default.createElement(_reactNative.View,{style:[this.styles.part,this.styles.middlePart]},
_react2.default.createElement(_text2.default,{text70:true,style:{fontWeight:'500'}},title)),

_react2.default.createElement(_reactNative.View,{style:[this.styles.part,this.styles.rightPart]},
this.renderDone())));



}}]);return TopBar;}(_commons.BaseComponent);TopBar.propTypes={title:_react.PropTypes.string,titleStyle:_react.PropTypes.object,doneLabel:_react.PropTypes.string,donelIcon:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),doneStyle:_react.PropTypes.object,onDone:_react.PropTypes.func,cancelLabel:_react.PropTypes.string,cancelIcon:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),cancelStyle:_react.PropTypes.object,onCancel:_react.PropTypes.func};TopBar.defaultProps={doneLabel:'Save',cancelIcon:Assets.icons.x};exports.default=TopBar;


function createStyles(){
return _reactNative.StyleSheet.create({
container:{
flexDirection:'row',
height:32+_helpers.Constants.statusBarHeight},

part:{
flex:1,
flexDirection:'row',
alignItems:'flex-end'},

leftPart:{
paddingLeft:20},

middlePart:{
justifyContent:'center'},

rightPart:{
justifyContent:'flex-end',
paddingRight:20},

icon:{
width:16,
height:16,
tintColor:_style.Colors.dark10}});


}