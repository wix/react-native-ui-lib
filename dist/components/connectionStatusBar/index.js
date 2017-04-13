Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactNative=require('react-native');
var _Constants=require('../../helpers/Constants');var Constants=_interopRequireWildcard(_Constants);
var _commons=require('../../commons');
var _style=require('../../style');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




ConnectionStatusBar=function(_BaseComponent){_inherits(ConnectionStatusBar,_BaseComponent);





















function ConnectionStatusBar(props){_classCallCheck(this,ConnectionStatusBar);var _this=_possibleConstructorReturn(this,(ConnectionStatusBar.__proto__||Object.getPrototypeOf(ConnectionStatusBar)).call(this,
props));
_this.onConnectionChange=_this.onConnectionChange.bind(_this);

_this.state={
isConnected:true,
isCancelled:false};

_this.getInitialConnectionState();return _this;
}_createClass(ConnectionStatusBar,[{key:'generateStyles',value:function generateStyles()

{
this.styles=createStyles();
}},{key:'componentDidMount',value:function componentDidMount()

{
this.netInfoListener=_reactNative.NetInfo.addEventListener('change',this.onConnectionChange);
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
if(this.netInfoListener){
this.netInfoListener.remove();
}
}},{key:'onConnectionChange',value:function onConnectionChange(

state){
var isConnected=this.isStateConnected(state);
if(isConnected!==this.state.isConnected){
this.setState({
isConnected:isConnected,
isCancelled:false});

if(this.props.onConnectionChange){
this.props.onConnectionChange(isConnected,false);
}
}
}},{key:'getInitialConnectionState',value:function getInitialConnectionState(){var state,isConnected;return regeneratorRuntime.async(function getInitialConnectionState$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return regeneratorRuntime.awrap(


_reactNative.NetInfo.fetch());case 2:state=_context.sent;
isConnected=this.isStateConnected(state);
this.setState({isConnected:isConnected});
if(this.props.onConnectionChange){
this.props.onConnectionChange(isConnected,true);
}case 6:case'end':return _context.stop();}}},null,this);}},{key:'isStateConnected',value:function isStateConnected(


state){
var lowerCaseState=_lodash2.default.lowerCase(state);
var isConnected=lowerCaseState!=='none';
return isConnected;
}},{key:'render',value:function render()

{var _this2=this;
if(this.state.isConnected||this.state.isCancelled){
return false;
}

return(
_react2.default.createElement(_reactNative.View,{style:this.styles.container},
_react2.default.createElement(_reactNative.View,{style:{flex:1,flexDirection:'row'}},
_react2.default.createElement(_reactNative.Text,{style:this.styles.text},
this.props.label),


this.props.allowDismiss&&
_react2.default.createElement(_reactNative.TouchableOpacity,{style:this.styles.xContainer,onPress:function onPress(){return _this2.setState({isCancelled:true});}},
_react2.default.createElement(_reactNative.Text,{style:this.styles.x},'\u2715')))));





}}]);return ConnectionStatusBar;}(_commons.BaseComponent);ConnectionStatusBar.displayName='ConnectionStatusBar';ConnectionStatusBar.propTypes={label:_react.PropTypes.string,onConnectionChange:_react.PropTypes.func,allowDismiss:_react.PropTypes.bool};ConnectionStatusBar.defaultProps={label:'No internet. Check your connection.',allowDismiss:false};exports.default=ConnectionStatusBar;


function createStyles(){
var typography=Constants.isSmallScreen?_style.Typography.text90:_style.Typography.text80;
return _reactNative.StyleSheet.create({
container:{
backgroundColor:_style.Colors.dark30,
position:'absolute',
top:0,
left:0,
right:0,
flexDirection:'column',
justifyContent:'center'},

text:_extends({
flex:1},
typography,{
textAlign:'center',
color:_style.Colors.dark60,
marginTop:8,
marginBottom:8,
alignSelf:'center'}),

xContainer:{
paddingLeft:10,
paddingRight:10,
alignSelf:'center'},

x:{
fontSize:15,
color:'black'}});


}