// TODO: support hitSlop
// TODO: fix issue where passing backgroundColor thru style doesn't work
// TODO: fix issue with the default value of feedbackColor 'transparent'
import React, {Component} from 'react';
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
  not,
  eq,
  Value,
  call,
  block,
  event,
  timing,
  debug,
  clockRunning,
  set,
  startClock,
  stopClock
} = Reanimated;

class TouchableOpacity extends Component {
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

  isAnimating = new Value(0);
  clock = new Clock();
  _scale = new Value(1);
  _color = new Value(1);

  _opacity = block([cond(eq(this.pressState, State.BEGAN), this.props.activeOpacity, 1)]);

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

  onStateChange = event([
    {
      nativeEvent: {state: this.pressState}
    }
  ],
  {useNativeDriver: true});

  render() {
    const {modifiers, style, activeScale, onPress, forwardedRef, ...others} = this.props;
    const {borderRadius, paddings, margins, alignments, flexStyle} = modifiers;

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
            style,
            {backgroundColor: this._color, opacity: this._opacity, transform: [{scale: this._scale}]}
          ]}
        >
          {this.props.children}

          <Code>
            {() =>
              block([
                // trigger onPress callback on END state once
                cond(and(eq(this.isAnimating, 0), eq(this.pressState, State.END)), [
                  set(this.isAnimating, 1),

                  call([], () => onPress(this.props))
                ]),
                // Active state - scale animation
                cond(eq(this.pressState, State.BEGAN), block([runTiming(this.clock, this._scale, 1, activeScale)])),
                // End state - scale animation
                cond(eq(this.pressState, State.END), block([runTiming(this.clock, this._scale, activeScale, 1)])),
                // Reset isAnimating flag
                cond(and(eq(this.pressState, State.END), not(clockRunning(this.clock))), set(this.isAnimating, 0))
              ])
            }
          </Code>
        </Reanimated.View>
      </TapGestureHandler>
    );
  }
}

function runTiming(clock, position, value, dest) {
  const state = {
    finished: new Value(0),
    position,
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 100,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest)
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position
  ]);
}

export default asBaseComponent(forwardRef(TouchableOpacity));
