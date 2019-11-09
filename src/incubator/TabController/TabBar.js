// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView, ViewPropTypes, Platform} from 'react-native';
import Reanimated, {Easing} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TabBarContext from './TabBarContext';
import TabBarItem from './TabBarItem';
import ReanimatedObject from './ReanimatedObject';
import {asBaseComponent, forwardRef} from '../../commons';
import View from '../../components/view';
import Text from '../../components/text';
import {Colors, Spacings} from '../../style';
import {Constants} from '../../helpers';

const DEFAULT_HEIGHT = 48;
const {Code, Clock, Value, add, sub, cond, eq, stopClock, startClock, clockRunning, timing, block, set} = Reanimated;

/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TabControllerScreen/index.js
 */
class TabBar extends PureComponent {
  static displayName = 'TabController.TabBar';
  static contextType = TabBarContext;

  static propTypes = {
    /**
     * The list of tab bar items
     */
    items: PropTypes.arrayOf(PropTypes.shape(TabBarItem)),
    /**
     * Tab Bar height
     */
    height: PropTypes.number,
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow: PropTypes.bool,
    // /**
    //  * The minimum number of tabs to render in scroll mode
    //  */
    // minTabsForScroll: PropTypes.number,
    /**
     * custom style for the selected indicator
     */
    indicatorStyle: ViewPropTypes.style,
    /**
     * custom label style
     */
    labelStyle: Text.propTypes.style,
    /**
     * the default label color
     */
    labelColor: PropTypes.string,
    /**
     * the selected label color
     */
    selectedLabelColor: PropTypes.string,
    /**
     * whether to change the text to uppercase
     */
    uppercase: PropTypes.bool,
    /**
     * icon tint color
     */
    iconColor: PropTypes.string,
    /**
     * icon selected tint color
     */
    selectedIconColor: PropTypes.string,
    /**
     * TODO: rename to feedbackColor
     * Apply background color on press for TouchableOpacity
     */
    activeBackgroundColor: PropTypes.string,
    /**
     * The TabBar container width
     */
    containerWidth: PropTypes.number
  };

  static defaultProps = {
    containerWidth: Constants.screenWidth
  };

  constructor(props, context) {
    super(props, context);

    if (this.props.children) {
      console.warn('uilib: Please pass the "items" prop to TabController.TabBar instead of children');
    }

    const itemsCount = this.itemsCount;

    this.tabBar = React.createRef();

    this._itemsWidths = _.times(itemsCount, () => null);
    this._indicatorOffset = new ReanimatedObject({duration: 300, easing: Easing.bezier(0.23, 1, 0.32, 1)});
    this._indicatorWidth = new ReanimatedObject({duration: 300, easing: Easing.bezier(0.23, 1, 0.32, 1)});
    this._indicatorTransitionStyle = {
      width: this._indicatorWidth.value,
      left: this._indicatorOffset.value
    };

    this.state = {
      scrollEnabled: false,
      itemsWidths: undefined
    };

    this.registerTabItems();
  }

  get children() {
    return _.filter(this.props.children, child => !!child);
  }

  get itemsCount() {
    const {items} = this.props;
    if (items) {
      return _.size(items);
    } else {
      return React.Children.count(this.children);
    }
  }

  registerTabItems() {
    const {registerTabItems} = this.context;
    const {items} = this.props;
    const ignoredItems = [];
    let itemsCount;

    if (items) {
      itemsCount = _.size(items);
      _.forEach(items, (item, index) => {
        if (item.ignore) {
          ignoredItems.push(index);
        }
      });
      // TODO: deprecate with props.children
    } else {
      itemsCount = React.Children.count(this.children);
      React.Children.toArray(this.children).forEach((child, index) => {
        if (child.props.ignore) {
          ignoredItems.push(index);
        }
      });
    }

    registerTabItems(itemsCount, ignoredItems);
  }

  onItemLayout = (itemWidth, itemIndex) => {
    this._itemsWidths[itemIndex] = itemWidth;
    if (!_.includes(this._itemsWidths, null)) {
      const {selectedIndex} = this.context;
      const itemsOffsets = _.map(this._itemsWidths, (w, index) => _.sum(_.take(this._itemsWidths, index)));
      this.setState({itemsWidths: this._itemsWidths, itemsOffsets});
      this.tabBar.current.scrollTo({x: itemsOffsets[selectedIndex], animated: false});
    }
  };

