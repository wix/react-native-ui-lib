Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeAnimatable=require('react-native-animatable');var Animatable=_interopRequireWildcard(_reactNativeAnimatable);
var _commons=require('../../commons');
var _style=require('./style');var _style2=_interopRequireDefault(_style);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var







GridListItem=function(_BaseComponent){_inherits(GridListItem,_BaseComponent);function GridListItem(){_classCallCheck(this,GridListItem);return _possibleConstructorReturn(this,(GridListItem.__proto__||Object.getPrototypeOf(GridListItem)).apply(this,arguments));}_createClass(GridListItem,[{key:'generateStyles',value:function generateStyles()






















{
this.styles=(0,_style2.default)(this.props);
}},{key:'renderTop',value:function renderTop()

{
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.topContainer},
this.renderImage()));


}},{key:'renderBottom',value:function renderBottom()

{
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.bottomContainer},
this.renderSecondaryTitle(),
this.renderTitle(),
this.renderSubtitle()));


}},{key:'renderImage',value:function renderImage()

{var
imageSource=this.props.imageSource;
if(imageSource){
return(
_react2.default.createElement(_reactNative.View,{style:this.styles.imageContainer},
_react2.default.createElement(_reactNative.Image,{style:this.styles.image,source:imageSource})));


}
return null;
}},{key:'renderSecondaryTitle',value:function renderSecondaryTitle()

{var
secondaryTitle=this.props.secondaryTitle;
return(
_react2.default.createElement(_reactNative.Text,{style:this.styles.secondaryTitleText},
secondaryTitle));


}},{key:'renderTitle',value:function renderTitle()

{var
title=this.props.title;
return(
_react2.default.createElement(_reactNative.Text,{style:this.styles.titleText},
title));


}},{key:'renderSubtitle',value:function renderSubtitle()

{var
subtitle=this.props.subtitle;
return(
_react2.default.createElement(_reactNative.Text,{style:this.styles.subtitleText},
subtitle));


}},{key:'render',value:function render()

{var _props=
this.props,onPress=_props.onPress,disabled=_props.disabled;
var animationProps=this.extractAnimationProps();
var Container=onPress&&!disabled?_reactNative.TouchableOpacity:_reactNative.View;
return(
_react2.default.createElement(Container,{style:[this.styles.container,disabled&&this.containerDisabled],onPress:onPress},
_react2.default.createElement(Animatable.View,_extends({},
animationProps,{
style:[
this.styles.innerContainer,
disabled&&this.styles.innerContainerDisabled]}),


this.renderTop(),
this.renderBottom())));




}}]);return GridListItem;}(_commons.BaseComponent);GridListItem.displayName='Grid List Item';GridListItem.propTypes=_extends({},_commons.BaseComponent.propTypes,{index:_react.PropTypes.number.isRequired,title:_react.PropTypes.string,titleStyle:_react.PropTypes.object,secondaryTitle:_react.PropTypes.string,secondaryTitleStyle:_react.PropTypes.object,subtitle:_react.PropTypes.string,subtitleStyle:_react.PropTypes.object,onPress:_react.PropTypes.func,height:_react.PropTypes.number,imageSource:_react.PropTypes.object,disabled:_react.PropTypes.bool});GridListItem.defaultProps=_extends({},_commons.BaseComponent.defaultProps,{height:210});exports.default=GridListItem;