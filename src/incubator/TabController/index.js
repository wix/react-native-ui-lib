// TODO: support carousel mode
// TODO: support auto scroll to selected index
// TODO: support commented props
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import TabBarContext from './TabBarContext';
import TabBar from './TabBar';
import TabBarItem from './TabBarItem';
import TabPage from './TabPage';

const {cond, Code, and, eq, set, Value, block} = Reanimated;

class TabController extends Component {
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
  };

  static defaultProps = {
    selectedIndex: 0,
    activeOpacity: 0.2,
  };

  state = {
    itemStates: [],
  };

  _targetPage = new Value(-1);
  _currentPage = new Value(this.props.selectedIndex);

  getProviderContextValue = () => {
    const {itemStates} = this.state;
    const {onChangeIndex, selectedIndex} = this.props;
    return {
      selectedIndex,
      currentPage: this._currentPage,
      itemStates,
      registerTabItems: this.registerTabItems,
      onChangeIndex,
    };
  };

  registerTabItems = (tabItemsCount, ignoredItems) => {
    const itemStates = _.times(tabItemsCount, () => new Value(-1));
    this.setState({itemStates, ignoredItems});
  };

  onChangeIndex = () => {
    _.invoke(this.props, 'onChangeIndex', this.props);
  };

  render() {
    const {itemStates, ignoredItems} = this.state;
    return (
      <TabBarContext.Provider value={this.getProviderContextValue()}>
        {this.props.children}
        {!_.isEmpty(itemStates) && (
          <Code>
            {() =>
              block([
                ..._.map(itemStates, (state, index) => {
                  return [
                    cond(and(eq(state, State.BEGAN), !_.includes(ignoredItems, index)), set(this._targetPage, index)),
                    cond(
                      and(eq(this._targetPage, index), eq(state, State.END), !_.includes(ignoredItems, index)),
                      set(this._currentPage, index),
                    ),
                  ];
                }),
              ])
            }
          </Code>
        )}
      </TabBarContext.Provider>
    );
  }
}

TabController.TabBar = TabBar;
TabController.TabBarItem = TabBarItem;
TabController.TabPage = TabPage;
export default TabController;
