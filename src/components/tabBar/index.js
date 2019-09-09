import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Platform, StyleSheet, ViewPropTypes, Animated, ScrollView} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../view';
import Image from '../image';
import TabBarItem from './TabBarItem';

const MIN_TABS_FOR_SCROLL = 1;
const DEFAULT_BACKGROUND_COLOR = Colors.white;
const DEFAULT_HEIGHT = 48;
const GRADIENT_WIDTH = 74;
const INDICATOR_HEIGHT = 2;
const gradientImage = () => require('./assets/gradient.png');

/**
 * @description: TabBar Component
 * @modifiers: alignment, flex, padding, margin, background, typography, color (list of supported modifiers)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.js
 * @extends: ScrollView
 * @extendsLink: https://facebook.github.io/react-native/docs/scrollview
 * @notes: This is screen width component.
 */
export default class TabBar extends BaseComponent {
  static displayName = 'TabBar';

  static propTypes = {
    ...ViewPropTypes.height,
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow: PropTypes.bool,
    /**
     * The minimum number of tabs to render
     */
    minTabsForScroll: PropTypes.number,
    /**
     * current selected tab index
     */
    selectedIndex: PropTypes.number,
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex: PropTypes.func,
    /**
     * callback for when tab selected
     */
    onTabSelected: PropTypes.func,
    /**
     * custom style for the selected indicator
     */
    indicatorStyle: ViewPropTypes.style,
    /**
     * Tab Bar height
     */
    height: PropTypes.number
  };

  static defaultProps = {
    selectedIndex: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      gradientOpacity: new Animated.Value(0),
      scrollEnabled: false,
      currentIndex: props.selectedIndex
    };

    this.scrollContainerWidth = Constants.screenWidth;
    this.scrollContentWidth = undefined;
    this.contentOffset = {x: 0, y: 0};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // TODO: since we're implementing an uncontrolled component here, we should verify the selectedIndex has changed
    // between this.props and nextProps (basically the meaning of selectedIndex should be initialIndex)
    const isIndexManuallyChanged =
      nextProps.selectedIndex !== this.state.currentIndex && this.props.selectedIndex !== nextProps.selectedIndex;
    if (isIndexManuallyChanged) {
      this.updateIndicator(nextProps.selectedIndex);
    }
  }

  componentDidUpdate(prevProps) {
    const prevChildrenCount = React.Children.count(prevProps.children);
    if (this.childrenCount < prevChildrenCount) {
      this.updateIndicator(0);
    }
  }

  get childrenCount() {
    return React.Children.count(this.props.children);
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  isIgnored(index) {
    const child = React.Children.toArray(this.props.children)[index];
    return _.get(child, 'props.ignore');
  }

  updateIndicator(index) {
    if (!this.isIgnored(index)) {
      this.setState({currentIndex: index}, () => {
        this.scrollToSelected();
      });
    }
  }

  scrollToSelected(animated = true) {
    const childRef = this.itemsRefs[this.state.currentIndex];
    const childLayout = childRef.getLayout();

    if (childLayout && this.hasOverflow()) {
      if (childLayout.x + childLayout.width - this.contentOffset.x > this.scrollContainerWidth) {
        this.scrollView.scrollTo({x: childLayout.x - this.scrollContainerWidth + childLayout.width, y: 0, animated});
      } else if (childLayout.x - this.contentOffset.x < 0) {
        this.scrollView.scrollTo({x: childLayout.x, y: 0, animated});
      }
    }
  }

  onChangeIndex(index) {
    _.invoke(this.props, 'onChangeIndex', index);
  }

  onTabSelected(index) {
    _.invoke(this.props, 'onTabSelected', index);
  }

  onItemPress = (index, props) => {
    this.updateIndicator(index);

    setTimeout(() => {
      if (!props.ignore) {
        this.onChangeIndex(index);
      }
      this.onTabSelected(index);
      _.invoke(props, 'onPress');
    }, 0);
  };

  getStylePropValue(flattenStyle, propName) {
    let prop;
    if (flattenStyle) {
      const propObject = _.pick(flattenStyle, [propName]);
      prop = propObject[propName];
    }
    return prop;
  }

  animateGradientOpacity = (x, contentWidth, containerWidth) => {
    const overflow = contentWidth - containerWidth;
    const newValue = x > 0 && x >= overflow - 1 ? 0 : 1;

    Animated.spring(this.state.gradientOpacity, {
      toValue: newValue,
      speed: 20,
      useNativeDriver: true
    }).start();
  };

  onScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    this.contentOffset = contentOffset;
    const x = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;

    this.animateGradientOpacity(x, contentWidth, containerWidth);
  };

  onContentSizeChange = width => {
    if (this.scrollContentWidth !== width) {
      const {minTabsForScroll} = this.getThemeProps();
      const minChildrenCount = minTabsForScroll || MIN_TABS_FOR_SCROLL;

      this.scrollContentWidth = width;

      if (this.hasOverflow() && this.childrenCount > minChildrenCount) {
        this.setState({gradientOpacity: new Animated.Value(1), scrollEnabled: true});
      }
    }
  };

  hasOverflow() {
    if (this.scrollContentWidth) {
      if (this.scrollContentWidth > this.scrollContainerWidth) {
        return true;
      }
    }
    return false;
  }

  renderGradient(height, tintColor) {
    const width = GRADIENT_WIDTH;

    if (this.hasOverflow()) {
      return (
        <Animated.View
          pointerEvents="none"
          style={{
            width,
            height: height - INDICATOR_HEIGHT,
            position: 'absolute',
            right: 0,
            opacity: this.state.gradientOpacity
          }}
        >
          <Image
            source={gradientImage()}
            style={{width, height: height - INDICATOR_HEIGHT, tintColor}}
            resizeMode={'stretch'}
            supportRTL
          />
        </Animated.View>
      );
    }
  }

  renderTabBar() {
    const {height} = this.getThemeProps();
    const {scrollEnabled} = this.state;
    const containerHeight = height || DEFAULT_HEIGHT;

    return (
      <View row>
        <ScrollView
          ref={r => (this.scrollView = r)}
          style={{height: containerHeight}}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={16}
          onScroll={this.onScroll}
          onContentSizeChange={this.onContentSizeChange}
          contentContainerStyle={{minWidth: '100%'}}
        >
          <View row style={this.styles.tabBar}>
            {this.renderChildren()}
          </View>
        </ScrollView>
        {this.renderGradient(containerHeight, DEFAULT_BACKGROUND_COLOR)}
      </View>
    );
  }

  shouldBeMarked = index => {
    return this.state.currentIndex === index && !this.isIgnored(index) && this.childrenCount > 1;
  };

  renderChildren() {
    this.itemsRefs = [];
    const {indicatorStyle} = this.getThemeProps();

    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        indicatorStyle,
        selected: this.shouldBeMarked(index),
        onPress: () => {
          this.onItemPress(index, child.props);
        },
        ref: r => {
          this.itemsRefs[index] = r;
        }
      });
    });
    return children;
  }

  render() {
    const {enableShadow, style} = this.getThemeProps();

    return (
      <View
        useSafeArea
        style={[this.styles.container, enableShadow && this.styles.containerShadow, style, {height: undefined}]}
      >
        {this.renderTabBar()}
      </View>
    );
  }
}

function createStyles(props) {
  return StyleSheet.create({
    container: {
      zIndex: 100
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
    },
    tabBar: {
      flex: 1,
      height: DEFAULT_HEIGHT,
      backgroundColor: DEFAULT_BACKGROUND_COLOR
    },
    shadowImage: {
      width: '100%'
    }
  });
}

TabBar.Item = TabBarItem;
