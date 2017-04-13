Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');
var _reactNative=require('react-native');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _style=require('../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

BaseComponent=function(_Component){_inherits(BaseComponent,_Component);











function BaseComponent(props){_classCallCheck(this,BaseComponent);var _this=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,
props));
if(!_this.styles){
_this.generateStyles();
}

_this.state=_extends({},
_this.extractStyleProps());return _this;

}_createClass(BaseComponent,[{key:'generateStyles',value:function generateStyles()



{
this.styles=_reactNative.StyleSheet.create({});
}},{key:'extractAnimationProps',value:function extractAnimationProps()

{
return _lodash2.default.pick(this.props,[
'animation',
'duration',
'delay',
'direction',
'easing',
'iterationCount',
'transition',
'onAnimationBegin',
'onAnimationEnd',
'useNativeDriver']);

}},{key:'extractContainerStyle',value:function extractContainerStyle(

props){
var containerStyle={};
if(props.containerStyle){
containerStyle=_lodash2.default.pickBy(props.containerStyle,function(value,key){
return key.includes('margin')||_lodash2.default.includes(['alignSelf','transform'],key);
});
}

return containerStyle;
}},{key:'extractTypographyValue',value:function extractTypographyValue()

{var _this2=this;
var typography=void 0;
_lodash2.default.forEach(_style.Typography,function(value,key){
if(_this2.props[key]===true){
typography=value;
}
});
return typography;
}},{key:'extractColorValue',value:function extractColorValue()

{var _this3=this;
var color=void 0;
_lodash2.default.forEach(_style.Colors,function(value,key){
if(_this3.props[key]===true){
color=value;
}
});
return color;
}},{key:'extractBackgroundColorValue',value:function extractBackgroundColorValue()

{var _this4=this;
var backgroundColor=void 0;
_lodash2.default.forEach(_style.Colors,function(value,key){
if(_this4.props['background-'+key]===true||_this4.props['bg-'+key]===true){
backgroundColor=value;
}
});
return backgroundColor;
}},{key:'extractPaddingValues',value:function extractPaddingValues()

{var _this5=this;
var PADDING_VARIATIONS={
padding:'padding',
paddingL:'paddingLeft',
paddingT:'paddingTop',
paddingR:'paddingRight',
paddingB:'paddingBottom',
paddingH:'paddingHorizontal',
paddingV:'paddingVertical'};

var KEY_PATTERN=/padding[LTRBHV]?-[0-9]*/;
var paddings={};
var paddingPropsKeys=_lodash2.default.chain(this.props).keys(this.props).filter(function(key){return KEY_PATTERN.test(key);}).value();

_lodash2.default.forEach(paddingPropsKeys,function(key){
if(_this5.props[key]===true){var _key$split=
key.split('-'),_key$split2=_slicedToArray(_key$split,2),paddingKey=_key$split2[0],paddingValue=_key$split2[1];
var paddingVariation=PADDING_VARIATIONS[paddingKey];
if(!isNaN(paddingValue)){
paddings[paddingVariation]=Number(paddingValue);
}
}
});

return paddings;
}},{key:'extractMarginValues',value:function extractMarginValues()

{var _this6=this;
var MARGIN_VARIATIONS={
margin:'margin',
marginL:'marginLeft',
marginT:'marginTop',
marginR:'marginRight',
marginB:'marginBottom',
marginH:'marginHorizontal',
marginV:'marginVertical'};

var KEY_PATTERN=/margin[LTRBHV]?-[0-9]*/;
var margins={};
var marginPropsKeys=_lodash2.default.chain(this.props).keys(this.props).filter(function(key){return KEY_PATTERN.test(key);}).value();

_lodash2.default.forEach(marginPropsKeys,function(key){
if(_this6.props[key]===true){var _key$split3=
key.split('-'),_key$split4=_slicedToArray(_key$split3,2),marginKey=_key$split4[0],marginValue=_key$split4[1];
var paddingVariation=MARGIN_VARIATIONS[marginKey];
if(!isNaN(marginValue)){
margins[paddingVariation]=Number(marginValue);
}
}
});

return margins;
}},{key:'extractAlignmentsValues',value:function extractAlignmentsValues()

{var _this7=this;var _props=
this.props,row=_props.row,center=_props.center;
var alignments={};

var alignmentRules={};
if(row){
alignments.flexDirection='row';
alignmentRules.justifyContent=['left','right','centerH'];
alignmentRules.alignItems=['top','bottom','centerV'];
}else{
alignmentRules.justifyContent=['top','bottom','centerV'];
alignmentRules.alignItems=['left','right','centerH'];
}

_lodash2.default.forEach(alignmentRules,function(positions,attribute){
_lodash2.default.forEach(positions,function(position){
if(_this7.props[position]){
if(_lodash2.default.includes(['top','left'],position)){
alignments[attribute]='flex-start';
}else if(_lodash2.default.includes(['bottom','right'],position)){
alignments[attribute]='flex-end';
}else if(_lodash2.default.includes(['centerH','centerV'],position)){
alignments[attribute]='center';
}
}
});
});

if(center){
alignments.justifyContent='center';
alignments.alignItems='center';
}

return alignments;
}},{key:'extractFlexValue',value:function extractFlexValue()

{
var KEY_PATTERN=/flex-?[0-9]*/;
var flexPropKey=_lodash2.default.chain(this.props).
keys(this.props).
filter(function(key){return KEY_PATTERN.test(key);}).
last().
value();
if(flexPropKey){
var value=flexPropKey.split('-').pop();
if(value==='flex'||value===''){
return 1;
}else if(!isNaN(value)){
return Number(value);
}
}
}},{key:'extractStyleProps',value:function extractStyleProps()

{
var backgroundColor=this.extractBackgroundColorValue();
var paddings=this.extractPaddingValues();
var margins=this.extractMarginValues();
var alignments=this.extractAlignmentsValues();
var flex=this.extractFlexValue();

return{
backgroundColor:backgroundColor,
paddings:paddings,
margins:margins,
alignments:alignments,
flex:flex};

}},{key:'extractTextProps',value:function extractTextProps(

props){
return _lodash2.default.pick(props,[].concat(_toConsumableArray(_lodash2.default.keys(_style.Typography)),_toConsumableArray(_lodash2.default.keys(_style.Colors)),['color']));
}}]);return BaseComponent;}(_react.Component);BaseComponent.propTypes=_extends({},_lodash2.default.mapValues(_style.Typography,function(){return _react.PropTypes.bool;}),_lodash2.default.mapValues(_style.Colors,function(){return _react.PropTypes.bool;}),{useNativeDriver:_react.PropTypes.bool});BaseComponent.defaultProps={useNativeDriver:true};exports.default=BaseComponent;