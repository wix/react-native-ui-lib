import _pt from "prop-types";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { asBaseComponent, forwardRef } from "../../commons/new";
import IncubatorTouchableOpacity from "../../incubator/TouchableOpacity";

/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @extends: TouchableOpacity
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extendsLink: https://facebook.github.io/react-native/docs/touchableopacity.html
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.tsx
 */
class TouchableOpacity extends PureComponent {
  static propTypes = {
    /**
         * background color for TouchableOpacity
         */
    backgroundColor: _pt.string,

    /**
         * throttle time in MS for onPress callback
         */
    throttleTime: _pt.number,

    /**
         * throttle options {leading, trailing}
         */
    throttleOptions: _pt.shape({
      leading: _pt.bool.isRequired,
      trailing: _pt.bool.isRequired
    }),

    /**
         * Apply background color on TouchableOpacity when active (press is on)
         */
    activeBackgroundColor: _pt.string,

    /**
         * Should use a more native touchable opacity component
         */
    useNative: _pt.bool,

    /**
         * Custom value of any type to pass on to TouchableOpacity and receive back in onPress callback
         */
    customValue: _pt.any,
    onPress: _pt.func
  };
  static displayName = 'TouchableOpacity';

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    const {
      throttleTime = 0,
      throttleOptions = {
        leading: true,
        trailing: false
      }
    } = props;
    this.onPress = _.throttle(this.onPress.bind(this), throttleTime, throttleOptions);
  }

  getAccessibilityInfo() {
    const {
      disabled
    } = this.props;
    return {
      accessibilityRole: 'button',
      accessibilityStates: disabled ? ['disabled'] : []
    };
  }

  onPressIn = (...args) => {
    this.setState({
      active: true
    });

    _.invoke(this.props, 'onPressIn', ...args);
  };
  onPressOut = (...args) => {
    this.setState({
      active: false
    });

    _.invoke(this.props, 'onPressOut', ...args);
  };

  get backgroundColorStyle() {
    const {
      backgroundColor: propsBackgroundColor,
      modifiers
    } = this.props;
    const backgroundColor = propsBackgroundColor || modifiers.backgroundColor;

    if (backgroundColor) {
      return {
        backgroundColor
      };
    }
  }

  get activeBackgroundStyle() {
    const {
      active
    } = this.state;
    const {
      activeBackgroundColor
    } = this.props;

    if (active && activeBackgroundColor) {
      return {
        backgroundColor: activeBackgroundColor
      };
    }
  }

  render() {
    const {
      useNative,
      style,
      modifiers,
      forwardedRef,
      ...others
    } = this.props;
    const {
      borderRadius,
      paddings,
      margins,
      alignments,
      flexStyle
    } = modifiers;

    if (useNative) {
      // @ts-ignore
      return <IncubatorTouchableOpacity {...this.props} />;
    }

    return (// @ts-ignore
      <RNTouchableOpacity {...this.getAccessibilityInfo()} {...others} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} style={[this.backgroundColorStyle, borderRadius && {
        borderRadius
      }, flexStyle, paddings, margins, alignments, style, this.activeBackgroundStyle]} ref={forwardedRef} />
    );
  }

  onPress() {
    _.invoke(this.props, 'onPress', this.props);
  }

}

export default asBaseComponent(forwardRef(TouchableOpacity));