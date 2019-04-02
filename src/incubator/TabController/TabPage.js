// TODO: support hitSlow
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Reanimated from 'react-native-reanimated';
import TabBarContext from './TabBarContext';

const {cond, eq, Value, event} = Reanimated;

export default class TabPage extends Component {
  static contextType = TabBarContext;
  static propTypes = {
    index: PropTypes.number.isRequired,
    // INTERNAL PROPS
    state: PropTypes.object,
  };

  static defaultProps = {
    activeOpacity: 0.6,
  };

  state = new Value(-1);

  onStateChange = event([
    {
      nativeEvent: {state: this.props.state},
    },
  ]);

  render() {
    const {index} = this.props;
    const {currentPage} = this.context;
    const opacity = cond(eq(currentPage, index), 1, 0);

    return <Reanimated.View style={[styles.page, {opacity}]}>{this.props.children}</Reanimated.View>;
  }
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject,
  },
});
