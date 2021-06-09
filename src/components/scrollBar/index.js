import _pt from "prop-types";
import _ from 'lodash';
import React, { Component, useCallback } from 'react';
import { Animated, ScrollView, FlatList } from 'react-native';
import { Constants } from "../../helpers";
import { Colors } from "../../style";
import { asBaseComponent, forwardRef } from "../../commons/new";
import View from "../view";
import Image from "../image";
const GRADIENT_WIDTH = 76;

const defaultImage = () => require("./assets/gradientOverlay.png");
/**
 * @description: Scrollable container with animated gradient overlay for horizontal scroll
 * @extends: ScrollView / FlatList
 */


class ScrollBar extends Component {
  static propTypes = {
    /**
         * Whether to use a FlatList. NOTE: you must pass 'data' and 'renderItem' props as well
         */
    useList: _pt.bool,

    /**
         * The element to use as a container, instead of a View
         */
    containerView: _pt.elementType,

    /**
         * The props to pass the container
         */
    containerProps: _pt.object,

    /**
         * The component's height
         */
    height: _pt.number,

    /**
         * The gradient's height, defaults to the component's height
         */
    gradientHeight: _pt.number,

    /**
         * The gradient's width
         */
    gradientWidth: _pt.number,

    /**
         * The gradient's margins for the edge
         */
    gradientMargins: _pt.number,

    /**
         * The gradient's tint color
         */
    gradientColor: _pt.string,

    /**
         * The index to currently focus on
         */
    focusIndex: _pt.number
  };
  static displayName = 'ScrollBar';
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
  }

  scrollbar = undefined;
  itemsLayouts = {};
  contentOffset = 0;
  scrollContentWidth = 0;
  containerWidth = 0;

  componentDidUpdate(prevProps) {
    const {
      focusIndex
    } = this.props;

    if (prevProps.focusIndex !== focusIndex) {
      this.focusIndex(focusIndex);
    }
  }

  focusIndex = (index = 0) => {
    const focusedItemLayout = this.itemsLayouts[index];

    if (focusedItemLayout) {
      const {
        x,
        width
      } = focusedItemLayout;

      if (x < this.contentOffset) {
        this.scrollbar.scrollTo({
          x: x - width
        });
      } else if (x + width > this.contentOffset + this.containerWidth) {
        const offsetChange = Math.max(0, x - (this.contentOffset + this.containerWidth));
        this.scrollbar.scrollTo({
          x: this.contentOffset + offsetChange + width
        });
      }
    }
  };
  animateGradientOpacity = (offsetX, contentWidth, containerWidth) => {
    const overflow = contentWidth - containerWidth;
    const newValue = offsetX > 0 && offsetX >= overflow - 1 ? 0 : 1;
    const newValueLeft = offsetX > 0 ? 1 : 0;
    Animated.parallel([Animated.spring(this.state.gradientOpacity, {
      toValue: newValue,
      speed: 20,
      useNativeDriver: true
    }), Animated.spring(this.state.gradientOpacityLeft, {
      toValue: newValueLeft,
      speed: 20,
      useNativeDriver: true
    })]).start();
  };
  onScroll = event => {
    const {
      layoutMeasurement,
      contentOffset,
      contentSize
    } = event.nativeEvent;
    this.contentOffset = contentOffset.x;
    const offsetX = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;
    this.animateGradientOpacity(offsetX, contentWidth, containerWidth);

    _.invoke(this.props, 'onScroll', event);
  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    if (this.scrollContentWidth !== contentWidth) {
      this.scrollContentWidth = contentWidth; // race condition - won't pass if onLayout() was not called before

      if (contentWidth > this.containerWidth) {
        this.setState({
          gradientOpacity: new Animated.Value(1)
        });
      }

      _.invoke(this.props, 'onContentSizeChange', contentWidth, contentHeight);
    }
  };
  onLayout = event => {
    this.containerWidth = event.nativeEvent.layout.width;

    _.invoke(this.props, 'onLayout', event); // 1 - for race condition, in case onContentSizeChange() is called before
    // 0 - for containerWidth change, when onContentSizeChange() is called first


    this.setState({
      gradientOpacity: new Animated.Value(this.scrollContentWidth > this.containerWidth ? 1 : 0)
    });
  };
  onItemLayout = ({
    layout,
    index
  }) => {
    this.itemsLayouts[index] = layout;
    const {
      children,
      focusIndex
    } = this.props;

    if (children && _.keys(this.itemsLayouts).length === _.keys(children).length) {
      this.focusIndex(focusIndex);
    }
  };

  renderScrollable() {
    const {
      useList,
      forwardedRef,
      children
    } = this.props;
    const Component = useList ? FlatList : ScrollView;
    return <Component scrollEventThrottle={100} {...this.props} ref={r => {
      this.scrollbar = r;

      if (_.isFunction(forwardedRef)) {
        forwardedRef(r);
      } else if (_.isObject(forwardedRef)) {
        //@ts-ignore
        forwardedRef.current = r;
      }
    }} horizontal showsHorizontalScrollIndicator={false} onScroll={this.onScroll} onContentSizeChange={this.onContentSizeChange}>
        {children && React.Children.map(children, (child, index) => {
        return <Item onLayout={this.onItemLayout} index={index}>
                {child}
              </Item>;
      })}
      </Component>;
  }

  renderGradient(left) {
    const {
      gradientOpacity,
      gradientOpacityLeft
    } = this.state;
    const {
      gradientWidth,
      gradientHeight,
      gradientMargins,
      height,
      gradientColor,
      gradientImage
    } = this.props;
    const imageTransform = Constants.isRTL ? left ? undefined : [{
      scaleX: -1
    }] : left ? [{
      scaleX: -1
    }] : undefined;
    const heightToUse = gradientHeight || height || '100%';
    return <Animated.View pointerEvents="none" style={{
      opacity: left ? gradientOpacityLeft : gradientOpacity,
      width: gradientWidth,
      height: heightToUse,
      position: 'absolute',
      right: !left ? gradientMargins : undefined,
      left: left ? gradientMargins : undefined
    }}>
        <Image source={gradientImage || defaultImage()} style={{
        width: gradientWidth,
        height: heightToUse,
        tintColor: gradientColor,
        transform: imageTransform
      }} resizeMode={'stretch'} />
      </Animated.View>;
  }

  render() {
    const {
      containerView,
      containerProps
    } = this.props;
    const Container = containerView || View;
    return <Container row {...containerProps} onLayout={this.onLayout}>
        {this.renderScrollable()}
        {this.renderGradient(false)}
        {this.renderGradient(true)}
      </Container>;
  }

}

const Item = ({
  children,
  index,
  onLayout
}) => {
  const onItemLayout = useCallback(({
    nativeEvent: {
      layout
    }
  }) => {
    onLayout({
      layout,
      index
    });
  }, [children]);
  return <View flexG onLayout={onItemLayout}>
      {children}
    </View>;
};

Item.displayName = 'IGNORE';
ScrollBar.Item = Item;
export default asBaseComponent(forwardRef(ScrollBar));