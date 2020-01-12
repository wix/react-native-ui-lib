// @flow
// Similarly to the DrawerLayout component this deserves to be put in a
// separate repo. Although, keeping it here for the time being will allow us
// to move faster and fix possible issues quicker

// TODO: use Swipeable from react-native-gesture-handler once they support RTL

/* eslint-disable */
import React, {Component} from 'react';
import {Animated, StyleSheet, View, I18nManager} from 'react-native';
import {PanGestureHandler, TapGestureHandler, State} from 'react-native-gesture-handler';
import {Constants} from '../../helpers';


const DRAG_TOSS = 0.05;

// Math.sign polyfill for iOS 8.x
if (!Math.sign) {
  Math.sign = function (x) {
    return Number(x > 0) - Number(x < 0) || +x;
  };
}

export type PropType = {
  children: any,
  friction: number,
  leftThreshold?: number,
  rightThreshold?: number,
  overshootLeft?: boolean,
  overshootRight?: boolean,
  overshootFriction?: number,
  onSwipeableLeftOpen?: Function,
  onSwipeableRightOpen?: Function,
  onSwipeableOpen?: Function,
  onSwipeableClose?: Function,
  onSwipeableLeftWillOpen?: Function,
  onSwipeableRightWillOpen?: Function,
  onSwipeableWillOpen?: Function,
  onSwipeableWillClose?: Function,
  onDragStart?: Function,
  renderLeftActions?: (progressAnimatedValue: any, dragAnimatedValue: any) => any,
  renderRightActions?: (progressAnimatedValue: any, dragAnimatedValue: any) => any,
  leftActionsContainerStyle: any,
  rightActionsContainerStyle: any,
  useNativeAnimations: boolean,
  animationOptions?: Object,
  containerStyle?: Object,
  childrenContainerStyle?: Object
};
type StateType = {
  dragX: Animated.Value,
  rowTranslation: Animated.Value,
  leftWidth: number | typeof undefined,
  rightOffset: number | typeof undefined,
  rowWidth: number | typeof undefined
};

export default class Swipeable extends Component<PropType, StateType> {
  static defaultProps = {
    friction: 1,
    overshootFriction: 1,
    useNativeAnimations: false // issue in iPhone5
  };

  _onGestureEvent: ?Animated.Event;
  _transX: ?Animated.Interpolation;
  _showLeftAction: ?Animated.Interpolation | ?Animated.Value;
  _leftActionTranslate: ?Animated.Interpolation;
  _showRightAction: ?Animated.Interpolation | ?Animated.Value;
  _rightActionTranslate: ?Animated.Interpolation;

  constructor(props: PropType) {
    super(props);

    const dragX = new Animated.Value(0);
    this.rowState = 0;

    this.state = {
      dragX,
      rowTranslation: new Animated.Value(0),
      rowWidth: Constants.screenWidth,
      leftWidth: undefined,
      rightOffset: undefined,
      measureCompleted: false
    };

    this._updateAnimatedEvent(props, this.state);

    this._onGestureEvent = Animated.event([{nativeEvent: {translationX: dragX}}], {
      useNativeDriver: props.useNativeAnimations
    });
  }

  UNSAFE_componentWillUpdate(props: PropType, state: StateType) {
    if (
      this.props.friction !== props.friction ||
      this.props.overshootLeft !== props.overshootLeft ||
      this.props.overshootRight !== props.overshootRight ||
      this.props.overshootFriction !== props.overshootFriction ||
      this.state.leftWidth !== state.leftWidth ||
      this.state.rightOffset !== state.rightOffset ||
      this.state.rowWidth !== state.rowWidth
    ) {
      this._updateAnimatedEvent(props, state);
    }
  }

  _updateAnimatedEvent = (props: PropType, state: StateType) => {
    const {friction, overshootFriction} = props;
    const {dragX, rowTranslation, leftWidth = 0, rowWidth = 0} = state;
    const {rightOffset = rowWidth} = state;
    const rightWidth = Math.max(0, rowWidth - rightOffset);
    const {overshootLeft = leftWidth > 0, overshootRight = rightWidth > 0} = props;

    const transX = Animated.add(
      rowTranslation,
      dragX.interpolate({
        inputRange: [0, friction],
        outputRange: [0, 1]
      }),
    ).interpolate({
      inputRange: [
        -rightWidth - (overshootRight ? 1 : overshootFriction),
        -rightWidth,
        leftWidth,
        leftWidth + (overshootLeft ? 1 : overshootFriction)
      ],
      outputRange: [
        -rightWidth - (overshootRight || overshootFriction > 1 ? 1 : 0),
        -rightWidth,
        leftWidth,
        leftWidth + (overshootLeft || overshootFriction > 1 ? 1 : 0)
      ],
    });
    this._transX = transX;
    this._showLeftAction =
      leftWidth > 0
        ? transX.interpolate({
          inputRange: [-1, 0, leftWidth],
          outputRange: [0, 0, 1]
        })
        : new Animated.Value(0);
    this._leftActionTranslate = this._showLeftAction.interpolate({
      inputRange: [0, Number.MIN_VALUE],
      outputRange: [-10000, 0],
      extrapolate: 'clamp'
    });
    this._showRightAction =
      rightWidth > 0
        ? transX.interpolate({
          inputRange: [-rightWidth, 0, 1],
          outputRange: [1, 0, 0]
        })
        : new Animated.Value(0);
    this._rightActionTranslate = this._showRightAction.interpolate({
      inputRange: [0, Number.MIN_VALUE],
      outputRange: [-10000, 0],
      extrapolate: 'clamp'
    });
  };

