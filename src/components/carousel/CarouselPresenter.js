import _ from 'lodash';

export function getChildrenLength(props) {
  const length = _.get(props, 'children.length') || 0;
  return length;
}

export function calcOffset(props, state) {
  const {currentPage} = state;
  const {pageWidth} = props;

  return pageWidth * (currentPage + 1);
}

export function calcPageIndex(offset, props) {
  const length = getChildrenLength(props);
  const {pageWidth} = props;
  const pageIndexIncludingClonedPages = Math.round(offset / pageWidth);
  const actualPageIndex = (pageIndexIncludingClonedPages + (length - 1)) % length;
  return actualPageIndex;
}

export function isOutOfBounds(offset, props) {
  const {pageWidth} = props;
  const length = getChildrenLength(props);
  const minLimit = 1;
  const maxLimit = ((length + 1) * pageWidth) - 1;

  return !_.inRange(offset, minLimit, maxLimit);
}
