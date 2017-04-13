Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Typography=function(){function Typography(){_classCallCheck(this,Typography);this.
text10={fontSize:64,fontWeight:'100',lineHeight:Math.floor(64*1.4)};this.
text20={fontSize:50,fontWeight:'100',lineHeight:Math.floor(50*1.4)};this.
text30={fontSize:36,fontWeight:'200',lineHeight:Math.floor(36*1.3)};this.
text40={fontSize:28,fontWeight:'200',lineHeight:Math.floor(28*1.3)};this.
text50={fontSize:22,fontWeight:'300',lineHeight:Math.floor(22*1.3)};this.
text60={fontSize:20,fontWeight:'300',lineHeight:Math.floor(20*1.3)};this.
text70={fontSize:17,fontWeight:'300',lineHeight:Math.floor(17*1.2)};this.
text80={fontSize:15,fontWeight:'300',lineHeight:Math.floor(15*1.2)};this.
text90={fontSize:13,fontWeight:'300',lineHeight:Math.floor(13*1.2)};this.
text100={fontSize:11,fontWeight:'300',lineHeight:Math.floor(11*1.2)};}_createClass(Typography,[{key:'loadTypographies',value:function loadTypographies(







typographies){var _this=this;
_lodash2.default.forEach(typographies,function(value,key){
_this[key]=value;
});
}}]);return Typography;}();exports.default=


new Typography();