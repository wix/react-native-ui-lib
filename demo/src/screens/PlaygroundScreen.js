import React, {Component} from 'react';
import {StyleSheet, YellowBox, processColor} from 'react-native';
import {Colors, Button, View, Text, Constants, TouchableOpacity} from 'react-native-ui-lib'; //eslint-disable-line
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import _ from 'lodash';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated', // works
  'Module RCTImageLoader', // works
  'Require cycle:', // doesn't work
]);

const {
  Clock,
  Value,
  set,
  cond,
  eq,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  event,
  interpolate,
} = Animated;

export default class PlaygroundScreen extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    // this.slow();
  }

  slow() {
    setTimeout(() => {
      _.times(1000, () => {
        console.log('ethan - slow logg');
      });

      this.slow();
    }, 10);
  }
  // we create a clock node
  clock = new Clock();
  // and use runTiming method defined above to create a node that is going to be mapped
  // to the translateX transform.
  transX = this.runTiming(this.clock, 10, 20);

  width = this.runTiming(this.clock, 0, Constants.screenWidth);

  runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 1500,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    return block([
      cond(
        clockRunning(clock),
        [
          // if the clock is already running we update the toValue, in case a new dest has been passed in
          debug('ethan - clock is running', clock),
          set(config.toValue, dest),
        ],
        [
          // if the clock isn't running we reset all the animation params and start the clock
          set(state.finished, 0),
          set(state.time, 0),
          set(state.position, value),
          set(state.frameTime, 0),
          set(config.toValue, dest),
          startClock(clock),
        ],
      ),
      // we run the step here that is going to update position
      timing(clock, state, config),
      // if the animation is over we stop the clock
      cond(state.finished, debug('stop clock', stopClock(clock))),
      // we made the block return the updated position
      state.position,
    ]);
  }

  render() {
    return (
      <View center style={styles.container}>
        <Animated.View style={[styles.box, {width: this.width}]} />
        <Button
          marginV-20
          label="JS BUTTON"
          activeBackgroundColor={'red'}
          onPress={() => this.setState({show: !this.state.show})}
        />

        <NativeButton />

        <SharedElement
          show={this.state.show}
          startLayout={{x: 100, y: 300, width: 100, height: 100}}
          endLayout={{x: 120, y: 340, width: 200, height: 160}}
        />
      </View>
    );
  }
}

class SharedElement extends Component {
  clock = new Clock();

  _transition = new Value(0);

  state = {
    time: Date.now(),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show) {
      const values = this.props.show ? [0, 100] : [100, 0];
      this._transition = this.runTiming(this.clock, ...values);
    }
  }

  getAnimatedStyle() {
    if (!this._transition) {
      return undefined;
    }
    const {startLayout, endLayout} = this.props;
    return {
      position: 'absolute',
      top: interpolate(this._transition, {
        inputRange: [0, 100],
        outputRange: [startLayout.y, endLayout.y],
      }),
      left: interpolate(this._transition, {
        inputRange: [0, 100],
        outputRange: [startLayout.x, endLayout.x],
      }),
      height: interpolate(this._transition, {
        inputRange: [0, 100],
        outputRange: [startLayout.height, endLayout.height],
      }),
      width: interpolate(this._transition, {
        inputRange: [0, 100],
        outputRange: [startLayout.width, endLayout.width],
      }),
    };
  }

  onAnimationEnd = () => {
    console.warn('ethan - animation ended');
    // this.setState({
    //   time: Date.now()
    // });
  };

  runTiming(clock, value, dest) {
    console.warn('ethan - runTiming');
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 2000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    return block([
      cond(
        clockRunning(clock),
        [
          // if the clock is already running we update the toValue, in case a new dest has been passed in
          set(config.toValue, dest),
          // debug('ethan - clock is running:', divide(state.time, 1000000)),
        ],
        [
          // if the clock isn't running we reset all the animation params and start the clock
          // debug('ethan - clock NOT running:', divide(state.time, 1000000)),
          set(state.finished, 0),
          set(state.time, 0),
          set(state.position, value),
          set(state.frameTime, 0),
          set(config.toValue, dest),
          startClock(clock),
        ],
      ),
      // we run the step here that is going to update position
      timing(clock, state, config),
      // if the animation is over we stop the clock
      cond(state.finished, [debug('stop clock', stopClock(clock)), Animated.call([], this.onAnimationEnd)]),
      // we made the block return the updated position
      state.position,
    ]);
  }

  render() {
    return (
      <Animated.View style={[{backgroundColor: 'black', width: 100, height: 100}, this.getAnimatedStyle()]}>
        <Text white>{this.state.time}</Text>
      </Animated.View>
    );
  }
}

class NativeButton extends Component {
  constructor(props) {
    super(props);

    const state = new Value(-1);

    this._onGestureEvent = event([{nativeEvent: {state}}], {listener: this.onPress});

    this.onStateChange = event(
      [
        {
          nativeEvent: {state},
        },
      ],
      {listener: this.onPress},
    );

    this._color = cond(eq(state, State.BEGAN), processColor(Colors.orange40), processColor(Colors.blue30));

    this.onPress = () => {
      console.warn('press native button');
    };
  }

  render() {
    return (
      <TapGestureHandler onHandlerStateChange={this.onStateChange} onGestureEvent={this.onPress}>
        <Animated.View style={[styles.button, {backgroundColor: this._color}]}>
          <Text white text70>
            NATIVE BUTTON
          </Text>
        </Animated.View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 999,
  },
  container: {},
});
