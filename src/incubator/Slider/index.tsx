import _ from 'lodash';
import React, {useImperativeHandle, useCallback, useMemo, useEffect} from 'react';
import {StyleSheet, AccessibilityRole, StyleProp, ViewStyle, GestureResponderEvent, LayoutChangeEvent} from 'react-native';
import {useSharedValue, useAnimatedStyle, runOnJS, useAnimatedReaction, withTiming} from 'react-native-reanimated';
import {forwardRef, ForwardRefInjectedProps, Constants} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import {Colors, Spacings} from '../../style';
import {StyleUtils} from 'utils';
import View from '../../components/view';
import {SliderProps} from '../../components/slider';
import {
  validateValues,
  getOffsetForValue,
  getValueForOffset,
  getStepInterpolated
} from './SliderPresenter';
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

const Slider = React.memo((props: Props) => {
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
    useGap = true,
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

  const rangeGap = useRange && useGap ? GAP + THUMB_SIZE : 0;

  const rtlFix = Constants.isRTL ? -1 : 1;
  const shouldDisableRTL = Constants.isRTL && disableRTL;

  const shouldBounceToStep = step > 0;
  const stepXValue = useSharedValue(step);
  const stepInterpolatedValue = useSharedValue(0);

  const trackSize = useSharedValue({width: 0, height: TRACK_HEIGHT});

  const start = useSharedValue(0);
  const end = useSharedValue(0);
  const defaultThumbOffset = useSharedValue(0);
  const rangeThumbOffset = useSharedValue(0);

  const defaultThumbStyle: StyleProp<ViewStyle> = useMemo(() => [
    styles.thumb, {backgroundColor: disabled ? Colors.$backgroundDisabled : thumbTintColor}
  ], [disabled, thumbTintColor]);
  const _thumbStyle = useSharedValue(StyleUtils.unpackStyle(thumbStyle || defaultThumbStyle, {flatten: true}));
  const _activeThumbStyle = useSharedValue(StyleUtils.unpackStyle(activeThumbStyle, {flatten: true}));

  useEffect(() => {
    if (!thumbStyle) {
      _thumbStyle.value = StyleUtils.unpackStyle(defaultThumbStyle, {flatten: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultThumbStyle, thumbStyle]);

  useImperativeHandle(forwardedRef, () => ({
    reset: () => reset()
  }));

  const reset = () => {
    setInitialPositions(trackSize.value.width);
    onReset?.();
  };

  const setInitialPositions = (trackWidth: number) => {
    validateValues(props);

    const defaultThumbPosition = getOffsetForValue(
      useRange ? initialMinimumValue : value,
      trackWidth,
      minimumValue,
      maximumValue);
    const rangeThumbPosition = getOffsetForValue(initialMaximumValue, trackWidth, minimumValue, maximumValue);
    defaultThumbOffset.value = defaultThumbPosition;
    rangeThumbOffset.value = useRange ? rangeThumbPosition : trackWidth;
  };

  const onValueChangeThrottled = useCallback(_.throttle(value => {
    onValueChange?.(value);
  }, 100), [onValueChange]);

  const onRangeChangeThrottled = useCallback(_.throttle((min, max) => {
    onRangeChange?.({min, max});
  }, 100), [onRangeChange]);

  useAnimatedReaction(() => {
    return Math.round(defaultThumbOffset.value);
  },
  (offset, _prevOffset) => {
    const value = getValueForOffset(offset, trackSize.value.width, minimumValue, maximumValue, stepXValue.value);
    if (useRange) {
      const maxValue = getValueForOffset(rangeThumbOffset.value,
        trackSize.value.width,
        minimumValue,
        maximumValue,
        stepXValue.value);
      runOnJS(onRangeChangeThrottled)(value, maxValue);
    } else {
      runOnJS(onValueChangeThrottled)(value);
    }
  });

  useAnimatedReaction(() => {
    return Math.round(rangeThumbOffset.value);
  },
  (offset, _prevOffset) => {
    const maxValue = getValueForOffset(offset, trackSize.value.width, minimumValue, maximumValue, stepXValue.value);
    const minValue = getValueForOffset(Math.round(defaultThumbOffset.value),
      trackSize.value.width,
      minimumValue,
      maximumValue,
      stepXValue.value);
    runOnJS(onRangeChangeThrottled)(minValue, maxValue);
  });

  /** events */

  const onTrackLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    trackSize.value = {width, height};
    end.value = width;
    stepInterpolatedValue.value = Math.abs(getStepInterpolated(width, minimumValue, maximumValue, stepXValue));
    setInitialPositions(width);
  }, []);

  const onTrackPress = useCallback((event: GestureResponderEvent) => {
    if (disabled) {
      return;
    }

    let locationX = Math.min(event.nativeEvent.locationX, trackSize.value.width);
    if (Constants.isRTL) {
      locationX = trackSize.value.width - locationX;
    }
    if (shouldBounceToStep) {
      locationX = Math.round(locationX / stepInterpolatedValue.value) * stepInterpolatedValue.value;
    }

    if (!useRange) {
      defaultThumbOffset.value = locationX;
    } else {
      const distanceFromDefaultThumb = Math.abs(defaultThumbOffset.value - locationX);
      const distanceFromRangeThumb = Math.abs(rangeThumbOffset.value - locationX);
      const thumbsDistance = Math.abs(defaultThumbOffset.value - rangeThumbOffset.value);

      if (thumbsDistance > rangeGap) {
        if (distanceFromDefaultThumb < distanceFromRangeThumb) {
          defaultThumbOffset.value = locationX;
        } else {
          rangeThumbOffset.value = locationX;
        }
      }
    }
  }, []);

  const trackAnimatedStyles = useAnimatedStyle(() => {
    if (useRange) {
      return {
        transform: [{translateX: withTiming(defaultThumbOffset.value * rtlFix, {duration: 10})}],
        width: withTiming(Math.abs(rangeThumbOffset.value - defaultThumbOffset.value), {duration: 10})
      };
    } else {
      return {
        width: defaultThumbOffset.value
      };
    }
  });

  /** renders */

  const renderThumb = (type: ThumbType) => {
    return (
      <Thumb
        start={type === ThumbType.DEFAULT ? start : defaultThumbOffset}
        end={type === ThumbType.DEFAULT ? rangeThumbOffset : end}
        offset={type === ThumbType.DEFAULT ? defaultThumbOffset : rangeThumbOffset}
        gap={rangeGap}
        secondary={type !== ThumbType.DEFAULT}
        onSeekStart={onSeekStart}
        onSeekEnd={onSeekEnd}
        shouldDisableRTL={shouldDisableRTL}
        disabled={disabled}
        disableActiveStyling={disableActiveStyling}
        defaultStyle={_thumbStyle}
        activeStyle={_activeThumbStyle}
        hitSlop={thumbHitSlop}
        shouldBounceToStep={shouldBounceToStep}
        stepInterpolatedValue={stepInterpolatedValue}
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
      style={[styles.container, containerStyle, shouldDisableRTL && styles.disableRTL]}
      testID={testID}
      {...accessibilityProps}
    >
      {_renderTrack()}
      {renderThumb(ThumbType.DEFAULT)}
      {useRange && renderThumb(ThumbType.RANGE)}
    </View>
  );
});

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
