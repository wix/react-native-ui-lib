import _inRange from "lodash/inRange";
import React from 'react';
export function getChildrenLength(props) {
  return React.Children.count(props.children);
}

// TODO: This should probably be replaced with carousel.getContentOffset
export function calcOffset(props, state) {
  const {
    currentPage,
    pageWidth,
    pageHeight
  } = state;
  const {
    loop,
    containerMarginHorizontal = 0
  } = props;
  const actualCurrentPage = loop ? currentPage + 1 : currentPage;
  const nonLoopAdjustment = !loop && currentPage > 0 ? containerMarginHorizontal : 0;
  const pageSize = props.horizontal ? pageWidth : pageHeight;
  const offset = pageSize * actualCurrentPage - nonLoopAdjustment;
  const offsetXY = {
    x: props.horizontal ? offset : 0,
    y: props.horizontal ? 0 : offset
  };
  return offsetXY;
}
export function calcPageIndex(offset, props, pageSize) {
  const pagesCount = getChildrenLength(props);
  const {
    loop
  } = props;
  const pageIndexIncludingClonedPages = Math.round(offset / pageSize);
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
  const maxLimit = (length + 1) * pageWidth - 1;
  return !_inRange(offset, minLimit, maxLimit);
}