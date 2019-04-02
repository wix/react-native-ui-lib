import React, {Component} from 'react';
import {StyleSheet, processColor} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {Colors, Typography} from '../../style';

const {cond, eq, call, block, event} = Reanimated;

export default class TabBarItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    label: PropTypes.string,
    activeOpacity: PropTypes.number,
    // INTERNAL PROPS
    state: PropTypes.object,
    currentPage: PropTypes.object,
  };

  static defaultProps = {
    activeOpacity: 0.6,
  };

  onStateChange = event([
    {
      nativeEvent: {state: this.props.state},
    },
  ]);

  onChangeIndex = index => {
    _.invoke(this.props, 'onChangeIndex', index);
  };

  render() {
    const {label, index, currentPage, /* onStateChange, */ state} = this.props;
    const fontWeight = cond(eq(currentPage, index), '700', '300');
    const color = cond(eq(currentPage, index), processColor(Colors.blue30), processColor(Colors.black));
    const opacity = block([
      cond(eq(state, State.END), call([], () => this.onChangeIndex(this.props.index))),
      cond(eq(state, State.BEGAN), this.props.activeOpacity, 1),
    ]);

    return (
      <TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside>
        <Reanimated.View style={[styles.tabItem, {opacity}]}>
          <Reanimated.Text style={[styles.tabItemLabel, {fontWeight, color}]}>{label}</Reanimated.Text>
        </Reanimated.View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemLabel: {
    color: Colors.blue30,
    ...Typography.text80,
  },
});
