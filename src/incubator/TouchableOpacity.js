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
    state: PropTypes.object,
  };

  static defaultProps = {
    activeOpacity: 0.2,
    onPress: _.noop,
    state: new Value(-1),
  };

  onStateChange = event([
    {
      nativeEvent: {state: this.props.state},
    },
  ]);

  _opacity = block([
    cond(eq(this.props.state, State.END), call([], () => this.props.onPress(this.props))),
    cond(eq(this.props.state, State.BEGAN), this.props.activeOpacity, 1),
  ]);

  _color = cond(
    eq(this.props.state, State.BEGAN),
    processColor(this.props.feedbackColor || this.props.backgroundColor),
    processColor(this.props.backgroundColor),
  );

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
