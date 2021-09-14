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
    carouselOffset
  } = useContext(TabBarContext);
  const contentOffset = useMemo(() => ({x: selectedIndex * pageWidth, y: 0}), [selectedIndex, pageWidth]);
  const wasScrolledByPress = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      carouselOffset.value = e.contentOffset.x;
      const newIndex = e.contentOffset.x / pageWidth;

      if (wasScrolledByPress.value) {
        /* Round is for android when offset value has fraction */
        targetPage.value = withTiming(Math.round(newIndex));
        wasScrolledByPress.value = false;
      } else {
        targetPage.value = newIndex;
      }
    },
    onMomentumEnd: e => {
      const newPage = Math.round(e.contentOffset.x / pageWidth);
      currentPage.value = newPage;
    }
  });

  const scrollToItem = useCallback(index => {
    wasScrolledByPress.value = true;
    // @ts-expect-error
    carousel.current?.scrollTo({x: index * pageWidth, animated: false});
  },
  [pageWidth]);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  (currIndex, prevIndex) => {
    if (currIndex !== prevIndex) {
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
