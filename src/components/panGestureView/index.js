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
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
  }

  handleStartShouldSetPanResponder = () => {
    return true;
  };
  handleMoveShouldSetPanResponder = () => {
    return true;
  };
  handlePanResponderGrant = () => {
    this.swipe = false;
  };
  handlePanResponderMove = (e, gestureState) => {
    const {direction} = this.getThemeProps();
    let newValue = 0;
    
    // VERTICAL
    const up = (direction === DIRECTIONS.UP);
    const {deltaY} = this.state;

    if (Math.abs(gestureState.vy) >= 1.8) {
      if ((up && gestureState.vy < 0) || (!up && gestureState.vy > 0)) {
        // Swipe
        this.swipe = true;
      }
    } else if ((up && gestureState.dy < 0) || (!up && gestureState.dy > 0)) {
      // Drag
      newValue = gestureState.dy;
      Animated.spring(deltaY, {
        toValue: Math.round(newValue),
        speed: 20
      }).start();
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
        // close
        this.animateDismiss();
      } else {
        // back to initial position
        Animated.spring(deltaY, {
          toValue: 0,
          speed: 20
        }).start();
      }
    } else {
      // close
      this.animateDismiss();
    }
  };

  animateDismiss() {
    const {direction} = this.getThemeProps();

    // VERTICAL
    const up = (direction === DIRECTIONS.UP);
    const {deltaY} = this.state;
    const newValue = up ? -this.layout.height -this.layout.y - 1 : deltaY._value + (Constants.screenHeight - this.layout.y); // eslint-disable-line

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
