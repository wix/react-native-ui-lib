import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Animated, 
  ScrollView, 
  NativeSyntheticEvent, 
  NativeScrollEvent, 
  ViewStyle
} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {asBaseComponent, BaseComponentInjectedProps} from '../../commons/new';
import View, {ViewPropTypes} from '../view';
import Image from '../image';
import TabBarItem, {TabBarItemProps} from './TabBarItem';


export type TabBarProps = BaseComponentInjectedProps & ViewPropTypes & {
    /**
     * Show Tab Bar bottom shadow
     */
    enableShadow?: boolean,
    /**
     * The minimum number of tabs to render
     */
    minTabsForScroll?: number,
    /**
     * current selected tab index
     */
    selectedIndex?: number,
    /**
     * callback for when index has change (will not be called on ignored items)
     */
    onChangeIndex?: (props: any) => void,
    /**
     * callback for when tab selected
     */
    onTabSelected?: (props: any) => void,
    /**
     * custom style for the selected indicator
     */
    indicatorStyle?: ViewStyle,
    /** 
     * The background color 
     */
    backgroundColor: string,
    /**
     * Tab Bar height
     */
    height?: number,
    children: React.ReactNode,
    style?: ViewStyle,
    testID?: string
}

export type State = {
  gradientOpacity: Animated.Value,
  scrollEnabled?: boolean,
  currentIndex?: number
};


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
class TabBar extends Component<TabBarProps, State> {
  static displayName = 'TabBar';

  static defaultProps = {
    selectedIndex: 0,
    backgroundColor: DEFAULT_BACKGROUND_COLOR
  };

  static Item: typeof TabBarItem;

  constructor(props: TabBarProps) {
    super(props);

    this.state = {
      gradientOpacity: new Animated.Value(0),
      scrollEnabled: false,
      currentIndex: props.selectedIndex
    };
  }

  styles = createStyles(this.props);
  scrollContainerWidth: number = Constants.screenWidth;
  scrollContentWidth = 0;
  contentOffset: any = {x: 0, y: 0};
  itemsRefs: any[] = [];
  scrollView?: any = undefined;

  componentDidUpdate(prevProps: TabBarProps, prevState: State) {
    // TODO: since we're implementing an uncontrolled component here, we should verify the selectedIndex has changed
    // between this.props and nextProps (basically the meaning of selectedIndex should be initialIndex)
    const {selectedIndex} = this.props;
    const isIndexManuallyChanged =
      selectedIndex !== prevState.currentIndex && prevProps.selectedIndex !== selectedIndex;
    if (isIndexManuallyChanged && selectedIndex !== undefined) {
      this.updateIndicator(selectedIndex);
    } else {
      const prevChildrenCount = React.Children.count(prevProps.children);
      if (this.childrenCount < prevChildrenCount) {
        this.updateIndicator(0);
      }
    }
  }

  get childrenCount() {
    return React.Children.count(this.props.children);
  }

  isIgnored(index: number) {
    const child = React.Children.toArray(this.props.children)[index];
    return _.get(child, 'props.ignore');
  }

  updateIndicator(index: number) {
    if (!this.isIgnored(index)) {
      this.setState({currentIndex: index}, () => {
        this.scrollToSelected();
      });
    }
  }

  scrollToSelected(animated = true) {
    if (this.itemsRefs && this.state.currentIndex) {
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
  }

  onChangeIndex(index: number) {
    _.invoke(this.props, 'onChangeIndex', index);
  }

  onTabSelected(index: number) {
    _.invoke(this.props, 'onTabSelected', index);
  }

  onItemPress = (index: number, props: TabBarItemProps) => {
    this.updateIndicator(index);

    setTimeout(() => {
      if (!props.ignore) {
        this.onChangeIndex(index);
      }
      this.onTabSelected(index);
      _.invoke(props, 'onPress');
    }, 0);
  };

  getStylePropValue(flattenStyle: object, propName: string) {
    let prop;
    if (flattenStyle) {
      const propObject: any = _.pick(flattenStyle, [propName]);
      prop = propObject[propName];
    }
    return prop;
  }

  animateGradientOpacity = (x: number, contentWidth: number, containerWidth: number) => {
    const overflow = contentWidth - containerWidth;
    const newValue = x > 0 && x >= overflow - 1 ? 0 : 1;

    Animated.spring(this.state.gradientOpacity, {
      toValue: newValue,
      speed: 20,
      useNativeDriver: true
    }).start();
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    this.contentOffset = contentOffset;
    const x = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;

    this.animateGradientOpacity(x, contentWidth, containerWidth);
  };

  onContentSizeChange = (width: number) => {
    if (this.scrollContentWidth !== width) {
      const {minTabsForScroll} = this.props;
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

  renderGradient(height: number, tintColor: string) {
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
    const {height, backgroundColor} = this.props;
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
        {this.renderGradient(containerHeight, backgroundColor)}
      </View>
    );
  }

  shouldBeMarked = (index: number) => {
    return this.state.currentIndex === index && !this.isIgnored(index) && this.childrenCount > 1;
  };

  renderChildren() {
    this.itemsRefs = [];
    const {indicatorStyle} = this.props;

    const children = React.Children.map(this.props.children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          indicatorStyle,
          selected: this.shouldBeMarked(index),
          onPress: () => {
            this.onItemPress(index, child.props);
          },
          ref: (r: any) => {
            this.itemsRefs[index] = r;
          }
        });
      }
    });
    return children;
  }

  render() {
    const {enableShadow, style} = this.props;

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

function createStyles({backgroundColor = DEFAULT_BACKGROUND_COLOR}) {
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
      backgroundColor
    },
    shadowImage: {
      width: '100%'
    }
  });
}

TabBar.Item = TabBarItem;

export default asBaseComponent<TabBarProps, {Item: typeof TabBarItem}>(TabBar);
