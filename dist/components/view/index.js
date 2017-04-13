Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _commons=require('../../commons');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

View=function(_BaseComponent){_inherits(View,_BaseComponent);function View(){_classCallCheck(this,View);return _possibleConstructorReturn(this,(View.__proto__||Object.getPrototypeOf(View)).apply(this,arguments));}_createClass(View,[{key:'generateStyles',value:function generateStyles()








{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var _state=
this.state,backgroundColor=_state.backgroundColor,paddings=_state.paddings,margins=_state.margins,alignments=_state.alignments,flex=_state.flex;var _props=
this.props,style=_props.style,others=_objectWithoutProperties(_props,['style']);
return(
_react2.default.createElement(_reactNative.View,_extends({},
others,{
style:[
this.styles.container,
backgroundColor&&{backgroundColor:backgroundColor},
flex&&{flex:flex},
paddings,
margins,
alignments,
style]}),


this.props.children));


}}]);return View;}(_commons.BaseComponent);View.displayName='Text';View.propTypes=_extends({},_reactNative.View.propTypes,_commons.BaseComponent.propTypes,{testId:_react.PropTypes.string});exports.default=View;


function createStyles(){
return _reactNative.StyleSheet.create({
container:{}});


}