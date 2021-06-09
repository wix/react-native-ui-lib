import _pt from "prop-types";
// @ts-nocheck
// @flow
// Similarly to the DrawerLayout component this deserves to be put in a
// separate repo. Although, keeping it here for the time being will allow us
// to move faster and fix possible issues quicker
// TODO: use Swipeable from react-native-gesture-handler once they support RTL

/* eslint-disable */
import React, { Component } from 'react';
import { Animated, StyleSheet, View, I18nManager } from 'react-native';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import { Constants } from "../../helpers";
import { HapticService, HapticType } from "../../services";
const DRAG_TOSS = 0.05;
const LEFT_TOGGLE_THRESHOLD = 0.6; // Math.sign polyfill for iOS 8.x

if (!Math.sign) {
  Math.sign = function (x) {
    return Number(x > 0) - Number(x < 0) || +x;
  };
}

export default class Swipeable extends Component {
  static propTypes = {
    children: _pt.any.isRequired,
    friction: _pt.number,
    leftThreshold: _pt.number,
    rightThreshold: _pt.number,
    fullLeftThreshold: _pt.number,
    fullSwipeLeft: _pt.bool,
    fullRightThreshold: _pt.number,
    fullSwipeRight: _pt.bool,
    overshootLeft: _pt.bool,
    overshootRight: _pt.bool,
    overshootFriction: _pt.number,
    renderLeftActions: _pt.func,
    renderRightActions: _pt.func,
    leftActionsContainerStyle: _pt.any.isRequired,
    rightActionsContainerStyle: _pt.any.isRequired,
    useNativeAnimations: _pt.bool,
    disableHaptic: _pt.bool
  };
  static displayName = 'IGNORE';
  static defaultProps = {
    friction: 1,
    overshootFriction: 1,
    useNativeAnimations: false,
    // issue in iPhone5
    fullLeftThreshold: 0.45,
    fullRightThreshold: 0.45
  }; // _onGestureEvent: ?Animated.Event;
  // _transX: ?Animated.Interpolation;
  // _showLeftAction: ?Animated.Interpolation | ?Animated.Value;
  // _leftActionTranslate: ?Animated.Interpolation;
  // _showRightAction: ?Animated.Interpolation | ?Animated.Value;
  // _rightActionTranslate: ?Animated.Interpolation;

  constructor(props) {
    super(props);
    const dragX = new Animated.Value(0); // 0 -> open from either left/right,
    // 1 -> closing to the left
    // -1 -> closing to the right

    this.rowState = 0;
    this.dragThresholdReached = false;
    this.state = {
      dragX,
      rowTranslation: new Animated.Value(0),
      rowWidth: Constants.screenWidth,
      leftWidth: undefined,
      rightOffset: undefined,
      measureCompleted: false
    };
    this._onGestureEvent = Animated.event([{
      nativeEvent: {
        translationX: dragX
      }
    }], {
      useNativeDriver: props.useNativeAnimations,
      listener: this._handleDrag
    });
  }

