// TODO: support commented props
import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import _ from 'lodash';
import {useAnimatedReaction, useSharedValue, withTiming} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons/new';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem, {TabControllerItemProps} from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';
export {TabControllerItemProps};

export interface TabControllerProps {
  /**
   * The list of tab bar items
   */
  items: TabControllerItemProps[];
  /**
   * Initial selected index
   */
  selectedIndex: number;
  /**
   * callback for when index has change (will not be called on ignored items)
   */
  onChangeIndex?: (index: number) => void;
  /**
   * When using TabController.PageCarousel this should be turned on
   */
  asCarousel?: boolean;
  /**
   * Pass for custom carousel page width
   */
  carouselPageWidth?: number;
}

// interface StateProps {
//   selectedIndex: number;
//   asCarousel?: boolean;
//   pageWidth: number;
//   // items
//   items: TabControllerProps['items'];
//   itemStates: any[]; // TODO: typescript?
//   ignoredItems: any[]; // TODO: typescript?
//   // animated values
//   targetPage: any; // TODO: typescript?
//   currentPage: any; // TODO: typescript?
//   carouselOffset: any; // TODO: typescript?
//   containerWidth: any; // TODO: typescript?
//   // callbacks
//   // registerTabItems: (tabItemsCount: number, ignoredItems: StateProps['ignoredItems']) => void;
//   onChangeIndex?: (index: number) => void;
// }

/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */

function TabController({
  selectedIndex,
  asCarousel,
  items,
  onChangeIndex,
  carouselPageWidth,
  children
}: PropsWithChildren<TabControllerProps>) {
  const pageWidth = useMemo(() => {
    return carouselPageWidth || Constants.screenWidth;
  }, [carouselPageWidth]);
  const itemsCount = useMemo(() => {
    return _.chain(items)
      .filter(item => !item.ignore)
      .size()
      .value();
  }, [items]);

  const currentPage = useSharedValue(selectedIndex);
  const targetPage = useSharedValue(selectedIndex);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  (value, prevValue) => {
    if (value !== prevValue) {
      targetPage.value = withTiming(value);
    }
  });

  const carouselOffset = useSharedValue(selectedIndex * Math.round(pageWidth));
  const containerWidth = useSharedValue(pageWidth);

  // const [itemStates, setItemStates] = useState(_.times(itemsCount, () => new Value(State.UNDETERMINED)));
  const itemStates = useSharedValue(_.times(itemsCount, () => State.UNDETERMINED));
  const ignoredItems = useMemo(() => {
    return _.filter<TabControllerItemProps[]>(items, (item: TabControllerItemProps) => item.ignore);
  }, [items]);

  // TODO: not sure we need this anymore
  // const registerTabItems = useCallback((tabItemsCount: number, ignoredItems: StateProps['ignoredItems']) => {
  //   // const itemStates = useSharedValue(_.times(tabItemsCount, () => State.UNDETERMINED));
  //   // this.setState({itemStates, ignoredItems});
  // }, []);

  const context = useMemo(() => {
    return {
      selectedIndex,
      asCarousel,
      pageWidth,
      // items
      items,
      itemStates,
      ignoredItems,
      // Animated Values
      targetPage,
      currentPage,
      carouselOffset,
      containerWidth,
      // callbacks
      /* registerTabItems, */
      onChangeIndex
    };
  }, [selectedIndex, asCarousel, items, onChangeIndex]);

  return <TabBarContext.Provider value={context}>{children}</TabBarContext.Provider>;
}

TabController.TabBar = TabBar;
TabController.TabBarItem = TabBarItem;
TabController.TabPage = TabPage;
TabController.PageCarousel = PageCarousel;
export default asBaseComponent<TabControllerProps, typeof TabController>(TabController);
