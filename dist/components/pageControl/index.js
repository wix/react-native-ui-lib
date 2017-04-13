Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _Constants=require('../../helpers/Constants');var Constants=_interopRequireWildcard(_Constants);
var _style=require('../../style');
var _commons=require('../../commons');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

function getColorStyle(color,index,currentPage){
var compColor=color||_style.ThemeManager.primaryColor;
return{borderColor:compColor,backgroundColor:index===currentPage?compColor:'transparent'};
}var




PageControl=function(_BaseComponent){_inherits(PageControl,_BaseComponent);function PageControl(){_classCallCheck(this,PageControl);return _possibleConstructorReturn(this,(PageControl.__proto__||Object.getPrototypeOf(PageControl)).apply(this,arguments));}_createClass(PageControl,[{key:'generateStyles',value:function generateStyles()




























{
this.styles=createStyles(this.props.size);
}},{key:'render',value:function render()

{var _this2=this;var _props=
this.props,numOfPages=_props.numOfPages,currentPage=_props.currentPage,color=_props.color,containerStyle=_props.containerStyle,onPagePress=_props.onPagePress;
return(
_react2.default.createElement(_reactNative.View,{style:[this.styles.container,containerStyle]},

_lodash2.default.map([].concat(_toConsumableArray(new Array(numOfPages))),function(item,index){return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
disabled:_lodash2.default.isUndefined(onPagePress),
onPress:function onPress(){return onPagePress&&onPagePress(index);},
key:index,
style:[_this2.styles.pageIndicator,getColorStyle(color,index,currentPage)]}));})));




}}]);return PageControl;}(_commons.BaseComponent);PageControl.displayName='PageControl';PageControl.propTypes={containerStyle:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number,_react.PropTypes.array]),numOfPages:_react.PropTypes.number,currentPage:_react.PropTypes.number,onPagePress:_react.PropTypes.func,color:_react2.default.PropTypes.string,size:_react.PropTypes.number};exports.default=PageControl;


function createStyles(){var size=arguments.length>0&&arguments[0]!==undefined?arguments[0]:10;
return _reactNative.StyleSheet.create({
container:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center'},

pageView:{
width:Constants.screenWidth,
height:Constants.screenHeight},

pageIndicator:{
backgroundColor:'transparent',
borderWidth:1,
marginRight:2,
marginLeft:2,
width:size,
height:size,
borderRadius:size/2}});


}