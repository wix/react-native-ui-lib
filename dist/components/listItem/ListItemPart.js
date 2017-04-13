Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _commons=require('../../commons');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

ListItemPart=function(_BaseComponent){_inherits(ListItemPart,_BaseComponent);function ListItemPart(){_classCallCheck(this,ListItemPart);return _possibleConstructorReturn(this,(ListItemPart.__proto__||Object.getPrototypeOf(ListItemPart)).apply(this,arguments));}_createClass(ListItemPart,[{key:'generateStyles',value:function generateStyles()































{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var
containerStyle=this.props.containerStyle;
return(
_react2.default.createElement(_reactNative.View,{style:[this.styles.container,containerStyle]},
this.props.children));


}}]);return ListItemPart;}(_commons.BaseComponent);ListItemPart.displayName='ListItemPart';ListItemPart.propTypes={left:_react.PropTypes.bool,middle:_react.PropTypes.bool,right:_react.PropTypes.bool,row:_react.PropTypes.bool,column:_react.PropTypes.bool,containerStyle:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number,_react.PropTypes.array]),testId:_react.PropTypes.string};exports.default=ListItemPart;


function createStyles(_ref){var left=_ref.left,right=_ref.right,middle=_ref.middle,column=_ref.column;
var justifyContent=void 0;
if(!column){
justifyContent='space-between';
if(left){
justifyContent='flex-start';
}
if(right){
justifyContent='flex-end';
}
if(middle){
justifyContent='space-between';
}
}else{
justifyContent='center';
}

return _reactNative.StyleSheet.create({
container:{
flexDirection:column?undefined:'row',
flex:middle?1:0,
justifyContent:justifyContent,
alignItems:column?undefined:'center'}});


}