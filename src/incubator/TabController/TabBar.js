// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView, ViewPropTypes, Platform} from 'react-native';
import Reanimated, {Easing} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TabBarContext from './TabBarContext';
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
    containerWidth: PropTypes.number,
  };

  static defaultProps = {
    containerWidth: Constants.screenWidth,
  };

  state = {
    itemsWidths: undefined,
  };

  tabBar = React.createRef();
  _indicatorOffset = createReanimatedObject({duration: 300, easing: Easing.bezier(0.23, 1, 0.32, 1)});
  _indicatorWidth = createReanimatedObject({duration: 300, easing: Easing.bezier(0.23, 1, 0.32, 1)}); 

  // _clock = new Clock();
  // _state = {
  //   finished: new Value(0),
  //   position: new Value(0),
  //   time: new Value(0),
  //   frameTime: new Value(0),
  // };
  // _config = {
  //   duration: 300,
  //   toValue: new Value(0),
  //   easing: Easing.bezier(0.23, 1, 0.32, 1),
  // };
  _itemsWidths = _.times(React.Children.count(this.props.children), () => null);
  
  // INDICATOR WIDTH
  // _prevIndicatorWidth = new Value(0);
  // _indicatorWidth = new Value(70);
  // _nextIndicatorWidth = new Value(0);
  // INDICATOR OFFSET
  // _prevOffset = new Value(0);
  // _offset = new Value(0);
  // _nextOffset = new Value(0);

  _indicatorTransitionStyle = {
    width: this._indicatorWidth.value,
    left: this._indicatorOffset.value,
  };

  constructor(props, context) {
    super(props, context);
    const {registerTabItems} = this.context;
    const itemsCount = React.Children.count(this.props.children);
    const ignoredItems = [];
    React.Children.toArray(this.props.children).forEach((child, index) => {
      if (child.props.ignore) {
        ignoredItems.push(index);
      }
    });
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

  runTiming(targetValue, prevValue, duration) {
    const clock = new Clock();
    const state = {
      finished: new Value(0),
      position: prevValue,
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration,
      toValue: targetValue,
      easing: Easing.bezier(0.23, 1, 0.32, 1),
    };

    return block([
      cond(clockRunning(clock), [], [startClock(clock)]),
      timing(clock, state, config),
      cond(state.finished, [
        stopClock(clock),
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(prevValue, state.position),
      ]),
      state.position,
    ]);
  }

  renderSelectedIndicator() {
    // return null;
    const {itemsWidths} = this.state;
    const {indicatorStyle} = this.props;
    if (itemsWidths) {
      // const transitionStyle = {
      //   width: this.runTiming(this._indicatorWidth, this._prevIndicatorWidth, 300),
      //   left: this.runTiming(this._offset, this._prevOffset, 400),
      // };
      return (
        <Reanimated.View
          style={[styles.selectedIndicator, indicatorStyle /* , transitionStyle */, this._indicatorTransitionStyle]}
        />
      );
    }
  }

  renderTabBarItems() {
    const {itemStates} = this.context;
    const {
      labelColor,
      selectedLabelColor,
      labelStyle,
      uppercase,
      iconColor,
      selectedIconColor,
      activeBackgroundColor,
    } = this.props;
    if (!_.isEmpty(itemStates)) {
      return React.Children.map(this.props.children, (child, index) => {
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
          onLayout: this.onItemLayout,
        });
      });
    }
  }

  render() {
    const {currentPage} = this.context;
    const {containerWidth, height, enableShadow} = this.props;
    const {itemsWidths, itemsOffsets} = this.state;
    return (
      <View style={enableShadow && styles.containerShadow}>
        <ScrollView
          ref={this.tabBar}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor: Colors.white}}
          contentContainerStyle={{minWidth: containerWidth}}
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
                    // set(this._indicatorWidth, sub(itemsWidths[index], indicatorInset * 2)),
                    set(this._indicatorWidth.nextValue, sub(itemsWidths[index], indicatorInset * 2)),
                  ]);
                }),
                // calc indicator current position
                ..._.map(itemsOffsets, (offset, index) => {
                  // return cond(eq(currentPage, index), [set(this._offset, add(itemsOffsets[index], indicatorInset))]);
                  return cond(eq(currentPage, index), [
                    set(this._indicatorOffset.nextValue, add(itemsOffsets[index], indicatorInset)),
                  ]);
                }),

                // offset transition
                cond(
                  clockRunning(this._indicatorOffset.clock),
                  [
                    set(this._indicatorOffset.config.toValue, this._indicatorOffset.nextValue),
                    set(this._indicatorOffset.value, this._indicatorOffset.state.position),
                  ],
                  [
                    set(this._indicatorOffset.state.finished, 0),
                    set(this._indicatorOffset.state.time, 0),
                    set(this._indicatorOffset.state.frameTime, 0),
                    set(this._indicatorOffset.state.position, this._prevOffset),
                    set(this._indicatorOffset.config.toValue, this._indicatorOffset.nextValue),
                    startClock(this._indicatorOffset.clock),
                  ],
                ),
                timing(this._indicatorOffset.clock, this._indicatorOffset.state, this._indicatorOffset.config),
                cond(this._indicatorOffset.state.finished, [
                  stopClock(this._indicatorOffset.clock),
                  set(this._indicatorOffset.prevValue, this._indicatorOffset.state.position),
                ]),
                // width transition
                cond(
                  clockRunning(this._indicatorWidth.clock),
                  [
                    set(this._indicatorWidth.config.toValue, this._indicatorWidth.nextValue),
                    set(this._indicatorWidth.value, this._indicatorWidth.state.position),
                  ],
                  [
                    set(this._indicatorWidth.state.position, this._prevOffset),
                    set(this._indicatorWidth.config.toValue, this._indicatorWidth.nextValue),
                    startClock(this._indicatorWidth.clock),
                  ],
                ),
                timing(this._indicatorWidth.clock, this._indicatorWidth.state, this._indicatorWidth.config),
                cond(this._indicatorWidth.state.finished, [
                  stopClock(this._indicatorWidth.clock),
                  set(this._indicatorWidth.state.finished, 0),
                  set(this._indicatorWidth.state.time, 0),
                  set(this._indicatorWidth.state.frameTime, 0),
                  set(this._indicatorWidth.prevValue, this._indicatorWidth.state.position),
                ]),
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
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 70,
    height: 2,
    backgroundColor: Colors.blue30,
  },
  containerShadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.dark10,
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {height: 6, width: 0},
      },
      android: {
        elevation: 5,
        backgroundColor: Colors.white,
      },
    }),
  },
});

function createReanimatedObject(config) {
  return {
    clock: new Clock(),
    state: {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    },
    config: {
      duration: 300,
      toValue: new Value(0),
      easing: Easing.bezier(0.23, 1, 0.32, 1),
      ...config,
    },
    prevValue: new Value(0),
    value: new Value(0),
    nextValue: new Value(0),
  };
}

export default asBaseComponent(forwardRef(TabBar));
