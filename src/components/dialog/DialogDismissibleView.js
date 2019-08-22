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
  };

  static defaultProps = {
    direction: PanningProvider.Directions.DOWN,
    onDismiss: _.noop,
  };

  constructor(props) {
    super(props);

    this.initialLocation = {};
    this.swipe = {};
    this.animatedValue = new Animated.Value(1)
    this.state = {
      isAnimating: false,
      isDismissed: false,
    };
    // shouldDismissAfterReset = false;
  }

  componentDidUpdate(prevProps) {
    const {isPanning, dragDeltas, swipeDirections} = this.props.context; // eslint-disable-line
    
    const {
      dragDeltas: prevDragDeltas,
      swipeDirections: prevSwipeDirections,
    } = prevProps.context; // eslint-disable-line

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
  };

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

//   onLayout = event => {
//     if (_.isUndefined(this.height)) {
//       const layout = event.nativeEvent.layout;
//       this.height = layout.height;
//       this.thresholdY = layout.height / 2;
//       this.width = layout.width;
//       this.thresholdX = layout.width / 2;
//       if (this.startAnimId) {
//         this.startEnterAnimation();
//       } else {
//         this.initPositions();
//       }
//     }
//   };

//   startEnterAnimation() {
//     const animation = this.getTimingAnimation(this.startAnimId, 0, 400, Easing.bezier(0.165, 0.84, 0.44, 1));
//     this.setState({isAnimating: true}, () => {
//       animation.start(() => this.initPositions());
//     });
//   }

//   initPositions = runAfterSetState => {
//     this.setNativeProps(0, 0);
//     this.setState(
//       {
//         animTranslateX: new Animated.Value(0),
//         animTranslateY: new Animated.Value(0),
//         isAnimating: false,
//       },
//       runAfterSetState,
//     );
//   };

//   onPanStart = () => {
//     this.swipe = {};
//     this.counter = 0;
//   };

//   onDrag = deltas => {
//     const left = deltas.x ? Math.round(deltas.x) : 0;
//     const top = deltas.y ? Math.round(deltas.y) : 0;
//     this.setNativeProps(left, top);
//     if (this.swipe.x || this.swipe.y) {
//       if (this.counter < MAXIMUM_DRAGS_AFTER_SWIPE) {
//         this.counter += 1;
//       } else {
//         this.swipe = {};
//       }
//     }
//   };

//   setNativeProps = (left, top) => {
//     if (this.ref.current) {
//       this.ref.current.setNativeProps({style: {left, top}});
//       this.left = left;
//       this.top = top;
//     }
//   };

//   onSwipe = swipeDirections => {
//     this.swipe = swipeDirections;
//   };

//   onPanEnd = () => {
//     const {directions} = this.props;
//     if (this.swipe.x || this.swipe.y) {
//       const {isRight, isDown} = this.getDismissAnimationDirection();
//       this._animateDismiss(isRight, isDown);
//     } else {
//       const endValue = {x: Math.round(this.left), y: Math.round(this.top)};
//       if (
//         (directions.includes(PanningProvider.Directions.LEFT) && endValue.x <= -this.thresholdX) ||
//         (directions.includes(PanningProvider.Directions.RIGHT) && endValue.x >= this.thresholdX) ||
//         (directions.includes(PanningProvider.Directions.UP) && endValue.y <= -this.thresholdY) ||
//         (directions.includes(PanningProvider.Directions.DOWN) && endValue.y >= this.thresholdY)
//       ) {
//         const {isRight, isDown} = this.getDismissAnimationDirection();
//         this._animateDismiss(isRight, isDown);
//       } else {
//         this.resetPosition();
//       }
//     }
//   };

//   resetPosition = () => {
//     const toX = -this.left;
//     const toY = -this.top;
//     const animations = [];
//     if (!_.isUndefined(toX)) {
//       animations.push(this.getSpringAnimation('animTranslateX', toX));
//     }

//     if (!_.isUndefined(toY)) {
//       animations.push(this.getSpringAnimation('animTranslateY', toY));
//     }

//     this.setState({isAnimating: true}, () => {
//       Animated.parallel(animations).start(this.onResetPositionFinished);
//     });
//   };

//   getSpringAnimation = (animId, toValue) => {
//     const {animationOptions} = this.props;
//     return Animated.spring(this.state[animId], {
//       toValue: Math.round(toValue),
//       speed: _.get(animationOptions, 'speed', 20),
//       bounciness: _.get(animationOptions, 'bounciness', 6),
//     });
//   };

//   onResetPositionFinished = () => {
//     const runAfterSetState = this.shouldDismissAfterReset ? this.animateDismiss : undefined;
//     this.shouldDismissAfterReset = false;
//     this.initPositions(runAfterSetState);
//   };

//   getDismissAnimationDirection = () => {
//     const {swipeDirections, dragDirections} = this.props.context; // eslint-disable-line
//     const hasHorizontalSwipe = !_.isUndefined(swipeDirections.x);
//     const hasVerticalSwipe = !_.isUndefined(swipeDirections.y);
//     let isRight;
//     let isDown;

//     if (hasHorizontalSwipe || hasVerticalSwipe) {
//       if (hasHorizontalSwipe) {
//         isRight = swipeDirections.x === PanningProvider.Directions.RIGHT;
//       }

