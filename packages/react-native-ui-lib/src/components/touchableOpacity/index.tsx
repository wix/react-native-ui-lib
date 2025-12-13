import _ from 'lodash';
import React, {PureComponent} from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps
} from 'react-native';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  ContainerModifiers,
  BackgroundColorModifier
} from '../../commons/new';
import {RecorderProps} from '../../typings/recorderTypes';
import IncubatorTouchableOpacity from '../../incubator/TouchableOpacity';
import {ViewProps} from '../view';

export interface TouchableOpacityProps
  extends Omit<RNTouchableOpacityProps, 'style' | 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'>,
    ContainerModifiers,
    BackgroundColorModifier,
    RecorderProps {
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
  throttleOptions?: {leading: boolean; trailing: boolean};
  /**
   * Apply background color on TouchableOpacity when active (press is on)
   */
  activeBackgroundColor?: string;
  /**
   * Will apply scale press feedback. This will enforce the useNative prop
   */
  activeScale?: number;
  /**
   * Should use a more native touchable opacity component
   */
  useNative?: boolean;
  /**
   * Custom value of any type to pass on to TouchableOpacity and receive back in onPress callback
   */
  customValue?: any;
  style?: ViewProps['style'];
  onPress?: (props?: (TouchableOpacityProps & {event: GestureResponderEvent}) | any) => void;
  onPressIn?: (
    props?: TouchableOpacityProps | GestureResponderEvent | any
  ) => void | RNTouchableOpacityProps['onPressIn'];
  onPressOut?: (
    props?: TouchableOpacityProps | GestureResponderEvent | any
  ) => void | RNTouchableOpacityProps['onPressOut'];
  onLongPress?: (
    props?: (TouchableOpacityProps & {event: GestureResponderEvent}) | any
  ) => void | RNTouchableOpacityProps['onLongPress'];
  nativeID?: string;
}

type Props = BaseComponentInjectedProps & ForwardRefInjectedProps & TouchableOpacityProps;

/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extends: TouchableOpacity
 * @extendsLink: https://reactnative.dev/docs/touchableopacity
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.tsx
 */
class TouchableOpacity extends PureComponent<Props, {active: boolean}> {
  static displayName = 'TouchableOpacity';

  constructor(props: Props) {
    super(props);

    this.state = {
      active: false
    };

    const {throttleTime = 0, throttleOptions = {leading: true, trailing: false}} = props;
    this.onPress = _.throttle(this.onPress.bind(this), throttleTime, throttleOptions);
  }

  getAccessibilityInfo() {
    const {disabled} = this.props;

    return {
      accessibilityRole: 'button',
      accessibilityStates: disabled ? ['disabled'] : []
    };
  }

  onPressIn = (...args: any) => {
    if (this.props.activeBackgroundColor) {
      this.setState({active: true});
    }
    if (this.props?.customValue) {
      this.props.onPressIn?.(this.props);
    } else {
      this.props.onPressIn?.(...args);
    }
  };

  onPressOut = (...args: any) => {
    if (this.props.activeBackgroundColor) {
      this.setState({active: false});
    }
    if (this.props?.customValue) {
      this.props.onPressOut?.(this.props);
    } else {
      this.props.onPressOut?.(...args);
    }
  };

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
    const {useNative, activeScale, style, modifiers, forwardedRef, recorderTag, ...others} = this.props;
    const {borderRadius, paddings, margins, alignments, flexStyle} = modifiers;

    if (useNative || !_.isUndefined(activeScale)) {
      // @ts-ignore
      return <IncubatorTouchableOpacity fsTagName={recorderTag} {...this.props}/>;
    }

    return (
      // @ts-ignore
      <RNTouchableOpacity
        fsTagName={recorderTag}
        {...this.getAccessibilityInfo()}
        {...others}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}
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

  onPress(event: GestureResponderEvent) {
    this.props.onPress?.({...this.props, event});
  }

  onLongPress = (event: GestureResponderEvent) => {
    this.props.onLongPress?.({...this.props, event});
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

export default asBaseComponent<TouchableOpacityProps>(forwardRef(TouchableOpacity), {modifiersOptions});
