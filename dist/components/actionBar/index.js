Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _commons=require('../../commons');
var _view=require('../view');var _view2=_interopRequireDefault(_view);
var _button=require('../button');var _button2=_interopRequireDefault(_button);
var _style=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var





ActionBar=function(_BaseComponent){_inherits(ActionBar,_BaseComponent);function ActionBar(){_classCallCheck(this,ActionBar);return _possibleConstructorReturn(this,(ActionBar.__proto__||Object.getPrototypeOf(ActionBar)).apply(this,arguments));}_createClass(ActionBar,[{key:'generateStyles',value:function generateStyles()





























{
this.styles=createStyles(this.props);
}},{key:'getAlignment',value:function getAlignment(

actionIndex){var _props=
this.props,actions=_props.actions,centered=_props.centered;
var first=actionIndex===0;
var last=actionIndex===actions.length-1;
return{
left:centered?false:first,
center:centered||!first&&!last||first&&last,
right:centered?false:last};

}},{key:'render',value:function render()

{var _this2=this;var _props2=
this.props,actions=_props2.actions,centered=_props2.centered,style=_props2.style,others=_objectWithoutProperties(_props2,['actions','centered','style']);

return(
_react2.default.createElement(_view2.default,_extends({row:true,centerV:true,'paddingH-20':!centered,style:[this.styles.container,style]},others),
_lodash2.default.map(actions,function(action,i){return(
_react2.default.createElement(_view2.default,_extends({
key:i,
flex:true},
_this2.getAlignment(i)),

_react2.default.createElement(_button2.default,_extends({link:true,size:'medium',blue30:true},action))));})));




}}]);return ActionBar;}(_commons.BaseComponent);ActionBar.displayName='ActionBar';ActionBar.propTypes={height:_react.PropTypes.number,backgroundColor:_react.PropTypes.string,actions:_react.PropTypes.arrayOf(_react.PropTypes.shape(_button2.default.propTypes)),centered:_react.PropTypes.bool,style:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number,_react.PropTypes.array])};ActionBar.defaultProps={height:48,backgroundColor:_style.Colors.white};exports.default=ActionBar;


function createStyles(_ref){var height=_ref.height,backgroundColor=_ref.backgroundColor;
return _reactNative.StyleSheet.create({
container:_extends({
height:height,
backgroundColor:backgroundColor,
position:'absolute',
bottom:0,
left:0,
right:0},
_style.Shadows.white40.top)});


}