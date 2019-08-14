import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';
import {Constants} from '../../helpers';
import asPanViewConsumer from './asPanViewConsumer';
import PanningProvider from './panningProvider';

const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

/**
 * @description: PanDismissibleView component created to making listening to swipe and drag events easier,
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
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
     * Some animation options to control the different animations.
     */
    animationOptions: PropTypes.object,
  };

  static defaultProps = {
    directions: [
      PanningProvider.Directions.UP,
      PanningProvider.Directions.DOWN,
      PanningProvider.Directions.LEFT,
      PanningProvider.Directions.RIGHT,
    ],
    onDismiss: _.noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.getDefaultTranslations(props),
      isAnimating: false
    };
    shouldDismissAfterReset = false;
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const {isAnimating} = this.state;
    const {isPanning, dragDeltas, swipeDirections} = this.props.context; // eslint-disable-line
    const {
      isPanning: prevIsPanning,
      dragDeltas: prevDragDeltas,
      swipeDirections: prevSwipeDirections,
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

  getDefaultTranslations(props) {
    const {directions} = props;
    if (directions.length === 0 || directions.includes(PanningProvider.Directions.DOWN)) {
      this.startAnimId = 'animTranslateY';
      return {animTranslateX: new Animated.Value(0), animTranslateY: new Animated.Value(Constants.screenHeight)};
    } else if (directions.includes(PanningProvider.Directions.UP)) {
      this.startAnimId = 'animTranslateY';
      return {animTranslateX: new Animated.Value(0), animTranslateY: new Animated.Value(-Constants.screenHeight)};
    } else if (directions.includes(PanningProvider.Directions.RIGHT)) {
      this.startAnimId = 'animTranslateX';
      return {animTranslateX: new Animated.Value(Constants.screenWidth), animTranslateY: new Animated.Value(0)};
    } else if (directions.includes(PanningProvider.Directions.LEFT)) {
      this.startAnimId = 'animTranslateX';
      return {animTranslateX: new Animated.Value(-Constants.screenWidth), animTranslateY: new Animated.Value(0)};
    } else {
      return {animTranslateX: new Animated.Value(0), animTranslateY: new Animated.Value(0)};
    }
  }

  onLayout = event => {
    if (_.isUndefined(this.height)) {
      const layout = event.nativeEvent.layout;
      this.height = layout.height;
      this.thresholdY = layout.height / 2;
      this.width = layout.width;
      this.thresholdX = layout.width / 2;
      if (this.startAnimId) {
        this.startEnterAnimation();
      } else {
        this.initPositions();
      }
    }
  };

  startEnterAnimation() {
    const animation = this.getTimingAnimation(this.startAnimId, 0, 400, Easing.bezier(0.165, 0.84, 0.44, 1));
    this.setState({isAnimating: true}, () => {
      animation.start(() => this.initPositions());
    });
  }

  initPositions = (runAfterSetState) => {
    this.setNativeProps(0, 0);
    this.setState({
      animTranslateX: new Animated.Value(0),
      animTranslateY: new Animated.Value(0),
      isAnimating: false
    }, runAfterSetState);
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
    const toX = -this.left;
    const toY = -this.top;
    const animations = [];
    if (!_.isUndefined(toX)) {
      animations.push(this.getSpringAnimation('animTranslateX', toX));
    }

    if (!_.isUndefined(toY)) {
      animations.push(this.getSpringAnimation('animTranslateY', toY));
    }

    this.setState({isAnimating: true}, () => {
      Animated.parallel(animations).start(this.onResetPositionFinished);
    });
  };

  getSpringAnimation = (animId, toValue) => {
    const {animationOptions} = this.props;
    return Animated.spring(this.state[animId], {
      toValue: Math.round(toValue),
      speed: _.get(animationOptions, 'speed', 20),
      bounciness: _.get(animationOptions, 'bounciness', 6),
    });
  }

  onResetPositionFinished = () => {
    const runAfterSetState = this.shouldDismissAfterReset ? this.animateDismiss : undefined;
    this.shouldDismissAfterReset = false;
    this.initPositions(runAfterSetState);
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
      animations.push(this.getTimingAnimation('animTranslateX', toX, 280));
    }

    if (!_.isUndefined(toY)) {
      animations.push(this.getTimingAnimation('animTranslateY', toY, 280));
    }

    this.setState({isAnimating: true}, () => {
      Animated.parallel(animations).start(this.onDismissAnimationFinished);
    });
  };

  getTimingAnimation = (animId, toValue, defaultDuration, defaultEasing) => {
    const {animationOptions} = this.props;
    return Animated.timing(this.state[animId], {
      toValue: Math.round(toValue),
      duration: _.get(animationOptions, 'duration', defaultDuration),
      easing: _.get(animationOptions, 'easing', defaultEasing),
    });
  }

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
            transform,
          },
        ]}
        onLayout={this.onLayout}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default asPanViewConsumer(PanDismissibleView);
