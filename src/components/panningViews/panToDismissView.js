import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Animated} from 'react-native';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import asPanViewConsumer from './asPanViewConsumer';
import PanningProvider from './panningProvider';

const DEFAULT_SPEED = 20;
const DEFAULT_BOUNCINESS = 6;
const DEFAULT_DISMISS_ANIMATION_DURATION = 280;

/**
 * @description: PanToDismissView component created to making listening to swipe and drag events easier,
 * Has to be used as a child of a PanningProvider that also has a PanListenerView
 * TODO: @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanListenerScreen.js
 */
class PanToDismissView extends BaseComponent {
  static displayName = 'PanToDismissView';
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
     * The animation speed (default is 20)
     */
    animationSpeed: PropTypes.number,
    /**
     * The animation bounciness (default is 6)
     */
    animationBounciness: PropTypes.number,
    /**
     * The dismiss animation duration (default is 280)
     */
    dismissAnimationDuration: PropTypes.number,
  };

  static defaultProps = {
    directions: [
      PanningProvider.Directions.UP,
      PanningProvider.Directions.DOWN,
      PanningProvider.Directions.LEFT,
      PanningProvider.Directions.RIGHT,
    ],
    animationSpeed: DEFAULT_SPEED,
    animationBounciness: DEFAULT_BOUNCINESS,
  };

  constructor(props) {
    super(props);

    this.state = {
      deltaX: 0,
      deltaY: 0,
      shouldAnimate: false,
    };
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const {shouldAnimate} = this.state;
    const {isPanning, dragDeltas, swipeDirections} = this.props.context;
    const {
      isPanning: prevIsPanning,
      dragDeltas: prevDragDeltas,
      swipeDirections: prevSwipeDirections,
    } = prevProps.context;
    if (isPanning !== prevIsPanning) {
      if (isPanning && !shouldAnimate) {
        // do not start a new pan if we're still animating
        this.onPanStart();
      } else {
        this.onPanEnd();
      }
    }

    if (
      isPanning &&
      (dragDeltas[0] || dragDeltas[1]) &&
      (dragDeltas[0] !== prevDragDeltas[0] || dragDeltas[1] !== prevDragDeltas[1])
    ) {
      this.onDrag(dragDeltas);
    }

    if (
      isPanning &&
      (swipeDirections[0] || swipeDirections[1]) &&
      (swipeDirections[0] !== prevSwipeDirections[0] || swipeDirections[1] !== prevSwipeDirections[1])
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
      const {style} = this.props;
      this.originalLeft = _.get(style, 'left', 0);
      this.originalTop = _.get(style, 'top', 0);
      this.initPositions();
    }
  };

  initPositions = () => {
    this.setNativeProps(this.originalLeft, this.originalTop);
    this.setState({
      deltaX: new Animated.Value(this.originalLeft),
      deltaY: new Animated.Value(this.originalTop),
    });
  };

  onPanStart = () => {
    this.swipe = [undefined, undefined];
  };

  onDrag = deltas => {
    const left = deltas[0] ? Math.round(deltas[0]) : this.originalLeft;
    const top = deltas[1] ? Math.round(deltas[1]) : this.originalTop;
    this.setNativeProps(left, top);
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
    const {directions} = this.getThemeProps();
    if (this.swipe[0] || this.swipe[1]) {
      const {isRight, isDown} = this.getDismissAnimationDirection();
      this.animateDismiss(isRight, isDown);
    } else {
      const endValue = [Math.round(this.left), Math.round(this.top)];
      if (
        (directions.includes(PanningProvider.Directions.LEFT) && endValue[0] <= -this.thresholdX) ||
        (directions.includes(PanningProvider.Directions.RIGHT) && endValue[0] >= this.thresholdX) ||
        (directions.includes(PanningProvider.Directions.UP) && endValue[1] <= -this.thresholdY) ||
        (directions.includes(PanningProvider.Directions.DOWN) && endValue[1] >= this.thresholdY)
      ) {
        const {isRight, isDown} = this.getDismissAnimationDirection();
        this.animateDismiss(isRight, isDown);
      } else {
        this.animateToInitialPosition();
      }
    }
  };

  animateToInitialPosition = () => {
    const {deltaX, deltaY} = this.state;
    const {animationSpeed, animationBounciness} = this.props;
    const toX = -this.left;
    const toY = -this.top;
    const animations = [];
    if (!_.isUndefined(toX)) {
      animations.push(
        Animated.spring(deltaX, {
          toValue: Math.round(toX),
          speed: animationSpeed,
          bounciness: animationBounciness,
        }),
      );
    }

    if (!_.isUndefined(toY)) {
      animations.push(
        Animated.spring(deltaY, {
          toValue: Math.round(toY),
          speed: animationSpeed,
          bounciness: animationBounciness,
        }),
      );
    }

    this.setState({shouldAnimate: true}, () => {
      Animated.parallel(animations).start(this.onInitAnimationFinished);
    });
  };

  onInitAnimationFinished = () => {
    this.setState({shouldAnimate: false});
    this.initPositions();
  };

  getDismissAnimationDirection = () => {
    const {swipeDirections, dragDirections} = this.props.context;
    let hasHorizontalSwipe;
    let hasVerticalSwipe;
    let isRight;
    let isDown;

    hasHorizontalSwipe = !_.isUndefined(swipeDirections[0]);
    hasVerticalSwipe = !_.isUndefined(swipeDirections[1]);
    if (hasHorizontalSwipe || hasVerticalSwipe) {
      if (hasHorizontalSwipe) {
        isRight = swipeDirections[0] === PanningProvider.Directions.RIGHT;
      }

      if (hasVerticalSwipe) {
        isDown = swipeDirections[1] === PanningProvider.Directions.DOWN;
      }
    } else {
      // got here from a drag beyond threshold
      if (!_.isUndefined(dragDirections[0])) {
        isRight = dragDirections[0] === PanningProvider.Directions.RIGHT;
      }

      if (!_.isUndefined(dragDirections[1])) {
        isDown = dragDirections[1] === PanningProvider.Directions.DOWN;
      }
    }

    return {isRight, isDown};
  }

  animateDismiss = (isRight, isDown) => {
    const {deltaX, deltaY} = this.state;
    const animations = [];
    let toX;
    let toY;

    if (!_.isUndefined(isRight) && !_.isUndefined(deltaX)) {
      const maxSize = Constants.screenWidth + this.width;
      toX = isRight ? maxSize : -maxSize;
    }

    if (!_.isUndefined(isDown) && !_.isUndefined(deltaY)) {
      const maxSize = Constants.screenHeight + this.height;
      toY = isDown ? maxSize : -maxSize;
    }

    if (!_.isUndefined(toX)) {
      animations.push(
        Animated.timing(deltaX, {
          toValue: Math.round(toX),
          duration: DEFAULT_DISMISS_ANIMATION_DURATION,
        }),
      );
    }

    if (!_.isUndefined(toY)) {
      animations.push(
        Animated.timing(deltaY, {
          toValue: Math.round(toY),
          duration: DEFAULT_DISMISS_ANIMATION_DURATION,
        }),
      );
    }

    this.setState({shouldAnimate: true}, () => {
      Animated.parallel(animations).start(this.onDismissAnimationFinished);
    });
  };

  onDismissAnimationFinished = ({finished}) => {
    // TODO: this.setState({shouldAnimate: false});
    if (finished) {
      this.onDismiss();
    }
  };

  onDismiss = () => {
    // TODO: this.initPositions();
    _.invoke(this.props, 'onDismiss');
  };

  render() {
    const {style} = this.getThemeProps();
    const {shouldAnimate, deltaX, deltaY} = this.state;
    const transform = shouldAnimate ? [{translateX: deltaX}, {translateY: deltaY}] : [];

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

export default asPanViewConsumer(PanToDismissView);
