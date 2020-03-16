// TODO: support carousel mode
// TODO: support auto scroll to selected index
// TODO: support commented props
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {Constants} from '../../helpers';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem from './TabBarItem';
import TabPage from './TabPage';
import PageCarousel from './PageCarousel';

const {cond, Code, and, eq, set, Value, block, round, onChange, call} = Reanimated;

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
     * TODO: change to initial index
     * current selected tab index
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

  _targetPage = new Value(-1);
  _currentPage = new Value(this.props.selectedIndex);
  _carouselOffset = new Value(this.props.selectedIndex * Math.round(Constants.screenWidth));

  getProviderContextValue = () => {
    const {itemStates, selectedIndex} = this.state;
    const {onChangeIndex, asCarousel} = this.props;
    return {
      selectedIndex,
      currentPage: this._currentPage,
      carouselOffset: this._carouselOffset,
      itemStates,
      registerTabItems: this.registerTabItems,
      onChangeIndex,
      asCarousel
    };
  };

  registerTabItems = (tabItemsCount, ignoredItems) => {
    const itemStates = _.times(tabItemsCount, () => new Value(-1));
    this.setState({itemStates, ignoredItems});
  };

  onPageChange = ([index]) => {
    _.invoke(this.props, 'onChangeIndex', index);
  };

  getCarouselPageChangeCode() {
    const {asCarousel} = this.props;
    const {itemStates} = this.state;

    if (asCarousel) {
      // Rounding on Android, cause it cause issues when comparing values
      const screenWidth = Constants.isAndroid ? Math.round(Constants.screenWidth) : Constants.screenWidth;

      return _.times(itemStates.length, index => {
        return cond(eq(Constants.isAndroid ? round(this._carouselOffset) : this._carouselOffset, index * screenWidth), [
          set(this._currentPage, index)
        ]);
      });
    }

    return [];
  }

  renderCodeBlock = () => {
    const {itemStates, ignoredItems} = this.state;
    return block([
      // Carousel Page change
      ...this.getCarouselPageChangeCode(),
      // TabBar Page change
      ..._.map(itemStates, (state, index) => {
        return [
          cond(and(eq(state, State.BEGAN), !_.includes(ignoredItems, index)), set(this._targetPage, index)),
          cond(and(eq(this._targetPage, index), eq(state, State.END), !_.includes(ignoredItems, index)), [
            set(this._currentPage, index),
            set(this._targetPage, -1)
          ])
        ];
      }),
      onChange(this._currentPage, call([this._currentPage], this.onPageChange))
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