  _onTapHandlerStateChange = ({nativeEvent}) => {
    if (this.rowState !== 0) {
      if (nativeEvent.oldState === State.ACTIVE) {
        this.close();
      }
    }
  };

  _onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      this._handleRelease(nativeEvent);
    }

    if (nativeEvent.state === State.ACTIVE) {
      this.props.onDragStart && this.props.onDragStart(this.props);
    }
  };

  _handleRelease = nativeEvent => {
    const {velocityX, translationX: dragX} = nativeEvent;
    const {leftWidth = 0, rowWidth = 0} = this.state;
    const {rightOffset = rowWidth} = this.state;
    const rightWidth = rowWidth - rightOffset;
    const {friction, leftThreshold = leftWidth / 2, rightThreshold = rightWidth / 2} = this.props;

    const startOffsetX = this._currentOffset() + dragX / friction;
    const translationX = (dragX + DRAG_TOSS * velocityX) / friction;

    let toValue = 0;
    if (this.rowState === 0) {
      if (translationX > leftThreshold) {
        toValue = leftWidth;
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
    const {dragX, rowTranslation} = this.state;
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
      onSwipeableWillOpen
    } = this.props;

    dragX.setValue(0);
    rowTranslation.setValue(fromValue);
    this.rowState = Math.sign(toValue);

    Animated.spring(rowTranslation, {
      restSpeedThreshold: 1.7,
      restDisplacementThreshold: 0.4,
      velocity: velocityX,
      bounciness: 0,
      toValue,
      useNativeDriver: useNativeAnimations,
      ...animationOptions
    }).start(({finished}) => {
      if (finished) {
        if (toValue > 0 && onSwipeableLeftOpen) {
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

    if (toValue > 0 && onSwipeableLeftWillOpen) {
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
    const {leftWidth = 0, rowWidth = 0} = this.state;
    const {rightOffset = rowWidth} = this.state;
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
    const {leftWidth = 0} = this.state;
    this._animateRow(this._currentOffset(), leftWidth);
  };

  openRight = () => {
    const {rowWidth = 0} = this.state;
    const {rightOffset = rowWidth} = this.state;
    const rightWidth = rowWidth - rightOffset;
    this._animateRow(this._currentOffset(), -rightWidth);
  };

  _onRowLayout = ({nativeEvent}) => this.handleMeasure('rowWidth', nativeEvent);
  _onLeftLayout = ({nativeEvent}) => this.handleMeasure('leftWidth', nativeEvent);
  _onRightLayout = ({nativeEvent}) => this.handleMeasure('rightOffset', nativeEvent);

  handleMeasure = (name, nativeEvent) => {
    const {width, x} = nativeEvent.layout;

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
      childrenContainerStyle
    } = this.props;

    const left = renderLeftActions && (
      <Animated.View
        style={[
          styles.leftActions,
          leftActionsContainerStyle,
          {transform: [{translateX: this._leftActionTranslate}]}
        ]}
      >
        {renderLeftActions(this._showLeftAction, this._transX)}
        <View onLayout={this._onLeftLayout}/>
      </Animated.View>
    );

    const right = renderRightActions && (
      <Animated.View
        style={[
          styles.rightActions,
          rightActionsContainerStyle,
          {transform: [{translateX: this._rightActionTranslate}]}
        ]}
      >
        {renderRightActions(this._showRightAction, this._transX)}
        <View onLayout={this._onRightLayout}/>
      </Animated.View>
    );

    return (
      <PanGestureHandler
        {...this.props}
        // minDeltaX={10}
        activeOffsetX={[-10, Constants.isIOS ? 44 : 10]}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
      >
        <Animated.View onLayout={this._onRowLayout} style={[styles.container, containerStyle]}>
          {left}
          {right}
          <TapGestureHandler onHandlerStateChange={this._onTapHandlerStateChange}>
            <Animated.View
              style={[
                {transform: [{translateX: this._transX}]},
                childrenContainerStyle
              ]}
            >
              {children}
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  leftActions: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
  },
  rightActions: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
  }
});
