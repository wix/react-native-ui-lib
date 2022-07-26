import _ from 'lodash';
import React, {useCallback, useMemo, useState} from 'react';
import {TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps as RNTouchableOpacityProps} from 'react-native';
import {useModifiers, useThemeProps} from 'hooks';
import {ContainerModifiers} from '../../commons/new';
import IncubatorTouchableOpacity from '../../incubator/TouchableOpacity';
import {ViewProps} from '../view';

export interface TouchableOpacityProps extends Omit<RNTouchableOpacityProps, 'style' | 'onPress'>, ContainerModifiers {
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
  onPress?: (props?: TouchableOpacityProps | any) => void;
}

const DEFAULT_THROTTLE_OPTIONS = {leading: true, trailing: false};

/**
 * @description: A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor
 * @modifiers: margins, paddings, alignments, background, borderRadius
 * @extends: TouchableOpacity
 * @extendsLink: https://reactnative.dev/docs/touchableopacity
 * @gif: https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.tsx
 */
function TouchableOpacity(props: TouchableOpacityProps, ref: any) {
  const themeProps = useThemeProps(props, 'TouchableOpacity');
  const {
    useNative,
    activeScale,
    style,
    customValue,
    onPress,
    onPressIn,
    onPressOut,
    backgroundColor: propsBackgroundColor,
    activeBackgroundColor,
    throttleTime = 0,
    throttleOptions = DEFAULT_THROTTLE_OPTIONS,
    ...others
  } = themeProps;
  const {
    borderRadius,
    paddings,
    margins,
    alignments,
    flexStyle,
    backgroundColor: modifiersBackgroundColor
  } = useModifiers(themeProps, {
    borderRadius: true,
    paddings: true,
    margins: true,
    alignments: true,
    flex: true,
    backgroundColor: true
  });
  const [active, setActive] = useState(false);

  const getAccessibilityInfo = () => {
    return {
      accessibilityRole: 'button',
      accessibilityStates: props.disabled ? ['disabled'] : []
    };
  };

  const backgroundColorStyle = useMemo(() => {
    const backgroundColor = propsBackgroundColor || modifiersBackgroundColor;

    if (backgroundColor) {
      return {backgroundColor};
    }
  }, [propsBackgroundColor, modifiersBackgroundColor]);

  const activeBackgroundStyle = useMemo(() => {
    if (active && activeBackgroundColor) {
      return {backgroundColor: activeBackgroundColor};
    }
  }, [active, activeBackgroundColor]);

  const _onPress = useCallback(_.throttle(() => {
    onPress?.(props);
  },
  throttleTime,
  throttleOptions),
  [customValue, onPress, throttleTime, throttleOptions]);

  const _onPressIn = useCallback((...args: any) => {
    setActive(true);
    onPressIn?.(...args);
  },
  [onPressIn]);

  const _onPressOut = useCallback((...args: any) => {
    setActive(false);
    onPressOut?.(...args);
  },
  [onPressOut]);

  if (useNative || !_.isUndefined(activeScale)) {
    // @ts-ignore
    return <IncubatorTouchableOpacity {...props}/>;
  }

  return (
    // @ts-ignore
    <RNTouchableOpacity
      {...getAccessibilityInfo()}
      {...others}
      onPress={_onPress}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      style={[
        backgroundColorStyle,
        borderRadius && {borderRadius},
        flexStyle,
        paddings,
        margins,
        alignments,
        style,
        activeBackgroundStyle
      ]}
      ref={ref}
    />
  );
}

export default React.forwardRef<RNTouchableOpacity, TouchableOpacityProps>(TouchableOpacity);
