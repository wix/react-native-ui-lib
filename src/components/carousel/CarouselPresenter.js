import _ from 'lodash';


export function getChildrenLength(props) {
  const length = _.get(props, 'children.length') || 0;
  return length;
}

export function calcOffset(props, state) {
  const {currentPage, pageWidth} = state;
  const {loop} = props;
  const actualCurrentPage = loop ? currentPage + 1 : currentPage;
  const offset = pageWidth * actualCurrentPage;

  return offset;
}

export function calcPageIndex(offset, props, pageWidth) {
  const pagesCount = getChildrenLength(props);
  const {loop} = props;
  const pageIndexIncludingClonedPages = Math.round(offset / pageWidth);

  let actualPageIndex;
  if (loop) {
    actualPageIndex = (pageIndexIncludingClonedPages + (pagesCount - 1)) % pagesCount;
  } else {
    actualPageIndex = Math.min(pagesCount - 1, pageIndexIncludingClonedPages);
  }
  return actualPageIndex;
}

export function isOutOfBounds(offset, props, pageWidth) {
  const length = getChildrenLength(props);
  const minLimit = 1;
  const maxLimit = ((length + 1) * pageWidth) - 1;

  return !_.inRange(offset, minLimit, maxLimit);
}
