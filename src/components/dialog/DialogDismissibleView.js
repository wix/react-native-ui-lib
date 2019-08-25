import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';
import {Constants} from '../../helpers';
import View from '../view';
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
    /**
     * The dialog`s container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Whether to show the dialog or not
     */
    visible: PropTypes.bool,
  };

  static defaultProps = {
    direction: PanningProvider.Directions.DOWN,
    onDismiss: _.noop,
  };

  constructor(props) {
    super(props);

    this.hiddenLocation = {};
    this.swipe = {};
    this.animatedValue = new Animated.Value(1);
    this.state = {
      visible: props.visible,
      isAnimating: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {isPanning, dragDeltas, swipeDirections} = this.props.context; // eslint-disable-line
    const {dragDeltas: prevDragDeltas, swipeDirections: prevSwipeDirections} = prevProps.context; // eslint-disable-line
    const {visible} = this.props;
    const {visible: prevVisible} = prevProps;

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

    if (visible && !prevVisible) {
      this.setState({visible: true});
    } else if (prevVisible && !visible) {
      this.animateDismiss();
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

  getHiddenLocation = (left, top) => {
    const {direction} = this.props;
    const topInset = Constants.isIphoneX ? Constants.getSafeAreaInsets().top : Constants.isIOS ? 20 : 0;
    let result;
    switch(direction) {
      case PanningProvider.Directions.LEFT:
        result = {top: 0, left: -left - this.width};
        break;
      case PanningProvider.Directions.RIGHT:
        result = {top: 0, left: Constants.screenWidth - left};
        break;
      case PanningProvider.Directions.UP:
        result = {top: -top - this.height - topInset, left: 0};
        break;
      case PanningProvider.Directions.DOWN:
      default:
        result = {top: Constants.screenHeight - top, left: 0};
        break;
    }
    
    return result;
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

  getAnimationStyle = () => {
    return (
      {
        transform: [
          {
            translateX: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, this.hiddenLocation.left],
            }),
          },
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, this.hiddenLocation.top],
            }),
          },
        ],
      }
    );
  }

  onLayout = (event) => {
    // DO NOT move the width\height into the measureInWindow - it causes errors with orientation change 
    const layout = event.nativeEvent.layout;
    this.width = layout.width;
    this.height = layout.height;
    this.thresholdX = this.width / 2;
    this.thresholdY = this.height / 2;
    this.ref.measureInWindow((x, y) => {
      this.hiddenLocation = this.getHiddenLocation(x, y);
      this.animationStyle = this.getAnimationStyle();
      this.animateTo(0, this.onAnimationEnd);
    });
  };

  animateDismiss = () => {
    const {onDismiss} = this.props;
    // TODO: test we're not animating?
    this.animateTo(1, () => this.setState({visible: false}, onDismiss));
  };

  // TODO: animateToStart ?
  resetPosition = (left, top, direction) => {
    const toValue =
      direction === PanningProvider.Directions.LEFT || direction === PanningProvider.Directions.RIGHT
        ? -left / this.hiddenLocation.left
        : -top / this.hiddenLocation.top;

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
    const {containerStyle, style} = this.props;
    const {visible} = this.state;

    return (
      <View ref={r => (this.ref = r)} style={containerStyle} onLayout={this.onLayout}>
        <PanResponderView
          style={[style, this.animationStyle, !visible && {opacity: 0}]}
          isAnimated
          onPanLocationChanged={this.onPanLocationChanged}
        >
          {this.props.children}
        </PanResponderView>
      </View>
    );
  }
}

export default asPanViewConsumer(DialogDismissibleView);
