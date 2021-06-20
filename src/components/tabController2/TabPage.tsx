import React, {PropsWithChildren, useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import Reanimated, {useAnimatedStyle, useAnimatedReaction, runOnJS} from 'react-native-reanimated';
import TabBarContext from './TabBarContext';
import {Constants} from 'helpers';

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
  const [loaded, setLoaded] = useState(!lazy);

  const lazyLoad = useCallback(() => {
    if (lazy && !loaded) {
      setLoaded(true);
    }
  }, [lazy, loaded]);

  useAnimatedReaction(() => {
    return currentPage.value === index;
  },
  isActive => {
    if (isActive) {
      runOnJS(lazyLoad)();
    }
  });

  const animatedPageStyle = useAnimatedStyle(() => {
    const isActive = Math.round(currentPage.value) === index;
    return {
      opacity: isActive || asCarousel ? 1 : 0,
      zIndex: isActive || asCarousel ? 1 : 0,
      width: asCarousel ? containerWidth.value || Constants.screenWidth : undefined
    };
  });

  return (
    <Reanimated.View style={[!asCarousel && styles.page, animatedPageStyle]} testID={testID}>
      {!loaded && renderLoading?.()}
      {loaded && props.children}
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject
  }
});
