import React, {useCallback} from 'react';
import {StyleSheet, ViewProps, ViewStyle, LayoutChangeEvent} from 'react-native';
import {SharedValue, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {Colors} from '../../style';
import View from '../../components/view';
import {Constants} from '../../commons/new';

interface ThumbProps extends ViewProps {
  start: SharedValue<number>;
  end: SharedValue<number>;
  offset: SharedValue<number>;
  stepInterpolatedValue: SharedValue<number>;
  stepInterpolation?: () => number;
  shouldBounceToStep?: boolean;
  gap?: number;
  disabled?: boolean;
  secondary?: boolean;
  defaultStyle?: SharedValue<ViewStyle>;
  activeStyle?: SharedValue<ViewStyle>;
  disableActiveStyling?: boolean;
  hitSlop?: ViewProps['hitSlop'];
  shouldDisableRTL?: boolean;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  enableShadow?: boolean;
}

const SHADOW_RADIUS = 4;
const THUMB_SIZE = 24;

const Thumb = (props: ThumbProps) => {
  const {
    disabled,
    disableActiveStyling,
    activeStyle,
    defaultStyle,
    hitSlop,
    onSeekStart,
    onSeekEnd,
    start,
    end,
    offset,
    shouldDisableRTL,
    shouldBounceToStep,
    stepInterpolatedValue,
    gap = 0,
    secondary,
    enableShadow
  } = props;

  const rtlFix = Constants.isRTL ? -1 : 1;
  const isPressed = useSharedValue(false);
  const thumbSize = useSharedValue({width: THUMB_SIZE, height: THUMB_SIZE});
  const lastOffset = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      lastOffset.value = offset.value;
    })
    .onUpdate(e => {
      onSeekStart?.();
      let newX = lastOffset.value + e.translationX * (shouldDisableRTL ? 1 : rtlFix);

      if (newX < start.value) {
        // adjust start edge
        newX = start.value;
      } else if (newX > end.value) {
        // adjust end edge
        newX = end.value;
      }
      if (!secondary && newX <= gap || 
        secondary && newX >= end.value - gap || 
        newX < end.value - gap && newX > start.value + gap) {
        offset.value = newX;
      }
    })
    .onEnd(() => {
      onSeekEnd?.();
    })
    .onFinalize(() => {
      isPressed.value = false;
      if (shouldBounceToStep) {
        offset.value = Math.round(offset.value / stepInterpolatedValue.value) * stepInterpolatedValue.value;
      }
    });
  gesture.enabled(!disabled);

  // @ts-expect-error should be fixed in version 3.5 (https://github.com/software-mansion/react-native-reanimated/pull/4881)
  const animatedStyle = useAnimatedStyle(() => {
    const customStyle = isPressed.value ? activeStyle?.value : defaultStyle?.value;
    return {
      ...customStyle,
      transform: [
        {translateX: (offset.value - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressed.value ? 1.3 : 1)}
      ]
    };
  });

  const onThumbLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    thumbSize.value = {width, height};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <View
        reanimated
        // @ts-expect-error should be fixed in version 3.5 (https://github.com/software-mansion/react-native-reanimated/pull/4881)
        style={[styles.thumbPosition, enableShadow && styles.thumbShadow, animatedStyle]}
        hitSlop={hitSlop}
        onLayout={onThumbLayout}
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  thumbPosition: {
    position: 'absolute'
  },
  thumbShadow: {
    shadowColor: Colors.rgba(Colors.black, 0.3),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: SHADOW_RADIUS,
    elevation: 2
  }
});

export default Thumb;
