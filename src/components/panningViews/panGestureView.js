import _pt from "prop-types";
import _ from 'lodash';
import React, { Component } from 'react';
import { PanResponder, Animated } from 'react-native';
import { Constants } from "../../helpers";
import { asBaseComponent } from "../../commons/new";
export let GestureDirections;

(function (GestureDirections) {
  GestureDirections["UP"] = "up";
  GestureDirections["DOWN"] = "down";
})(GestureDirections || (GestureDirections = {}));

const SWIPE_VELOCITY = 1.8;
const SPEED = 20;
const BOUNCINESS = 6;

/**
 * @description: PanGestureView component for drag and swipe gestures (supports only vertical gestures at the moment)
 */
class PanGestureView extends Component {
  static propTypes = {
    /**
       * onDismiss callback
       */
    onDismiss: _pt.func,

    /**
       * The direction of the allowed pan (default is down)
       */
    direction: _pt.oneOf(["up", "down"])
  };
  static displayName = 'PanGestureView';
  static defaultProps = {
    direction: GestureDirections.DOWN
  };
  static directions = GestureDirections;

  constructor(props) {
    super(props);
    this.state = {
      deltaY: new Animated.Value(0)
    };
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
  }

  handleMoveShouldSetPanResponder = (_e, gestureState) => {
    // return true if user is swiping, return false if it's a single click
    const {
      dy
    } = gestureState;
    return dy > 5 || dy < -5;
  };
  handlePanResponderGrant = () => {
    this.swipe = false;
  };
  handlePanResponderMove = (_e, gestureState) => {
    const {
      direction
    } = this.props;
    let newValue = 0; // VERTICAL

    const up = direction === GestureDirections.UP;
    const panDeltaY = gestureState.dy;
    const panVelocityY = gestureState.vy;

    if (Math.abs(panVelocityY) >= SWIPE_VELOCITY) {
      if (up && panVelocityY < 0 || !up && panVelocityY > 0) {
        // Swipe
        this.swipe = true;
      }
    } else if (up && panDeltaY < 0 || !up && panDeltaY > 0) {
      // Drag
      newValue = panDeltaY;
      this.animateDeltaY(Math.round(newValue));
    }
  };
  handlePanResponderEnd = () => {
    if (!this.swipe) {
      const {
        direction
      } = this.props; // VERTICAL

      const up = direction === GestureDirections.UP;
      const {
        deltaY
      } = this.state; // @ts-ignore

      const threshold = this.layout.height / 2; // @ts-ignore

      const endValue = Math.round(deltaY._value);

      if (up && endValue <= -threshold || !up && endValue >= threshold) {
        this.animateDismiss();
      } else {
        // back to initial position
        this.animateDeltaY(0);
      }
    } else {
      this.animateDismiss();
    }
  };

  animateDeltaY(toValue) {
    const {
      deltaY
    } = this.state;
    Animated.spring(deltaY, {
      toValue,
      useNativeDriver: true,
      speed: SPEED,
      bounciness: BOUNCINESS
    }).start();
  }

  animateDismiss() {
    const {
      direction
    } = this.props; // VERTICAL

    const up = direction === GestureDirections.UP;
    const {
      deltaY
    } = this.state; // @ts-ignore

    const newValue = up ? -this.layout.height - Constants.statusBarHeight : deltaY._value + Constants.screenHeight;
    Animated.timing(deltaY, {
      toValue: Math.round(newValue),
      useNativeDriver: true,
      duration: 280
    }).start(this.onAnimatedFinished);
  }

  onAnimatedFinished = ({
    finished
  }) => {
    if (finished) {
      this.onDismiss();
    }
  };
  onDismiss = () => {
    this.initPositions();

    _.invoke(this.props, 'onDismiss');
  };

  initPositions() {
    this.setState({
      deltaY: new Animated.Value(0)
    });
  }

  onLayout = event => {
    this.layout = event.nativeEvent.layout;
  };

  render() {
    const {
      style
    } = this.props; // VERTICAL

    const {
      deltaY
    } = this.state;
    return <Animated.View style={[style, {
      transform: [{
        translateY: deltaY
      }]
    }]} {...this.panResponder.panHandlers} onLayout={this.onLayout}>
        {this.props.children}
      </Animated.View>;
  }

}

export default asBaseComponent(PanGestureView);