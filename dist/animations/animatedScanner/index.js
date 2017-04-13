Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _commons=require('../../commons');
var _helpers=require('../../helpers');
var _style=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var


AnimatedScanner=function(_BaseComponent){_inherits(AnimatedScanner,_BaseComponent);function AnimatedScanner(){_classCallCheck(this,AnimatedScanner);return _possibleConstructorReturn(this,(AnimatedScanner.__proto__||Object.getPrototypeOf(AnimatedScanner)).apply(this,arguments));}_createClass(AnimatedScanner,[{key:'generateStyles',value:function generateStyles()











{
this.styles=createStyles(this.props);
}},{key:'render',value:function render()

{var
progress=this.props.progress;
return(
_react2.default.createElement(_reactNative.Animated.View,{
style:[this.styles.container,{
right:progress.interpolate({
inputRange:[0,5,55,100],
outputRange:[_helpers.Constants.screenWidth,_helpers.Constants.screenWidth/2,_helpers.Constants.screenWidth/3,0]})}]},



JSON.stringify(progress)!=='100'&&_react2.default.createElement(_reactNative.View,{style:this.styles.scanner})));


}}]);return AnimatedScanner;}(_commons.BaseComponent);AnimatedScanner.displayName='AnimatedScanner';AnimatedScanner.propTypes={progress:_react.PropTypes.object,testId:_react.PropTypes.string};exports.default=AnimatedScanner;


function createStyles(){
return _reactNative.StyleSheet.create({
container:{
position:'absolute',
top:0,
bottom:0,
left:0,
right:0,
backgroundColor:_style.Colors.white,
opacity:0.9},

scanner:{
position:'absolute',
top:0,
bottom:0,
right:0,
borderWidth:_reactNative.StyleSheet.hairlineWidth,
borderColor:_style.Colors.dark50}});


}