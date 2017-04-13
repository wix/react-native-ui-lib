Object.defineProperty(exports,"__esModule",{value:true});exports.











getAvatarColors=getAvatarColors;exports.




getColorById=getColorById;exports.











getInitials=getInitials;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _colors=require('../style/colors');var _colors2=_interopRequireDefault(_colors);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function hashStringToNumber(str){var hash=5381;for(var i=0;i<str.length;i++){var char=str.charCodeAt(i);hash=(hash<<5)+hash+char;}return hash;}function getAvatarColors(){return[_colors2.default.blue20,_colors2.default.cyan20,_colors2.default.green20,_colors2.default.yellow20,_colors2.default.orange20,_colors2.default.red20,_colors2.default.purple20,_colors2.default.violet20];}function getColorById(id){var avatarColors=getAvatarColors();if(!id){return avatarColors[0];}var hashedId=hashStringToNumber(id);var colorIndex=Math.abs(hashedId%avatarColors.length);return avatarColors[colorIndex];}function getInitials(name){
var initials='';
if(name&&_lodash2.default.isString(name)){
var nameSplitted=_lodash2.default.chain(name).split(/\s+/g).take(2).value();
_lodash2.default.each(nameSplitted,function(str){
initials+=str[0];
});
}

return _lodash2.default.toUpper(initials);
}