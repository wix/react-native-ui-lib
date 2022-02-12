import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  interpolateColor,
  runOnJS
} from 'react-native-reanimated';
import {TapGestureHandler, LongPressGestureHandler, State} from 'react-native-gesture-handler';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps} from '../commons/new';
import View, {ViewProps} from '../components/view';
import {Colors} from '../../src/style';

export type TouchableOpacityProps = {
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Background color when actively pressing the touchable
   */
  feedbackColor?: string;
  /**
   * Opacity value when actively pressing the touchable
   */
  activeOpacity?: number;
  /**
   * Scale value when actively pressing the touchable
   */
  activeScale?: number;
  /**
   * Callback for when tapping the touchable
   */
  onPress?: (props: any) => void;
  /**
   * Callback for when long pressing the touchable
   */
  onLongPress?: (props: any) => void;
  /**
   * Pass controlled pressState to track gesture state changes
   */
  pressState?: State;
  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean;
  /**
   * Pass custom style
   */
  style?: ViewProps['style'];
  /**
   * Custom value of any type to pass on to TouchableOpacity and receive back in onPress callback
   */
  customValue?: any;
  onLayout?: (event: LayoutChangeEvent) => void;
  testID?: string;
};

type Props = PropsWithChildren<TouchableOpacityProps & BaseComponentInjectedProps & ForwardRefInjectedProps>;

/**
 * @description: a Better, enhanced TouchableOpacity component
 * @modifiers: flex, margin, padding, background
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TouchableOpacityScreen.js
 */
function TouchableOpacity(props: Props) {
  const {
    children,
    modifiers,
    style,
    disabled,
    forwardedRef,
    feedbackColor,
    activeOpacity = 0.2,
    activeScale = 1,
    ...others
  } = props;
  const {borderRadius, paddings, margins, alignments, flexStyle} = modifiers;

  const isActive = useSharedValue(0);
  /* This flag is for fixing an issue with long press triggering twice
  TODO: Consider revisiting this issue to see if it still occurs */
  const isLongPressed = useSharedValue(false);

  const backgroundColor = useMemo(() => {
    return props.backgroundColor || modifiers.backgroundColor || Colors.transparent;
  }, [props.backgroundColor, modifiers.backgroundColor]);

  const onPress = useCallback(() => {
    props.onPress?.(props);
  }, [props.onPress, props.customValue]);

  const onLongPress = useCallback(() => {
    props.onLongPress?.(props);
  }, [props.onLongPress, props.customValue]);

  const toggleActive = (value: number) => {
    'worklet';
    isActive.value = withTiming(value, {duration: 200});
  };

  const tapGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      toggleActive(1);
    },
    onEnd: () => {
      toggleActive(0);
      runOnJS(onPress)();
    },
    onFail: () => {
      if (!isLongPressed.value) {
        toggleActive(0);
      }
    }
  });

  const longPressGestureHandler = useAnimatedGestureHandler({
    onActive: () => {
      if (!isLongPressed.value) {
        isLongPressed.value = true;
        runOnJS(onLongPress)();
      }
    },
    onFinish: () => {
      toggleActive(0);
      isLongPressed.value = false;
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    const activeColor = feedbackColor || backgroundColor;
    const opacity = interpolate(isActive.value, [0, 1], [1, activeOpacity]);
    const scale = interpolate(isActive.value, [0, 1], [1, activeScale]);

    return {
      backgroundColor: !feedbackColor
        ? backgroundColor
        : interpolateColor(isActive.value, [0, 1], [backgroundColor, activeColor]),
      opacity,
      transform: [{scale}]
    };
  }, [backgroundColor, feedbackColor]);

  const Container = props.onLongPress ? LongPressGestureHandler : View;

  return (
    <TapGestureHandler
      // @ts-expect-error
      onGestureEvent={tapGestureHandler}
      shouldCancelWhenOutside
      enabled={!disabled}
    >
      <Reanimated.View>
        {/* @ts-expect-error */}
        <Container onGestureEvent={longPressGestureHandler} shouldCancelWhenOutside>
          <Reanimated.View
            {...others}
            ref={forwardedRef}
            style={[
              borderRadius && {borderRadius},
              flexStyle,
              paddings,
              margins,
              alignments,
              {backgroundColor},
              style,
              animatedStyle
            ]}
          >
            {children}
          </Reanimated.View>
        </Container>
      </Reanimated.View>
    </TapGestureHandler>
  );
}

TouchableOpacity.displayName = 'Incubator.TouchableOpacity';

export default asBaseComponent<TouchableOpacityProps>(forwardRef<Props>(TouchableOpacity));
