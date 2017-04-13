Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _commons=require('../../commons');
var _style=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var ds=new _reactNative.ListView.DataSource({rowHasChanged:function rowHasChanged(r1,r2){return r1!==r2;}});var

GridList=function(_BaseComponent){_inherits(GridList,_BaseComponent);
















function GridList(props){_classCallCheck(this,GridList);var _this=_possibleConstructorReturn(this,(GridList.__proto__||Object.getPrototypeOf(GridList)).call(this,
props));

_this.renderRow=_this.renderRow.bind(_this);

var groups=_this.generateGroups();
_this.state={
dataSource:ds.cloneWithRows(groups)};return _this;

}_createClass(GridList,[{key:'generateStyles',value:function generateStyles()

{
this.styles=createStyles(this.props);
}},{key:'generateGroups',value:function generateGroups()

{var _props=
this.props,items=_props.items,itemsInRow=_props.itemsInRow;
var groups=[];
for(var i=0;i<items.length;i+=itemsInRow){
groups.push(items.slice(i,i+itemsInRow));
}

return groups;
}},{key:'renderRow',value:function renderRow(

row,sectionId,rowId){var
renderItem=this.props.renderItem;

return(
_react2.default.createElement(_reactNative.View,{key:rowId,style:this.styles.row},
_lodash2.default.map(row,function(item,index){
return renderItem(item,rowId+index);
})));


}},{key:'render',value:function render()

{var _props2=
this.props,contentContainerStyle=_props2.contentContainerStyle,itemsInRow=_props2.itemsInRow,others=_objectWithoutProperties(_props2,['contentContainerStyle','itemsInRow']);
return(
_react2.default.createElement(_reactNative.ListView,_extends({
dataSource:this.state.dataSource,
pageSize:itemsInRow,
renderRow:this.renderRow},
others,{
contentContainerStyle:[this.styles.container,contentContainerStyle]})));


}}]);return GridList;}(_commons.BaseComponent);GridList.propTypes=_extends({},_commons.BaseComponent.propTypes,{backgroundColor:_react.PropTypes.string,items:_react.PropTypes.array,renderItem:_react.PropTypes.func,itemsInRow:_react.PropTypes.number});GridList.defaultProps=_extends({},_commons.BaseComponent.defaultProps,{backgroundColor:_style.Colors.dark80,items:[],itemsInRow:2});


function createStyles(_ref){var backgroundColor=_ref.backgroundColor;
return _reactNative.StyleSheet.create({
container:{
backgroundColor:backgroundColor,
paddingBottom:15},

row:{
flex:1,
flexDirection:'row',
justifyContent:'space-between'}});


}exports.default=

GridList;