import _isUndefined from "lodash/isUndefined";
import _throttle from "lodash/throttle";
import React, { PureComponent } from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { asBaseComponent, forwardRef } from "../../commons/new";
import IncubatorTouchableOpacity from "../../incubator/TouchableOpacity";
/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extends: TouchableOpacity
 * @extendsLink: https://reactnative.dev/docs/touchableopacity
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.tsx
 */
class TouchableOpacity extends PureComponent {
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
    this.onPress = _throttle(this.onPress.bind(this), throttleTime, throttleOptions);
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
    if (this.props.activeBackgroundColor) {
      this.setState({
        active: true
      });
    }
    if (this.props?.customValue) {
      this.props.onPressIn?.(this.props);
    } else {
      this.props.onPressIn?.(...args);
    }
  };
  onPressOut = (...args) => {
    if (this.props.activeBackgroundColor) {
      this.setState({
        active: false
      });
    }
    if (this.props?.customValue) {
      this.props.onPressOut?.(this.props);
    } else {
      this.props.onPressOut?.(...args);
    }
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
      activeScale,
      style,
      modifiers,
      forwardedRef,
      recorderTag,
      ...others
    } = this.props;
    const {
      borderRadius,
      paddings,
      margins,
      alignments,
      flexStyle
    } = modifiers;
    if (useNative || !_isUndefined(activeScale)) {
      // @ts-ignore
      return <IncubatorTouchableOpacity fsTagName={recorderTag} {...this.props} />;
    }
    return (
      // @ts-ignore
      <RNTouchableOpacity fsTagName={recorderTag} {...this.getAccessibilityInfo()} {...others} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} onLongPress={this.onLongPress} style={[this.backgroundColorStyle, borderRadius && {
        borderRadius
      }, flexStyle, paddings, margins, alignments, style, this.activeBackgroundStyle]} ref={forwardedRef} />
    );
  }
  onPress(event) {
    this.props.onPress?.({
      ...this.props,
      event
    });
  }
  onLongPress = event => {
    this.props.onLongPress?.({
      ...this.props,
      event
    });
  };
}
const modifiersOptions = {
  borderRadius: true,
  paddings: true,
  margins: true,
  alignments: true,
  flex: true,
  backgroundColor: true
};
export default asBaseComponent(forwardRef(TouchableOpacity), {
  modifiersOptions
});