import _filter from "lodash/filter";
import _noop from "lodash/noop"; // TODO: support commented props
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useAnimatedReaction, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { useOrientation, useThemeProps } from "../../hooks";
import { Constants } from "../../commons/new";
import TabBarContext from "./TabBarContext";
import TabBar, { TabControllerBarProps } from "./TabBar";
import TabBarItem, { TabControllerItemProps } from "./TabBarItem";
import TabPage from "./TabPage";
import PageCarousel from "./PageCarousel";
import useImperativeTabControllerHandle, { TabControllerImperativeMethods } from "./useImperativeTabControllerHandle";
export { TabControllerBarProps, TabControllerItemProps, TabControllerImperativeMethods };
const getScreenWidth = useSafeArea => {
  const {
    left,
    right
  } = Constants.getSafeAreaInsets();
  return Constants.windowWidth - (useSafeArea && Constants.isIphoneX ? left + right : 0);
};

/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
const TabController = React.forwardRef((props, ref) => {
  const themeProps = useThemeProps(props, 'TabController');
  const {
    initialIndex = 0,
    asCarousel = false,
    nestedInScrollView = false,
    items,
    onChangeIndex = _noop,
    carouselPageWidth,
    useSafeArea = false,
    children
  } = themeProps;
  const [screenWidth, setScreenWidth] = useState(getScreenWidth(useSafeArea));
  if (items?.length < 2) {
    console.warn('TabController component expect a minimum of 2 items');
  }
  useOrientation({
    onOrientationChange: () => {
      setScreenWidth(getScreenWidth(useSafeArea));
    }
  });
  const pageWidth = useMemo(() => {
    return carouselPageWidth || screenWidth;
  }, [carouselPageWidth, screenWidth]);
  const ignoredItems = useMemo(() => {
    return _filter(items, item => item.ignore);
  }, [items]);

  /* currentPage - static page index */
  const currentPage = useSharedValue(initialIndex);
  /* targetPage - transitioned page index (can be a fraction when transitioning between pages) */
  const targetPage = useSharedValue(initialIndex);
  const setCurrentIndex = useCallback(index => {
    'worklet';

    currentPage.value = index;
  }, []);
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  useAnimatedReaction(() => {
    return currentPage.value;
  }, (value, prevValue) => {
    if (value !== prevValue) {
      targetPage.value = withTiming(value);
      prevValue !== null && runOnJS(onChangeIndex)(value, prevValue);
    }
  });
  useImperativeTabControllerHandle(ref, setCurrentIndex);
  const context = useMemo(() => {
    return {
      /* Pass Props */
      initialIndex,
      asCarousel,
      pageWidth,
      nestedInScrollView,
      /* Items */
      items,
      ignoredItems,
      itemsCount: items.length - ignoredItems.length,
      /* Animated Values */
      targetPage,
      currentPage,
      containerWidth: screenWidth,
      /* Callbacks */
      onChangeIndex,
      setCurrentIndex
    };
  }, [initialIndex, asCarousel, items, onChangeIndex, screenWidth, nestedInScrollView]);
  return <TabBarContext.Provider value={context}>{children}</TabBarContext.Provider>;
});

// @ts-expect-error
TabController.TabBar = TabBar;
// @ts-expect-error
TabController.TabBarItem = TabBarItem;
// @ts-expect-error
TabController.TabPage = TabPage;
// @ts-expect-error
TabController.PageCarousel = PageCarousel;
export default TabController;