// TODO: support carousel mode
// TODO: support auto scroll to selected index
// TODO: support commented props
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated, {Easing} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {timing, fract} from 'react-native-redash';
import {Constants} from '../../helpers';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';

const {
  and,
  cond,
  call,
  Code,
  Clock,
  clockRunning,
  eq,
  neq,
  not,
  set,
  Value,
  block,
  onChange,
  interpolate,
  round
} = Reanimated;

/**
 * @description: A performant solution for a tab controller with lazy load mechanism
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TabControllerScreen/index.js
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
    // /**
    //  * callback for when tab selected
    //  */
    // onTabSelected: PropTypes.func,
    /**
     * When using TabController.PageCarousel this should be turned on
     */
    asCarousel: PropTypes.bool
  };

  static defaultProps = {
    selectedIndex: 0,
    activeOpacity: 0.2
  };

  state = {
    selectedIndex: this.props.selectedIndex,
    itemStates: []
  };

  _targetPage = new Value(this.props.selectedIndex);
  _currentPage = new Value(this.props.selectedIndex);
  _carouselOffset = new Value(this.props.selectedIndex * Math.round(Constants.screenWidth));

  shouldComponentUpdate(nextProps) {
    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      return false;
    }
    return true;
  }

  getProviderContextValue = () => {
    const {itemStates, selectedIndex} = this.state;
    const {onChangeIndex, asCarousel} = this.props;
    return {
      selectedIndex,
      currentPage: this._currentPage,
      targetPage: this._targetPage,
      carouselOffset: this._carouselOffset,
      itemStates,
      registerTabItems: this.registerTabItems,
      onChangeIndex,
      asCarousel
    };
  };

  registerTabItems = (tabItemsCount, ignoredItems) => {
    const itemStates = _.times(tabItemsCount, () => new Value(State.UNDETERMINED));
    this.setState({itemStates, ignoredItems});
  };

  onPageChange = ([index]) => {
    _.invoke(this.props, 'onChangeIndex', index);
  };

  renderCodeBlock = () => {
    const {itemStates, ignoredItems} = this.state;
    const {selectedIndex} = this.props;
    const clock = new Clock();
    const fromPage = new Value(selectedIndex);
    const toPage = new Value(selectedIndex);

    return block([
      /* Page change by TabBar */
      ..._.map(itemStates, (state, index) => {
        const ignoredItem = _.includes(ignoredItems, index);
        return [
          onChange(state,
            cond(and(eq(state, State.END), !ignoredItem), [
              set(fromPage, toPage),
              set(toPage, index),
              set(this._targetPage, index)
            ]))
        ];
      }),

      cond(neq(this._currentPage, toPage),
        set(this._currentPage,
          timing({clock, from: fromPage, to: toPage, duration: 300, easing: Easing.bezier(0.34, 1.56, 0.64, 1)}))),

      /* Page change by Carousel */
      onChange(this._carouselOffset, [
        cond(not(clockRunning(clock)), [
          set(this._currentPage,
            interpolate(round(this._carouselOffset), {
              inputRange: itemStates.map((v, i) => Math.round(i * Constants.screenWidth)),
              outputRange: itemStates.map((v, i) => i)
            })),
          set(toPage, this._currentPage),
          cond(eq(fract(this._currentPage), 0), set(this._targetPage, this._currentPage))
        ])
      ]),

      /* Invoke index change */
      onChange(toPage, call([toPage], this.onPageChange))
    ]);
  };

  render() {
    const {itemStates} = this.state;

    return (
      <TabBarContext.Provider value={this.getProviderContextValue()}>
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
export default TabController;