  _triggerHaptic = () => {
    return !this.props.disableHaptic && HapticService.triggerHaptic(HapticType.impactMedium, 'Drawer');
  };
  _handleDrag = e => {
    const {
      onToggleSwipeLeft
    } = this.props;

    if (onToggleSwipeLeft) {
      // Drag left toggle
      const {
        rowWidth,
        leftWidth
      } = this.state;
      const x = e.nativeEvent.translationX;
      const threshold = rowWidth * LEFT_TOGGLE_THRESHOLD;

      if (!this.dragThresholdReached && x >= threshold && x < threshold + 10) {
        // move item right
        this.dragThresholdReached = true;

        this._triggerHaptic();

        onToggleSwipeLeft({
          rowWidth,
          leftWidth,
          dragX: x
        });
      }

      if (this.dragThresholdReached && x < threshold - 10) {
        // move item left
        this.dragThresholdReached = false;
        onToggleSwipeLeft({
          rowWidth,
          leftWidth,
          dragX: x,
          resetItemPosition: true
        });
      }
    }
  };
  getTransX = () => {
    const {
      friction,
      overshootFriction
    } = this.props;
    const {
      dragX,
      rowTranslation,
      leftWidth = 0,
      rowWidth = 0
    } = this.state;
    const {
      rightOffset = rowWidth
    } = this.state;
    const rightWidth = Math.max(0, rowWidth - rightOffset);
    const {
      overshootLeft = leftWidth > 0,
      overshootRight = rightWidth > 0
    } = this.props;
    const transX = Animated.add(rowTranslation, dragX.interpolate({
      inputRange: [0, friction],
      outputRange: [0, 1]
    })).interpolate({
      inputRange: [-rightWidth - (overshootRight ? 1 : overshootFriction), -rightWidth, leftWidth, leftWidth + (overshootLeft ? 1 : overshootFriction)],
      outputRange: [-rightWidth - (overshootRight || overshootFriction > 1 ? 1 : 0), -rightWidth, leftWidth, leftWidth + (overshootLeft || overshootFriction > 1 ? 1 : 0)]
    });
    return transX;
  };
  getShowLeftAction = () => {
    const transX = this.getTransX();
    const {
      leftWidth = 0
    } = this.state;
    const showLeftAction = leftWidth > 0 ? transX.interpolate({
      inputRange: [-1, 0, leftWidth],
      outputRange: [0, 0, 1]
    }) : new Animated.Value(0);
    return showLeftAction;
  };
  getLeftActionTranslate = () => {
    const showLeftAction = this.getShowLeftAction();
    const leftActionTranslate = showLeftAction.interpolate({
      inputRange: [0, Number.MIN_VALUE],
      outputRange: [-10000, 0],
      extrapolate: 'clamp'
    });
    return leftActionTranslate;
  };
  getShowRightAction = () => {
    const transX = this.getTransX();
    const {
      rowWidth = 0
    } = this.state;
    const {
      rightOffset = rowWidth
    } = this.state;
    const rightWidth = Math.max(0, rowWidth - rightOffset);
    const showRightAction = rightWidth > 0 ? transX.interpolate({
      inputRange: [-rightWidth, 0, 1],
      outputRange: [1, 0, 0]
    }) : new Animated.Value(0);
    return showRightAction;
  };
  getRightActionTranslate = () => {
    const showRightAction = this.getShowRightAction();
    const rightActionTranslate = showRightAction.interpolate({
      inputRange: [0, Number.MIN_VALUE],
      outputRange: [-10000, 0],
      extrapolate: 'clamp'
    });
    return rightActionTranslate;
  };
  _onTapHandlerStateChange = ({
    nativeEvent
  }) => {
    if (this.rowState !== 0) {
      if (nativeEvent.oldState === State.ACTIVE) {
        this.close();
      }
    }
  };
  _onHandlerStateChange = ({
    nativeEvent
  }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      this._handleRelease(nativeEvent);
    }

