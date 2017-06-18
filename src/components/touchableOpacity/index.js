import React from 'react';
import {TouchableOpacity as RNTouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {ThemeManager} from '../../style';

export default class TouchableOpacity extends BaseComponent {
  static displayName = 'TouchableOpacity';

  static propTypes = {
    throttleTime: PropTypes.number,
    throttleOptions: PropTypes.shape({leading: PropTypes.bool, trailing: PropTypes.bool}),
  }

  constructor(props) {
    super(props);

    const throttleTime = props.throttleTime || ThemeManager.components.TouchableOpacity.throttleTime;
    const throttleOptions = props.throttleOptions || ThemeManager.components.TouchableOpacity.throttleOptions;

    this.onPress = _.throttle(this.onPress.bind(this), throttleTime, throttleOptions);
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
