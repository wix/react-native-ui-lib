// TODO: support commented props
import React, {PropsWithChildren, useMemo, useEffect, useState, useCallback} from 'react';
import _ from 'lodash';
import {useAnimatedReaction, useSharedValue, withTiming, runOnJS} from 'react-native-reanimated';
import {useOrientation, useThemeProps} from '../../hooks';
import {Constants} from '../../commons/new';
import {LogService} from '../../services';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem, {TabControllerItemProps} from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';
import useImperativeTabControllerHandle, {TabControllerImperativeMethods} from './useImperativeTabControllerHandle';
export {TabControllerItemProps, TabControllerImperativeMethods};

// TODO: should migrate selectedIndex to initialIndex (and make this prop uncontrolled)

interface TabControllerStatics {
  TabBar: typeof TabBar;
  TabBarItem: typeof TabBarItem;
  TabPage: typeof TabPage;
  PageCarousel: typeof PageCarousel;
}

export interface TabControllerProps extends ThemeComponent {
  /**
   * The list of tab bar items
   */
  items: TabControllerItemProps[];
  /**
   * Initial selected index
   */
  initialIndex?: number;
  /**
   * DEPRECATED: use initialIndex instead
   */
  selectedIndex?: number;
  /**
   * callback for when index has change (will not be called on ignored items)
   */
  onChangeIndex?: (index: number, prevIndex: number | null) => void;
  /**
   * When using TabController.PageCarousel this should be turned on
   */
  asCarousel?: boolean;
  /**
   * Pass for custom carousel page width
   */
  carouselPageWidth?: number;
  /**
   * Send if a SafeView is used in the context of the TabController.
   */
  useSafeArea?: boolean;
}

const getScreenWidth = (useSafeArea: boolean) => {
  const {left, right} = Constants.getSafeAreaInsets();
  return Constants.windowWidth - (useSafeArea && Constants.isIphoneX ? left + right : 0);
};

/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
const TabController = React.forwardRef((props: PropsWithChildren<TabControllerProps>, ref: React.Ref<any>) => {
  const themeProps = useThemeProps(props, 'TabController');
  const {
    initialIndex = 0,
    selectedIndex,
    asCarousel = false,
    items,
    onChangeIndex = _.noop,
    carouselPageWidth,
    useSafeArea = false,
    children
  } = themeProps;
  const [screenWidth, setScreenWidth] = useState<number>(getScreenWidth(useSafeArea));

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
    return _.filter<TabControllerItemProps[]>(items, (item: TabControllerItemProps) => item.ignore);
  }, [items]);

  /* backwards compatibility for `selectedIndex` prop. this line eventually should be removed */
  const _initialIndex = selectedIndex || initialIndex;

  /* currentPage - static page index */
  const currentPage = useSharedValue(_initialIndex);
  /* targetPage - transitioned page index (can be a fraction when transitioning between pages) */
  const targetPage = useSharedValue(_initialIndex);
  // const carouselOffset = useSharedValue(initialIndex * Math.round(pageWidth));

  const setCurrentIndex = useCallback((index: number) => {
    'worklet';
    currentPage.value = index;
  }, []);

  useEffect(() => {
    if (!_.isUndefined(selectedIndex)) {
      LogService.deprecationWarn({component: 'TabController', oldProp: 'selectedIndex', newProp: 'initialIndex'});
    }
  }, [selectedIndex]);

  useEffect(() => {
    setCurrentIndex(_initialIndex);
  }, [_initialIndex]);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  (value, prevValue) => {
    if (value !== prevValue) {
      targetPage.value = withTiming(value);
      prevValue !== null && runOnJS(onChangeIndex)(value, prevValue);
    }
  });

  useImperativeTabControllerHandle(ref, setCurrentIndex);

  const context = useMemo(() => {
    return {
      /* Pass Props */
      initialIndex: _initialIndex,
      asCarousel,
      pageWidth,
      /* Items */
      items,
      ignoredItems,
      itemsCount: items.length - ignoredItems.length,
      /* Animated Values */
      targetPage,
      currentPage,
      // carouselOffset,
      containerWidth: screenWidth,
      /* Callbacks */
      onChangeIndex,
      setCurrentIndex
    };
  }, [_initialIndex, asCarousel, items, onChangeIndex, screenWidth]);

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

export default TabController as typeof TabController & TabControllerStatics;
