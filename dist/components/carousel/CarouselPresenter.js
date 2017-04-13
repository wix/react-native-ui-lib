Object.defineProperty(exports,"__esModule",{value:true});exports.

getChildrenLength=getChildrenLength;exports.




calcOffset=calcOffset;exports.






calcPageIndex=calcPageIndex;exports.







isOutOfBounds=isOutOfBounds;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function getChildrenLength(props){var length=_lodash2.default.get(props,'children.length')||0;return length;}function calcOffset(props,state){var currentPage=state.currentPage;var pageWidth=props.pageWidth;return pageWidth*(currentPage+1);}function calcPageIndex(offset,props){var length=getChildrenLength(props);var pageWidth=props.pageWidth;var pageIndexIncludingClonedPages=Math.round(offset/pageWidth);var actualPageIndex=(pageIndexIncludingClonedPages+(length-1))%length;return actualPageIndex;}function isOutOfBounds(offset,props){var
pageWidth=props.pageWidth;
var length=getChildrenLength(props);
var minLimit=1;
var maxLimit=(length+1)*pageWidth-1;

return!_lodash2.default.inRange(offset,minLimit,maxLimit);
}