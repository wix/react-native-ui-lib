import _ from 'lodash';
import React, {ElementRef, RefObject} from 'react';
import {Platform, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View, {ViewPropTypes} from '../view';
import ScrollBar/* , {ScrollBarProps} */ from '../scrollBar';
import TabBarItem from './TabBarItem';


const MIN_TABS_FOR_SCROLL = 1;
const DEFAULT_BACKGROUND_COLOR = Colors.white;
const DEFAULT_HEIGHT = 48;

const ScrollBarProps = ScrollBar.propTypes; //TODO: remove after TS migration

interface Props extends ViewPropTypes, ThemeComponent, ScrollBarProps {
  /**
   * Show Tab Bar bottom shadow
   */
  enableShadow?: boolean;
  /**
   * The minimum number of tabs to render in scroll mode
   */
  minTabsForScroll?: number;
  /**
   * current selected tab index
   */
  selectedIndex?: number;
  /**
   * callback for when index has change (will not be called on ignored items)
   */
  onChangeIndex?: (index: number) => void;
  /**
   * callback for when tab selected
   */
  onTabSelected?: (index: number) => void;
  /**
   * custom style for the selected indicator
   */
  indicatorStyle?: StyleProp<ViewStyle>;
  /**
   * Tab Bar height
   */
  height?: number;
  /**
   * Tablet margin as an object. ex. {portrait: 60, landscape: 160}
   */
  tabletMargins?: number;
  /**
   * Pass when container width is different than the screen width
   */
  containerWidth?: number;
  /**
   * The background color
   */
  backgroundColor: string,
  children?: React.ReactNode;
  style?: ViewStyle
}

interface State {
  scrollEnabled: boolean;
  currentIndex: number;
}

export type TabBarProps = Props;

/**
 * @description: TabBar Component
 * @modifiers: alignment, flex, padding, margin, background, typography, color (list of supported modifiers)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.tsx
 * @extends: ScrollBar
 * @extendsLink:https://github.com/wix/react-native-ui-lib/blob/master/src/components/scrollBar/index.js
 * @notes: This is screen width component.
 */
export default class TabBar extends BaseComponent<Props, State> {
  static displayName = 'TabBar';

  static Item = TabBarItem;

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
    // tabletMargins: {portrait: 60, landscape: 160}
  };

  scrollContentWidth?: number;
  contentOffset: {
    x: number;
    y: number;
  }
  scrollBar: RefObject<typeof ScrollBar>;
  itemsRefs: ElementRef<typeof TabBarItem>[];
  styles: ReturnType<typeof createStyles>;

  constructor(props: Props) {
    super(props);

    this.state = {
      scrollEnabled: false,
      currentIndex: props.selectedIndex
    };

    this.contentOffset = {x: 0, y: 0};
    this.scrollBar = React.createRef();
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

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    this.setState({something: 0}); // only to trigger render
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  get childrenCount() {
    return React.Children.count(this.props.children);
  }

  get scrollContainerWidth() {
    return this.props.containerWidth || Constants.screenWidth;
  }

  getTabletMargins() {
    const {tabletMargins} = this.getThemeProps();
    if (Constants.isTablet && tabletMargins) {
      if (Constants.screenWidth <= 767) {
        // Small tablet
        return 0;
      } else if (Constants.screenWidth <= 1023) {
        // Tablet portrait
        return tabletMargins.portrait;
      } else {
        // Tablet landscape
        return tabletMargins.landscape;
      }
    } else {
      return 0;
    }
  };

  getStylePropValue(flattenStyle, propName) {
    let prop;
    if (flattenStyle) {
      const propObject = _.pick(flattenStyle, [propName]);
      prop = propObject[propName];
    }
    return prop;
  }

  isIgnored(index) {
    const child = React.Children.toArray(this.props.children)[index];
    return _.get(child, 'props.ignore');
  }

  hasOverflow() {
    return this.scrollContentWidth > this.scrollContainerWidth;
  }

  shouldBeMarked = index => {
    return this.state.currentIndex === index && !this.isIgnored(index) && this.childrenCount > 1;
  };

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
        this.scrollBar.current.scrollTo({x: childLayout.x - this.scrollContainerWidth + childLayout.width, y: 0, animated});
      } else if (childLayout.x - this.contentOffset.x < 0) {
        this.scrollBar.current.scrollTo({x: childLayout.x, y: 0, animated});
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

  onScroll = event => {
    const {contentOffset} = event.nativeEvent;
    this.contentOffset = contentOffset;
  };

  onContentSizeChange = (width: number) => {
    if (this.scrollContentWidth !== width) {
      this.scrollContentWidth = width;
      const {minTabsForScroll} = this.getThemeProps();
      const minChildrenCount = minTabsForScroll || MIN_TABS_FOR_SCROLL;
      if (this.hasOverflow() && this.childrenCount > minChildrenCount) {
        this.setState({scrollEnabled: true});
      }
    }
  };

  renderTabBar() {
    const {height, backgroundColor} = this.getThemeProps();
    const {scrollEnabled} = this.state;
    const containerHeight = height || DEFAULT_HEIGHT;

    return (
      <ScrollBar
        ref={this.scrollBar}
        contentContainerStyle={{minWidth: '100%'}}
        scrollEnabled={scrollEnabled}
        scrollEventThrottle={16}
        onScroll={this.onScroll}
        onContentSizeChange={this.onContentSizeChange}
        height={containerHeight}
        gradientColor={backgroundColor}
      >
        <View row style={this.styles.tabBar}>
          {this.renderChildren()}
        </View>
      </ScrollBar>
    );
  }

  renderChildren() {
    this.itemsRefs = [];
    const {indicatorStyle, darkTheme} = this.getThemeProps();

    const children = React.Children.map<any, TabBarItem>(this.props.children as TabBarItem[], (child, index) => {
      const accessLabel = child.props.accessibilityLabel || child.props.label || '';

      //TODO: review it again, all types here should be correct. As from React.Children.map it gets definitely child: React.ReactNode, and React.cloneElement does not accept it.
      // But seems it's work in a real life, so maybe it is just trouble with types compatibility
      //@ts-ignore
      return React.cloneElement(child, {
        indicatorStyle,
        darkTheme,
        selected: this.shouldBeMarked(index),
        onPress: () => {
          this.onItemPress(index, child.props);
        },
        ref: r => {
          this.itemsRefs[index] = r;
        },
        accessibilityLabel: `${accessLabel} ${index + 1} out of ${this.childrenCount}`
      });
    });
    return children;
  }

  renderContents() {
    return !Constants.isTablet ?
      this.renderTabBar() :
      <View
        style={{
            paddingHorizontal: this.getTabletMargins(),
            width: this.scrollContainerWidth
          }}
      >
        {this.renderTabBar()}
      </View>
    ;
  }

  render() {
    const {enableShadow, style} = this.getThemeProps();

    return (
      <View
        useSafeArea
        style={[
          this.styles.container,
          enableShadow && this.styles.containerShadow,
          style,
          {
            height: undefined,
          }
        ]}
      >
        {this.renderContents()}
      </View>
    );
  }
}

function createStyles({height = DEFAULT_HEIGHT, backgroundColor = DEFAULT_BACKGROUND_COLOR}) {
  return StyleSheet.create({
    container: {
      zIndex: 100,
      backgroundColor
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
      height,
      backgroundColor
    },
    shadowImage: {
      width: '100%'
    }
  });
}