//       if (hasVerticalSwipe) {
//         isDown = swipeDirections.y === PanningProvider.Directions.DOWN;
//       }
//     } else {
//       // got here from a drag beyond threshold
//       if (!_.isUndefined(dragDirections.x)) {
//         isRight = dragDirections.x === PanningProvider.Directions.RIGHT;
//       }

//       if (!_.isUndefined(dragDirections.y)) {
//         isDown = dragDirections.y === PanningProvider.Directions.DOWN;
//       }
//     }

//     return {isRight, isDown};
//   };

//   // Send undefined to not animate in the horizontal\vertical direction
//   // isRight === true --> animate to the right
//   // isRight === false --> animate to the left
//   // isDown === true --> animate to the bottom
//   // isDown === false --> animate to the top
//   animateDismiss = () => {
//     const {isAnimating} = this.state;
//     if (isAnimating) {
//       this.shouldDismissAfterReset = true;
//     } else {
//       const {directions = []} = this.props;
//       const hasUp = directions.includes(PanningProvider.Directions.UP);
//       const hasRight = directions.includes(PanningProvider.Directions.RIGHT);
//       const hasLeft = directions.includes(PanningProvider.Directions.LEFT);
//       const hasDown = !hasUp && !hasLeft && !hasRight; // default
//       const verticalDismiss = hasDown ? true : hasUp ? false : undefined;
//       const horizontalDismiss = hasRight ? true : hasLeft ? false : undefined;
//       this._animateDismiss(horizontalDismiss, verticalDismiss);
//     }
//   };

//   _animateDismiss = (isRight, isDown) => {
//     const animations = [];
//     let toX;
//     let toY;

//     if (!_.isUndefined(isRight)) {
//       const maxSize = Constants.screenWidth + this.width;
//       toX = isRight ? maxSize : -maxSize;
//     }

//     if (!_.isUndefined(isDown)) {
//       const maxSize = Constants.screenHeight + this.height;
//       toY = isDown ? maxSize : -maxSize;
//     }

//     if (!_.isUndefined(toX)) {
//       animations.push(this.getTimingAnimation('animTranslateX', toX, 280));
//     }

//     if (!_.isUndefined(toY)) {
//       animations.push(this.getTimingAnimation('animTranslateY', toY, 280));
//     }

//     this.setState({isAnimating: true}, () => {
//       Animated.parallel(animations).start(this.onDismissAnimationFinished);
//     });
//   };

//   getTimingAnimation = (animId, toValue, defaultDuration, defaultEasing) => {
//     const {animationOptions} = this.props;
//     return Animated.timing(this.state[animId], {
//       toValue: Math.round(toValue),
//       duration: _.get(animationOptions, 'duration', defaultDuration),
//       easing: _.get(animationOptions, 'easing', defaultEasing),
//     });
//   };

//   onDismissAnimationFinished = ({finished}) => {
//     if (finished) {
//       const {onDismiss} = this.props;
//       onDismiss();
//     }
//   };















  animateDismiss = () => {
      //TODO:
    const {onDismiss} = this.props;
    // TODO: test we're not animating?
    const animation = Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      useNativeDriver: true,
    });
  
    this.setState({isAnimating: true}, () => animation.start(
        () => {
            this.setState({isDismissed: true}, onDismiss);
        }
    ));
  }

  onAnimationEnd = () => {
    // const to = this.getTo();
    // this.current = {
    //     left: to.left,
    //     top: to.top,
    // };
    // const {currentAnimationIndex} = this.state;
    // if (currentAnimationIndex === this.animationData.length - 1) {
      this.setState({isAnimating: false});
    // } else {
    //   this.setState({currentAnimationIndex: currentAnimationIndex + 1}, this.startAnimation);
    // }
  }

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
    } else { // RIGHT
      return {left: (Constants.screenWidth + this.width) / 2};
    }
  }

  onLayout = event => {
    if (_.isEmpty(this.initialLocation)) {
      const layout = event.nativeEvent.layout;
      this.height = layout.height;
      this.thresholdY = layout.height / 2;
      this.width = layout.width;
      this.thresholdX = layout.width / 2;
      this.initialLocation = this.getInitialLocation();
      this.initialLocation = { // "|| 0" to handle null values in left\top TODO: remove?
        left: _.get(this.initialLocation, 'left', 0) || 0,
        top: _.get(this.initialLocation, 'top', 0) || 0,
      };

      this.animationStyle = {
        transform: [{translateX: this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this.initialLocation.left]
        })}, {translateY: this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this.initialLocation.top]
        })}]
      }

      // TODO: move?
      const animation = Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 400,
        easing: Easing.bezier(0.165, 0.84, 0.44, 1),
        useNativeDriver: true,
      });
  
      this.setState({isAnimating: true}, () => animation.start(this.onAnimationEnd));
    }
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
        // this.resetPosition();

        const toValue = (direction === PanningProvider.Directions.LEFT || direction === PanningProvider.Directions.RIGHT) ?
            -left/this.initialLocation.left : -top/this.initialLocation.top;
        const animation = Animated.timing(this.animatedValue, {
          toValue,
          duration: 400,
          easing: Easing.bezier(0.165, 0.84, 0.44, 1),
          useNativeDriver: true,
        });
          
        this.setState({isAnimating: true}, () => animation.start(this.onAnimationEnd));
      }
    }
  }

  render() {
    const {style} = this.props;
    const {isDismissed, isAnimating, currentAnimationIndex, animTranslateX, animTranslateY} = this.state;

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
