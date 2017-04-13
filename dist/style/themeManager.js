Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _colors=require('./colors');var _colors2=_interopRequireDefault(_colors);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

ThemeManager=function(){function ThemeManager(){_classCallCheck(this,ThemeManager);this.

theme={
primaryColor:_colors2.default.blue30,
CTA:{
textColor:_colors2.default.white,
backgroundColor:_colors2.default.blue30},

titleColor:_colors2.default.dark10,
subtitleColor:_colors2.default.dark40,
dividerColor:_colors2.default.dark70};}_createClass(ThemeManager,[{key:'setTheme',value:function setTheme(


overrides){
this.theme=_lodash2.default.merge(this.theme,overrides);
}},{key:'primaryColor',get:function get()

{
return this.theme.primaryColor;
}},{key:'CTATextColor',get:function get()

{
return this.theme.CTA.textColor;
}},{key:'CTABackgroundColor',get:function get()

{
return this.theme.CTA.backgroundColor;
}},{key:'titleColor',get:function get()

{
return this.theme.titleColor;
}},{key:'subtitleColor',get:function get()

{
return this.theme.subtitleColor;
}},{key:'dividerColor',get:function get()

{
return this.theme.dividerColor;
}}]);return ThemeManager;}();exports.default=



new ThemeManager();