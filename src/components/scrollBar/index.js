import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Animated, ScrollView, FlatList} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent, forwardRef} from '../../commons';
import View from '../view';
import Image from '../image';


const CONTAINER_HEIGHT = 48;
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
    containerView: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
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
    gradientImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    height: CONTAINER_HEIGHT,
    gradientWidth: GRADIENT_WIDTH,
    gradientMargins: 0,
    gradientColor: Colors.white
  };

  constructor(props) {
    super(props);

    this.state = {
      gradientOpacity: new Animated.Value(0),
      gradientOpacityLeft: new Animated.Value(0)
    };

    this.scrollContentWidth = undefined;
  }

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

    // for race condition, in case onContentSizeChange() is called before
    if (this.scrollContentWidth > this.containerWidth) {
      this.setState({gradientOpacity: new Animated.Value(1)});
    }
  }

  renderScrollable() {
    const {useList, forwardedRef} = this.props;
    const Component = useList ? FlatList : ScrollView;

    return (
      <Component
        {...this.getThemeProps()}
        ref={forwardedRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={this.onScroll}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  }

  renderGradient(left) {
    const {gradientOpacity, gradientOpacityLeft} = this.state;
    const {gradientWidth, gradientHeight, gradientMargins, height, gradientColor, gradientImage} = this.getThemeProps();
    const imageTransform = Constants.isRTL ? (left ? undefined : [{scaleX: -1}]) : (left ? [{scaleX: -1}] : undefined);

    return (
      <Animated.View
        pointerEvents="none"
        style={{
          opacity: left ? gradientOpacityLeft : gradientOpacity,
          width: gradientWidth,
          height: gradientHeight || height,
          position: 'absolute',
          right: !left ? gradientMargins : undefined,
          left: left ? gradientMargins : undefined
        }}
      >
        <Image
          source={gradientImage || defaultImage()}
          style={{
            width: gradientWidth, 
            height: gradientHeight || height, 
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

export default forwardRef(ScrollBar);
