import _pt from "prop-types";
import _ from 'lodash';
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
  static propTypes = {
    /**
         * This is were you will get notified when a drag occurs
         * onDrag = ({directions, deltas}) => {...}
         * directions - array of directions
         * deltas - array of deltas (same length and order as directions)
         * Both arrays will have {x, y} - if no x or y drag has occurred this value will be undefined
         */
    onDrag: _pt.func,

    /**
         * This is were you will get notified when a swipe occurs
         * onSwipe = ({directions, velocities}) => {...}
         * directions - array of directions
         * velocities - array of velocities (same length and order as directions)
         * Both arrays will have {x, y} - if no x or y swipe has occurred this value will be undefined
         */
    onSwipe: _pt.func,

    /**
         * This is were you will get notified when the pan starts
         */
    onPanStart: _pt.func,

    /**
         * This is were you will get notified when the pan ends
         * The user has released all touches while this view is the responder.
         * This typically means a gesture has succeeded
         */
    onPanRelease: _pt.func,

    /**
         * This is were you will get notified when the pan ends
         * Another component has become the responder,
         * so this gesture should be cancelled
         */
    onPanTerminated: _pt.func,

    /**
         * The directions of the allowed pan (default allows all directions)
         * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
         */
    directions: _pt.oneOfType([_pt.array, _pt.array]),

    /**
         * The sensitivity beyond which a pan is no longer considered a single click (default is 5)
         */
    panSensitivity: _pt.number,

    /**
         * The sensitivity beyond which a pan is no longer considered a drag, but a swipe (default is 1.8)
         * Note: a pan would have to occur (i.e. the panSensitivity has already been surpassed)
         */
    swipeVelocitySensitivity: _pt.number,

    /**
         * Is there a view that is clickable (has onPress etc.) in the PanListenerView.
         * This can affect the panability of this component.
         */
    isClickable: _pt.bool,
    context: _pt.shape({
      /**
           * This is were you will get notified when a drag occurs
           * onDrag = ({directions, deltas}) => {...}
           * directions - array of directions
           * deltas - array of deltas (same length and order as directions)
           * Both arrays will have {x, y} - if no x or y drag has occurred this value will be undefined
           */
      onDrag: _pt.func,

      /**
           * This is were you will get notified when a swipe occurs
           * onSwipe = ({directions, velocities}) => {...}
           * directions - array of directions
           * velocities - array of velocities (same length and order as directions)
           * Both arrays will have {x, y} - if no x or y swipe has occurred this value will be undefined
           */
      onSwipe: _pt.func,

      /**
           * This is were you will get notified when the pan starts
           */
      onPanStart: _pt.func,

      /**
           * This is were you will get notified when the pan ends
           * The user has released all touches while this view is the responder.
           * This typically means a gesture has succeeded
           */
      onPanRelease: _pt.func,

      /**
           * This is were you will get notified when the pan ends
           * Another component has become the responder,
           * so this gesture should be cancelled
           */
      onPanTerminated: _pt.func
    })
  };
  static displayName = 'PanListenerView';
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
    _.invoke(this.props, 'onPanStart');

    _.invoke(this.props.context, 'onPanStart');
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
    const hasSwipe = !_.isUndefined(onSwipe);
    const hasDrag = !_.isUndefined(onDrag);
    const hasContext = !_.isUndefined(context);
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

      _.invoke(this.props, 'onSwipe', data);

      _.invoke(context, 'onSwipe', data);
    } else if (hasDrag || hasContext) {
      panResult = this.getDragDirection(gestureState);

      if (this.panResultHasValue(panResult)) {
        const data = {
          directions: panResult.selectedDirections,
          deltas: panResult.selectedAmounts
        };

        _.invoke(this.props, 'onDrag', data);

        _.invoke(context, 'onDrag', data);
      }
    }
  };
  handlePanRelease = () => {
    _.invoke(this.props, 'onPanRelease');

    _.invoke(this.props.context, 'onPanRelease');
  };
  handlePanTerminate = () => {
    _.invoke(this.props, 'onPanTerminated');

    _.invoke(this.props.context, 'onPanTerminated');
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