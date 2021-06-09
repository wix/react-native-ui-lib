import _pt from "prop-types";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { Constants } from "../../helpers";
import asPanViewConsumer from "./asPanViewConsumer";
import PanningProvider from "./panningProvider";
//TODO: remove after ComponentPropTypes deprecation;
const DEFAULT_DIRECTIONS = [PanningProvider.Directions.UP, PanningProvider.Directions.DOWN, PanningProvider.Directions.LEFT, PanningProvider.Directions.RIGHT];
const DEFAULT_SPEED = 20;
const DEFAULT_BOUNCINESS = 6;
const DEFAULT_DISMISS_ANIMATION_DURATION = 280;
const DEFAULT_ANIMATION_OPTIONS = {
  speed: DEFAULT_SPEED,
  bounciness: DEFAULT_BOUNCINESS,
  duration: DEFAULT_DISMISS_ANIMATION_DURATION
};
const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

/**
 * @description: PanDismissibleView component created to making listening to swipe and drag events easier,
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/PanDismissibleView/PanDismissibleView.gif?raw=true
 */
class PanDismissibleView extends PureComponent {
  static propTypes = {
    /**
       * The directions of the allowed pan (default allows all directions)
       * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
       */
    directions: _pt.oneOfType([_pt.array, _pt.array]),

    /**
       * onDismiss callback
       */
    onDismiss: _pt.func,

    /**
       * Some animation options to choose from, defaults are set for:
       * speed - the animation speed (default is 20)
       * bounciness - the animation bounciness (default is 6)
       * duration - the dismiss animation duration (default is 280)
       */
    animationOptions: _pt.shape({
      /**
         * The return animation speed (default is 20)
         */
      speed: _pt.number,

      /**
         * The return animation bounciness (default is 6)
         */
      bounciness: _pt.number,

      /**
         * The dismiss animation duration (default is 280)
         */
      duration: _pt.number
    }),

    /**
       * Allow diagonal dismiss, this is false by default,
       * since it looks better and most cases.
       */
    allowDiagonalDismiss: _pt.bool,
    context: _pt.shape({
      isPanning: _pt.bool.isRequired
    }).isRequired
  };
  static displayName = 'PanDismissibleView';
  static defaultProps = {
    directions: DEFAULT_DIRECTIONS,
    animationOptions: DEFAULT_ANIMATION_OPTIONS,
    onDismiss: _.noop,
    allowDiagonalDismiss: false
  };
  shouldDismissAfterReset = false;
  ref = React.createRef();
  animTranslateX = new Animated.Value(0);
  animTranslateY = new Animated.Value(0);
  left = 0;
  top = 0;
  width = 0;
  height = 0;
  thresholdX = 0;
  thresholdY = 0;
  swipe = {};
  counter = 0;

  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };
  }

  componentDidUpdate(prevProps) {
    const {
      isAnimating
    } = this.state;
    const {
      isPanning,
      dragDeltas,
      swipeDirections
    } = this.props.context;
    const {
      isPanning: prevIsPanning,
      dragDeltas: prevDragDeltas,
      swipeDirections: prevSwipeDirections
    } = prevProps.context;

    if (isPanning !== prevIsPanning) {
      if (isPanning && !isAnimating) {
        // do not start a new pan if we're still animating
        this.onPanStart();
      } else {
        this.onPanEnd();
      }
    }

    if (isPanning && (dragDeltas.x || dragDeltas.y) && (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)) {
      this.onDrag(dragDeltas);
    }

    if (isPanning && (swipeDirections.x || swipeDirections.y) && (swipeDirections.x !== prevSwipeDirections.x || swipeDirections.y !== prevSwipeDirections.y)) {
      this.onSwipe(swipeDirections);
    }
  }

  onLayout = event => {
    if (this.height === 0) {
      const layout = event.nativeEvent.layout;
      const {
        threshold
      } = this.props;
      this.height = layout.height;
      this.thresholdY = _.get(threshold, 'y', layout.height / 2);
      this.width = layout.width;
      this.thresholdX = _.get(threshold, 'x', layout.width / 2);
      this.initPositions();
    }
  };
  initPositions = (extraDataForSetState, runAfterSetState) => {
    this.setNativeProps(0, 0);
    this.animTranslateX = new Animated.Value(0);
    this.animTranslateY = new Animated.Value(0);
    this.setState({ ...extraDataForSetState
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
      this.ref.current.setNativeProps({
        style: {
          left,
          top
        }
      });
      this.left = left;
      this.top = top;
    }
  };
  onSwipe = swipeDirections => {
    this.swipe = swipeDirections;
  };
  onPanEnd = () => {
    const {
      directions = DEFAULT_DIRECTIONS
    } = this.props;

    if (this.swipe.x || this.swipe.y) {
      const {
        isRight,
        isDown
      } = this.getDismissAnimationDirection();

      this._animateDismiss(isRight, isDown);
    } else {
      const endValue = {
        x: Math.round(this.left),
        y: Math.round(this.top)
      };

      if (directions.includes(PanningProvider.Directions.LEFT) && endValue.x <= -this.thresholdX || directions.includes(PanningProvider.Directions.RIGHT) && endValue.x >= this.thresholdX || directions.includes(PanningProvider.Directions.UP) && endValue.y <= -this.thresholdY || directions.includes(PanningProvider.Directions.DOWN) && endValue.y >= this.thresholdY) {
        const {
          isRight,
          isDown
        } = this.getDismissAnimationDirection();

        this._animateDismiss(isRight, isDown);
      } else {
        this.resetPosition();
      }
    }
  };
  resetPosition = () => {
    const {
      animationOptions
    } = this.props;
    const {
      speed,
      bounciness
    } = animationOptions || DEFAULT_ANIMATION_OPTIONS;
    const toX = -this.left;
    const toY = -this.top;
    const animations = [];

    if (!_.isUndefined(toX)) {
      animations.push(Animated.spring(this.animTranslateX, {
        toValue: Math.round(toX),
        useNativeDriver: true,
        speed,
        bounciness
      }));
    }

    if (!_.isUndefined(toY)) {
      animations.push(Animated.spring(this.animTranslateY, {
        toValue: Math.round(toY),
        useNativeDriver: true,
        speed,
        bounciness
      }));
    }

    this.setState({
      isAnimating: true
    }, () => {
      Animated.parallel(animations).start(this.onResetPositionFinished);
    });
  };
  onResetPositionFinished = () => {
    const runAfterSetState = this.shouldDismissAfterReset ? this.animateDismiss : undefined;
    this.shouldDismissAfterReset = false;
    this.initPositions({
      isAnimating: false
    }, runAfterSetState);
  };
  getDismissAnimationDirection = () => {
    const {
      allowDiagonalDismiss
    } = this.props;
    const {
      swipeDirections,
      swipeVelocities,
      dragDirections,
      dragDeltas
    } = this.props.context;
    const hasHorizontalSwipe = !_.isUndefined(swipeDirections.x);
    const hasVerticalSwipe = !_.isUndefined(swipeDirections.y);
    let isRight;
    let isDown;

    if (hasHorizontalSwipe || hasVerticalSwipe) {
      if (!allowDiagonalDismiss && hasHorizontalSwipe && hasVerticalSwipe) {
        // @ts-ignore
        if (Math.abs(swipeVelocities.y) > Math.abs(swipeVelocities.x)) {
          isDown = swipeDirections.y === PanningProvider.Directions.DOWN;
        } else {
          isRight = swipeDirections.x === PanningProvider.Directions.RIGHT;
        }

        return {
          isRight,
          isDown
        };
      }

      if (hasHorizontalSwipe) {
        isRight = swipeDirections.x === PanningProvider.Directions.RIGHT;
      }

      if (hasVerticalSwipe) {
        isDown = swipeDirections.y === PanningProvider.Directions.DOWN;
      }
    } else {
      // got here from a drag beyond threshold
      const hasHorizontalDrag = !_.isUndefined(dragDirections.x);
      const hasVerticalDrag = !_.isUndefined(dragDirections.y);

      if (!allowDiagonalDismiss && hasHorizontalDrag && hasVerticalDrag) {
        // @ts-ignore
        if (Math.abs(dragDeltas.y) > Math.abs(dragDeltas.x)) {
          isDown = dragDirections.y === PanningProvider.Directions.DOWN;
        } else {
          isRight = dragDirections.x === PanningProvider.Directions.RIGHT;
        }

        return {
          isRight,
          isDown
        };
      }

      if (hasHorizontalDrag) {
        isRight = dragDirections.x === PanningProvider.Directions.RIGHT;
      }

      if (hasVerticalDrag) {
        isDown = dragDirections.y === PanningProvider.Directions.DOWN;
      }
    }

    return {
      isRight,
      isDown
    };
  }; // Send undefined to not animate in the horizontal\vertical direction
  // isRight === true --> animate to the right
  // isRight === false --> animate to the left
  // isDown === true --> animate to the bottom
  // isDown === false --> animate to the top

  animateDismiss = () => {
    const {
      isAnimating
    } = this.state;

    if (isAnimating) {
      this.shouldDismissAfterReset = true;
    } else {
      const {
        directions = []
      } = this.props;
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
    const {
      animationOptions
    } = this.props;
    const {
      duration
    } = animationOptions || DEFAULT_ANIMATION_OPTIONS;
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
      animations.push(Animated.timing(this.animTranslateX, {
        toValue: Math.round(toX),
        useNativeDriver: true,
        duration
      }));
    }

    if (!_.isUndefined(toY)) {
      animations.push(Animated.timing(this.animTranslateY, {
        toValue: Math.round(toY),
        useNativeDriver: true,
        duration
      }));
    }

    this.setState({
      isAnimating: true
    }, () => {
      Animated.parallel(animations).start(this.onDismissAnimationFinished);
    });
  };
  onDismissAnimationFinished = ({
    finished
  }) => {
    if (finished) {
      _.invoke(this.props, 'onDismiss');
    }
  };

  render() {
    const {
      style
    } = this.props;
    const {
      isAnimating
    } = this.state;
    const transform = isAnimating ? [{
      translateX: this.animTranslateX
    }, {
      translateY: this.animTranslateY
    }] : [];
    return <Animated.View // @ts-ignore
    ref={this.ref} style={[style, {
      transform
    }]} onLayout={this.onLayout}>
        {this.props.children}
      </Animated.View>;
  }

}

export default asPanViewConsumer(PanDismissibleView);