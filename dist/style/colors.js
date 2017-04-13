Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Colors=function(){function Colors(){_classCallCheck(this,Colors);this.

dark10='#20303C';this.
dark20='#43515C';this.
dark30='#66737C';this.
dark40='#858F96';this.
dark50='#A3ABB0';this.
dark60='#C2C7CB';this.
dark70='#E0E3E5';this.
dark80='#F2F4F5';this.

blue10='#3182C8';this.
blue20='#4196E0';this.
blue30='#459FED';this.
blue40='#4EB7F5';this.
blue50='#7FCCF7';this.
blue60='#B2E0FA';this.
blue70='#D3EDFF';this.
blue80='#EAF7FF';this.

cyan10='#00AAAF';this.
cyan20='#32BABC';this.
cyan30='#3CC7C5';this.
cyan40='#64D4D2';this.
cyan50='#8BDFDD';this.
cyan60='#B1E9E9';this.
cyan70='#D8F4F4';this.
cyan80='#EBF9F9';this.

green10='#00A65F';this.
green20='#32B76C';this.
green30='#65C888';this.
green40='#84D3A0';this.
green50='#A3DEB8';this.
green60='#C1E9CF';this.
green70='#E8F7EF';this.
green80='#F3FBF7';this.

yellow10='#E2902B';this.
yellow20='#FAA030';this.
yellow30='#FAAD4D';this.
yellow40='#FBBD71';this.
yellow50='#FCCE94';this.
yellow60='#FDDEB8';this.
yellow70='#FEEFDB';this.
yellow80='#FEF7ED';this.

orange10='#D9644A';this.
orange20='#E66A4E';this.
orange30='#F27052';this.
orange40='#F37E63';this.
orange50='#F7A997';this.
orange60='#FAC6BA';this.
orange70='#FCE2DC';this.
orange80='#FEF0ED';this.

red10='#CF262F';this.
red20='#EE2C38';this.
red30='#F2564D';this.
red40='#F57871';this.
red50='#F79A94';this.
red60='#FABBB8';this.
red70='#FCDDDB';this.
red80='#FEEEED';this.

purple10='#8B1079';this.
purple20='#A0138E';this.
purple30='#B13DAC';this.
purple40='#C164BD';this.
purple50='#D08BCD';this.
purple60='#E0B1DE';this.
purple70='#EFD8EE';this.
purple80='#F7EBF7';this.

violet10='#48217B';this.
violet20='#733CA6';this.
violet30='#733CA6';this.
violet40='#8F63B8';this.
violet50='#AB8ACA';this.
violet60='#C7B1DB';this.
violet70='#E3D8ED';this.
violet80='#F1EBF6';this.

white='#ffffff';this.
black='#000000';}_createClass(Colors,[{key:'loadColors',value:function loadColors(






colors){var _this=this;
_lodash2.default.forEach(colors,function(value,key){
_this[key]=value;
});
}},{key:'rgba',value:function rgba(









p1,p2,p3,p4){
var hex=void 0;
var opacity=void 0;
var red=void 0;
var green=void 0;
var blue=void 0;

if(arguments.length===2){
hex=p1;
opacity=p2;

hex=validateHex(hex);
red=parseInt(hex.substring(0,2),16);
green=parseInt(hex.substring(2,4),16);
blue=parseInt(hex.substring(4,6),16);
}else if(arguments.length===4){
red=validateRGB(p1);
green=validateRGB(p2);
blue=validateRGB(p3);
opacity=p4;
}else{
throw new Error('rgba can work with either 2 or 4 arguments');
}

return'rgba('+red+', '+green+', '+blue+', '+opacity+')';
}}]);return Colors;}();


function validateRGB(value){
if(isNaN(value)||value>255||value<0){
throw new Error(value+' is invalid rgb code, please use number between 0-255');
}

return value;
}

function validateHex(value){
if(!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)){
throw new Error(value+' is invalid hex color');
}
return value.replace('#','');
}exports.default=

new Colors();