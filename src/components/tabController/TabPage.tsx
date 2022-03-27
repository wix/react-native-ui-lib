import React, {PropsWithChildren, useCallback, useContext, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Reanimated, {useAnimatedStyle, useAnimatedReaction, runOnJS} from 'react-native-reanimated';
// import {Freeze} from 'react-freeze';
import TabBarContext from './TabBarContext';

export interface TabControllerPageProps {
  /**
   * The index of the the TabPage
   */
  index: number;
  /**
   * Whether this page should be loaded lazily
   */
  lazy?: boolean;
  /**
   * How long to wait till lazy load complete (good for showing loader screens and when loading big pages)
   */
  lazyLoadTime?: number;
  /**
   * Render a custom loading page when lazy loading
   */
  renderLoading?: () => JSX.Element;
  /**
   * Used as a testing identifier
   */
  testID?: string;
}

/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
export default function TabPage({
  testID,
  index,
  lazy,
  renderLoading,
  lazyLoadTime = 100,
  ...props
}: PropsWithChildren<TabControllerPageProps>) {
  const {currentPage, asCarousel, containerWidth} = useContext(TabBarContext);
  const [shouldLoad, setLoaded] = useState(!lazy);
  // const [focused, setFocused] = useState(false);

  const lazyLoad = useCallback(() => {
    if (lazy && !shouldLoad) {
      setTimeout(() => {
        setLoaded(true);
      }, lazyLoadTime);
    }
  }, [lazy, shouldLoad]);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  (currentPage /* , previousPage */) => {
    const isActive = currentPage === index;
    // const wasActive = previousPage === index;
    // const nearActive = asCarousel && (currentPage - 1 === index || currentPage + 1 === index);
    // const wasNearActive =
    //     asCarousel && previousPage !== null && (previousPage - 1 === index || previousPage + 1 === index);

    if (isActive) {
      runOnJS(lazyLoad)();
    }

    // if (isActive || nearActive) {
    //   runOnJS(setFocused)(true);
    // } else if (wasActive || wasNearActive) {
    //   runOnJS(setFocused)(false);
    // }
  },
  [currentPage, lazyLoad]);

  const animatedPageStyle = useAnimatedStyle(() => {
    const isActive = Math.round(currentPage.value) === index;
    return {
      opacity: isActive || asCarousel ? 1 : 0,
      zIndex: isActive || asCarousel ? 1 : 0
    };
  });

  const style = useMemo(() => {
    return [!asCarousel && styles.page, animatedPageStyle, {width: asCarousel ? containerWidth : undefined}];
  }, [asCarousel, animatedPageStyle, containerWidth]);

  return (
    <Reanimated.View style={style} testID={testID}>
      {!shouldLoad && renderLoading?.()}
      {shouldLoad && props.children}
      {/* <Freeze freeze={!shouldLoad || !focused}>{props.children}</Freeze> */}
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject
  }
});
