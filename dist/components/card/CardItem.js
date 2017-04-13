Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _commons=require('../../commons');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

CardItem=function(_BaseComponent){_inherits(CardItem,_BaseComponent);function CardItem(){var _ref;var _temp,_this,_ret;_classCallCheck(this,CardItem);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=CardItem.__proto__||Object.getPrototypeOf(CardItem)).call.apply(_ref,[this].concat(args))),_this),_this.














defaultProps={
row:true},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(CardItem,[{key:'generateStyles',value:function generateStyles()


{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var
style=this.props.style;
return(
_react2.default.createElement(_reactNative.View,{style:[this.styles.container,style]},
this.props.children));


}}]);return CardItem;}(_commons.BaseComponent);CardItem.displayName='Card Item';CardItem.propTypes={row:_react.PropTypes.bool,column:_react.PropTypes.bool};exports.default=CardItem;


function createStyles(_ref2){var column=_ref2.column;
return _reactNative.StyleSheet.create({
container:{
flexDirection:column?'column':'row'}});


}