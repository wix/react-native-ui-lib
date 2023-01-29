import isNumber from 'lodash/isNumber';
import React, {useImperativeHandle, useCallback, useMemo} from 'react';
import {StyleSheet, AccessibilityRole, StyleProp, ViewStyle} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import {useSharedValue, useAnimatedStyle, withSpring, runOnJS, interpolate} from 'react-native-reanimated';
import {forwardRef, ForwardRefInjectedProps, Constants} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import {Colors, Spacings} from '../../style';
import View from '../../components/view';
import {SliderProps} from '../../components/slider';
import {validateValues, getXForValue, getValueForX, unpackStyle} from './SliderPresenter';
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
    thumbTintColor,
    thumbHitSlop,
    disableActiveStyling,
    disabled,
    accessible,
    testID
  } = props;

  useImperativeHandle(forwardedRef, () => ({
    reset: () => reset()
  }));

  const reset = () => {
    activeThumb.value = ThumbType.DEFAULT;
    setInitialPositions(trackSize.value.width);
    onReset?.();
  };

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
  const rangeGap = useRange && useGap ? Spacings.s2 + thumbSize.value.width : 0;

  const activeThumb = useSharedValue(ThumbType.DEFAULT);
  const isPressedDefault = useSharedValue(false);
  const defaultThumbOffset = useSharedValue({x: 0, y: 0});
  const defaultThumbStart = useSharedValue({x: 0, y: 0});
  const isPressedRange = useSharedValue(false);
  const rangeThumbOffset = useSharedValue({x: 0, y: 0});
  const rangeThumbStart = useSharedValue({x: 0, y: 0});

  const getStepInterpolated = () => {
    'worklet';
    const outputRange = [0, trackSize.value.width];
    const inputRange = minimumValue < 0 ? 
      [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
    return interpolate(stepXValue.value, inputRange, outputRange);
  };

  const setInitialPositions = (trackWidth: number) => {
    validateValues(props);

    if (useRange) {
      const defaultThumbPosition = getXForValue(initialMinimumValue, trackWidth, props);
      const rangeThumbPosition = getXForValue(initialMaximumValue, trackWidth, props);
      activeTrackWidth.value = trackWidth - defaultThumbPosition - rangeThumbPosition;
      updateDefaultThumb(defaultThumbPosition);
      updateRangeThumb(rangeThumbPosition);
    } else {
      rangeThumbStart.value = {x: trackWidth, y: 0};
      updateDefaultThumb(getXForValue(value, trackWidth, props));
    }
  };

  /** events */

  const onChange = (value: number | {min: number; max: number}) => {
    if (useRange && !isNumber(value)) {
      const min = shouldDisableRTL ? value.max : value.min;
      const max = shouldDisableRTL ? value.min : value.max;
      onRangeChange?.({
        min: getValueForX(min, trackSize.value.width, props),
        max: getValueForX(max, trackSize.value.width, props)
      });
    } else if (isNumber(value)) {
      const val = getValueForX(value, trackSize.value.width, props);
      onValueChange?.(val);
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
      if (locationX === defaultThumbOffset.value.x) {
        activeThumb.value = ThumbType.RANGE;
        updateRangeThumb(locationX);
      } else if (locationX === rangeThumbOffset.value.x) {
        activeThumb.value = ThumbType.DEFAULT;
        updateDefaultThumb(locationX);
      } else if (locationX > rangeThumbOffset.value.x) {
        activeThumb.value = ThumbType.RANGE;
        updateRangeThumb(locationX);
      } else if (locationX < defaultThumbOffset.value.x) {
        activeThumb.value = ThumbType.DEFAULT;
        updateDefaultThumb(locationX);
      } else if (locationX > defaultThumbOffset.value.x && locationX < rangeThumbOffset.value.x) {
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

  /** gestures and animations */

  const defaultThumbStyle: StyleProp<ViewStyle> = [
    styles.thumb,
    {backgroundColor: disabled ? Colors.$backgroundDisabled : thumbTintColor || Colors.$backgroundPrimaryHeavy}
  ];
  const _thumbStyle = useSharedValue(unpackStyle(thumbStyle || defaultThumbStyle));
  const _activeThumbStyle = useSharedValue(activeThumbStyle ? unpackStyle(activeThumbStyle) : undefined);

  const trackAnimatedStyles = useAnimatedStyle(() => {
    if (useRange) {
      return {
        transform: [{translateX: defaultThumbOffset.value.x * rtlFix}],
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
        {translateX: (defaultThumbOffset.value.x - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressedDefault.value ? 1.3 : 1)}
      ],
      ...activeStyle
    };
  });

  const rangeThumbAnimatedStyles = useAnimatedStyle(() => {
    const activeStyle = isPressedDefault.value ? _activeThumbStyle.value : _thumbStyle.value;
    return {
      transform: [
        {translateX: (rangeThumbOffset.value.x - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressedRange.value ? 1.3 : 1)}
      ],
      ...activeStyle
    };
  });

  const updateDefaultThumb = (offset: number) => {
    'worklet';
    defaultThumbOffset.value = {x: offset, y: 0};
    defaultThumbStart.value = {x: offset, y: 0};
    activeTrackWidth.value = Math.abs(useRange ? rangeThumbStart.value.x - offset : offset);
    runOnJS(onChange)(useRange ? {min: offset, max: rangeThumbStart.value.x} : offset);
  };

  const updateRangeThumb = (offset: number) => {
    'worklet';
    rangeThumbOffset.value = {x: offset, y: 0};
    rangeThumbStart.value = {x: offset, y: 0};
    activeTrackWidth.value = offset - defaultThumbStart.value.x;
    runOnJS(onChange)({min: defaultThumbStart.value.x, max: offset});
  };

  const defaultThumbGesture = Gesture.Pan()
    .onBegin(() => {
      isPressedDefault.value = true;
      activeThumb.value = ThumbType.DEFAULT;
    })
    .onUpdate(e => {
      onSeekStart?.();
      let newX = defaultThumbStart.value.x + e.translationX * (shouldDisableRTL ? 1 : rtlFix);
      if (newX < 0) { // bottom edge
        newX = 0;
      } else if (!useRange && newX > trackSize.value.width) { // top edge
        newX = trackSize.value.width;
      }
      if (newX <= rangeThumbStart.value.x - rangeGap && newX >= 0) { // range
        defaultThumbOffset.value = {x: newX, y: 0};
        activeTrackWidth.value = useRange ? rangeThumbStart.value.x - newX : newX;
        runOnJS(onChange)(useRange ? {min: newX, max: rangeThumbStart.value.x} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();
      defaultThumbStart.value = {x: defaultThumbOffset.value.x, y: 0};
    })
    .onFinalize(() => {
      isPressedDefault.value = false;
      if (shouldBounceToStep) {
        const interpolated = getStepInterpolated();
        const newX = Math.round(defaultThumbOffset.value.x / interpolated) * interpolated;
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
      let newX = rangeThumbStart.value.x + e.translationX * (shouldDisableRTL ? 1 : rtlFix);
      if (newX > trackSize.value.width) { // top edge
        newX = trackSize.value.width;
      }
      if (newX >= defaultThumbStart.value.x + rangeGap && newX <= trackSize.value.width) { // range
        rangeThumbOffset.value = {x: newX, y: 0};
        activeTrackWidth.value = rangeThumbOffset.value.x - defaultThumbStart.value.x;
        runOnJS(onChange)(useRange ? {min: defaultThumbStart.value.x, max: newX} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();
      rangeThumbStart.value = {x: rangeThumbOffset.value.x, y: 0};
    })
    .onFinalize(() => {
      isPressedRange.value = false;
      if (shouldBounceToStep) {
        const interpolated = getStepInterpolated();
        const newX = Math.round(rangeThumbOffset.value.x / interpolated) * interpolated;
        updateRangeThumb(newX);
      }
    });
  rangeThumbGesture.enabled(!disabled);

  /** renders */

  const renderRangeThumb = () => {
    return (
      <Thumb
        gesture={rangeThumbGesture}
        animatedStyle={rangeThumbAnimatedStyles}
        hitSlop={thumbHitSlop}
        onLayout={onThumbLayout}
      />
    );
  };

  const renderDefaultThumb = () => {
    return (
      <Thumb
        gesture={defaultThumbGesture}
        animatedStyle={defaultThumbAnimatedStyles}
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
      {renderDefaultThumb()}
      {useRange && renderRangeThumb()}
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
