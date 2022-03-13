/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef} from 'react';
import {runOnJS, useSharedValue, SharedValue} from 'react-native-reanimated';

const SCROLL_TICK_RATE = 10;

interface Props {
  ref?: any;
  scroll: SharedValue<number>;
  isScrolling: SharedValue<boolean>;
  scrollRate: SharedValue<number>;
  maxScroll: SharedValue<number>;
  draggedItemRef?: any;
  absMeasurements?: any;
}

const useListScroller = (props: Props) => {
  // TODO: move props to local members or function params
  const {scroll, isScrolling, scrollRate, maxScroll, draggedItemRef, absMeasurements} = props;

  const initialScroll = useSharedValue(0);
  const scrollInterval = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const scrollRef = useRef<any>();

  useEffect(() => {
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, []);

  const onScrollStart = useCallback(() => {
    initialScroll.value = scroll.value;
    scrollInterval.current = setInterval(() => {
      const nextScrollValue =
        scrollRate.value > 0
          ? Math.min(scroll.value + scrollRate.value, maxScroll.value)
          : Math.max(scroll.value + scrollRate.value, 0);
      if (scroll.value !== nextScrollValue) {
        scroll.value = nextScrollValue;
        scrollRef.current?.scrollToOffset({offset: scroll.value, animated: false});
        draggedItemRef.value?.onScroll(scroll.value - initialScroll.value);
      }
    }, SCROLL_TICK_RATE);
  }, [absMeasurements]);

  const onScrollEnd = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  }, []);

  const cleanScrollValues = useCallback(() => {
    'worklet';
    isScrolling.value = false;
    scrollRate.value = 0;
    initialScroll.value = 0;
    runOnJS(onScrollEnd)();
    draggedItemRef.value?.onScrollEnd();
  }, []);

  return {scrollRef, onScrollStart, onScrollEnd, cleanScrollValues};
};

export default useListScroller;
