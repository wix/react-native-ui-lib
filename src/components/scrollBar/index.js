import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {Animated, ScrollView, FlatList} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent, forwardRef} from '../../commons';
import View from '../view';
import Image from '../image';

const GRADIENT_WIDTH = 76;
const defaultImage = () => require('./assets/gradientOverlay.png');

/**
 * @description: Scrollable container with animated gradient overlay for horizontal scroll
 * @extends: ScrollView / FlatList
 */

class ScrollBar extends BaseComponent {
  static displayName = 'ScrollBar';

  static propTypes = {
    ...ScrollView.propTypes,
    ...FlatList.propTypes,
    /**
     * Whether to use a FlatList. NOTE: you must pass 'data' and 'renderItem' props as well
     */
    useList: PropTypes.bool,
    /**
     * The element to use as a container, instead of a View
     */
    containerView: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    /**
     * The props to pass the container
     */
    containerProps: PropTypes.object,
    /**
     * The component's height
     */
    height: PropTypes.number,
    /**
     * The gradient's height, defaults to the component's height
     */
    gradientHeight: PropTypes.number,
    /**
     * The gradient's width
     */
    gradientWidth: PropTypes.number,
    /**
     * The gradient's margins for the edge
     */
    gradientMargins: PropTypes.number,
    /**
     * The gradient's tint color
     */
    gradientColor: PropTypes.string,
    /**
     * The gradient's image, instead of the default image.
     * NOTE: pass an image for the right-hand side and it will be flipped to match the left-hand side
     */
    gradientImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The index to currently focus on
     */
    focusIndex: PropTypes.number
  };

  static defaultProps = {
    gradientWidth: GRADIENT_WIDTH,
    gradientMargins: 0,
    gradientColor: Colors.white,
    focusIndex: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      gradientOpacity: new Animated.Value(0),
      gradientOpacityLeft: new Animated.Value(0)
    };

    this.scrollContentWidth = undefined;
    this.itemsLayouts = {};
    this.contentOffset = 0;
  }

  componentDidUpdate(prevProps, prevState) {
    const {focusIndex} = this.props;
    if (focusIndex && prevProps.focusIndex !== focusIndex) {
      this.focusIndex(focusIndex);
    }
  }

  focusIndex = index => {
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

  animateGradientOpacity = (offsetX, contentWidth, containerWidth) => {
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

  onScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    this.contentOffset = contentOffset.x;
    const offsetX = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;

    this.animateGradientOpacity(offsetX, contentWidth, containerWidth);

    _.invoke(this.props, 'onScroll', event);
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    if (this.scrollContentWidth !== contentWidth) {
      this.scrollContentWidth = contentWidth;

      // race condition - won't pass if onLayout() was not called before
      if (contentWidth > this.containerWidth) {
        this.setState({gradientOpacity: new Animated.Value(1)});
      }

      _.invoke(this.props, 'onContentSizeChange', contentWidth, contentHeight);
    }
  };

  onLayout = ({nativeEvent}) => {
    this.containerWidth = nativeEvent.layout.width;

    // 1 - for race condition, in case onContentSizeChange() is called before
    // 0 - for containerWidth change, when onContentSizeChange() is called first
    this.setState({gradientOpacity: new Animated.Value(this.scrollContentWidth > this.containerWidth ? 1 : 0)});
  };

  onItemLayout = ({layout, index}) => {
    this.itemsLayouts[index] = layout;
    if (_.keys(this.itemsLayouts).length === this.props.children.length) {
      this.focusIndex(this.props.focusIndex);
    }
  };

  renderScrollable() {
    const {useList, forwardedRef, children} = this.props;
    const Component = useList ? FlatList : ScrollView;

    return (
      <Component
        scrollEventThrottle={100}
        {...this.getThemeProps()}
        ref={r => {
          this.scrollbar = r;
          if (_.isFunction(forwardedRef)) {
            forwardedRef(r);
          } else if (_.isObject(forwardedRef)) {
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

  renderGradient(left) {
    const {gradientOpacity, gradientOpacityLeft} = this.state;
    const {gradientWidth, gradientHeight, gradientMargins, height, gradientColor, gradientImage} = this.getThemeProps();
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
    const {containerView, containerProps} = this.getThemeProps();
    const Container = containerView || View;

    return (
      <Container row {...containerProps} onLayout={this.onLayout}>
        {this.renderScrollable()}
        {this.renderGradient()}
        {this.renderGradient(true)}
      </Container>
    );
  }
}

const Item = ({children, index, onLayout}) => {
  const onItemLayout = useCallback(({nativeEvent: {layout}}) => {
    onLayout({layout, index});
  });

  return (
    <View flexG onLayout={onItemLayout}>
      {children}
    </View>
  );
};

ScrollBar.Item = Item;
export default forwardRef(ScrollBar);
