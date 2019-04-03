import React, {Component} from 'react';
import {StyleSheet, processColor} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {Colors, Typography, Spacings} from '../../style';

const {cond, eq, call, block, event, and, defined} = Reanimated;

export default class TabBarItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    label: PropTypes.string,
    activeOpacity: PropTypes.number,
    // INTERNAL PROPS
    state: PropTypes.object,
    currentPage: PropTypes.object,
    onLayout: PropTypes.func,
  };

  static defaultProps = {
    activeOpacity: 0.6,
  };

  state = {
    itemWidth: undefined,
  };

  onStateChange = event([
    {
      nativeEvent: {state: this.props.state},
    },
  ]);

  onChangeIndex = index => {
    _.invoke(this.props, 'onChangeIndex', index);
  };

  onLayout = ({
    nativeEvent: {
      layout: {width},
    },
  }) => {
    const {index, onLayout} = this.props;
    const {itemWidth} = this.state;
    if (!itemWidth) {
      this.setState({itemWidth: width});
      onLayout(width, index);
    }
  };

  getItemStyle() {
    const {state} = this.props;
    const {itemWidth} = this.state;
    const opacity = block([
      cond(eq(state, State.END), call([], () => this.onChangeIndex(this.props.index))),
      cond(eq(state, State.BEGAN), this.props.activeOpacity, 1),
    ]);

    const style = {
      opacity,
    };

    if (itemWidth) {
      style.width = itemWidth;
      style.paddingHorizontal = undefined;
    }

    return style;
  }

  getLabelStyle() {
    const {itemWidth} = this.state;
    const {index, currentPage} = this.props;
    const fontWeight = cond(and(eq(currentPage, index), defined(itemWidth)), '700', '300');
    const color = cond(eq(currentPage, index), processColor(Colors.blue30), processColor(Colors.black));

    return {
      fontWeight,
      color,
    };
  }

  render() {
    const {label, state} = this.props;
    const opacity = block([
      cond(eq(state, State.END), call([], () => this.onChangeIndex(this.props.index))),
      cond(eq(state, State.BEGAN), this.props.activeOpacity, 1),
    ]);

    return (
      <TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside>
        <Reanimated.View style={[styles.tabItem, {opacity}, this.getItemStyle()]} onLayout={this.onLayout}>
          <Reanimated.Text style={[styles.tabItemLabel, this.getLabelStyle()]}>{label}</Reanimated.Text>
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
    paddingHorizontal: Spacings.s4,
  },
  tabItemLabel: {
    color: Colors.blue30,
    ...Typography.text80,
  },
});
