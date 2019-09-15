import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated} from 'react-native';
import {Constants} from '../../helpers';
import asPanViewConsumer from './asPanViewConsumer';
import PanningProvider from './panningProvider';

const DEFAULT_SPEED = 20;
const DEFAULT_BOUNCINESS = 6;
const DEFAULT_DISMISS_ANIMATION_DURATION = 280;
const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

/**
 * @description: PanDismissibleView component created to making listening to swipe and drag events easier,
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @important: This component is deprecated and should not be used.  
 */
class PanDismissibleView extends PureComponent {
  static displayName = 'PanDismissibleView';
  static propTypes = {
    /**
     * The directions of the allowed pan (default allows all directions)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    directions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(PanningProvider.Directions))),
    /**
     * onDismiss callback
     */
    onDismiss: PropTypes.func,
    /**
     * Some animation options to choose from:
     * speed - the animation speed (default is 20)
     * bounciness - the animation bounciness (default is 6)
     * duration - the dismiss animation duration (default is 280)
     */
    animationOptions: PropTypes.shape({
      speed: PropTypes.number,
      bounciness: PropTypes.number,
      duration: PropTypes.number
    })
  };

  static defaultProps = {
    directions: [
      PanningProvider.Directions.UP,
      PanningProvider.Directions.DOWN,
      PanningProvider.Directions.LEFT,
      PanningProvider.Directions.RIGHT
    ],
    animationOptions: {
      speed: DEFAULT_SPEED,
      bounciness: DEFAULT_BOUNCINESS,
      duration: DEFAULT_DISMISS_ANIMATION_DURATION
    },
    onDismiss: _.noop
  };

  constructor(props) {
    super(props);

    this.state = {
      animTranslateX: new Animated.Value(0),
      animTranslateY: new Animated.Value(0),
      isAnimating: false
    };
    this.shouldDismissAfterReset = false;
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const {isAnimating} = this.state;
    const {isPanning, dragDeltas, swipeDirections} = this.props.context; // eslint-disable-line
    const {
      isPanning: prevIsPanning,
      dragDeltas: prevDragDeltas,
      swipeDirections: prevSwipeDirections
    } = prevProps.context; // eslint-disable-line
    if (isPanning !== prevIsPanning) {
      if (isPanning && !isAnimating) {
        // do not start a new pan if we're still animating
        this.onPanStart();
      } else {
        this.onPanEnd();
      }
    }

    if (
      isPanning &&
      (dragDeltas.x || dragDeltas.y) &&
      (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)
    ) {
      this.onDrag(dragDeltas);
    }

    if (
      isPanning &&
      (swipeDirections.x || swipeDirections.y) &&
      (swipeDirections.x !== prevSwipeDirections.x || swipeDirections.y !== prevSwipeDirections.y)
    ) {
      this.onSwipe(swipeDirections);
    }
  }

  onLayout = event => {
    if (_.isUndefined(this.height)) {
      const layout = event.nativeEvent.layout;
      this.height = layout.height;
      this.thresholdY = layout.height / 2;
      this.width = layout.width;
      this.thresholdX = layout.width / 2;
      this.initPositions();
    }
  };

  initPositions = (extraDataForSetState, runAfterSetState) => {
    this.setNativeProps(0, 0);
    this.setState({
      animTranslateX: new Animated.Value(0),
      animTranslateY: new Animated.Value(0),
      ...extraDataForSetState
    },
    runAfterSetState,);
  };

  onPanStart = () => {
    this.swipe = {};
    this.counter = 0;
  };

  onDrag = deltas => {
    const left = deltas.x ? Math.round(deltas.x) : 0;
    const top = deltas.y ? Math.round(deltas.y) : 0;
    this.setNativeProps(left, top);
    if (this.swipe.x || this.swipe.y) {
      if (this.counter < MAXIMUM_DRAGS_AFTER_SWIPE) {
        this.counter += 1;
      } else {
        this.swipe = {};
      }
    }
  };

  setNativeProps = (left, top) => {
    if (this.ref.current) {
      this.ref.current.setNativeProps({style: {left, top}});
      this.left = left;
      this.top = top;
    }
  };

  onSwipe = swipeDirections => {
    this.swipe = swipeDirections;
  };

  onPanEnd = () => {
    const {directions} = this.props;
    if (this.swipe.x || this.swipe.y) {
      const {isRight, isDown} = this.getDismissAnimationDirection();
      this._animateDismiss(isRight, isDown);
    } else {
      const endValue = {x: Math.round(this.left), y: Math.round(this.top)};
      if (
        (directions.includes(PanningProvider.Directions.LEFT) && endValue.x <= -this.thresholdX) ||
        (directions.includes(PanningProvider.Directions.RIGHT) && endValue.x >= this.thresholdX) ||
        (directions.includes(PanningProvider.Directions.UP) && endValue.y <= -this.thresholdY) ||
        (directions.includes(PanningProvider.Directions.DOWN) && endValue.y >= this.thresholdY)
      ) {
        const {isRight, isDown} = this.getDismissAnimationDirection();
        this._animateDismiss(isRight, isDown);
      } else {
        this.resetPosition();
      }
    }
  };

