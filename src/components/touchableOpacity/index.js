import React from 'react';
import {TouchableOpacity as RNTouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {PureBaseComponent} from '../../commons';

/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @extends: TouchableOpacity
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extendslink: https://facebook.github.io/react-native/docs/touchableopacity.html
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.js
 */
export default class TouchableOpacity extends PureBaseComponent {
  static displayName = 'TouchableOpacity';

  static propTypes = {
    /**
     * background color for TouchableOpacity
     */
    backgroundColor: PropTypes.string,
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
    activeBackgroundColor: PropTypes.string
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
    active: false
  };

  getAccessibilityInfo() {
    const {disabled} = this.props;
    return {
      accessibilityRole: 'button',
      accessibilityStates: disabled ? ['disabled'] : undefined
    };
  }

  onPressIn(...args) {
    this.setState({
      active: true
    });
    _.invoke(this.props, 'onPressIn', ...args);
  }

  onPressOut(...args) {
    this.setState({
      active: false
    });
    _.invoke(this.props, 'onPressOut', ...args);
  }

  get backgroundColorStyle() {
    const {backgroundColor: modifiersBackgroundColor} = this.state;
    const {backgroundColor: propsBackgroundColor} = this.getThemeProps();

    const backgroundColor = propsBackgroundColor || modifiersBackgroundColor;

    if (backgroundColor) {
      return {backgroundColor};
    }
  }

  get activeBackgroundStyle() {
    const {active} = this.state;
    const {activeBackgroundColor} = this.props;

    if (active && activeBackgroundColor) {
      return {backgroundColor: activeBackgroundColor};
    }
  }

  render() {
    const {borderRadius, paddings, margins, alignments, flexStyle} = this.state;
    const {style, ...others} = this.getThemeProps();

    return (
      <RNTouchableOpacity
        {...this.getAccessibilityInfo()}
        {...others}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        style={[
          this.backgroundColorStyle,
          borderRadius && {borderRadius},
          flexStyle,
          paddings,
          margins,
          alignments,
          style,
          this.activeBackgroundStyle
        ]}
        ref={this.setRef}
      />
    );
  }

  onPress() {
    _.invoke(this.props, 'onPress', this.props);
  }
}
