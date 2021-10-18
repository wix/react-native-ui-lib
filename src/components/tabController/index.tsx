// TODO: support commented props
import React, {PropsWithChildren, useMemo, useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {useAnimatedReaction, useSharedValue, withTiming, runOnJS} from 'react-native-reanimated';
import {Constants} from '../../helpers';
import {orientations} from '../../helpers/Constants';
import {asBaseComponent} from '../../commons/new';
import {LogService} from '../../services';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem, {TabControllerItemProps} from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';
export {TabControllerItemProps};

// TODO: should migrate selectedIndex to initialIndex (and make this prop uncontrolled)
export interface TabControllerProps {
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
}

/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
function TabController({
  initialIndex = 0,
  selectedIndex,
  asCarousel = false,
  items,
  onChangeIndex = _.noop,
  carouselPageWidth,
  children
}: PropsWithChildren<TabControllerProps>) {
  const [screenWidth, setScreenWidth] = useState<number>(Constants.windowWidth);
  const orientation = useRef<orientations>(Constants.orientation);
  const dimensionsChangeListener = useRef<any>();

  if (items?.length < 2) {
    console.error('TabController component expect a minimum of 2 items');
  }

  useEffect(() => {
    const onOrientationChange = () => {
      if (orientation.current !== Constants.orientation) {
        orientation.current = Constants.orientation;
        setScreenWidth(Constants.windowWidth);
      }
    };
    dimensionsChangeListener.current = Constants.addDimensionsEventListener(onOrientationChange);
    return () => {
      Constants.removeDimensionsEventListener(dimensionsChangeListener.current || onOrientationChange);
    };
  }, []);

  const pageWidth = useMemo(() => {
    return carouselPageWidth || screenWidth;
  }, [carouselPageWidth, screenWidth]);

  const ignoredItems = useMemo(() => {
    return _.filter<TabControllerItemProps[]>(items, (item: TabControllerItemProps) => item.ignore);
  }, [items]);

  /* backwards compatibility for `selectedIndex` prop. this line eventually should be removed */
  initialIndex = selectedIndex || initialIndex;

  /* currentPage - static page index */
  const currentPage = useSharedValue(initialIndex);
  /* targetPage - transitioned page index (can be a fraction when transitioning between pages) */
  const targetPage = useSharedValue(initialIndex);
  const carouselOffset = useSharedValue(initialIndex * Math.round(pageWidth));

  useEffect(() => {
    if (!_.isUndefined(selectedIndex)) {
      LogService.deprecationWarn({component: 'TabController2', oldProp: 'selectedIndex', newProp: 'initialIndex'});
    }
  }, [selectedIndex]);

  useEffect(() => {
    currentPage.value = initialIndex;
  }, [initialIndex]);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  (value, prevValue) => {
    if (value !== prevValue) {
      targetPage.value = withTiming(value);
      prevValue !== null && runOnJS(onChangeIndex)(value, prevValue);
    }
  });

  const context = useMemo(() => {
    return {
      /* Pass Props */
      initialIndex,
      asCarousel,
      pageWidth,
      /* Items */
      items,
      ignoredItems,
      /* Animated Values */
      targetPage,
      currentPage,
      carouselOffset,
      containerWidth: screenWidth,
      /* Callbacks */
      onChangeIndex
    };
  }, [initialIndex, asCarousel, items, onChangeIndex, screenWidth]);

  return <TabBarContext.Provider value={context}>{children}</TabBarContext.Provider>;
}

TabController.TabBar = TabBar;
TabController.TabBarItem = TabBarItem;
TabController.TabPage = TabPage;
TabController.PageCarousel = PageCarousel;
export default asBaseComponent<TabControllerProps, typeof TabController>(TabController);
