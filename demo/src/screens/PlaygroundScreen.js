import React, {Component} from 'react';
import {StyleSheet, YellowBox} from 'react-native';
import {Colors, Button, View, Text, Constants} from 'react-native-ui-lib'; //eslint-disable-line
import Animated, {Easing} from 'react-native-reanimated';
import _ from 'lodash';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated', // works
  'Module RCTImageLoader', // works
  'Require cycle:', // doesn't work
]);

const {Clock, Value, set, cond, startClock, clockRunning, timing, debug, stopClock, block} = Animated;

export default class PlaygroundScreen extends Component {
  componentDidMount() {
    // this.slow();
  }

  slow() {
    setTimeout(() => {
      _.times(10000, () => {
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
        <Button label="press me" activeBackgroundColor={'red'} />
        <NativeButton/>
      </View>
    );
  }
}

class NativeButton extends Component {
  render() {
    return (
      <View>
        <Text>NATIVE BUTTOn</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  container: {},
});
