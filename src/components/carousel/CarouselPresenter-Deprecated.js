import _ from 'lodash';
import {Constants} from '../../helpers';


export function getDirectionOffset(offset, props) {
  let fixedOffset = offset;

  if (Constants.isRTL && Constants.isAndroid) {
    const {loop, pageWidth = Constants.screenWidth} = props;
    const totalWidth = ((getChildrenLength(props) - 1) + (loop ? 2 : 0)) * pageWidth;
    fixedOffset = Math.abs(totalWidth - offset);
  }

  return fixedOffset;
}

export function getChildrenLength(props) {
  const length = _.get(props, 'children.length') || 0;
  return length;
}

export function calcOffset(props, state) {
  const {currentPage} = state;
  const {pageWidth = Constants.screenWidth, loop} = props;

  const actualCurrentPage = loop ? currentPage + 1 : currentPage;

  let offset = pageWidth * actualCurrentPage;
  offset = getDirectionOffset(offset, props);

  return offset;
}

export function calcPageIndex(offset, props) {
  const pagesCount = getChildrenLength(props);
  const {pageWidth = Constants.screenWidth, loop} = props;
  const pageIndexIncludingClonedPages = Math.round(offset / pageWidth);

  let actualPageIndex;
  if (loop) {
    actualPageIndex = (pageIndexIncludingClonedPages + (pagesCount - 1)) % pagesCount;
  } else {
    actualPageIndex = Math.min(pagesCount - 1, pageIndexIncludingClonedPages);
  }

  return actualPageIndex;
}

export function isOutOfBounds(offset, props) {
  const {pageWidth = Constants.screenWidth} = props;
  const length = getChildrenLength(props);
  const minLimit = 1;
  const maxLimit = ((length + 1) * pageWidth) - 1;

  return !_.inRange(offset, minLimit, maxLimit);
}

// todo: need to support more cases of page width in loop mode
export function calcCarouselWidth(props) {
  const {pageWidth = Constants.screenWidth, loop} = props;
  let length = getChildrenLength(props);
  length = loop ? length + 2 : length;
  return pageWidth * length;
}
