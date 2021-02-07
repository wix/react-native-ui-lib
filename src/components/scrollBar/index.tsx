import _ from 'lodash';
import React, {Component, useCallback} from 'react';
import {
  Animated,
  ScrollView,
  FlatList,
  FlatListProps,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent
} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {asBaseComponent, forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import View from '../view';
import Image from '../image';


export interface ScrollBarProps extends FlatListProps<any> {
  /**
     * Whether to use a FlatList. NOTE: you must pass 'data' and 'renderItem' props as well
     */
    useList?: boolean,
    /**
     * The element to use as a container, instead of a View
     */
    containerView?: React.ComponentClass,
    /**
     * The props to pass the container
     */
    containerProps?: object,
    /**
     * The component's height
     */
    height?: number,
    /**
     * The gradient's height, defaults to the component's height
     */
    gradientHeight?: number,
    /**
     * The gradient's width
     */
    gradientWidth?: number,
    /**
     * The gradient's margins for the edge
     */
    gradientMargins?: number,
    /**
     * The gradient's tint color
     */
    gradientColor?: string,
    /**
     * The gradient's image, instead of the default image.
     * NOTE: pass an image for the right-hand side and it will be flipped to match the left-hand side
     */
    gradientImage?: ImageSourcePropType,
    /**
     * The index to currently focus on
     */
    focusIndex?: number
}

type Props = ScrollBarProps & ForwardRefInjectedProps;

type State = {
  gradientOpacity: Animated.Value,
  gradientOpacityLeft: Animated.Value
};


const GRADIENT_WIDTH = 76;
const defaultImage = () => require('./assets/gradientOverlay.png');

/**
 * @description: Scrollable container with animated gradient overlay for horizontal scroll
 * @extends: ScrollView / FlatList
 */

class ScrollBar extends Component<Props, State> {
  static displayName = 'ScrollBar';

  static defaultProps = {
    gradientWidth: GRADIENT_WIDTH,
    gradientMargins: 0,
    gradientColor: Colors.white,
    focusIndex: 0
  };

  static Item: typeof Item;

  constructor(props: Props) {
    super(props);

    this.state = {
      gradientOpacity: new Animated.Value(0),
      gradientOpacityLeft: new Animated.Value(0)
    };
  }

  private scrollbar: any = undefined;
  private itemsLayouts: any = {};
  private contentOffset = 0;
  private scrollContentWidth = 0;
  private containerWidth = 0;

  componentDidUpdate(prevProps: Props) {
    const {focusIndex} = this.props;
    if (prevProps.focusIndex !== focusIndex) {
      this.focusIndex(focusIndex);
    }
  }

  focusIndex = (index = 0) => {
    const focusedItemLayout = this.itemsLayouts[index];
    if (focusedItemLayout) {
      const {x, width} = focusedItemLayout;
      if (x < this.contentOffset) {
        this.scrollbar.scrollTo({x: x - width});
      } else if (x + width > this.contentOffset + this.containerWidth) {
        const offsetChange = Math.max(0, x - (this.contentOffset + this.containerWidth));
        this.scrollbar.scrollTo({x: this.contentOffset + offsetChange + width});
      }
    }
  };

  animateGradientOpacity = (offsetX: number, contentWidth: number, containerWidth: number) => {
    const overflow = contentWidth - containerWidth;
    const newValue = offsetX > 0 && offsetX >= overflow - 1 ? 0 : 1;
    const newValueLeft = offsetX > 0 ? 1 : 0;

    Animated.parallel([
      Animated.spring(this.state.gradientOpacity, {
        toValue: newValue,
        speed: 20,
        useNativeDriver: true
      }),
      Animated.spring(this.state.gradientOpacityLeft, {
        toValue: newValueLeft,
        speed: 20,
        useNativeDriver: true
      })
    ]).start();
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    this.contentOffset = contentOffset.x;
    const offsetX = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;

    this.animateGradientOpacity(offsetX, contentWidth, containerWidth);

    _.invoke(this.props, 'onScroll', event);
  };

  onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    if (this.scrollContentWidth !== contentWidth) {
      this.scrollContentWidth = contentWidth;

      // race condition - won't pass if onLayout() was not called before
      if (contentWidth > this.containerWidth) {
        this.setState({gradientOpacity: new Animated.Value(1)});
      }

      _.invoke(this.props, 'onContentSizeChange', contentWidth, contentHeight);
    }
  };

  onLayout = (event: LayoutChangeEvent) => {
    this.containerWidth = event.nativeEvent.layout.width;

    _.invoke(this.props, 'onLayout', event);
    // 1 - for race condition, in case onContentSizeChange() is called before
    // 0 - for containerWidth change, when onContentSizeChange() is called first
    this.setState({gradientOpacity: new Animated.Value(this.scrollContentWidth > this.containerWidth ? 1 : 0)});
  };

  onItemLayout = ({layout, index}: any) => {
    this.itemsLayouts[index] = layout;

    const {children, focusIndex} = this.props;
    if (children && _.keys(this.itemsLayouts).length === _.keys(children).length) {
      this.focusIndex(focusIndex);
    }
  };

  renderScrollable() {
    const {useList, forwardedRef, children} = this.props;
    const Component: any = useList ? FlatList : ScrollView;

    return (
      <Component
        scrollEventThrottle={100}
        {...this.props}
        ref={(r: any) => {
          this.scrollbar = r;
          if (_.isFunction(forwardedRef)) {
            forwardedRef(r);
          } else if (_.isObject(forwardedRef)) {
            //@ts-ignore
            forwardedRef.current = r;
          }
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={this.onScroll}
        onContentSizeChange={this.onContentSizeChange}
      >
        {children &&
          React.Children.map(children, (child, index) => {
            return (
              <Item onLayout={this.onItemLayout} index={index}>
                {child}
              </Item>
            );
          })}
      </Component>
    );
  }

  renderGradient(left: boolean) {
    const {gradientOpacity, gradientOpacityLeft} = this.state;
    const {gradientWidth, gradientHeight, gradientMargins, height, gradientColor, gradientImage} = this.props;
    const imageTransform = Constants.isRTL ? (left ? undefined : [{scaleX: -1}]) : left ? [{scaleX: -1}] : undefined;
    const heightToUse = gradientHeight || height || '100%';
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          opacity: left ? gradientOpacityLeft : gradientOpacity,
          width: gradientWidth,
          height: heightToUse,
          position: 'absolute',
          right: !left ? gradientMargins : undefined,
          left: left ? gradientMargins : undefined
        }}
      >
        <Image
          source={gradientImage || defaultImage()}
          style={{
            width: gradientWidth,
            height: heightToUse,
            tintColor: gradientColor,
            transform: imageTransform
          }}
          resizeMode={'stretch'}
        />
      </Animated.View>
    );
  }

  render() {
    const {containerView, containerProps} = this.props;
    const Container: any = containerView || View;

    return (
      <Container row {...containerProps} onLayout={this.onLayout}>
        {this.renderScrollable()}
        {this.renderGradient(false)}
        {this.renderGradient(true)}
      </Container>
    );
  }
}

const Item = ({children, index, onLayout}: any) => {
  const onItemLayout = useCallback(({nativeEvent: {layout}}) => {
    onLayout({layout, index});
  }, [children]);

  return (
    <View flexG onLayout={onItemLayout}>
      {children}
    </View>
  );
};

Item.displayName = 'IGNORE';
ScrollBar.Item = Item;
export default asBaseComponent<ScrollBarProps, typeof ScrollBar>(forwardRef(ScrollBar));

