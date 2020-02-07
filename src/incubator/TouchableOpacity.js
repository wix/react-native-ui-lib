// TODO: support hitSlop
// TODO: fix issue where passing backgroundColor thru style doesn't work
// TODO: fix issue with the default value of feedbackColor 'transparent'
import React, {PureComponent} from 'react';
import {processColor} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {asBaseComponent, forwardRef} from '../commons';

const {
  Clock,
  Code,
  cond,
  and,
  eq,
  neq,
  interpolate,
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

class TouchableOpacity extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    feedbackColor: PropTypes.string,
    activeOpacity: PropTypes.number,
    activeScale: PropTypes.number,
    onPress: PropTypes.func,
    pressState: PropTypes.object
  };

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

  _scale = runTiming(this.clock, this.pressState, this.props.activeScale, 1);
  _opacity = runTiming(this.clock, this.pressState, this.props.activeOpacity, 1);
  _color = cond(eq(this.pressState, State.BEGAN),
    processColor(this.props.feedbackColor || this.backgroundColor),
    processColor(this.backgroundColor));

  get pressState() {
    return this.props.pressState || this.state.pressState;
  }

  get backgroundColor() {
    const {modifiers, backgroundColor: backgroundColorProp} = this.props;
    const {backgroundColor} = modifiers;
    return backgroundColorProp || backgroundColor;
  }

  get animatedStyle() {
    const {feedbackColor} = this.props;
    const style = {
      opacity: this._opacity,
      transform: [{scale: this._scale}]
    };

    if (feedbackColor) {
      style.backgroundColor = this._color;
    }

    return style;
  }

  onStateChange = event([
    {
      nativeEvent: {state: this.pressState}
    }
  ],
  {useNativeDriver: true});

  render() {
    const {modifiers, style, onPress, forwardedRef, ...others} = this.props;
    const {borderRadius, paddings, margins, alignments, flexStyle, backgroundColor} = modifiers;

    return (
      <TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside ref={forwardedRef}>
        <Reanimated.View
          {...others}
          style={[
            borderRadius && {borderRadius},
            flexStyle,
            paddings,
            margins,
            alignments,
            backgroundColor && {backgroundColor},
            style,
            this.animatedStyle
          ]}
        >
          {this.props.children}

          <Code>
            {() => {
              return block([
                cond(and(eq(this.pressState, State.END), eq(this._prevPressState, State.BEGAN)), [
                  call([], () => onPress(this.props))
                ]),
                set(this._prevPressState, this.pressState)
              ]);
            }}
          </Code>
        </Reanimated.View>
      </TapGestureHandler>
    );
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

  return block([
    cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 1),
      startClock(clock)
    ]),
    cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    interpolate(state.position, {
      inputRange: [0, 1],
      outputRange: [endValue, initialValue],
      extrapolate: Extrapolate.CLAMP
    })
  ]);
}

export default asBaseComponent(forwardRef(TouchableOpacity));
