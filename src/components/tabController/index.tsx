// TODO: support commented props
import React, {Component} from 'react';
import _ from 'lodash';
import Reanimated, {Easing as _Easing, EasingNode} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {timing, fract, between} from 'react-native-redash';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons/new';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem, {TabControllerItemProps} from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';
export {TabControllerItemProps};

const {
  and,
  abs,
  cond,
  call,
  Code,
  Clock,
  clockRunning,
  diff,
  eq,
  floor,
  greaterThan,
  lessThan,
  neq,
  not,
  set,
  Value,
  block,
  onChange,
  interpolate: _interpolate,
  interpolateNode,
  round,
  multiply
} = Reanimated;

const Easing = EasingNode || _Easing;
const interpolate = interpolateNode || _interpolate;

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

interface StateProps {
  selectedIndex: number;
  asCarousel?: boolean;
  pageWidth: number;
  // items
  items: TabControllerProps['items'];
  itemStates: any[]; // TODO: typescript?
  ignoredItems: any[]; // TODO: typescript?
  // animated values
  targetPage: any; // TODO: typescript?
  currentPage: any; // TODO: typescript?
  carouselOffset: any; // TODO: typescript?
  containerWidth: any; // TODO: typescript?
  // callbacks
  registerTabItems: (tabItemsCount: number, ignoredItems: StateProps['ignoredItems']) => void;
  onChangeIndex?: (index: number) => void;
}

/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/TabController/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/TabController/PageCarousel.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/TabController/CenterSelected.gif?raw=true
 */
class TabController extends Component<TabControllerProps, StateProps> {
  static displayName = 'TabController';
  static contextType = TabBarContext;

  static TabBar: typeof TabBar;
  static TabBarItem: typeof TabBarItem;
  static TabPage: typeof TabPage;
  static PageCarousel: typeof PageCarousel;

  static defaultProps = {
    selectedIndex: 0,
    activeOpacity: 0.2
  };

  constructor(props: TabControllerProps) {
    super(props);

    let itemStates: any[] = []; // TODO: typescript?
    let ignoredItems: any[] = []; // TODO: typescript?
    if (props.items) {
      const itemsCount = _.chain(props.items)
        .filter(item => !item.ignore)
        .size()
        .value();
      itemStates = _.times(itemsCount, () => new Value(State.UNDETERMINED));
      ignoredItems = _.filter<TabControllerItemProps[]>(props.items, (item: TabControllerItemProps) => item.ignore);
    }

    this.state = {
      selectedIndex: this.props.selectedIndex,
      asCarousel: this.props.asCarousel,
      pageWidth: this.pageWidth,
      // items
      items: props.items,
      itemStates,
      ignoredItems,
      // animated values
      targetPage: new Value(this.props.selectedIndex),
      currentPage: new Value(this.props.selectedIndex),
      carouselOffset: new Value(this.props.selectedIndex * Math.round(this.pageWidth)),
      containerWidth: new Value(this.pageWidth),
      // callbacks
      registerTabItems: this.registerTabItems,
      onChangeIndex: this.props.onChangeIndex
    };
  }

  static getDerivedStateFromProps(nextProps: TabControllerProps, prevState: StateProps) {
    if (!_.isUndefined(nextProps.carouselPageWidth) && nextProps.carouselPageWidth !== prevState.pageWidth) {
      return {
        pageWidth: nextProps.carouselPageWidth
      };
    }
    return null;
  }

  componentDidUpdate(_prevProps: TabControllerProps, prevState: StateProps) {
    if (prevState.pageWidth !== this.state.pageWidth) {
      this.state.containerWidth.setValue(this.state.pageWidth);
    }
  }

  get pageWidth() {
    return this.props.carouselPageWidth || Constants.screenWidth;
  }

  registerTabItems = (tabItemsCount: number, ignoredItems: StateProps['ignoredItems']) => {
    const itemStates = _.times(tabItemsCount, () => new Value(State.UNDETERMINED));
    this.setState({itemStates, ignoredItems});
  };

  onPageChange = ([index]: readonly number[]) => {
    _.invoke(this.props, 'onChangeIndex', index);
  };

  renderCodeBlock = _.memoize(() => {
    const {itemStates, ignoredItems, currentPage, targetPage, carouselOffset, containerWidth} = this.state;
    const {selectedIndex} = this.props;
    const clock = new Clock();
    const fromPage = new Value(selectedIndex);
    const toPage = new Value(selectedIndex);
    const isAnimating = new Value(0);
    const isScrolling = new Value(0);
    // temps
    const _carouselOffsetDiff = new Value(0);

    return (
      <Code>
        {() =>
          block([
            /* Page change by TabBar */
            ..._.map(itemStates, (state, index) => {
              const ignoredItem = _.includes(ignoredItems, index);
              return [
                onChange(state,
                  // @ts-ignore TODO: typescript?
                  cond(and(eq(state, State.END), !ignoredItem), [
                    set(fromPage, toPage),
                    set(toPage, index),
                    set(targetPage, index)
                  ]))
              ];
            }),

            // Animate currentPage to its target
            cond(neq(currentPage, toPage), [
              set(isAnimating, 1),
              set(currentPage,
                // @ts-ignore reanimated2
                timing({clock, from: fromPage, to: toPage, duration: 280, easing: Easing.bezier(0.34, 1.3, 0.64, 1)}))
            ]),
            // Set isAnimating flag off
            cond(and(eq(isAnimating, 1), not(clockRunning(clock))), set(isAnimating, 0)),

            /* Page change by Carousel scroll */
            onChange(carouselOffset, [
              set(_carouselOffsetDiff, round(abs(diff(carouselOffset)))),
              set(isScrolling,
                and(lessThan(_carouselOffsetDiff, round(containerWidth)), greaterThan(_carouselOffsetDiff, 0))),
              cond(not(isAnimating), [
                set(currentPage,
                  interpolate(round(carouselOffset), {
                    inputRange: itemStates.map((_v, i) => round(multiply(i, containerWidth))),
                    outputRange: itemStates.map((_v, i) => i)
                  })),
                set(toPage, currentPage)
              ])
            ]),
            // Update/Sync target page when scrolling is done
            cond(and(eq(isScrolling, 1), eq(floor(abs(diff(carouselOffset))), 0)), [
              set(isScrolling, 0),
              cond(not(between(fract(currentPage), 0.1, 0.9, true)), set(targetPage, round(currentPage)))
            ]),

            /* Invoke index change */
            onChange(targetPage, call([targetPage], this.onPageChange))
          ])
        }
      </Code>
    );
  });

  render() {
    const {itemStates} = this.state;

    return (
      <TabBarContext.Provider value={this.state}>
        {this.props.children}
        {!_.isEmpty(itemStates) && this.renderCodeBlock()}
      </TabBarContext.Provider>
    );
  }
}

TabController.TabBar = TabBar;
TabController.TabBarItem = TabBarItem;
TabController.TabPage = TabPage;
TabController.PageCarousel = PageCarousel;
export default asBaseComponent<
  TabControllerProps,
  typeof TabController
  //@ts-ignore typescript - will be fixed when moved to functional component
>(TabController);
