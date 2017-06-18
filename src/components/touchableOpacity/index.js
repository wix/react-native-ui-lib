import React from 'react';
import {TouchableOpacity as RNTouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';

export default class TouchableOpacity extends BaseComponent {
  static displayName = 'TouchableOpacity';

  static propTypes = {
    throttleTime: PropTypes.number,
    throttleOptions: PropTypes.shape({leading: PropTypes.bool, trailing: PropTypes.bool}),
  }

  static defaultProps = {
    throttleTime: 0,
    throttleOptions: {leading: true, trailing: false},
  }

  constructor(props) {
    super(props);

    this.onPress = _.throttle(this.onPress.bind(this), props.throttleTime, props.throttleOptions);
  }

  render() {
    const {throttle, ...others} = this.props;

    return (
      <RNTouchableOpacity
        {...others}
        onPress={this.onPress}
      />
    );
  }

  onPress() {
    _.invoke(this.props, 'onPress');
  }
}
