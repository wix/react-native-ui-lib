import _ from 'lodash';
import {I18nManager} from 'react-native';
import {Constants} from '../../helpers';


export function getChildrenLength(props) {
  const length = _.get(props, 'children.length') || 0;
  return length;
}

export function calcOffset(props, state) {
  const {currentPage} = state;
  const {pageWidth, loop} = props;
  const actualCurrentPage = loop ? currentPage + 1 : currentPage;

  return pageWidth * actualCurrentPage;
}

export function calcPageIndex(offset, props) {
  const pagesCount = getChildrenLength(props);
  const {pageWidth, loop} = props;
  let pageIndexIncludingClonedPages = Math.round(offset / pageWidth);
  
  let actualPageIndex;
  if (loop) {
    actualPageIndex = (pageIndexIncludingClonedPages + (pagesCount - 1)) % pagesCount;
    if (Constants.isAndroid && I18nManager.isRTL && !isOutOfBounds(offset, props)) {
      actualPageIndex = (pagesCount - 1) - actualPageIndex;
    }
  } else {
    if (Constants.isAndroid && I18nManager.isRTL) {
      pageIndexIncludingClonedPages = (pagesCount - 1) - pageIndexIncludingClonedPages;
    }
    actualPageIndex = Math.min(pagesCount - 1, pageIndexIncludingClonedPages);
  }
  return actualPageIndex;
}

export function isOutOfBounds(offset, props) {
  const {pageWidth} = props;
  const length = getChildrenLength(props);
  const minLimit = 1;
  const maxLimit = ((length + 1) * pageWidth) - 1;

  return !_.inRange(offset, minLimit, maxLimit);
}

// todo: need to support more cases of page width in loop mode
export function calcCarouselWidth(props) {
  const {pageWidth, loop} = props;
  let length = getChildrenLength(props);
  length = loop ? length + 2 : length;
  return pageWidth * length;
}
