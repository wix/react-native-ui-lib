Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _style=require('../../style');
var _helpers=require('../../helpers');
var _commons=require('../../commons');

var _CardSection=require('./CardSection');var _CardSection2=_interopRequireDefault(_CardSection);
var _CardItem=require('./CardItem');var _CardItem2=_interopRequireDefault(_CardItem);
var _CardImage=require('./CardImage');var _CardImage2=_interopRequireDefault(_CardImage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Card=function(_BaseComponent){_inherits(Card,_BaseComponent);function Card(){_classCallCheck(this,Card);return _possibleConstructorReturn(this,(Card.__proto__||Object.getPrototypeOf(Card)).apply(this,arguments));}_createClass(Card,[{key:'generateStyles',value:function generateStyles()


























{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _props=
this.props,onPress=_props.onPress,style=_props.style,containerStyle=_props.containerStyle,testId=_props.testId;

var Container=onPress?_reactNative.TouchableOpacity:_reactNative.View;
return(
_react2.default.createElement(Container,{style:[this.styles.container,containerStyle],onPress:onPress,testId:testId},
_react2.default.createElement(_reactNative.View,{style:[this.styles.innerContainer,style]},
this.props.children)));



}}]);return Card;}(_commons.BaseComponent);Card.displayName='Card';Card.propTypes={width:_react.PropTypes.number,height:_react.PropTypes.number,onPress:_react.PropTypes.func,containerStyle:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number,_react.PropTypes.array]),testId:_react.PropTypes.string};


function createStyles(_ref){var width=_ref.width,height=_ref.height;
return _reactNative.StyleSheet.create({
container:_extends({
width:width,
height:height,
backgroundColor:'transparent'},
_style.Shadows.white40.bottom,{
padding:_helpers.Constants.isAndroid?2:undefined}),

innerContainer:{
backgroundColor:_style.Colors.white,
borderRadius:_helpers.Constants.isIOS?_style.BorderRadiuses.br40:_style.BorderRadiuses.br10,
overflow:'hidden',
flexGrow:1,
elevation:2}});


}

Card.Section=_CardSection2.default;
Card.Item=_CardItem2.default;
Card.Image=_CardImage2.default;exports.default=

Card;