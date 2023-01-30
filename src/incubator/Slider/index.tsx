import React, {useImperativeHandle, useCallback, useMemo, useEffect} from 'react';
import {StyleSheet, AccessibilityRole, StyleProp, ViewStyle} from 'react-native';
import {Gesture, PanGesture} from 'react-native-gesture-handler';
import {useSharedValue, useAnimatedStyle, withSpring, runOnJS, interpolate} from 'react-native-reanimated';
import {forwardRef, ForwardRefInjectedProps, Constants} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import {Colors, Spacings} from '../../style';
import View from '../../components/view';
import {SliderProps} from '../../components/slider';
import {validateValues, getOffsetForValue, getValueForOffset, unpackStyle} from './SliderPresenter';
import Thumb from './Thumb';
import Track from './Track';

type Props = SliderProps & ForwardRefInjectedProps;
interface Statics {
  reset: () => void;
}

enum ThumbType {
  DEFAULT = 'default',
  RANGE = 'range'
}
const TRACK_HEIGHT = 6;
const THUMB_SIZE = 24;
const THUMB_BORDER_WIDTH = 6;
const SHADOW_RADIUS = 4;
const GAP = Spacings.s2;

const Slider = (props: Props) => {
  const {
    forwardedRef,
    useRange,
    onValueChange,
    onRangeChange,
    onReset,
    minimumValue = 0,
    maximumValue = 1,
    value = minimumValue,
    initialMinimumValue = minimumValue,
    initialMaximumValue = maximumValue,
    step = 0,
    onSeekStart,
    onSeekEnd,
    useGap,
    disableRTL,
    containerStyle,
    trackStyle,
    minimumTrackTintColor,
    maximumTrackTintColor,
    renderTrack,
    thumbStyle,
    activeThumbStyle,
    thumbTintColor = Colors.$backgroundPrimaryHeavy,
    thumbHitSlop,
    disableActiveStyling,
    disabled,
    accessible,
    testID
  } = props;

  const accessibilityProps = useMemo(() => {
    if (accessible) {
      return {
        accessibilityLabel: 'Slider',
        accessible: true,
        accessibilityRole: 'adjustable' as AccessibilityRole,
        accessibilityStates: disabled ? ['disabled'] : [],
        accessibilityActions: [
          {name: 'increment', label: 'increment'},
          {name: 'decrement', label: 'decrement'}
        ],
        ...extractAccessibilityProps(props)
      };
    }
  }, [accessible, disabled, props]);

  const rtlFix = Constants.isRTL ? -1 : 1;
  const shouldDisableRTL = Constants.isRTL && disableRTL;
  
  const shouldBounceToStep = step > 0;
  const stepXValue = useSharedValue(step);

  const trackSize = useSharedValue({width: 0, height: TRACK_HEIGHT});
  const activeTrackWidth = useSharedValue(0);
  const thumbSize = useSharedValue({width: THUMB_SIZE, height: THUMB_SIZE});
  const rangeGap = useRange && useGap ? GAP + thumbSize.value.width : 0;

  const activeThumb = useSharedValue(ThumbType.DEFAULT);
  const isPressedDefault = useSharedValue(false);
  const defaultThumbOffset = useSharedValue(0);
  const defaultThumbStart = useSharedValue(0);
  const isPressedRange = useSharedValue(false);
  const rangeThumbOffset = useSharedValue(0);
  const rangeThumbStart = useSharedValue(0);

  const defaultThumbStyle: StyleProp<ViewStyle> = useMemo(() => [
    styles.thumb,
    {backgroundColor: disabled ? Colors.$backgroundDisabled : thumbTintColor}
  ], [disabled, thumbTintColor]);
  const _thumbStyle = useSharedValue(unpackStyle(thumbStyle || defaultThumbStyle));
  const _activeThumbStyle = useSharedValue(unpackStyle(activeThumbStyle));

  useEffect(() => {
    if (!thumbStyle) {
      _thumbStyle.value = unpackStyle(defaultThumbStyle);
    }
  }, [defaultThumbStyle, thumbStyle]);

  useImperativeHandle(forwardedRef, () => ({
    reset: () => reset()
  }));

  const reset = () => {
    activeThumb.value = ThumbType.DEFAULT;
    setInitialPositions(trackSize.value.width);
    onReset?.();
  };

  const getStepInterpolated = () => {
    'worklet';
    const outputRange = [0, trackSize.value.width];
    const inputRange = minimumValue < 0 ? 
      [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
    return interpolate(stepXValue.value, inputRange, outputRange);
  };

  const setInitialPositions = (trackWidth: number) => {
    validateValues(props);

    const defaultThumbPosition = getOffsetForValue(useRange ? initialMinimumValue : value, trackWidth, props);
    const rangeThumbPosition = getOffsetForValue(initialMaximumValue, trackWidth, props);
    defaultThumbOffset.value = defaultThumbPosition;
    defaultThumbStart.value = defaultThumbPosition;
    rangeThumbOffset.value = rangeThumbPosition;
    rangeThumbStart.value = useRange ? rangeThumbPosition : trackWidth;
    activeTrackWidth.value = Math.abs(useRange ? rangeThumbPosition - defaultThumbPosition : defaultThumbPosition);
  };

  /** events */

  const onChange = (offset: number | {min: number; max: number}) => {
    'worklet';
    if (offset !== undefined && trackSize.value.width > 0) {
      if (useRange && typeof offset !== 'number') {
        if (onRangeChange) {
          const min = shouldDisableRTL ? offset.max : offset.min;
          const max = shouldDisableRTL ? offset.min : offset.max;
          const minValue = getValueForOffset(min, trackSize.value.width, minimumValue, maximumValue, step);
          const maxValue = getValueForOffset(max, trackSize.value.width, minimumValue, maximumValue, step);
          if (minValue !== initialMinimumValue || maxValue !== initialMaximumValue) {
            runOnJS(onRangeChange)({min: minValue, max: maxValue});
          }
        }
      } else if (typeof offset === 'number') {
        if (onValueChange) {
          const val = getValueForOffset(offset, trackSize.value.width, minimumValue, maximumValue, step);
          runOnJS(onValueChange)(val);
        }
      }
    }
  };

  const onThumbLayout = useCallback(event => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    thumbSize.value = {width, height};
  }, []);

  const onTrackLayout = useCallback(event => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    trackSize.value = {width, height};
    setInitialPositions(width);
  }, []);

  const onTrackPress = useCallback(event => {
    if (disabled) {
      return;
    }

    let locationX = Math.min(event.nativeEvent.locationX, trackSize.value.width);
    if (Constants.isRTL) {
      locationX = trackSize.value.width - locationX;
    }
    if (shouldBounceToStep) {
      const interpolated = Math.abs(getStepInterpolated());
      locationX = Math.round(locationX / interpolated) * interpolated;
    }
    if (useRange) {
      if (locationX === defaultThumbOffset.value) {
        activeThumb.value = ThumbType.RANGE;
        updateRangeThumb(locationX);
      } else if (locationX === rangeThumbOffset.value) {
        activeThumb.value = ThumbType.DEFAULT;
        updateDefaultThumb(locationX);
      } else if (locationX > rangeThumbOffset.value) {
        activeThumb.value = ThumbType.RANGE;
        updateRangeThumb(locationX);
      } else if (locationX < defaultThumbOffset.value) {
        activeThumb.value = ThumbType.DEFAULT;
        updateDefaultThumb(locationX);
      } else if (locationX > defaultThumbOffset.value && locationX < rangeThumbOffset.value) {
        if (activeThumb.value === ThumbType.DEFAULT) {
          updateDefaultThumb(locationX);
        } else {
          updateRangeThumb(locationX);
        }
      }
    } else {
      updateDefaultThumb(locationX);
    }
  }, []);

  /** styles & animations */

  const trackAnimatedStyles = useAnimatedStyle(() => {
    if (useRange) {
      return {
        transform: [{translateX: defaultThumbOffset.value * rtlFix}],
        width: activeTrackWidth.value
      };
    } else {
      return {
        width: activeTrackWidth.value
      };
    }
  });
  
  const defaultThumbAnimatedStyles = useAnimatedStyle(() => {
    const activeStyle = isPressedDefault.value ? _activeThumbStyle.value : _thumbStyle.value;
    return {
      transform: [
        {translateX: (defaultThumbOffset.value - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressedDefault.value ? 1.3 : 1)}
      ],
      ...activeStyle
    };
  });

  const rangeThumbAnimatedStyles = useAnimatedStyle(() => {
    const activeStyle = isPressedRange.value ? _activeThumbStyle.value : _thumbStyle.value;
    return {
      transform: [
        {translateX: (rangeThumbOffset.value - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressedRange.value ? 1.3 : 1)}
      ],
      ...activeStyle
    };
  });

  /** gestures */

  const updateDefaultThumb = (offset: number) => {
    'worklet';
    defaultThumbOffset.value = offset;
    defaultThumbStart.value = offset;
    activeTrackWidth.value = Math.abs(useRange ? rangeThumbStart.value - offset : offset);
    onChange(useRange ? {min: offset, max: rangeThumbStart.value} : offset);
  };

  const updateRangeThumb = (offset: number) => {
    'worklet';
    rangeThumbOffset.value = offset;
    rangeThumbStart.value = offset;
    activeTrackWidth.value = offset - defaultThumbStart.value;
    onChange({min: defaultThumbStart.value, max: offset});
  };

  const defaultThumbGesture = Gesture.Pan()
    .onBegin(() => {
      isPressedDefault.value = true;
      activeThumb.value = ThumbType.DEFAULT;
    })
    .onUpdate(e => {
      onSeekStart?.();
      let newX = defaultThumbStart.value + e.translationX * (shouldDisableRTL ? 1 : rtlFix);
      if (newX < 0) { // adjust start edge
        newX = 0;
      } else if (!useRange && newX > trackSize.value.width) { // adjust end edge
        newX = trackSize.value.width;
      }
      if (newX <= rangeThumbStart.value - rangeGap && newX >= 0) {
        defaultThumbOffset.value = newX;
        activeTrackWidth.value = useRange ? rangeThumbStart.value - newX : newX;
        onChange(useRange ? {min: newX, max: rangeThumbStart.value} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();
      defaultThumbStart.value = defaultThumbOffset.value;
    })
    .onFinalize(() => {
      isPressedDefault.value = false;
      if (shouldBounceToStep) {
        const interpolated = getStepInterpolated();
        const newX = Math.round(defaultThumbOffset.value / interpolated) * interpolated;
        updateDefaultThumb(newX);
      }
    });
  defaultThumbGesture.enabled(!disabled);

  const rangeThumbGesture = Gesture.Pan()
    .onBegin(() => {
      isPressedRange.value = true;
      activeThumb.value = ThumbType.RANGE;
    })
    .onUpdate(e => {
      onSeekStart?.();
      let newX = rangeThumbStart.value + e.translationX * (shouldDisableRTL ? 1 : rtlFix);
      if (newX > trackSize.value.width) { // adjust end edge
        newX = trackSize.value.width;
      }
      if (newX >= defaultThumbStart.value + rangeGap && newX <= trackSize.value.width) {
        rangeThumbOffset.value = newX;
        activeTrackWidth.value = rangeThumbOffset.value - defaultThumbStart.value;
        onChange(useRange ? {min: defaultThumbStart.value, max: newX} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();
      rangeThumbStart.value = rangeThumbOffset.value;
    })
    .onFinalize(() => {
      isPressedRange.value = false;
      if (shouldBounceToStep) {
        const interpolated = getStepInterpolated();
        const newX = Math.round(rangeThumbOffset.value / interpolated) * interpolated;
        updateRangeThumb(newX);
      }
    });
  rangeThumbGesture.enabled(!disabled);

  /** renders */

  const renderThumb = (style: any, gesture: PanGesture) => {
    return (
      <Thumb
        gesture={gesture}
        animatedStyle={style}
        hitSlop={thumbHitSlop}
        onLayout={onThumbLayout}
      />
    );
  };

  const _renderTrack = () => {
    return (
      <Track
        renderTrack={renderTrack}
        onLayout={onTrackLayout}
        onPress={onTrackPress}
        animatedStyle={trackAnimatedStyles}
        disabled={disabled}
        maximumTrackTintColor={maximumTrackTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        trackStyle={trackStyle}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        shouldDisableRTL && styles.disableRTL
      ]}
      testID={testID}
      {...accessibilityProps}
    >
      {_renderTrack()}
      {renderThumb(defaultThumbAnimatedStyles, defaultThumbGesture)}
      {useRange && renderThumb(rangeThumbAnimatedStyles, rangeThumbGesture)}
    </View>
  );
};

// @ts-expect-error
export default forwardRef<SliderProps, Statics>(Slider);

const styles = StyleSheet.create({
  container: {
    height: THUMB_SIZE + SHADOW_RADIUS,
    justifyContent: 'center'
  },
  disableRTL: {
    transform: [{scaleX: -1}]
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: THUMB_BORDER_WIDTH,
    borderColor: Colors.$backgroundElevatedLight
  }
});
