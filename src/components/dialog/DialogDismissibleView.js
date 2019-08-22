import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';
import {Constants} from '../../helpers';
import asPanViewConsumer from '../panningViews/asPanViewConsumer';
import PanningProvider from '../panningViews/panningProvider';
import PanResponderView from '../panningViews/panResponderView';

const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

class DialogDismissibleView extends PureComponent {
  static propTypes = {
    /**
     * The direction of the allowed pan (default is DOWN)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    direction: PropTypes.oneOf(Object.values(PanningProvider.Directions)),
    /**
     * onDismiss callback
     */
    onDismiss: PropTypes.func,
    /**
     * Is this bottom, top or none (center)
     */
    alignment: PropTypes.shape(PropTypes.arrayOf[PropTypes.bool]),
  };

  static defaultProps = {
    direction: PanningProvider.Directions.DOWN,
    onDismiss: _.noop,
  };

  constructor(props) {
    super(props);

    this.initialLocation = {};
    this.swipe = {};
    this.animatedValue = new Animated.Value(1);
    this.state = {
      isAnimating: false, // TODO: remove?
      isDismissed: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {isPanning, dragDeltas, swipeDirections} = this.props.context; // eslint-disable-line
    const {dragDeltas: prevDragDeltas, swipeDirections: prevSwipeDirections} = prevProps.context; // eslint-disable-line

    if (
      isPanning &&
      (dragDeltas.x || dragDeltas.y) &&
      (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)
    ) {
      this.onDrag();
    }

    if (
      isPanning &&
      (swipeDirections.x || swipeDirections.y) &&
      (swipeDirections.x !== prevSwipeDirections.x || swipeDirections.y !== prevSwipeDirections.y)
    ) {
      this.onSwipe(swipeDirections);
    }
  }

  onDrag = () => {
    if (this.swipe.x || this.swipe.y) {
      if (this.counter < MAXIMUM_DRAGS_AFTER_SWIPE) {
        this.counter += 1;
      } else {
        this.swipe = {};
      }
    }
  };

  onSwipe = swipeDirections => {
    this.swipe = swipeDirections;
  };

  onAnimationEnd = () => {
    this.setState({isAnimating: false});
  };

  getInitialLocation = () => {
    const {alignment, style, direction} = this.props;
    const {bottom, top} = alignment;
    const center = !bottom && !top;
    if (direction === PanningProvider.Directions.DOWN) {
      if (bottom) {
        const dynamicHeight = _.isUndefined(style) || _.isUndefined(style.height);
        if (dynamicHeight) {
          return {top: Constants.screenHeight};
        } else {
          return {top: this.height + 11}; // iPhoneX 11, iPhone -7, Android 0
        }
      } else if (center) {
        return {top: (Constants.screenHeight + this.height) / 2};
      } else {
        return {top: Constants.screenHeight};
      }
    } else if (direction === PanningProvider.Directions.UP) {
      if (top) {
        return {top: -this.height - 44}; // iPhoneX -44, iPhone -20, Android 0
      } else if (center) {
        return {top: -(Constants.screenHeight + this.height) / 2};
      } else {
        return {top: Constants.screenHeight};
      }
    } else if (direction === PanningProvider.Directions.LEFT) {
      return {left: -(Constants.screenWidth + this.width) / 2 - 1};
    } else {
      // RIGHT
      return {left: (Constants.screenWidth + this.width) / 2};
    }
  };

  animateTo = (toValue, animationEndCallback) => {
    const animation = Animated.timing(this.animatedValue, {
      toValue,
      duration: 400,
      easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      useNativeDriver: true,
    });

    this.setState({isAnimating: true}, () => animation.start(animationEndCallback));
  };

  onLayout = event => {
    if (_.isEmpty(this.initialLocation)) {
      const layout = event.nativeEvent.layout;
      this.height = layout.height;
      this.thresholdY = layout.height / 2;
      this.width = layout.width;
      this.thresholdX = layout.width / 2;
      this.initialLocation = this.getInitialLocation();
      this.initialLocation = {
        // "|| 0" to handle null values in left\top TODO: remove?
        left: _.get(this.initialLocation, 'left', 0) || 0,
        top: _.get(this.initialLocation, 'top', 0) || 0,
      };

      this.animationStyle = {
        transform: [
          {
            translateX: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, this.initialLocation.left],
            }),
          },
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, this.initialLocation.top],
            }),
          },
        ],
      };

      this.animateTo(0, this.onAnimationEnd);
    }
  };

  animateDismiss = () => {
    const {onDismiss} = this.props;
    // TODO: test we're not animating?
    this.animateTo(1, () => this.setState({isDismissed: true}, onDismiss));
  };

  // TODO: animateToStart ?
  resetPosition = (left, top, direction) => {
    const toValue =
      direction === PanningProvider.Directions.LEFT || direction === PanningProvider.Directions.RIGHT
        ? -left / this.initialLocation.left
        : -top / this.initialLocation.top;

    this.animateTo(toValue, this.onAnimationEnd);
  };

  onPanLocationChanged = ({left, top}) => {
    const {direction} = this.props;
    const endValue = {x: Math.round(left), y: Math.round(top)};
    if (this.swipe.x || this.swipe.y) {
      this.animateDismiss();
    } else {
      this.swipe = {};
      if (
        (direction === PanningProvider.Directions.LEFT && endValue.x <= -this.thresholdX) ||
        (direction === PanningProvider.Directions.RIGHT && endValue.x >= this.thresholdX) ||
        (direction === PanningProvider.Directions.UP && endValue.y <= -this.thresholdY) ||
        (direction === PanningProvider.Directions.DOWN && endValue.y >= this.thresholdY)
      ) {
        this.animateDismiss();
      } else {
        this.resetPosition(left, top, direction);
      }
    }
  };

  render() {
    const {style} = this.props;
    const {isDismissed} = this.state;

    return (
      <PanResponderView
        style={[style, this.animationStyle, isDismissed && {opacity: 0}]}
        isAnimated
        onLayout={this.onLayout}
        onPanLocationChanged={this.onPanLocationChanged}
      >
        {this.props.children}
      </PanResponderView>
    );
  }
}

export default asPanViewConsumer(DialogDismissibleView);
