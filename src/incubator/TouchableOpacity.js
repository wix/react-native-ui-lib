// TODO: support hitSlop
// TODO: fix issue where passing backgroundColor thru style doesn't work
// TODO: fix issue with the default value of feedbackColor 'transparent'
import React, {Component} from 'react';
import {processColor} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

const {
  Clock,
  Code,
  cond,
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

export default class TouchableOpacity extends Component {
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
    // feedbackColor: 'transparent',
    onPress: _.noop
  };

  state = {
    pressState: new Value(-1)
  };

  get pressState() {
    return this.props.pressState || this.state.pressState;
  }

  onStateChange = event([
    {
      nativeEvent: {state: this.pressState}
    }
  ],
  {useNativeDriver: true});

  clock = new Clock();
  colorClock = new Clock();
  _scale = new Value(1);
  _color = new Value(1);
  _opacity = block([
    // cond(eq(this.pressState, State.END),
    //   call([], () => this.props.onPress(this.props))),
    cond(eq(this.pressState, State.BEGAN), this.props.activeOpacity, 1)
  ]);

  _color = cond(eq(this.pressState, State.BEGAN),
    processColor(this.props.feedbackColor || this.props.backgroundColor),
    processColor(this.props.backgroundColor));

  render() {
    const {style, activeScale, onPress, ...others} = this.props;

    return (
      <TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside>
        <Reanimated.View
          {...others}
          style={[style, {backgroundColor: this._color, opacity: this._opacity, transform: [{scale: this._scale}]}]}
        >
          {this.props.children}

          <Code>
            {() =>
              block([
                cond(eq(this.pressState, State.END),
                  call([], () => onPress(this.props))),
                // TODO: investigate why this code trigger onPress callback too
                // many times
                cond(eq(this.pressState, State.BEGAN),
                  block([runTiming(this.clock, this._scale, 1, activeScale)]),
                  block([runTiming(this.clock, this._scale, activeScale, 1)]))
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
    // position: new Value(0),
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