  resetPosition = () => {
    const {animTranslateX, animTranslateY} = this.state;
    const {speed, bounciness} = this.props.animationOptions;
    const toX = -this.left;
    const toY = -this.top;
    const animations = [];
    if (!_.isUndefined(toX)) {
      animations.push(Animated.spring(animTranslateX, {
        toValue: Math.round(toX),
        speed,
        bounciness
      }),);
    }

    if (!_.isUndefined(toY)) {
      animations.push(Animated.spring(animTranslateY, {
        toValue: Math.round(toY),
        speed,
        bounciness
      }),);
    }

    this.setState({isAnimating: true}, () => {
      Animated.parallel(animations).start(this.onResetPositionFinished);
    });
  };

  onResetPositionFinished = () => {
    const runAfterSetState = this.shouldDismissAfterReset ? this.animateDismiss : undefined;
    this.shouldDismissAfterReset = false;
    this.initPositions({isAnimating: false}, runAfterSetState);
  };

  getDismissAnimationDirection = () => {
    const {swipeDirections, dragDirections} = this.props.context; // eslint-disable-line
    const hasHorizontalSwipe = !_.isUndefined(swipeDirections.x);
    const hasVerticalSwipe = !_.isUndefined(swipeDirections.y);
    let isRight;
    let isDown;

    if (hasHorizontalSwipe || hasVerticalSwipe) {
      if (hasHorizontalSwipe) {
        isRight = swipeDirections.x === PanningProvider.Directions.RIGHT;
      }

      if (hasVerticalSwipe) {
        isDown = swipeDirections.y === PanningProvider.Directions.DOWN;
      }
    } else {
      // got here from a drag beyond threshold
      if (!_.isUndefined(dragDirections.x)) {
        isRight = dragDirections.x === PanningProvider.Directions.RIGHT;
      }

      if (!_.isUndefined(dragDirections.y)) {
        isDown = dragDirections.y === PanningProvider.Directions.DOWN;
      }
    }

    return {isRight, isDown};
  };

  // Send undefined to not animate in the horizontal\vertical direction
  // isRight === true --> animate to the right
  // isRight === false --> animate to the left
  // isDown === true --> animate to the bottom
  // isDown === false --> animate to the top
  animateDismiss = () => {
    const {isAnimating} = this.state;
    if (isAnimating) {
      this.shouldDismissAfterReset = true;
    } else {
      const {directions = []} = this.props;
      const hasUp = directions.includes(PanningProvider.Directions.UP);
      const hasRight = directions.includes(PanningProvider.Directions.RIGHT);
      const hasLeft = directions.includes(PanningProvider.Directions.LEFT);
      const hasDown = !hasUp && !hasLeft && !hasRight; // default
      const verticalDismiss = hasDown ? true : hasUp ? false : undefined;
      const horizontalDismiss = hasRight ? true : hasLeft ? false : undefined;
      this._animateDismiss(horizontalDismiss, verticalDismiss);
    }
  };

  _animateDismiss = (isRight, isDown) => {
    const {animTranslateX, animTranslateY} = this.state;
    const {duration} = this.props.animationOptions;
    const animations = [];
    let toX;
    let toY;

    if (!_.isUndefined(isRight)) {
      const maxSize = Constants.screenWidth + this.width;
      toX = isRight ? maxSize : -maxSize;
    }

    if (!_.isUndefined(isDown)) {
      const maxSize = Constants.screenHeight + this.height;
      toY = isDown ? maxSize : -maxSize;
    }

    if (!_.isUndefined(toX)) {
      animations.push(Animated.timing(animTranslateX, {
        toValue: Math.round(toX),
        duration
      }),);
    }

    if (!_.isUndefined(toY)) {
      animations.push(Animated.timing(animTranslateY, {
        toValue: Math.round(toY),
        duration
      }),);
    }

    this.setState({isAnimating: true}, () => {
      Animated.parallel(animations).start(this.onDismissAnimationFinished);
    });
  };

  onDismissAnimationFinished = ({finished}) => {
    if (finished) {
      const {onDismiss} = this.props;
      onDismiss();
    }
  };

  render() {
    const {style} = this.props;
    const {isAnimating, animTranslateX, animTranslateY} = this.state;
    const transform = isAnimating ? [{translateX: animTranslateX}, {translateY: animTranslateY}] : [];

    return (
      <Animated.View
        ref={this.ref}
        style={[
          style,
          {
            transform
          }
        ]}
        onLayout={this.onLayout}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default asPanViewConsumer(PanDismissibleView);