    if (nativeEvent.state === State.ACTIVE) {
      this.props.onDragStart && this.props.onDragStart(this.props);
    }
  };
  _handleRelease = nativeEvent => {
    const {
      velocityX,
      translationX: dragX
    } = nativeEvent;
    const {
      leftWidth = 0,
      rowWidth = 0
    } = this.state;
    const {
      rightOffset = rowWidth
    } = this.state;
    const rightWidth = rowWidth - rightOffset;
    const {
      fullSwipeLeft,
      fullSwipeRight,
      friction,
      leftThreshold = leftWidth / 2,
      rightThreshold = rightWidth / 2,
      fullLeftThreshold,
      fullRightThreshold,
      onToggleSwipeLeft
    } = this.props;
    const startOffsetX = this._currentOffset() + dragX / friction;
    const translationX = (dragX + DRAG_TOSS * velocityX) / friction;
    let toValue = 0;

    if (this.rowState === 0) {
      if (onToggleSwipeLeft && translationX > rowWidth * LEFT_TOGGLE_THRESHOLD && !this.dragThresholdReached) {
        // Swipe left toggle
        toValue = rowWidth * LEFT_TOGGLE_THRESHOLD;
      } else if (!onToggleSwipeLeft && fullSwipeLeft && translationX > rowWidth * fullLeftThreshold) {
        this._triggerHaptic();

        toValue = rowWidth;
      } else if (fullSwipeRight && translationX < -rowWidth * fullRightThreshold) {
        this._triggerHaptic();

        toValue = -rowWidth;
      } else if (translationX > leftThreshold) {
        if (!onToggleSwipeLeft || onToggleSwipeLeft && translationX < rowWidth * LEFT_TOGGLE_THRESHOLD) {
          toValue = leftWidth;
        }
      } else if (translationX < -rightThreshold) {
        toValue = -rightWidth;
      }
    } else if (this.rowState === 1) {
      // swiped to left
      if (translationX > -leftThreshold) {
        toValue = leftWidth;
      }
    } else {
      // swiped to right
      if (translationX < rightThreshold) {
        toValue = -rightWidth;
      }
    }

    this._animateRow(startOffsetX, toValue, velocityX / friction);
  };
  _animateRow = (fromValue, toValue, velocityX) => {
    const {
      dragX,
      rowTranslation,
      rowWidth,
      leftWidth
    } = this.state;
    const {
      useNativeAnimations,
      animationOptions,
      onSwipeableLeftOpen,
      onSwipeableRightOpen,
      onSwipeableClose,
      onSwipeableOpen,
      onSwipeableLeftWillOpen,
      onSwipeableRightWillOpen,
      onSwipeableWillClose,
      onSwipeableWillOpen,
      onFullSwipeLeft,
      onToggleSwipeLeft,
      onWillFullSwipeLeft,
      onFullSwipeRight,
      onWillFullSwipeRight
    } = this.props;
    dragX.setValue(0);
    rowTranslation.setValue(fromValue);
    this.rowState = Math.sign(toValue);
    Animated.spring(rowTranslation, {
      toValue,
      restSpeedThreshold: 1.7,
      restDisplacementThreshold: 0.4,
      velocity: velocityX,
      bounciness: 0,
      useNativeDriver: useNativeAnimations,
      ...animationOptions
    }).start(({
      finished
    }) => {
      if (finished) {
        if (toValue === rowWidth && onFullSwipeLeft) {
          onFullSwipeLeft();
        } else if (toValue === -rowWidth && onFullSwipeRight) {
          onFullSwipeRight();
        } else if (toValue > 0 && onSwipeableLeftOpen) {
          onSwipeableLeftOpen();
        } else if (toValue < 0 && onSwipeableRightOpen) {
          onSwipeableRightOpen();
        }

        if (toValue === 0) {
          onSwipeableClose && onSwipeableClose();
        } else {
          onSwipeableOpen && onSwipeableOpen();
        }
      }
    });

    if ((toValue === rowWidth * LEFT_TOGGLE_THRESHOLD || this.dragThresholdReached) && onToggleSwipeLeft) {
      onToggleSwipeLeft({
        rowWidth,
        leftWidth,
        released: true,
        triggerHaptic: !this.dragThresholdReached
      });
      this.dragThresholdReached = false;
    } else if (toValue === rowWidth && onWillFullSwipeLeft) {
      onWillFullSwipeLeft();
    } else if (toValue === -rowWidth && onWillFullSwipeRight) {
      onWillFullSwipeRight();
    } else if (toValue > 0 && onSwipeableLeftWillOpen) {
      onSwipeableLeftWillOpen();
    } else if (toValue < 0 && onSwipeableRightWillOpen) {
      onSwipeableRightWillOpen();
    }

    if (toValue === 0) {
      onSwipeableWillClose && onSwipeableWillClose();
    } else {
      onSwipeableWillOpen && onSwipeableWillOpen();
    }
  };
  _currentOffset = () => {
    const {
      leftWidth = 0,
      rowWidth = 0
    } = this.state;
    const {
      rightOffset = rowWidth
    } = this.state;
    const rightWidth = rowWidth - rightOffset;

    if (this.rowState === 1) {
      return leftWidth;
    } else if (this.rowState === -1) {
      return -rightWidth;
    }

    return 0;
  };
  close = () => {
    this._animateRow(this._currentOffset(), 0);
  };
  openLeft = () => {
    const {
      leftWidth = 0
    } = this.state;

    this._animateRow(this._currentOffset(), leftWidth);
  };
  openLeftFull = () => {
    const {
      rowWidth
    } = this.state;

    this._animateRow(this._currentOffset(), rowWidth);
  };
  toggleLeft = () => {
    // Programmatically left toggle
    const {
      rowWidth
    } = this.state;

    this._animateRow(this._currentOffset(), rowWidth * LEFT_TOGGLE_THRESHOLD);
  };
  openRight = () => {
    const {
      rowWidth = 0
    } = this.state;
    const {
      rightOffset = rowWidth
    } = this.state;
    const rightWidth = rowWidth - rightOffset;

    this._animateRow(this._currentOffset(), -rightWidth);
  };
  openRightFull = () => {
    const {
      rowWidth
    } = this.state;

    this._animateRow(this._currentOffset(), -rowWidth);
  };
  _onRowLayout = ({
    nativeEvent
  }) => this.handleMeasure('rowWidth', nativeEvent);
  _onLeftLayout = ({
    nativeEvent
  }) => this.handleMeasure('leftWidth', nativeEvent);
  _onRightLayout = ({
    nativeEvent
  }) => this.handleMeasure('rightOffset', nativeEvent);
  handleMeasure = (name, nativeEvent) => {
    const {
      width,
      x
    } = nativeEvent.layout;

    switch (name) {
      case 'rowWidth':
        this.rowWidth = width;
        break;

      case 'leftWidth':
        this.leftWidth = x;
        break;

      case 'rightOffset':
        this.rightOffset = x;
        break;

      default:
        break;
    }

    const leftRender = this.props.renderLeftActions ? this.leftWidth : true;
    const rightRender = this.props.renderRightActions ? this.rightOffset : true;

    if (this.rowWidth && leftRender && rightRender) {
      this.setState({
        rowWidth: this.rowWidth,
        leftWidth: this.leftWidth,
        rightOffset: this.rightOffset,
        measureCompleted: true
      });
    }
  };

  render() {
    const {
      children,
      renderLeftActions,
      renderRightActions,
      leftActionsContainerStyle,
      rightActionsContainerStyle,
      containerStyle,
      childrenContainerStyle,
      testID
    } = this.props;
    const left = renderLeftActions && <Animated.View style={[styles.leftActions, leftActionsContainerStyle, {
      transform: [{
        translateX: this.getLeftActionTranslate()
      }]
    }]}>
        {renderLeftActions(this.getShowLeftAction(), this.getTransX())}
        <View onLayout={this._onLeftLayout} />
      </Animated.View>;
    const right = renderRightActions && <Animated.View style={[styles.rightActions, rightActionsContainerStyle, {
      transform: [{
        translateX: this.getRightActionTranslate()
      }]
    }]}>
        {renderRightActions(this.getShowRightAction(), this.getTransX())}
        <View onLayout={this._onRightLayout} />
      </Animated.View>;
    return <PanGestureHandler {...this.props} // minDeltaX={10}
    activeOffsetX={[-10, Constants.isIOS ? 44 : 10]} onGestureEvent={this._onGestureEvent} onHandlerStateChange={this._onHandlerStateChange}>
        <Animated.View onLayout={this._onRowLayout} style={[styles.container, containerStyle]}>
          {left}
          {right}
          <TapGestureHandler onHandlerStateChange={this._onTapHandlerStateChange}>
            <Animated.View testID={testID} style={[{
            transform: [{
              translateX: this.getTransX()
            }]
          }, childrenContainerStyle]}>
              {children}
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>;
  }

}
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  leftActions: { ...StyleSheet.absoluteFillObject,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
  },
  rightActions: { ...StyleSheet.absoluteFillObject,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
  }
});