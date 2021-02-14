// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView, ViewPropTypes, Platform, Text as RNText} from 'react-native';
import Reanimated, {Easing} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TabBarContext from './TabBarContext';
import TabBarItem from './TabBarItem';
// import ReanimatedObject from './ReanimatedObject';
import {asBaseComponent, forwardRef} from '../../commons';
import View from '../../components/view';
import {Colors, Spacings} from '../../style';
import {Constants} from '../../helpers';
import {LogService} from '../../services';

const DEFAULT_HEIGHT = 48;
const INDICATOR_INSET = Spacings.s4;
const {
  Code,
  Clock,
  Value,
  and,
  eq,
  neq,
  cond,
  stopClock,
  startClock,
  interpolate,
  Extrapolate,
  timing,
  block,
  set
} = Reanimated;

/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TabControllerScreen/index.js
 */
class TabBar extends PureComponent {
  static displayName = 'IGNORE';
  static contextType = TabBarContext;

  static propTypes = {
    /**
     * The list of tab bar items
     */
    items: PropTypes.arrayOf(PropTypes.shape(TabBarItem.propTypes)),
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
    labelStyle: RNText.propTypes.style,
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
    // containerWidth: Constants.screenWidth
  };

  constructor(props, context) {
    super(props, context);

    if (this.props.children) {
      LogService.warn('uilib: Please pass the "items" prop to TabController.TabBar instead of children');
    }

    const itemsCount = this.itemsCount;

    this.tabBar = React.createRef();
    this.tabBarScrollOffset = 0;

    this._itemsWidths = _.times(itemsCount, () => null);
    this._indicatorOffset = new Value(0);
    this._indicatorWidth = new Value(0);

    this._indicatorTransitionStyle = {
      width: this._indicatorWidth,
      left: this._indicatorOffset
    };

    this.state = {
      scrollEnabled: false,
      itemsWidths: undefined
    };

    this.registerTabItems();
  }

  get containerWidth() {
    return this.props.containerWidth || Constants.screenWidth;
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

  // TODO: move this logic into a ScrollPresenter or something
  focusSelected = ([index]) => {
    const {itemsOffsets, itemsWidths} = this.state;
    const itemOffset = itemsOffsets[index];
    const itemWidth = itemsWidths[index];
    if (itemOffset && itemWidth) {
      if (itemOffset < this.tabBarScrollOffset) {
        this.tabBar.current.scrollTo({x: itemOffset - itemWidth});
      } else if (itemOffset + itemWidth > this.tabBarScrollOffset + this.containerWidth) {
        const offsetChange = Math.max(0, itemOffset - (this.tabBarScrollOffset + this.containerWidth));
        this.tabBar.current.scrollTo({x: this.tabBarScrollOffset + offsetChange + itemWidth});
      }
    }
  }

  onItemLayout = (itemWidth, itemIndex) => {
    this._itemsWidths[itemIndex] = itemWidth;
    if (!_.includes(this._itemsWidths, null)) {
      const {selectedIndex} = this.context;
      const itemsOffsets = _.map(this._itemsWidths,
        (_w, index) => INDICATOR_INSET + _.sum(_.take(this._itemsWidths, index)));
      const itemsWidths = _.map(this._itemsWidths, width => width - INDICATOR_INSET * 2);

      this.setState({itemsWidths, itemsOffsets});
      const selectedItemOffset = itemsOffsets[selectedIndex] - INDICATOR_INSET;
      
      if (selectedItemOffset + this._itemsWidths[selectedIndex] > Constants.screenWidth) {  
        this.tabBar.current.scrollTo({x: selectedItemOffset, animated: true});
      }
    }
  };

  onScroll = ({nativeEvent: {contentOffset}}) => {
    this.tabBarScrollOffset = contentOffset.x;
  }

  onContentSizeChange = width => {
    if (width > this.containerWidth) {
      this.setState({scrollEnabled: true});
    }
  };

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
            key={item.label}
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

  renderCodeBlock = () => {
    const {carouselOffset, asCarousel, currentPage} = this.context;
    const {itemsWidths, itemsOffsets} = this.state;
    const nodes = [];

    if (asCarousel) {
      nodes.push(set(this._indicatorOffset,
        interpolate(carouselOffset, {
          inputRange: itemsOffsets.map((_value, index) => index * Constants.screenWidth),
          outputRange: itemsOffsets,
          extrapolate: Extrapolate.CLAMP
        })),
      set(this._indicatorWidth,
        interpolate(carouselOffset, {
          inputRange: itemsWidths.map((_value, index) => index * Constants.screenWidth),
          outputRange: itemsWidths,
          extrapolate: Extrapolate.CLAMP
        })));
    } else {
      nodes.push(set(this._indicatorOffset, runIndicatorTimer(new Clock(), currentPage, itemsOffsets)),
        set(this._indicatorWidth, runIndicatorTimer(new Clock(), currentPage, itemsWidths)));
    }

    nodes.push(Reanimated.onChange(currentPage, Reanimated.call([currentPage], this.focusSelected)));

    return block(nodes);
  };

  render() {
    const {height, enableShadow, containerStyle} = this.props;
    const {itemsWidths, scrollEnabled} = this.state;
    return (
      <View
        style={[styles.container, enableShadow && styles.containerShadow, {width: this.containerWidth}, containerStyle]}
      >
        <ScrollView
          ref={this.tabBar}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBarScroll}
          contentContainerStyle={{minWidth: this.containerWidth}}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
          onScroll={this.onScroll}
          scrollEventThrottle={100}
        >
          <View style={[styles.tabBar, height && {height}]}>{this.renderTabBarItems()}</View>
          {this.renderSelectedIndicator()}
        </ScrollView>
        {_.size(itemsWidths) > 1 && <Code>{this.renderCodeBlock}</Code>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100
  },
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

function runIndicatorTimer(clock, currentPage, values) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 200,
    toValue: new Value(100),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    ..._.map(values, (_value, index) => {
      return cond(and(eq(currentPage, index), neq(config.toValue, index)), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(config.toValue, index),
        startClock(clock)
      ]);
    }),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    interpolate(state.position, {
      inputRange: _.times(values.length),
      outputRange: values,
      extrapolate: Extrapolate.CLAMP
    })
  ]);
}

export default asBaseComponent(forwardRef(TabBar));
