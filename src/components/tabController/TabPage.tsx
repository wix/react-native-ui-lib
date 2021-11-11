import React, {PropsWithChildren, useCallback, useContext, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Reanimated, {useAnimatedStyle, useAnimatedReaction, runOnJS} from 'react-native-reanimated';
import {Freeze} from 'react-freeze';
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
   * How long to wait till lazy load complete (good for showing loader screens)
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
  ...props
}: PropsWithChildren<TabControllerPageProps>) {
  const {currentPage, asCarousel, containerWidth} = useContext(TabBarContext);
  const [shouldLoad, setLoaded] = useState(!lazy);
  const [focused, setFocused] = useState(false);

  const lazyLoad = useCallback(() => {
    if (lazy && !shouldLoad) {
      setLoaded(true);
    }
  }, [lazy, shouldLoad]);

  useAnimatedReaction(() => {
    return currentPage.value === index;
  },
  (isActive, wasActive) => {
    if (isActive) {
      runOnJS(lazyLoad)();
      runOnJS(setFocused)(true);
    }
    if (wasActive) {
      runOnJS(setFocused)(false);
    }
  },
  [currentPage]);

  /* Handle freeze for pages that near the active page (relevant for carousel page) */
  useAnimatedReaction(() => {
    return asCarousel && currentPage.value - 1 === index || currentPage.value + 1 === index;
  },
  (nearActive) => {
    if (nearActive) {
      runOnJS(setFocused)(true);
    }
  },
  [currentPage]);

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
      {/* {shouldLoad && props.children} */}
      <Freeze freeze={!shouldLoad || !focused}>{props.children}</Freeze>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject
  }
});
