Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _helpers=require('../../helpers');
var _style=require('../../style');
var _commons=require('../../commons');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

CardImage=function(_BaseComponent){_inherits(CardImage,_BaseComponent);function CardImage(){_classCallCheck(this,CardImage);return _possibleConstructorReturn(this,(CardImage.__proto__||Object.getPrototypeOf(CardImage)).apply(this,arguments));}_createClass(CardImage,[{key:'generateStyles',value:function generateStyles()



























{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _props=
this.props,imageSource=_props.imageSource,style=_props.style;
if(imageSource){
return(
_react2.default.createElement(_reactNative.View,{style:[this.styles.container,style]},
_react2.default.createElement(_reactNative.Image,{source:imageSource,style:this.styles.image})));


}

return null;
}}]);return CardImage;}(_commons.BaseComponent);CardImage.displayName='Card Image';CardImage.propTypes={imageSource:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),height:_react.PropTypes.number,top:_react.PropTypes.bool,bottom:_react.PropTypes.bool,testId:_react.PropTypes.string};CardImage.defaultProps={height:150};exports.default=CardImage;


function generateBorderRadiusStyle(_ref){var top=_ref.top,bottom=_ref.bottom;
var borderRaidusStyle={};
if(_helpers.Constants.isAndroid){
if(top){
borderRaidusStyle.borderTopLeftRadius=_style.BorderRadiuses.br10;
borderRaidusStyle.borderTopRightRadius=_style.BorderRadiuses.br10;
}

if(bottom){
borderRaidusStyle.borderBottomLeftRadius=_style.BorderRadiuses.br10;
borderRaidusStyle.borderBottomRightRadius=_style.BorderRadiuses.br10;
}
}

return borderRaidusStyle;
}

function createStyles(_ref2){var height=_ref2.height,top=_ref2.top,bottom=_ref2.bottom;
var borderRadiusStyle=generateBorderRadiusStyle({top:top,bottom:bottom});
return _reactNative.StyleSheet.create({
container:_extends({
height:height},
borderRadiusStyle),

image:_extends({
width:null,
height:null,
flex:1,
resizeMode:'cover'},
borderRadiusStyle)});


}