import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {PanResponder, Animated} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import {Colors, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

const DEFAULT_PAN_SENSITIVITY = 5;
const DEFAULT_SWIPE_VELOCITY = 1.8;

/**
 * @description: PanListenerView component created to making listening to swipe and drag events easier
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanListenerScreen.js
 */
export default class PanListenerView extends BaseComponent {
  static displayName = 'PanListenerView';
  static propTypes = {
    /**
     * The directions of the allowed pan (default is DOWN)
     * Types: UP, DOWN, LEFT and RIGHT (using PanListenerView.directions.###)
     */
    directions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(DIRECTIONS))),
    /**
     * This is were you will get notified when a drag occurs
     * onDragListener = (swipeDirections, velocities) => {...}
     * swipeDirections - array of directions
     * velocities - array of velocities (same length and order as swipeDirections)
     */
    onDragListener: PropTypes.func,
    /**
     * This is were you will get notified when a swipe occurs
     * onSwipeListener = (dragDirections, deltas) => {...}
     * dragDirections - array of directions
     * deltas - array of deltas (same length and order as dragDirections)
     */
    onSwipeListener: PropTypes.func,
    /**
     * This is were you will get notified when the pan ends
     */
    onPanEndListener: PropTypes.func,
    /**
     * The sensitivity beyond which a pan is no longer considered a single click (default is 5)
     */
    panSensitivity: PropTypes.number,
    /**
     * The sensitivity beyond which a pan is no longer considered a drag, but a swipe (default is 1.8)
     * Note: a pan would have to occur (i.e. the panSensitivity has already been surpassed)
     */
    swipeVelocitySensitivity: PropTypes.number,
  };

  static directions = DIRECTIONS;

  constructor(props) {
    super(props);

    this.state = {};

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.shouldPan,
      onPanResponderGrant: this.handlePanStart,
      onPanResponderMove: this.handlePanMove,
      onPanResponderRelease: this.handlePanEnd,
      onPanResponderTerminate: this.handlePanEnd,
    });
  }

  static defaultProps = {
    directions: [DIRECTIONS.UP, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.RIGHT],
    panSensitivity: DEFAULT_PAN_SENSITIVITY,
    swipeVelocitySensitivity: DEFAULT_SWIPE_VELOCITY,
  };

  shouldPan = (e, gestureState) => {
    // return true if user is swiping, return false if it's a single click
    const {dy, dx} = gestureState;
    const {directions, panSensitivity} = this.props;

    return (
      directions &&
      ((directions.includes(DIRECTIONS.UP) && dy < -panSensitivity) ||
        (directions.includes(DIRECTIONS.DOWN) && dy > panSensitivity) ||
        (directions.includes(DIRECTIONS.LEFT) && dx < -panSensitivity) ||
        (directions.includes(DIRECTIONS.RIGHT) && dx > panSensitivity))
    );
  };

  handlePanStart = () => {
    this.swipe = false;
  };

  getSwipeDirection = ({vx, vy}) => {
    const {swipeVelocitySensitivity} = this.props;
    return this.getDirectionsOverSensitivity(vx, vy, swipeVelocitySensitivity);
  };

  getDragDirection = ({dx, dy}) => {
    return this.getDirectionsOverSensitivity(dx, dy, 0);
  };

  getDirectionsOverSensitivity = (x, y, sensitivity) => {
    const {directions} = this.props;
    const selectedDirections = [];
    const selectedAmounts = [];

    if (directions.includes(DIRECTIONS.LEFT) && x < -sensitivity) {
      selectedDirections.push(DIRECTIONS.LEFT);
      selectedAmounts.push(x);
    }

    if (directions.includes(DIRECTIONS.RIGHT) && x > sensitivity) {
      selectedDirections.push(DIRECTIONS.RIGHT);
      selectedAmounts.push(x);
    }

    if (directions.includes(DIRECTIONS.UP) && y < -sensitivity) {
      selectedDirections.push(DIRECTIONS.UP);
      selectedAmounts.push(y);
    }

    if (directions.includes(DIRECTIONS.DOWN) && y > sensitivity) {
      selectedDirections.push(DIRECTIONS.DOWN);
      selectedAmounts.push(y);
    }

    return {selectedDirections, selectedAmounts};
  };

  handlePanMove = (e, gestureState) => {
    const {onSwipeListener, onDragListener} = this.props;
    let panResult;
    if (!_.isUndefined(onSwipeListener)) {
      panResult = this.getSwipeDirection(gestureState);
    }

    if (panResult && panResult.selectedDirections.length > 0) {
      onSwipeListener({swipeDirections: panResult.selectedDirections, deltas: panResult.selectedAmounts});
    } else if (!_.isUndefined(onDragListener)) {
      const panResult = this.getDragDirection(gestureState);
      if (panResult && panResult.selectedDirections.length > 0) {
        onDragListener({dragDirections: panResult.selectedDirections, velocities: panResult.selectedAmounts});
      }
    }
  };

  handlePanEnd = () => {
    const {onPanEndListener} = this.props;

    if (!_.isUndefined(onPanEndListener)) {
      onPanEndListener();
    }
  };

  onLayout = event => {
    this.layout = event.nativeEvent.layout;
  };

  render() {
    const {style, children, ...others} = this.getThemeProps();

    return (
      <View style={style} {...this.panResponder.panHandlers} onLayout={this.onLayout} {...others}>
        {children}
      </View>
    );
  }
}
