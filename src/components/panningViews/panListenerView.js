import _isUndefined from "lodash/isUndefined";
import React, { PureComponent } from 'react';
import { PanResponder } from 'react-native';
import asPanViewConsumer from "./asPanViewConsumer";
import PanningProvider from "./panningProvider";
import View from "../view";
const DEFAULT_DIRECTIONS = [PanningProvider.Directions.UP, PanningProvider.Directions.DOWN, PanningProvider.Directions.LEFT, PanningProvider.Directions.RIGHT];
const DEFAULT_PAN_SENSITIVITY = 5;
const DEFAULT_SWIPE_VELOCITY = 1.8;

/**
 * @description: PanListenerView component created to making listening to swipe and drag events easier
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanListenerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/PanListenerView/PanListenerView.gif?raw=true
 */
class PanListenerView extends PureComponent {
  static displayName = 'IGNORE';
  static defaultProps = {
    directions: DEFAULT_DIRECTIONS,
    panSensitivity: DEFAULT_PAN_SENSITIVITY,
    swipeVelocitySensitivity: DEFAULT_SWIPE_VELOCITY
  };
  constructor(props) {
    super(props);
    const {
      isClickable
    } = props;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: isClickable ? this.shouldPan : this.yes,
      onMoveShouldSetPanResponder: this.shouldPan,
      onStartShouldSetPanResponderCapture: this.no,
      onMoveShouldSetPanResponderCapture: this.no,
      onPanResponderGrant: this.handlePanStart,
      onPanResponderMove: this.handlePanMove,
      onPanResponderRelease: this.handlePanRelease,
      onPanResponderTerminate: this.handlePanTerminate
    });
  }
  yes = () => {
    return true;
  };
  no = () => {
    return false;
  };
  shouldPan = (_e, gestureState) => {
    // return true if user is swiping, return false if it's a single click
    const {
      dy,
      dx
    } = gestureState;
    const {
      directions,
      panSensitivity = DEFAULT_PAN_SENSITIVITY
    } = this.props;
    return Boolean(directions && (directions.includes(PanningProvider.Directions.UP) && dy < -panSensitivity || directions.includes(PanningProvider.Directions.DOWN) && dy > panSensitivity || directions.includes(PanningProvider.Directions.LEFT) && dx < -panSensitivity || directions.includes(PanningProvider.Directions.RIGHT) && dx > panSensitivity));
  };
  handlePanStart = () => {
    this.props.onPanStart?.();
    this.props.context?.onPanStart?.();
  };
  getSwipeDirection = ({
    vx,
    vy
  }) => {
    const {
      swipeVelocitySensitivity = DEFAULT_SWIPE_VELOCITY
    } = this.props;
    return this.getDirectionsOverSensitivity(vx, vy, swipeVelocitySensitivity);
  };
  getDragDirection = ({
    dx,
    dy
  }) => {
    return this.getDirectionsOverSensitivity(dx, dy, 0);
  };
  getDirectionsOverSensitivity = (x, y, sensitivity) => {
    const {
      directions = DEFAULT_DIRECTIONS
    } = this.props;
    const selectedDirections = {};
    const selectedAmounts = {};
    if (directions.includes(PanningProvider.Directions.LEFT) && x < -sensitivity) {
      selectedDirections.x = PanningProvider.Directions.LEFT;
      selectedAmounts.x = x;
    } else if (directions.includes(PanningProvider.Directions.RIGHT) && x > sensitivity) {
      selectedDirections.x = PanningProvider.Directions.RIGHT;
      selectedAmounts.x = x;
    }
    if (directions.includes(PanningProvider.Directions.UP) && y < -sensitivity) {
      selectedDirections.y = PanningProvider.Directions.UP;
      selectedAmounts.y = y;
    } else if (directions.includes(PanningProvider.Directions.DOWN) && y > sensitivity) {
      selectedDirections.y = PanningProvider.Directions.DOWN;
      selectedAmounts.y = y;
    }
    return {
      selectedDirections,
      selectedAmounts
    };
  };
  panResultHasValue = panResult => {
    return Boolean(panResult && (panResult.selectedDirections.x || panResult.selectedDirections.y));
  };
  handlePanMove = (_e, gestureState) => {
    const {
      onSwipe,
      onDrag,
      context
    } = this.props;
    const hasSwipe = !_isUndefined(onSwipe);
    const hasDrag = !_isUndefined(onDrag);
    const hasContext = !_isUndefined(context);
    let panResult;
    if (hasSwipe || hasContext) {
      panResult = this.getSwipeDirection(gestureState);
    }
    if (this.panResultHasValue(panResult)) {
      // @ts-ignore
      const data = {
        directions: panResult.selectedDirections,
        velocities: panResult.selectedAmounts
      };
      this.props.onSwipe?.(data);
      context?.onSwipe?.(data);
    } else if (hasDrag || hasContext) {
      panResult = this.getDragDirection(gestureState);
      if (this.panResultHasValue(panResult)) {
        const data = {
          directions: panResult.selectedDirections,
          deltas: panResult.selectedAmounts
        };
        this.props.onDrag?.(data);
        context?.onDrag?.(data);
      }
    }
  };
  handlePanRelease = () => {
    this.props.onPanRelease?.();
    this.props.context?.onPanRelease?.();
  };
  handlePanTerminate = () => {
    this.props.onPanTerminated?.();
    this.props.context?.onPanTerminated?.();
  };
  render() {
    const {
      children,
      ...others
    } = this.props;
    return <View {...others} {...this.panResponder.panHandlers}>
        {children}
      </View>;
  }
}
export default asPanViewConsumer(PanListenerView);