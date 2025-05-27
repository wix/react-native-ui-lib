import React, {PropsWithChildren, useCallback, useContext, useState, useMemo, useRef, useEffect} from 'react';
import {type StyleProp, StyleSheet, type ViewStyle, findNodeHandle, AccessibilityInfo} from 'react-native';
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
  /**
   * add style properties to tab page
   */
  style?: StyleProp<ViewStyle>;
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
  style,
  lazyLoadTime = 100,
  ...props
}: PropsWithChildren<TabControllerPageProps>) {
  const {currentPage, asCarousel, nestedInScrollView, containerWidth} = useContext(TabBarContext);
  const [shouldLoad, setLoaded] = useState(!lazy);
  const [isActive, setIsActive] = useState(false);
  const pageRef = useRef(null);
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
    const newIsActive = currentPage === index;

    if (newIsActive !== isActive) {
      runOnJS(setIsActive)(newIsActive);
    }

    if (newIsActive) {
      runOnJS(lazyLoad)();
    }

    // if (isActive || nearActive) {
    //   runOnJS(setFocused)(true);
    // } else if (wasActive || wasNearActive) {
    //   runOnJS(setFocused)(false);
    // }
  },
  [currentPage, lazyLoad, isActive]);

  useEffect(() => {
    if (isActive && pageRef.current && shouldLoad) {
      setTimeout(() => {
        const node = findNodeHandle(pageRef.current);
        if (node) {
          AccessibilityInfo.setAccessibilityFocus(node);
        }
      }, 100);
    }
  }, [isActive, shouldLoad]);

  const animatedPageStyle = useAnimatedStyle(() => {
    const isActive = Math.round(currentPage.value) === index;

    // TODO: Fix to proper animated style once Reanimated export AnimatedStyleProp
    const style: any = {
      opacity: isActive || asCarousel ? 1 : 0,
      zIndex: isActive || asCarousel ? 1 : 0
    };

    if (nestedInScrollView) {
      style.position = isActive ? 'relative' : 'absolute';
    }

    return style;
  });

  const _style = useMemo(() => {
    return [!asCarousel && styles.page, animatedPageStyle, {width: asCarousel ? containerWidth : undefined}, style];
  }, [asCarousel, animatedPageStyle, containerWidth, style]);

  return (
    <Reanimated.View ref={pageRef} style={_style} testID={testID} accessible={false}>
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
