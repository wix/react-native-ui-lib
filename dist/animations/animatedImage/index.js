Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _commons=require('../../commons');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




AnimatedImage=function(_BaseComponent){_inherits(AnimatedImage,_BaseComponent);
































function AnimatedImage(props){_classCallCheck(this,AnimatedImage);var _this=_possibleConstructorReturn(this,(AnimatedImage.__proto__||Object.getPrototypeOf(AnimatedImage)).call(this,
props));
_this.state={opacity:new _reactNative.Animated.Value(0),isLoading:true};return _this;
}_createClass(AnimatedImage,[{key:'onLoad',value:function onLoad()

{var _this2=this;
this.setState({isLoading:false},function(){
var animationParams={toValue:1,duration:_this2.props.animationDuration,useNativeDriver:false};
_reactNative.Animated.timing(_this2.state.opacity,animationParams).start();
});
}},{key:'render',value:function render()

{var _this3=this;var _props=
this.props,testId=_props.testId,containerStyle=_props.containerStyle,imageStyle=_props.imageStyle,imageSource=_props.imageSource,loader=_props.loader;
return(
_react2.default.createElement(_reactNative.View,{testID:testId,style:containerStyle},
_react2.default.createElement(_reactNative.Animated.Image,{
style:[{opacity:this.state.opacity},imageStyle],
source:imageSource,
onLoad:function onLoad(){return _this3.onLoad();}}),


this.state.isLoading&&loader&&
_react2.default.createElement(_reactNative.View,{style:{position:'absolute',top:0,left:0,bottom:0,right:0,alignItems:'center'}},
_react2.default.createElement(_reactNative.View,{style:{flex:1,flexDirection:'row',alignItems:'center'}},
loader))));





}}]);return AnimatedImage;}(_commons.BaseComponent);AnimatedImage.displayName='AnimatedImage';AnimatedImage.propTypes={containerStyle:_react.PropTypes.object,imageStyle:_react.PropTypes.object,imageSource:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number]),animationDuration:_react.PropTypes.number,testId:_react.PropTypes.string,loader:_react.PropTypes.element};AnimatedImage.defaultProps={animationDuration:300};exports.default=AnimatedImage;