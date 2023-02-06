import React, {useImperativeHandle, useCallback, useMemo, useEffect} from 'react';
import {StyleSheet, AccessibilityRole, StyleProp, ViewStyle} from 'react-native';
import {useSharedValue, useAnimatedStyle, runOnJS} from 'react-native-reanimated';
import {forwardRef, ForwardRefInjectedProps, Constants} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import {Colors, Spacings} from '../../style';
import View from '../../components/view';
import {SliderProps} from '../../components/slider';
import {validateValues, getOffsetForValue, getValueForOffset, unpackStyle, getStepInterpolated} from './SliderPresenter';
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
  const thumbSize = useSharedValue({width: THUMB_SIZE, height: THUMB_SIZE});
  const rangeGap = useRange && useGap ? GAP + thumbSize.value.width : 0;

  const activeThumb = useSharedValue(ThumbType.DEFAULT);
  const start = useSharedValue(0);
  const end = useSharedValue(0);
  const defaultThumbOffset = useSharedValue(0);
  const rangeThumbOffset = useSharedValue(0);

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

  // const getStepInterpolated = () => { // TODO: move to presenter
  //   'worklet';
  //   const outputRange = [0, trackSize.value.width];
  //   const inputRange = minimumValue < 0 ? 
  //     [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
  //   return interpolate(stepXValue.value, inputRange, outputRange);
  // };

  const setInitialPositions = (trackWidth: number) => {
    validateValues(props);

    const defaultThumbPosition = 
      getOffsetForValue(useRange ? initialMinimumValue : value, trackWidth, minimumValue, maximumValue);
    const rangeThumbPosition = getOffsetForValue(initialMaximumValue, trackWidth, minimumValue, maximumValue);
    defaultThumbOffset.value = defaultThumbPosition;
    rangeThumbOffset.value = useRange ? rangeThumbPosition : trackWidth;
  };

  /** events */

  const onChange = () => {
    'worklet';
    if (trackSize.value.width > 0) {
      if (useRange) {
        if (onRangeChange) {
          const min = shouldDisableRTL ? rangeThumbOffset.value : defaultThumbOffset.value;
          const max = shouldDisableRTL ? defaultThumbOffset.value : rangeThumbOffset.value;
          const minValue = getValueForOffset(min, trackSize.value.width, minimumValue, maximumValue, step);
          const maxValue = getValueForOffset(max, trackSize.value.width, minimumValue, maximumValue, step);
          if (minValue !== initialMinimumValue || maxValue !== initialMaximumValue) {
            runOnJS(onRangeChange)({min: minValue, max: maxValue});
          }
        }
      } else if (onValueChange) {
        const val = getValueForOffset(defaultThumbOffset.value, trackSize.value.width, minimumValue, maximumValue, step);
        runOnJS(onValueChange)(val);
      }
    }
  };

  const onTrackLayout = useCallback(event => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    trackSize.value = {width, height};
    end.value = width;
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
      const interpolated = Math.abs(getStepInterpolated(trackSize.value.width, minimumValue, maximumValue, stepXValue));
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

  const trackAnimatedStyles = useAnimatedStyle(() => {
    if (useRange) {
      return {
        transform: [{translateX: defaultThumbOffset.value * rtlFix}],
        width: rangeThumbOffset.value - defaultThumbOffset.value
      };
    } else {
      return {
        width: defaultThumbOffset.value
      };
    }
  });
  
  const updateDefaultThumb = (offset: number) => {
    defaultThumbOffset.value = offset;
    onChange();
  };

  const updateRangeThumb = (offset: number) => {
    rangeThumbOffset.value = offset;
    onChange();
  };

  /** renders */

  // const interpolate = useCallback(() => {
  //   return getStepInterpolated(trackSize.value.width, minimumValue, maximumValue, stepXValue);
  // }, [minimumValue, maximumValue]);

  const renderThumb = (type: ThumbType) => {
    return (
      <Thumb
        start={type === ThumbType.DEFAULT ? start : defaultThumbOffset}
        end={type === ThumbType.DEFAULT ? rangeThumbOffset : end}
        offset={type === ThumbType.DEFAULT ? defaultThumbOffset : rangeThumbOffset}
        rangeGap={rangeGap}
        onChange={onChange}
        onSeekStart={onSeekStart} 
        onSeekEnd={onSeekEnd}
        shouldDisableRTL={shouldDisableRTL}
        disabled={disabled}
        disableActiveStyling={disableActiveStyling}
        defaultStyle={_thumbStyle}
        activeStyle={_activeThumbStyle}
        hitSlop={thumbHitSlop}
        // stepInterpolation={interpolate}
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
      {renderThumb(ThumbType.DEFAULT)}
      {useRange && renderThumb(ThumbType.RANGE)}
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
