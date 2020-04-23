import React, {PureComponent} from 'react';
import {TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps} from 'react-native';
import _ from 'lodash';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps, ContainerModifiers} from '../../commons/new';
// @ts-ignore
import Incubator from '../../incubator';

type IProps = TouchableOpacityProps & ContainerModifiers & {
  /**
   * background color for TouchableOpacity
   */
  backgroundColor?: string;
  /**
   * throttle time in MS for onPress callback
   */
  throttleTime?: number;
  /**
   * throttle options {leading, trailing}
   */
  throttleOptions?: {leading: boolean, trailing: boolean};
  /**
   * Apply background color on TouchableOpacity when active (press is on)
   */
  activeBackgroundColor?: string;
  /**
   * Should use a more native touchable opacity component
   */
  useNative?: boolean;
};

type Props = BaseComponentInjectedProps & ForwardRefInjectedProps & IProps;

/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @extends: TouchableOpacity
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extendslink: https://facebook.github.io/react-native/docs/touchableopacity.html
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.js
 */
class TouchableOpacity extends PureComponent<Props, {active: boolean}> {
  static displayName = 'TouchableOpacity';

  constructor(props: Props) {
    super(props);

    const {throttleTime, throttleOptions} = this.props;

    this.onPress = _.throttle(this.onPress.bind(this), throttleTime, throttleOptions);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
  }

  state = {
    active: false
  };

  getAccessibilityInfo() {
    const {disabled} = this.props;
    return {
      accessibilityRole: 'button',
      accessibilityStates: disabled ? ['disabled'] : []
    };
  }

  onPressIn(...args: any) {
    this.setState({
      active: true
    });
    _.invoke(this.props, 'onPressIn', ...args);
  }

  onPressOut(...args: any) {
    this.setState({
      active: false
    });
    _.invoke(this.props, 'onPressOut', ...args);
  }

  get backgroundColorStyle() {
    const {backgroundColor: propsBackgroundColor, modifiers} = this.props;
    const backgroundColor = propsBackgroundColor || modifiers.backgroundColor;

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
    const {useNative, style, modifiers, forwardedRef, ...others} = this.props;
    const {borderRadius, paddings, margins, alignments, flexStyle} = modifiers;

    if (useNative) {
      return <Incubator.TouchableOpacity {...this.props}/>;
    }

    return (
      // @ts-ignore
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
        ref={forwardedRef}
      />
    );
  }

  onPress() {
    _.invoke(this.props, 'onPress', this.props);
  }
}

export default asBaseComponent<IProps>(forwardRef(TouchableOpacity));
