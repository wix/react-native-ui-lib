import React, {useCallback} from 'react';
import {StyleSheet, ViewProps, ViewStyle} from 'react-native';
import {SharedValue, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {Colors, Spacings} from '../../style';
import View from '../../components/view';
import {Constants} from '../../commons/new';

const SHADOW_RADIUS = 4;

export interface Props extends ViewProps {
  defaultStyle?: SharedValue<ViewStyle>;
  activeStyle?: SharedValue<ViewStyle>;
  disableActiveStyling?: boolean;
  hitSlop?: ViewProps['hitSlop'];
  disabled?: boolean;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  onChange?: () => void;
  disableRTL?: boolean;
  start: SharedValue<number>;
  end: SharedValue<number>; 
  offset: SharedValue<number>; 
  shouldDisableRTL?: boolean;
  stepInterpolation?: () => number;
  rangeGap?: number;
}

const THUMB_SIZE = 24;
const GAP = Spacings.s2;

const Thumb = (props: Props) => {
  const {
    disabled,
    disableActiveStyling,
    activeStyle,
    defaultStyle,
    hitSlop,
    onSeekStart,
    onSeekEnd,
    onChange,
    start,
    end,
    offset,
    shouldDisableRTL,
    rangeGap,
    stepInterpolation
  } = props;

  const rtlFix = Constants.isRTL ? -1 : 1;
  const isPressedDefault = useSharedValue(false);
  const thumbSize = useSharedValue({width: THUMB_SIZE, height: THUMB_SIZE});
  // const rangeGap = useRange && useGap ? GAP + thumbSize.value.width : 0;
  const lastOffset = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressedDefault.value = true;
      lastOffset.value = offset.value;
    })
    .onUpdate(e => {
      onSeekStart?.();
      let newX = lastOffset.value + e.translationX * (shouldDisableRTL ? 1 : rtlFix);
      if (newX < 0) { // adjust start edge
        newX = start.value;
      } else if (newX > end.value) { // adjust end edge
        newX = end.value;
      }
      // if (newX <= rangeThumbStart.value - rangeGap && newX >= 0) {
        offset.value = newX;
        onChange?.();
      // }
    })
    .onEnd(() => {
      onSeekEnd?.();
    })
    .onFinalize(() => {
      isPressedDefault.value = false;
      // if (stepInterpolation) {
      //   const interpolated = stepInterpolation();
      //   const newX = Math.round(offset.value / interpolated) * interpolated;
      //   offset.value = newX;
      //   onChange?.();
      // }
    });
  gesture.enabled(!disabled);

  const animatedStyle = useAnimatedStyle(() => {
    const customStyle = isPressedDefault.value ? activeStyle?.value : defaultStyle?.value;
    return {
      ...customStyle,
      transform: [
        {translateX: (offset.value - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressedDefault.value ? 1.3 : 1)}
      ]
    };
  });

  const onThumbLayout = useCallback(event => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    thumbSize.value = {width, height};
  }, []);
  
  return (
    <GestureDetector gesture={gesture}>
      <View
        reanimated
        style={[styles.thumbPosition, styles.thumbShadow, animatedStyle]}
        hitSlop={hitSlop}
        onLayout={onThumbLayout}
      />
    </GestureDetector>
  );
};

export default Thumb;

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
