Object.defineProperty(exports,"__esModule",{value:true});exports.

isItemSelected=isItemSelected;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function isItemSelected(childValue,selectedValue){
var isSelected=false;
if(Array.isArray(selectedValue)){
isSelected=_lodash2.default.chain(selectedValue).map('value').includes(childValue).value();
}else{
isSelected=childValue===_lodash2.default.get(selectedValue,'value');
}
return isSelected;
}