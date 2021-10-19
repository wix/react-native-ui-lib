import React, {useCallback, useContext, useMemo, useEffect} from 'react';
import TabBarContext from './TabBarContext';
import Reanimated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
function PageCarousel({...props}) {
  const carousel = useAnimatedRef<Reanimated.ScrollView>();
  const {
    currentPage,
    targetPage,
    selectedIndex = 0,
    pageWidth,
    // carouselOffset,
    setCurrentIndex
  } = useContext(TabBarContext);
  const contentOffset = useMemo(() => ({x: selectedIndex * pageWidth, y: 0}), [selectedIndex, pageWidth]);
  const indexChangeReason = useSharedValue<'byScroll' | 'byPress' | undefined>(undefined);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      // carouselOffset.value = e.contentOffset.x;
      const newIndex = e.contentOffset.x / pageWidth;

      if (indexChangeReason.value === 'byPress') { // Scroll was immediate and not by gesture
        /* Round is for android when offset value has fraction */
        targetPage.value = withTiming(Math.round(newIndex));
        indexChangeReason.value = undefined;
      } else {
        targetPage.value = newIndex;
      }
    },
    onMomentumEnd: e => {
      const newPage = Math.round(e.contentOffset.x / pageWidth);
      indexChangeReason.value = 'byScroll';
      setCurrentIndex(newPage);
    }
  });

  const scrollToItem = useCallback(index => {
    if (indexChangeReason.value === 'byScroll') {
      indexChangeReason.value = undefined;
    } else {
      indexChangeReason.value = 'byPress';
    }

    // @ts-expect-error
    carousel.current?.scrollTo({x: index * pageWidth, animated: false});
  },
  [pageWidth]);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  (currIndex, prevIndex) => {
    if (prevIndex !== null && currIndex !== prevIndex) {
      runOnJS(scrollToItem)(currIndex);
    }
  });

  useEffect(() => {
    // @ts-expect-error
    carousel.current?.scrollTo({x: currentPage.value * pageWidth, animated: false});
  }, [pageWidth]);

  return (
    <Reanimated.ScrollView
      {...props}
      ref={carousel}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentOffset={contentOffset} // iOS only
    />
  );
}

export default PageCarousel;
