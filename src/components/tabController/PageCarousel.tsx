import React, {useCallback, useContext, useMemo, useEffect} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent, ScrollViewProps} from 'react-native';
import TabBarContext from './TabBarContext';
import Reanimated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';
import {Constants} from '../../commons/new';

const FIX_RTL = Constants.isRTL && Constants.isAndroid;

/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
function PageCarousel(props: ScrollViewProps) {
  const {onMomentumScrollEnd, style, ...others} = props;
  const carousel = useAnimatedRef<Reanimated.ScrollView>();
  const {
    itemsCount,
    currentPage,
    targetPage,
    pageWidth,
    // carouselOffset,
    setCurrentIndex
  } = useContext(TabBarContext);
  const initialOffset = useMemo(() => ({x: currentPage.value * pageWidth, y: 0}), []);
  const indexChangeReason = useSharedValue<'byScroll' | 'byPress' | undefined>(undefined);

  const scrollToInitial = useCallback(() => {
    if (Constants.isAndroid && currentPage.value) {
      scrollToItem(currentPage.value);
    }
  }, []);

  const calcOffset = useCallback((offset: number) => {
    'worklet';
    return FIX_RTL ? pageWidth * (itemsCount - 1) - offset : offset;
  },
  [pageWidth, itemsCount]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      // carouselOffset.value = e.contentOffset.x;
      const xOffset = calcOffset(e.contentOffset.x);
      const newIndex = xOffset / pageWidth;

      if (indexChangeReason.value === 'byPress') {
        // Scroll was immediate and not by gesture
        /* Round is for android when offset value has fraction */
        // targetPage.value = withTiming(Math.round(newIndex));

        indexChangeReason.value = undefined;
      } else {
        targetPage.value = newIndex;
      }
    },
    onMomentumEnd: e => {
      const xOffset = calcOffset(e.contentOffset.x);
      const newPage = Math.round(xOffset / pageWidth);
      indexChangeReason.value = 'byScroll';
      setCurrentIndex(newPage);
    }
  });

  const scrollToItem = useCallback((index: number) => {
    if (indexChangeReason.value === 'byScroll') {
      indexChangeReason.value = undefined;
    } else {
      indexChangeReason.value = 'byPress';
    }

    const actualIndex = FIX_RTL ? itemsCount - index - 1 : index;
    carousel.current?.scrollTo({x: actualIndex * pageWidth, animated: false});
  },
  [pageWidth, itemsCount]);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  (currIndex, prevIndex) => {
    if (prevIndex !== null && currIndex !== prevIndex) {
      runOnJS(scrollToItem)(currIndex);
    }
  });

  useEffect(() => {
    carousel.current?.scrollTo({x: currentPage.value * pageWidth, animated: false});
  }, [pageWidth]);

  const handleOnMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onMomentumScrollEnd?.(event);
  }, [onMomentumScrollEnd]);

  const _style = useMemo(() => {
    return [{width: pageWidth}, style];
  }, [pageWidth, style]);

  return (
    <Reanimated.ScrollView
      {...others}
      style={_style}
      ref={carousel}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentOffset={initialOffset} // iOS only
      onLayout={scrollToInitial} // Android only
      onMomentumScrollEnd={handleOnMomentumScrollEnd} // TODO: workaround for useAnimatedScrollHandler.onMomentumEnd not being called (https://github.com/software-mansion/react-native-reanimated/issues/2735)
    />
  );
}

export default PageCarousel;
