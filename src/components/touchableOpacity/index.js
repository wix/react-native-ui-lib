import React from 'react';
import {TouchableOpacity as RNTouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';

/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @extends: TouchableOpacity
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extendslink: https://facebook.github.io/react-native/docs/touchableopacity.html
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.js
 */
export default class TouchableOpacity extends BaseComponent {
  static displayName = 'TouchableOpacity';

  static propTypes = {
    /**
     * throttle time in MS for onPress callback
     */
    throttleTime: PropTypes.number,
    /**
     * throttle options
     */
    throttleOptions: PropTypes.shape({leading: PropTypes.bool, trailing: PropTypes.bool}),
    /**
     * Apply background color on TouchableOpacity when active (press is on)
     */
    activeBackgroundColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const {throttleTime, throttleOptions} = this.getThemeProps();

    this.onPress = _.throttle(this.onPress.bind(this), throttleTime, throttleOptions);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
  }

  state = {
    ...this.state,
    active: false,
  };

  onPressIn(...args) {
    this.setState({
      active: true,
    });
    _.invoke(this.props, 'onPressIn', ...args);
  }

  onPressOut(...args) {
    this.setState({
      active: false,
    });
    _.invoke(this.props, 'onPressOut', ...args);
  }

  get activeBackgroundStyle() {
    const {active} = this.state;
    const {activeBackgroundColor} = this.props;

    if (active && activeBackgroundColor) {
      return {backgroundColor: activeBackgroundColor};
    }
  }

  render() {
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle} = this.state;
    const {throttle, style, ...others} = this.getThemeProps();

    return (
      <RNTouchableOpacity
        {...others}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        style={[
          backgroundColor && {backgroundColor},
          borderRadius && {borderRadius},
          flexStyle,
          paddings,
          margins,
          alignments,
          style,
          this.activeBackgroundStyle,
        ]}
      />
    );
  }

  onPress() {
    _.invoke(this.props, 'onPress');
  }
}
