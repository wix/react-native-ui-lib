// TODO: support hitSlop
import React, {Component} from 'react';
import {processColor} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

const {cond, eq, Value, call, block, event} = Reanimated;

export default class TouchableOpacity extends Component {
  static propTypes = {
    feedbackColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func,
    pressState: PropTypes.object
  };

  static defaultProps = {
    activeOpacity: 0.2,
    feedbackColor: 'transparent',
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
  {useNativeDriver: true},);

  _opacity = block([
    cond(eq(this.pressState, State.END), call([], () => this.props.onPress(this.props))),
    cond(eq(this.pressState, State.BEGAN), this.props.activeOpacity, 1)
  ]);

  _color = cond(eq(this.pressState, State.BEGAN),
    processColor(this.props.feedbackColor || this.props.backgroundColor),
    processColor(this.props.backgroundColor),);

  render() {
    const {style, ...others} = this.props;
    return (
      <TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside>
        <Reanimated.View {...others} style={[style, {backgroundColor: this._color, opacity: this._opacity}]}>
          {this.props.children}
        </Reanimated.View>
      </TapGestureHandler>
    );
  }
}
