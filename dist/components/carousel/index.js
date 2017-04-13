Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _commons=require('../../commons');
var _view=require('../view');var _view2=_interopRequireDefault(_view);
var _helpers=require('../../helpers');
var _CarouselPresenter=require('./CarouselPresenter');var presenter=_interopRequireWildcard(_CarouselPresenter);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




Carousel=function(_BaseComponent){_inherits(Carousel,_BaseComponent);













function Carousel(props){_classCallCheck(this,Carousel);var _this=_possibleConstructorReturn(this,(Carousel.__proto__||Object.getPrototypeOf(Carousel)).call(this,
props));
_this.state={
currentPage:props.initialPage};


_this.onScroll=_this.onScroll.bind(_this);
_this.updateOffset=_this.updateOffset.bind(_this);return _this;
}_createClass(Carousel,[{key:'generateStyles',value:function generateStyles()

{
this.styles=createStyles(this.props);
}},{key:'onScroll',value:function onScroll(

event){var _this2=this;
var offsetX=event.nativeEvent.contentOffset.x;
if(offsetX>=0){var
currentPage=this.state.currentPage;
var newPage=presenter.calcPageIndex(offsetX,this.props);

this.setState({
currentPage:newPage},
function(){
if(currentPage!==newPage){
_lodash2.default.invoke(_this2.props,'onChangePage',newPage,currentPage);
}
});

if(presenter.isOutOfBounds(offsetX,this.props)){
this.updateOffset(newPage);
}
}
}},{key:'updateOffset',value:function updateOffset()

{
var x=presenter.calcOffset(this.props,this.state);
this.carousel.scrollTo({x:x,animated:false});
}},{key:'componentDidMount',value:function componentDidMount()

{var _this3=this;
setTimeout(function(){
_this3.updateOffset();
},_helpers.Constants.isIOS?0:50);
}},{key:'cloneChild',value:function cloneChild(

child){
if(!child.key){
return child;
}
return _react2.default.cloneElement(child,{
key:child.key+'-clone'});

}},{key:'renderChildren',value:function renderChildren()

{var
children=this.props.children;
var length=presenter.getChildrenLength(this.props);

return[
this.cloneChild(children[length-1])].concat(_toConsumableArray(
children),[
this.cloneChild(children[0])]);

}},{key:'render',value:function render()

{var _this4=this;var
containerStyle=this.props.containerStyle;
return(
_react2.default.createElement(_view2.default,{flex:true,style:containerStyle},
_react2.default.createElement(_reactNative.ScrollView,{
ref:function ref(scrollView){_this4.carousel=scrollView;},
horizontal:true,
showsHorizontalScrollIndicator:false,
pagingEnabled:true,
onScroll:this.onScroll,
scrollEventThrottle:200},

this.renderChildren())));



}}]);return Carousel;}(_commons.BaseComponent);Carousel.displayName='Carousel';Carousel.propTypes={initialPage:_react.PropTypes.number,pageWidth:_react.PropTypes.number,onChangePage:_react.PropTypes.func,containerStyle:_react.PropTypes.oneOfType([_react.PropTypes.object,_react.PropTypes.number,_react.PropTypes.array])};Carousel.defaultProps={initialPage:0,pageWidth:_helpers.Constants.screenWidth};exports.default=Carousel;


function createStyles(){
return _reactNative.StyleSheet.create({});




}