import _pt from "prop-types";
// TODO: support hitSlop
import React, { PureComponent } from 'react';
import { processColor, StyleSheet } from 'react-native';
import _ from 'lodash';
import Reanimated, { Easing as _Easing, EasingNode } from 'react-native-reanimated';
import { TapGestureHandler, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { asBaseComponent, forwardRef } from "../commons/new";
const {
  Clock,
  Code,
  cond,
  and,
  or,
  eq,
  neq,
  interpolate: _interpolate,
  interpolateNode,
  Extrapolate,
  Value,
  call,
  block,
  event,
  timing,
  set,
  startClock,
  stopClock
} = Reanimated;
const Easing = EasingNode || _Easing;
const interpolate = interpolateNode || _interpolate;

/**
 * @description: a Better, enhanced TouchableOpacity component
 * @modifiers: flex, margin, padding, background
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TouchableOpacityScreen.js
 */
class TouchableOpacity extends PureComponent {
  static propTypes = {
    /**
       * Background color
       */
    backgroundColor: _pt.string,

    /**
       * Background color when actively pressing the touchable
       */
    feedbackColor: _pt.string,

    /**
       * Opacity value when actively pressing the touchable
       */
    activeOpacity: _pt.number,

    /**
       * Scale value when actively pressing the touchable
       */
    activeScale: _pt.number,

    /**
       * Callback for when tapping the touchable
       */
    onPress: _pt.func,

    /**
       * Callback for when long pressing the touchable
       */
    onLongPress: _pt.func,

    /**
       * If true, disable all interactions for this component.
       */
    disabled: _pt.bool,
    onLayout: _pt.func,
    testID: _pt.string
  };
  static displayName = 'Incubator.TouchableOpacity';
  static defaultProps = {
    activeOpacity: 0.2,
    activeScale: 1,
    onPress: _.noop
  };
  state = {
    pressState: new Value(-1)
  };
  _prevPressState = new Value(-1);
  isAnimating = new Value(0);
  clock = new Clock();
  _scale = runTiming(this.clock, this.pressState, this.props.activeScale || 1, 1);
  _opacity = runTiming(this.clock, this.pressState, this.props.activeOpacity || 0.2, 1);
  _color = cond(eq(this.pressState, State.BEGAN), // @ts-expect-error
  processColor(this.props.feedbackColor || this.backgroundColor), processColor(this.backgroundColor));

  get pressState() {
    return this.props.pressState || this.state.pressState;
  }

  get backgroundColor() {
    const {
      modifiers,
      backgroundColor: backgroundColorProp
    } = this.props;
    const {
      backgroundColor
    } = modifiers;
    return backgroundColorProp || backgroundColor;
  }

  get animatedStyle() {
    const {
      feedbackColor
    } = this.props;
    const style = {
      opacity: this._opacity,
      transform: [{
        scale: this._scale
      }]
    };

    if (feedbackColor) {
      style.backgroundColor = this._color;
    }

    return style;
  }

  onStateChange = event([{
    nativeEvent: {
      state: this.pressState
    }
  }], {
    useNativeDriver: true
  });
  onLongPress = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      _.invoke(this.props, 'onLongPress', this.props);
    }
  };

  render() {
    const {
      modifiers,
      style,
      onPress = _.noop,
      onLongPress,
      disabled,
      forwardedRef,
      ...others
    } = this.props;
    const {
      borderRadius,
      paddings,
      margins,
      alignments,
      flexStyle,
      backgroundColor
    } = modifiers;
    return <TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside enabled={!disabled}>
        <Reanimated.View {...others} ref={forwardedRef} style={[borderRadius && {
        borderRadius
      }, flexStyle, paddings, margins, alignments, backgroundColor && {
        backgroundColor
      }, style, this.animatedStyle]}>
          {this.props.children}

          <Code>
            {() => {
            return block([cond(and(eq(this.pressState, State.END), eq(this._prevPressState, State.BEGAN)), [call([], () => onPress(this.props))]), set(this._prevPressState, this.pressState)]);
          }}
          </Code>
          {onLongPress && <LongPressGestureHandler onHandlerStateChange={this.onLongPress} enabled={!disabled}>
              <Reanimated.View style={StyleSheet.absoluteFillObject} />
            </LongPressGestureHandler>}
        </Reanimated.View>
      </TapGestureHandler>;
  }

}

function runTiming(clock, gestureState, initialValue, endValue) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };
  const config = {
    duration: 150,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };
  return block([cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [set(state.finished, 0), set(state.time, 0), set(state.frameTime, 0), set(config.toValue, 1), startClock(clock)]), cond(and(or(eq(gestureState, State.END), eq(gestureState, State.FAILED)), neq(config.toValue, 0)), [set(state.finished, 0), set(state.time, 0), set(state.frameTime, 0), set(config.toValue, 0), startClock(clock)]), timing(clock, state, config), cond(state.finished, stopClock(clock)), interpolate(state.position, {
    inputRange: [0, 1],
    outputRange: [endValue, initialValue],
    extrapolate: Extrapolate.CLAMP
  })]);
}

export default asBaseComponent(forwardRef(TouchableOpacity));