  onContentSizeChange = width => {
    if (width > Constants.screenWidth) {
      this.setState({scrollEnabled: true});
    }
  };

  runTiming(targetValue, prevValue, duration) {
    const clock = new Clock();
    const state = {
      finished: new Value(0),
      position: prevValue,
      time: new Value(0),
      frameTime: new Value(0)
    };

    const config = {
      duration,
      toValue: targetValue,
      easing: Easing.bezier(0.23, 1, 0.32, 1)
    };

    return block([
      cond(clockRunning(clock), [], [startClock(clock)]),
      timing(clock, state, config),
      cond(state.finished, [
        stopClock(clock),
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(prevValue, state.position)
      ]),
      state.position
    ]);
  }

  renderSelectedIndicator() {
    const {itemsWidths} = this.state;
    const {indicatorStyle} = this.props;
    if (itemsWidths) {
      return <Reanimated.View style={[styles.selectedIndicator, indicatorStyle, this._indicatorTransitionStyle]}/>;
    }
  }

  renderTabBarItems() {
    const {itemStates} = this.context;
    const {
      items,
      labelColor,
      selectedLabelColor,
      labelStyle,
      uppercase,
      iconColor,
      selectedIconColor,
      activeBackgroundColor
    } = this.props;

    if (_.isEmpty(itemStates)) {
      return;
    }

    if (items) {
      return _.map(items, (item, index) => {
        return (
          <TabBarItem
            labelColor={labelColor}
            selectedLabelColor={selectedLabelColor}
            labelStyle={labelStyle}
            uppercase={uppercase}
            iconColor={iconColor}
            selectedIconColor={selectedIconColor}
            activeBackgroundColor={activeBackgroundColor}
            {...item}
            {...this.context}
            index={index}
            state={itemStates[index]}
            onLayout={this.onItemLayout}
          />
        );
      });
    } else {
      // TODO: Remove once props.children is deprecated

      if (this.tabBarItems) {
        return this.tabBarItems;
      }

      this.tabBarItems = React.Children.map(this.children, (child, index) => {
        return React.cloneElement(child, {
          labelColor,
          selectedLabelColor,
          labelStyle,
          uppercase,
          iconColor,
          selectedIconColor,
          activeBackgroundColor,
          ...child.props,
          ...this.context,
          index,
          state: itemStates[index],
          onLayout: this.onItemLayout
        });
      });
      return this.tabBarItems;
    }
  }

  render() {
    const {currentPage} = this.context;
    const {height, enableShadow} = this.props;
    const {itemsWidths, itemsOffsets, scrollEnabled} = this.state;
    return (
      <View style={enableShadow && styles.containerShadow}>
        <ScrollView
          ref={this.tabBar}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBarScroll}
          contentContainerStyle={styles.tabBarScrollContent}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={[styles.tabBar, height && {height}]}>{this.renderTabBarItems()}</View>
          {this.renderSelectedIndicator()}
        </ScrollView>
        {!_.isUndefined(itemsWidths) && (
          <Code>
            {() => {
              const indicatorInset = Spacings.s4;

              return block([
                // calc indicator current width
                ..._.map(itemsWidths, (width, index) => {
                  return cond(eq(currentPage, index), [
                    set(this._indicatorWidth.nextValue, sub(itemsWidths[index], indicatorInset * 2))
                  ]);
                }),
                // calc indicator current position
                ..._.map(itemsOffsets, (offset, index) => {
                  return cond(eq(currentPage, index), [
                    set(this._indicatorOffset.nextValue, add(itemsOffsets[index], indicatorInset))
                  ]);
                }),

                // Offset transition
                this._indicatorOffset.getTransitionBlock(),
                // Width transition
                this._indicatorWidth.getTransitionBlock()
              ]);
            }}
          </Code>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    backgroundColor: Colors.white,
    height: DEFAULT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabBarScroll: {
    backgroundColor: Colors.white
  },
  tabBarScrollContent: {
    minWidth: Constants.screenWidth
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 70,
    height: 2,
    backgroundColor: Colors.blue30
  },
  containerShadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.dark10,
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {height: 6, width: 0}
      },
      android: {
        elevation: 5,
        backgroundColor: Colors.white
      }
    })
  }
});

export default asBaseComponent(forwardRef(TabBar));
