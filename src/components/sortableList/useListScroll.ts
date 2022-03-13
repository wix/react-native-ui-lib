/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from 'react';
import {runOnJS, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import useListScroller from './useListScroller';
import useScrollThreshold from './useScrollThreshold';

const SCROLL_RATE_DIVIDER = 5;

const useListScroll = () => {
  const {
    measureRef,
    onLayout,
    setItemHeight,
    scrollThreshold,
    onContentSizeChange,
    contentHeight,
    maxScroll,
    absMeasurements
  } = useScrollThreshold();

  const scroll = useSharedValue(0);
  const isScrolling = useSharedValue<boolean>(false);
  const scrollRate = useSharedValue<number>(0);
  const draggedItemRef = useSharedValue<any>(undefined);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => (scroll.value = y)
  });

  const {scrollRef, onScrollStart, onScrollEnd, cleanScrollValues} = useListScroller({
    scroll,
    isScrolling,
    scrollRate,
    maxScroll,
    draggedItemRef,
    absMeasurements
  });

  const onDrag = useCallback((translation: number, ref: any) => {
    'worklet';
    if (scrollThreshold.value && contentHeight.value) {
      draggedItemRef.value = ref;
      const scrollUp = translation < scrollThreshold.value.top && scroll.value > 0;
      const scrollDown = translation > scrollThreshold.value.bottom && scroll.value < contentHeight.value;
      if (scrollUp || scrollDown) {
        if (!isScrolling.value) {
          runOnJS(onScrollStart)();
          isScrolling.value = true;
        }

        if (scrollUp) {
          scrollRate.value = (translation - scrollThreshold.value.top) / SCROLL_RATE_DIVIDER;
        } else if (scrollDown) {
          scrollRate.value = (translation - scrollThreshold.value.bottom) / SCROLL_RATE_DIVIDER;
        }
      } else {
        isScrolling.value = false;
        runOnJS(onScrollEnd)();
      }
    }
  }, []);

  return {scrollRef, onScroll, cleanScrollValues, onDrag, measureRef, onLayout, setItemHeight, onContentSizeChange};
};

export default useListScroll;
