import _ from 'lodash';
import {CarouselProps, CarouselState} from './types';

export function getChildrenLength(props: CarouselProps): number {
  const length = _.get(props, 'children.length') || 0;
  return length;
}

export function calcOffset(props: CarouselProps, state: Omit<CarouselState, 'initialOffset' | 'prevProps'>) {
  const {currentPage, pageWidth} = state;
  const {loop, containerMarginHorizontal = 0} = props;
  const actualCurrentPage = loop ? currentPage + 1 : currentPage;
  const nonLoopAdjustment = !loop && currentPage > 0 ? containerMarginHorizontal : 0;
  const offset = pageWidth * actualCurrentPage - nonLoopAdjustment;

  return offset;
}

export function calcPageIndex(offset: number, props: CarouselProps, pageWidth: number) {
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

export function isOutOfBounds(offset: number, props: CarouselProps, pageWidth: number) {
  const length = getChildrenLength(props);
  const minLimit = 1;
  const maxLimit = (length + 1) * pageWidth - 1;

  return !_.inRange(offset, minLimit, maxLimit);
}
