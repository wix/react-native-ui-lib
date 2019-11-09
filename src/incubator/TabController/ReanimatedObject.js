import Reanimated, {Easing} from 'react-native-reanimated';

const {Clock, Value, cond, stopClock, startClock, clockRunning, timing, block, set} = Reanimated;

export default class ReanimatedObject {
  constructor(config) {
    this.clock = new Clock();
    this.state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
    this.config = {
      duration: 300,
      toValue: new Value(0),
      easing: Easing.bezier(0.23, 1, 0.32, 1),
      ...config
    };
    this.prevValue = new Value(0);
    this.value = new Value(0);
    this.nextValue = new Value(0);
  }

  getTransitionBlock() {
    return block([
      cond(clockRunning(this.clock),
        [set(this.config.toValue, this.nextValue), set(this.value, this.state.position)],
        [
          set(this.state.finished, 0),
          set(this.state.time, 0),
          set(this.state.frameTime, 0),
          set(this.config.toValue, this.nextValue),
          startClock(this.clock)
        ],),
      timing(this.clock, this.state, this.config),
      cond(this.state.finished, [stopClock(this.clock), set(this.prevValue, this.state.position)])
    ]);
  }
}
