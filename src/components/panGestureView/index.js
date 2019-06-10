import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {PanResponder, Animated} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';


const DIRECTIONS = {
  // VERTICAL
  UP: 'up',
  DOWN: 'down'
};
const SWIPE_VELOCITY = 1.8;
const SPEED = 20;
const BOUNCINESS = 6;

/**
 * @description: PanGestureView component for drag and swipe gestures (supports only vertical gestures at the moment)
 */
export default class PanGestureView extends BaseComponent {
  static displayName = 'PanGestureView'
  static propTypes = {
    /**
     * onDismiss callback
     */
    onDismiss: PropTypes.func,
    /**
     * The direction of the allowed pan (default is down)
     */
    direction: PropTypes.oneOf(Object.values(DIRECTIONS))
  };

  static defaultProps = {
    direction: DIRECTIONS.DOWN
  };
  
  static directions = DIRECTIONS;

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

  handleMoveShouldSetPanResponder = (e, gestureState) => {
    // return true if user is swiping, return false if it's a single click
    const {dy} = gestureState;
    return dy > 5 || dy < -5;
  };
  handlePanResponderGrant = () => {
    this.swipe = false;
  };
  handlePanResponderMove = (e, gestureState) => {
    const {direction} = this.getThemeProps();
    let newValue = 0;
    
    // VERTICAL
    const up = (direction === DIRECTIONS.UP);
    const panDeltaY = gestureState.dy;
    const panVelocityY = gestureState.vy;

    if (Math.abs(panVelocityY) >= SWIPE_VELOCITY) {
      if ((up && panVelocityY < 0) || (!up && panVelocityY > 0)) {
        // Swipe
        this.swipe = true;
      }
    } else if ((up && panDeltaY < 0) || (!up && panDeltaY > 0)) {
      // Drag
      newValue = panDeltaY;
      this.animateDeltaY(Math.round(newValue));
    }
  };
  handlePanResponderEnd = () => {
    if (!this.swipe) {
      const {direction} = this.getThemeProps();

      // VERTICAL
      const up = (direction === DIRECTIONS.UP);
      const {deltaY} = this.state;
      const threshold = this.layout.height / 2;
      const endValue = Math.round(deltaY._value); // eslint-disable-line
      
      if ((up && endValue <= -threshold) || (!up && endValue >= threshold)) {
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
    const {deltaY} = this.state;

    Animated.spring(deltaY, {
      toValue,
      speed: SPEED,
      bounciness: BOUNCINESS
    }).start();
  }

  animateDismiss() {
    const {direction} = this.getThemeProps();

    // VERTICAL
    const up = (direction === DIRECTIONS.UP);
    const {deltaY} = this.state;
    const newValue = up ? -this.layout.height -Constants.statusBarHeight : deltaY._value + Constants.screenHeight; // eslint-disable-line

    Animated.timing(deltaY, {
      toValue: Math.round(newValue),
      duration: 280
    }).start(this.onAnimatedFinished);
  }

  onAnimatedFinished = ({finished}) => {
    if (finished) {
      this.onDismiss();
    }
  }

  onDismiss = () => {
    this.initPositions();
    _.invoke(this.props, 'onDismiss');
  }

  initPositions() {
    this.setState({
      deltaY: new Animated.Value(0)
    });
  }

  onLayout = (event) => {
    this.layout = event.nativeEvent.layout;
  }

  render() {
    const {style} = this.getThemeProps();

    // VERTICAL
    const {deltaY} = this.state;

    return (
      <Animated.View
        style={[
          style,
          {
            transform: [{
              translateY: deltaY
            }]
          }
        ]} 
        {...this.panResponder.panHandlers}
        onLayout={this.onLayout}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
