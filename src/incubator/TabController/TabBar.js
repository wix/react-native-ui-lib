// TODO: add theme support
// TODO: support commented props
import React, {Component} from 'react';
import {StyleSheet, ScrollView, ViewPropTypes} from 'react-native';
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
const {Code, Clock, Value, add, sub, cond, eq, stopClock, startClock, timing, block, set} = Reanimated;

class TabBar extends Component {
  static displayName = 'TabBar';
  static contextType = TabBarContext;

  static propTypes = {
    /**
     * Tab Bar height
     */
    height: PropTypes.number,
    // /**
    //  * Show Tab Bar bottom shadow
    //  */
    // enableShadow: PropTypes.bool,
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
  _clock = new Clock();
  _itemsWidths = _.times(React.Children.count(this.props.children), () => null);
  _indicatorWidth = new Value(0);
  _prevOffset = new Value(0);
  _offset = new Value(0);

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

  runTiming(targetValue, duration) {
    const clock = new Clock();
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration,
      toValue: targetValue,
      easing: Easing.bezier(0.23, 1, 0.32, 1),
    };

    return block([
      startClock(clock),
      timing(clock, state, config),
      cond(state.finished, [stopClock(clock), set(state.finished, 0), set(state.time, 0), set(state.frameTime, 0)]),
      state.position,
    ]);
  }

  renderSelectedIndicator() {
    const {itemsWidths} = this.state;
    const {indicatorStyle} = this.props;
    if (itemsWidths) {
      const transitionStyle = {
        width: this.runTiming(this._indicatorWidth, 400),
        left: this.runTiming(this._offset, 300),
      };
      return <Reanimated.View style={[styles.selectedIndicator, indicatorStyle, transitionStyle]} />;
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
    const {containerWidth, height} = this.props;
    const {itemsWidths, itemsOffsets} = this.state;
    return (
      <View>
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
                ..._.map(itemsWidths, (width, index) => {
                  return cond(eq(currentPage, index), [
                    set(this._indicatorWidth, sub(itemsWidths[index], indicatorInset * 2)),
                  ]);
                }),
                ..._.map(itemsOffsets, (offset, index) => {
                  return cond(eq(currentPage, index), [set(this._offset, add(itemsOffsets[index], indicatorInset))]);
                }),
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
});

export default asBaseComponent(forwardRef(TabBar));