import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import TabBarContext from './TabBarContext';
import View from '../../components/view';
import {Colors} from '../../style';

class TabBar extends Component {
  static contextType = TabBarContext;
  state = {};

  constructor(props, context) {
    super(props, context);
    const {registerTabItems} = this.context;
    const itemsCount = React.Children.count(this.props.children);
    registerTabItems(itemsCount);
  }

  renderTabBarItems() {
    const {itemStates} = this.context;
    if (!_.isEmpty(itemStates)) {
      return React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, {
          ...this.context,
          index,
          state: itemStates[index],
        });
      });
    }
  }

  render() {
    return <View style={styles.tabBar}>{this.renderTabBarItems()}</View>;
  }
}

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
