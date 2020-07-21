// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView, ViewPropTypes, Platform, Text as RNText} from 'react-native';
import Reanimated from 'react-native-reanimated';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TabBarContext from './TabBarContext';
import TabBarItem from './TabBarItem';
// import ReanimatedObject from './ReanimatedObject';
import {asBaseComponent, forwardRef} from '../../commons';
import View from '../../components/view';
import ScrollBarGradient from '../scrollBar/ScrollBarGradient';
import {Colors, Spacings, Typography} from '../../style';
import {Constants} from '../../helpers';
import {LogService} from '../../services';

const {Code, Value, interpolate, block, set} = Reanimated;

const DEFAULT_HEIGHT = 48;
const INDICATOR_INSET = Spacings.s4;

const DEFAULT_LABEL_STYLE = {
  ...Typography.text80,
  fontWeight: '400',
  letterSpacing: 0
};

const DEFAULT_SELECTED_LABEL_STYLE = {
  ...Typography.text80,
  fontWeight: '700',
  letterSpacing: 0
};

/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.js
 */
class TabBar extends PureComponent {
  static displayName = 'TabController.TabBar';
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
     * custom selected label style
     */
    selectedLabelStyle: RNText.propTypes.style,
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
    /**
     * Pass to center selected item
     */
    centerSelected: PropTypes.bool
  };

  static defaultProps = {
    labelStyle: DEFAULT_LABEL_STYLE,
    selectedLabelStyle: DEFAULT_SELECTED_LABEL_STYLE
    // containerWidth: Constants.screenWidth
  };

  constructor(props, context) {
    super(props, context);

    if (this.props.children) {
      LogService.warn('uilib: Please pass the "items" prop to TabController.TabBar instead of children');
    }

    const itemsCount = this.getItemsCount();

    this.tabBar = React.createRef();
    this.tabBarScrollOffset = 0;

    this._itemsWidths = _.times(itemsCount, () => null);
    this._itemsOffsets = _.times(itemsCount, () => null);
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

    if ((props.items || this.children) && !context.items) {
      this.registerTabItems();
    }
  }

  get containerWidth() {
    return this.props.containerWidth || Constants.screenWidth;
  }

  get children() {
    return _.filter(this.props.children, (child) => !!child);
  }


  get centerOffset() {
    const {centerSelected} = this.props;
    const guesstimateCenterValue = 60;
    return centerSelected ? this.containerWidth / 2 - guesstimateCenterValue : 0;
  }

  get items() {
    const {items: contextItems} = this.context;
    const {items: propsItems} = this.props;
    return contextItems || propsItems;
  }

  getItemsCount() {
    if (this.items) {
      return _.size(this.items);
    } else {
      return React.Children.count(this.children);
    }
  }

  getSnapBreakpoints() {
    const {centerSelected} = this.props;
    const {itemsWidths, itemsOffsets} = this.state;

    if (itemsWidths && centerSelected) {
      return _.times(itemsWidths.length, (index) => {
        const screenCenter = this.containerWidth / 2;
        const itemOffset = itemsOffsets[index];
        const itemWidth = itemsWidths[index];
        return itemOffset - screenCenter + itemWidth / 2;
      });
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
  focusSelected = ([index], animated = true) => {
    const {centerSelected} = this.props;
    const itemOffset = this._itemsOffsets[index];
    const itemWidth = this._itemsWidths[index];
    const screenCenter = this.containerWidth / 2;

    let targetOffset;

    if (itemOffset && itemWidth) {
      if (centerSelected) {
        targetOffset = itemOffset - screenCenter + itemWidth / 2;
      } else if (itemOffset < this.tabBarScrollOffset) {
        targetOffset = itemOffset - itemWidth;
      } else if (itemOffset + itemWidth > this.tabBarScrollOffset + this.containerWidth) {
        const offsetChange = Math.max(0, itemOffset - (this.tabBarScrollOffset + this.containerWidth));
        targetOffset = this.tabBarScrollOffset + offsetChange + itemWidth;
      }
      
      if (!_.isUndefined(targetOffset)) {

        if (Constants.isRTL && Constants.isAndroid) {
          const scrollingWidth = Math.max(0, this.contentWidth - this.containerWidth);
          targetOffset = scrollingWidth - targetOffset;
        }

        this.tabBar.current.scrollTo({x: targetOffset, animated});
      }
    }
  };

  onItemLayout = ({width}, itemIndex) => {
    this._itemsWidths[itemIndex] = width;
    if (!_.includes(this._itemsWidths, null)) {
      this.setItemsLayouts();
    }
  };

  setItemsLayouts = () => {
    const {selectedIndex} = this.context;
    // It's important to calculate itemOffsets for RTL support
    this._itemsOffsets = _.times(this._itemsWidths.length, (i) => _.chain(this._itemsWidths).take(i).sum().value() + this.centerOffset);
    const itemsOffsets = _.map(this._itemsOffsets, (offset) => offset + INDICATOR_INSET);
    const itemsWidths = _.map(this._itemsWidths, (width) => width - INDICATOR_INSET * 2);
    this.contentWidth = _.sum(this._itemsWidths);
    const scrollEnabled = this.contentWidth > this.containerWidth;

    this.setState({itemsWidths, itemsOffsets, scrollEnabled});
    this.focusSelected([selectedIndex], false);
  };

  onScroll = ({nativeEvent: {contentOffset}}) => {
    const {fadeLeft, fadeRight} = this.state;
    this.tabBarScrollOffset = contentOffset.x;
    if (Constants.isRTL && Constants.isAndroid) {
      const scrollingWidth = Math.max(0, this.contentWidth - this.containerWidth);
      this.tabBarScrollOffset = scrollingWidth - this.tabBarScrollOffset;
    }
    const stateUpdate = {};
    // TODO: extract this logic to scrollbar presenter or something
    const leftThreshold = 50;
    if (this.tabBarScrollOffset > leftThreshold && !fadeLeft) {
      stateUpdate.fadeLeft = true;
    } else if (this.tabBarScrollOffset <= leftThreshold && fadeLeft) {
      stateUpdate.fadeLeft = false;
    }

    const rightThreshold = (this.contentWidth - this.containerWidth);
    if (this.tabBarScrollOffset < rightThreshold && !fadeRight) {
      stateUpdate.fadeRight = true;
    } else if (this.tabBarScrollOffset >= rightThreshold && fadeRight) {
      stateUpdate.fadeRight = false;
    }

    if (!_.isEmpty(stateUpdate)) {
      this.setState(stateUpdate);
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
      labelColor,
      selectedLabelColor,
      labelStyle,
      selectedLabelStyle,
      uppercase,
      iconColor,
      selectedIconColor,
      activeBackgroundColor
    } = this.props;

    if (_.isEmpty(itemStates)) {
      return;
    }

    if (this.items) {
      return _.map(this.items, (item, index) => {
        return (
          <TabBarItem
            labelColor={labelColor}
            selectedLabelColor={selectedLabelColor}
            labelStyle={labelStyle}
            selectedLabelStyle={selectedLabelStyle}
            uppercase={uppercase}
            iconColor={iconColor}
            selectedIconColor={selectedIconColor}
            activeBackgroundColor={activeBackgroundColor}
            key={item.label}
            // width={this._itemsWidths[index]}
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
          selectedLabelStyle,
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
    const {currentPage, targetPage} = this.context;
    const {itemsWidths, itemsOffsets} = this.state;
    const nodes = [];

    nodes.push(set(this._indicatorOffset,
      interpolate(currentPage, {
        inputRange: itemsOffsets.map((v, i) => i),
        outputRange: itemsOffsets
      })));
    nodes.push(set(this._indicatorWidth,
      interpolate(currentPage, {inputRange: itemsWidths.map((v, i) => i), outputRange: itemsWidths})));

    nodes.push(Reanimated.onChange(targetPage, Reanimated.call([targetPage], this.focusSelected)));

    return block(nodes);
  };

  render() {
    const {height, enableShadow, containerStyle, testID} = this.props;
    const {itemsWidths, scrollEnabled, fadeLeft, fadeRight} = this.state;
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
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          testID={testID}
          snapToOffsets={this.getSnapBreakpoints()}
          decelerationRate={'fast'}
        >
          <View style={[styles.tabBar, height && {height}, {paddingHorizontal: this.centerOffset}]}>
            {this.renderTabBarItems()}
          </View>
          {this.renderSelectedIndicator()}
        </ScrollView>
        {_.size(itemsWidths) > 1 && <Code>{this.renderCodeBlock}</Code>}
        <ScrollBarGradient left visible={fadeLeft}/>
        <ScrollBarGradient visible={fadeRight}/>
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

export default asBaseComponent(forwardRef(TabBar));
