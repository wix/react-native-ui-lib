// TODO: support carousel mode
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
    onChangeIndex: PropTypes.func,
  };

  static defaultProps = {
    activeOpacity: 0.2,
  };

  state = {
    itemStates: [],
  };

  _targetPage = new Value(0);
  _currentPage = new Value(0);

  getProviderContextValue = () => {
    const {itemStates} = this.state;
    const {onChangeIndex} = this.props;
    return {
      currentPage: this._currentPage,
      itemStates,
      registerTabItems: this.registerTabItems,
      onChangeIndex,
    };
  };

  registerTabItems = tabItemsCount => {
    const itemStates = _.times(tabItemsCount, () => new Value(-1));
    this.setState({itemStates});
  };

  onChangeIndex = () => {
    _.invoke(this.props, 'onChangeIndex', this.props);
  };

  render() {
    const {itemStates} = this.state;
    return (
      <TabBarContext.Provider value={this.getProviderContextValue()}>
        {this.props.children}
        {!_.isEmpty(itemStates) && (
          <Code>
            {() =>
              block([
                cond(eq(itemStates[0], State.BEGAN), set(this._targetPage, 0)),
                cond(eq(itemStates[1], State.BEGAN), set(this._targetPage, 1)),
                cond(eq(itemStates[2], State.BEGAN), set(this._targetPage, 2)),
                cond(and(eq(this._targetPage, 0), eq(itemStates[0], State.END)), set(this._currentPage, 0)),
                cond(and(eq(this._targetPage, 1), eq(itemStates[1], State.END)), set(this._currentPage, 1)),
                cond(and(eq(this._targetPage, 2), eq(itemStates[2], State.END)), set(this._currentPage, 2)),
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
