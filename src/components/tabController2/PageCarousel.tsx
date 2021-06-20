import React, {useCallback, useContext, useMemo} from 'react';
import TabBarContext from './TabBarContext';
import Reanimated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  withTiming
} from 'react-native-reanimated';
import {Constants} from 'helpers';

/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
function PageCarousel({...props}) {
  const carousel = useAnimatedRef();
  const {
    currentPage,
    targetPage,
    selectedIndex = 0,
    pageWidth = Constants.screenWidth,
    carouselOffset
  } = useContext(TabBarContext);
  const contentOffset = useMemo(() => ({x: selectedIndex * pageWidth, y: 0}), [selectedIndex, pageWidth]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      carouselOffset.value = e.contentOffset.x;
      const newIndex = e.contentOffset.x / pageWidth;
      const scrollByItemPress = Math.abs(newIndex - targetPage.value) >= 1;
      console.warn('ethan - scrollByItemPress', scrollByItemPress)
      targetPage.value = scrollByItemPress ? withTiming(newIndex) : newIndex;
    },
    onMomentumEnd: e => {
      const newPage = Math.round(e.contentOffset.x / pageWidth);
      currentPage.value = newPage;
    }
  });

  const scrollToItem = useCallback(index => {
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

  return (
    <>
      <Reanimated.ScrollView
        {...props}
        // @ts-expect-error
        ref={carousel}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentOffset={contentOffset} // iOS only
      />
    </>
  );
}

export default PageCarousel;
