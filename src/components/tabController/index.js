// TODO: support commented props
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated, {Easing} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {timing, fract, between} from 'react-native-redash';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';

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
  lessThan,
  neq,
  not,
  set,
  Value,
  block,
  onChange,
  interpolate,
  round,
  multiply
} = Reanimated;

/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.js
 * @notes: This component is based on react-native-gesture-handler
 * @important: On Android, if using react-native-navigation, make sure to wrap your screen with gestureHandlerRootHOC
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
class TabController extends Component {
  static displayName = 'TabController';
  static contextType = TabBarContext;

  static propTypes = {
    /**
     * Initial selected index
     */
    selectedIndex: PropTypes.number,
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex: PropTypes.func,
    /**
     * When using TabController.PageCarousel this should be turned on
     */
    asCarousel: PropTypes.bool,
    /**
     * Pass for custom carousel page width
     */
    carouselPageWidth: PropTypes.number
  };

  static defaultProps = {
    selectedIndex: 0,
    activeOpacity: 0.2
  };

  constructor(props) {
    super(props);

    let itemStates = [];
    let ignoredItems = [];
    if (props.items) {
      const itemsCount = _.chain(props.items).filter(item => !item.ignore).size().value();
      itemStates = _.times(itemsCount, () => new Value(State.UNDETERMINED));
      ignoredItems = _.filter(props.items, item => item.ignore);
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isUndefined(nextProps.carouselPageWidth) && nextProps.carouselPageWidth !== prevState.pageWidth) {
      return {
        pageWidth: nextProps.carouselPageWidth
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageWidth !== this.state.pageWidth) {
      this.state.containerWidth.setValue(this.state.pageWidth);
    }
  }

  get pageWidth() {
    return this.props.carouselPageWidth || Constants.screenWidth;
  }

  registerTabItems = (tabItemsCount, ignoredItems) => {
    const itemStates = _.times(tabItemsCount, () => new Value(State.UNDETERMINED));
    this.setState({itemStates, ignoredItems});
  };

  onPageChange = ([index]) => {
    _.invoke(this.props, 'onChangeIndex', index);
  };

  renderCodeBlock = () => {
    const {itemStates, ignoredItems, currentPage, targetPage, carouselOffset, containerWidth} = this.state;
    const {selectedIndex} = this.props;
    const clock = new Clock();
    const fromPage = new Value(selectedIndex);
    const toPage = new Value(selectedIndex);
    const isAnimating = new Value(0);
    const isScrolling = new Value(0);

    return block([
      /* Page change by TabBar */
      ..._.map(itemStates, (state, index) => {
        const ignoredItem = _.includes(ignoredItems, index);
        return [
          onChange(state,
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
          timing({clock, from: fromPage, to: toPage, duration: 280, easing: Easing.bezier(0.34, 1.3, 0.64, 1)}))
      ]),
      // Set isAnimating flag off
      cond(and(eq(isAnimating, 1), not(clockRunning(clock))), set(isAnimating, 0)),

      /* Page change by Carousel scroll */
      onChange(carouselOffset, [
        set(isScrolling, lessThan(round(abs(diff(carouselOffset))), round(containerWidth))),
        cond(and(not(isAnimating)), [
          set(currentPage,
            interpolate(round(carouselOffset), {
              inputRange: itemStates.map((v, i) => round(multiply(i, containerWidth))),
              outputRange: itemStates.map((v, i) => i)
            })),
          set(toPage, currentPage)
        ])
      ]),
      // Update/Sync target page when scrolling is done
      cond(and(eq(isScrolling, 1), eq(floor(abs(diff(carouselOffset))), 0)), [
        set(isScrolling, 0),
        cond(not(between(fract(currentPage), 0.1, 0.9, 1)), set(targetPage, round(currentPage)))
      ]),

      /* Invoke index change */
      onChange(targetPage, call([targetPage], this.onPageChange))
    ]);
  };

  render() {
    const {itemStates} = this.state;

    return (
      <TabBarContext.Provider value={this.state}>
        {this.props.children}
        {!_.isEmpty(itemStates) && <Code>{this.renderCodeBlock}</Code>}
      </TabBarContext.Provider>
    );
  }
}

TabController.TabBar = TabBar;
TabController.TabBarItem = TabBarItem;
TabController.TabPage = TabPage;
TabController.PageCarousel = PageCarousel;
export default asBaseComponent(TabController);
