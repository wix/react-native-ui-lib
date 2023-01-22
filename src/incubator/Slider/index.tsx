import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import React, {useImperativeHandle, useCallback, useMemo} from 'react';
import {StyleSheet, AccessibilityRole, StyleProp, ViewStyle} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate
} from 'react-native-reanimated';
import {forwardRef, ForwardRefInjectedProps, Constants} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import {Colors, Spacings} from '../../style';
import View from '../../components/view';
import {SliderProps} from '../../components/slider';

type Props = SliderProps & ForwardRefInjectedProps;

enum ThumbType {
  DEFAULT = 'default',
  RANGE = 'range'
}
const TRACK_HEIGHT = 6;
const THUMB_SIZE = 24;

// TODO: migrate GradientSlider to use it
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
    setPositions(trackSize.value.width);
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
  const shouldRenderCustomTrack = isFunction(renderTrack);
  const shouldBounceToStep = step > 0;
  const stepXValue = useSharedValue(step);

  const trackSize = useSharedValue({width: 0, height: TRACK_HEIGHT});
  const activeTrackWidth = useSharedValue(0);
  const thumbSize = useSharedValue({width: THUMB_SIZE, height: THUMB_SIZE});
  const rangeGap = useRange && useGap ? Spacings.s2 + thumbSize.value.width : 0;
  
  const defaultThumbStyle: StyleProp<ViewStyle> = [
    styles.thumb,
    {
      backgroundColor: disabled ? Colors.$backgroundDisabled : thumbTintColor || Colors.$backgroundPrimaryHeavy
    }
  ];
  const _thumbStyle = 
    useSharedValue(JSON.parse(JSON.stringify(StyleSheet.flatten(thumbStyle || defaultThumbStyle))));
  const _activeThumbStyle = 
    useSharedValue(activeThumbStyle ? JSON.parse(JSON.stringify(StyleSheet.flatten(activeThumbStyle))) : undefined);

  const getXForValue = (value: number, trackWidth: number) => {
    const range = maximumValue - minimumValue;
    const relativeValue = minimumValue - value;
    const v = minimumValue < 0 ? Math.abs(relativeValue) : value - minimumValue; // for negative values
    const ratio = v / range;
    const x = ratio * trackWidth;
    return x;
  };

  const getValueForX = (x: number) => {
    if (trackSize.value.width) {
      const ratio = x / trackSize.value.width;
      const range = maximumValue - minimumValue;
  
      if (shouldBounceToStep) {
        return Math.max(minimumValue, Math.min(maximumValue, minimumValue + Math.round((ratio * range) / step) * step));
      } else {
        return Math.max(minimumValue, Math.min(maximumValue, ratio * range + minimumValue));
      }
    }
    return 0;
  };

  const setPositions = (trackWidth: number) => {
    validateValues();

    if (useRange) {
      const defaultThumbPosition = getXForValue(initialMinimumValue, trackWidth);
      const rangeThumbPosition = getXForValue(initialMaximumValue, trackWidth);
      
      activeTrackWidth.value = trackWidth - defaultThumbPosition - rangeThumbPosition;
      
      updateDefaultThumb(defaultThumbPosition);
      updateRangeThumb(rangeThumbPosition);
    } else {
      rangeThumbStart.value = {
        x: trackWidth,
        y: 0
      };
      
      updateDefaultThumb(getXForValue(value, trackWidth));
    }
  };

  const validateValues = () => {
    if (minimumValue > maximumValue || useRange && initialMinimumValue > initialMaximumValue) {
      console.error('Your passed values are invalid. Please check if minimum values are not higher than maximum values');
    }
    if (value !== undefined && !inRange(value, minimumValue, maximumValue)) {
      console.error('Your passed value is invalid. Please check that it is in range of the minimum and maximum values');
    }
    if (useRange) {
      if (!inRange(initialMinimumValue, minimumValue, maximumValue) 
        || !inRange(initialMaximumValue, minimumValue, maximumValue)) {
        console.error('Your passed values are invalid. Please check that they are in range of the minimum and maximum values');
      }
    }
  };

  const inRange = (value: number, min: number, max: number) => {
    return value >= min && value <= max;
  };

  /** events */

  const onChange = (value: number | {min: number, max: number}) => {
    if (useRange && !isNumber(value)) {
      const min = shouldDisableRTL ? value.max : value.min;
      const max = shouldDisableRTL ? value.min : value.max;
      onRangeChange?.({min: getValueForX(min), max: getValueForX(max)});
    } else if (isNumber(value)) {
      const val = getValueForX(value);
      onValueChange?.(val);
    }
  };

  const onThumbLayout = useCallback((event) => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    thumbSize.value = {width, height};
  }, []);

  const onTrackLayout = useCallback((event) => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    trackSize.value = {width, height};
    setPositions(width);
  }, []);

  const onTrackPress = useCallback((event) => {
    if (disabled) {
      return;
    }

    let locationX = Math.min(event.nativeEvent.locationX, trackSize.value.width);
    if (Constants.isRTL) {
      locationX = trackSize.value.width - locationX;
    }
    if (shouldBounceToStep) {
      locationX = getStepComputedX(locationX);
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

  const activeThumb = useSharedValue(ThumbType.DEFAULT);

  const isPressedDefault = useSharedValue(false);
  const defaultThumbOffset = useSharedValue({x: 0, y: 0});
  const defaultThumbStart = useSharedValue({x: 0, y: 0});

  const isPressedRange = useSharedValue(false);
  const rangeThumbOffset = useSharedValue({x: 0, y: 0});
  const rangeThumbStart = useSharedValue({x: 0, y: 0});

  const defaultThumbAnimatedStyles = useAnimatedStyle(() => {
    const activeStyle = 
      isPressedDefault.value ? _activeThumbStyle.value : _thumbStyle.value;
    return {
      transform: [
        {translateX: (defaultThumbOffset.value.x - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressedDefault.value ? 1.3 : 1)}
      ],
      top: -(thumbSize.value.height - trackSize.value.height) / 2,
      ...activeStyle
    };
  });

  const rangeThumbAnimatedStyles = useAnimatedStyle(() => {
    const activeStyle = 
      isPressedDefault.value ? _activeThumbStyle.value : _thumbStyle.value;
    return {
      transform: [
        {translateX: (rangeThumbOffset.value.x - thumbSize.value.width / 2) * rtlFix},
        {scale: withSpring(!disableActiveStyling && isPressedRange.value ? 1.3 : 1)}
      ],
      top: -(thumbSize.value.height - trackSize.value.height) / 2,
      ...activeStyle
    };
  });

  const updateDefaultThumb = (x: number) => {
    defaultThumbOffset.value = {
      x,
      y: 0
    };
    defaultThumbStart.value = {
      x,
      y: 0
    };

    activeTrackWidth.value = Math.abs(useRange ? rangeThumbStart.value.x - x : x);
    
    onChange(useRange ? {min: x, max: rangeThumbStart.value.x} : x);
  };

  const updateRangeThumb = (x : number) => {
    rangeThumbOffset.value = {
      x,
      y: 0
    };
    rangeThumbStart.value = {
      x,
      y: 0
    };
    
    activeTrackWidth.value = x - defaultThumbStart.value.x;
    
    onChange({min: defaultThumbStart.value.x, max: x});
  };

  const defaultThumbGesture = Gesture.Pan()
    .onBegin(() => {
      if (disabled) {
        return;
      }

      isPressedDefault.value = true;
      activeThumb.value = ThumbType.DEFAULT;
    })
    .onUpdate((e) => {
      if (disabled) {
        return;
      }

      onSeekStart?.();

      let newX = defaultThumbStart.value.x + e.translationX * (shouldDisableRTL ? 1 : rtlFix);
      if (newX < 0) { // bottom edge
        newX = 0;
      } else if (!useRange && newX > trackSize.value.width) { // top edge
        newX = trackSize.value.width;
      }
      if (newX <= rangeThumbStart.value.x - rangeGap && newX >= 0) { // range
        defaultThumbOffset.value = {
          x: newX,
          y: 0
        };
        
        activeTrackWidth.value = (useRange ? rangeThumbStart.value.x - newX : newX);
        
        runOnJS(onChange)(useRange ? {min: newX, max: rangeThumbStart.value.x} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();

      defaultThumbStart.value = {
        x: defaultThumbOffset.value.x,
        y: 0
      };
    })
    .onFinalize(() => {
      isPressedDefault.value = false;

      if (shouldBounceToStep) {
        const x = defaultThumbOffset.value.x;
        
        const outputRange = [0, trackSize.value.width];
        const inputRange = 
          minimumValue < 0 ? [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
        const stepInterpolated = 
          interpolate(stepXValue.value, inputRange, outputRange);
        
        const newX = Math.round(x / stepInterpolated) * stepInterpolated; // getStepComputedX(x) - worklet error
        runOnJS(updateDefaultThumb)(newX);
      }
    });

  const rangeThumbGesture = Gesture.Pan()
    .onBegin(() => {
      if (disabled) {
        return;
      }

      isPressedRange.value = true;
      activeThumb.value = ThumbType.RANGE;
    })
    .onUpdate((e) => {
      if (disabled) {
        return;
      }

      onSeekStart?.();

      let newX = rangeThumbStart.value.x + e.translationX * (shouldDisableRTL ? 1 : rtlFix);
      if (newX > trackSize.value.width) { // top edge
        newX = trackSize.value.width;
      }
      if (newX >= defaultThumbStart.value.x + rangeGap && newX <= trackSize.value.width) { // range
        rangeThumbOffset.value = {
          x: newX,
          y: 0
        };

        activeTrackWidth.value = rangeThumbOffset.value.x - defaultThumbStart.value.x;
        
        runOnJS(onChange)(useRange ? {min: defaultThumbStart.value.x, max: newX} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();

      rangeThumbStart.value = {
        x: rangeThumbOffset.value.x,
        y: 0
      };
    })
    .onFinalize(() => {
      isPressedRange.value = false;

      if (shouldBounceToStep) {
        const x = rangeThumbOffset.value.x;
        
        const outputRange = [0, trackSize.value.width];
        const inputRange = 
          minimumValue < 0 ? [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
        const stepInterpolated = 
          interpolate(stepXValue.value, inputRange, outputRange);

        const newX = Math.round(x / stepInterpolated) * stepInterpolated; // getStepComputedX(x) - worklet error
        
        runOnJS(updateRangeThumb)(newX);
      }
    });

  const getStepComputedX = (x: number) => {
    'worklet';
    const outputRange = [0, trackSize.value.width];
    const inputRange = 
      minimumValue < 0 ? [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
    const stepInterpolated = Math.abs(interpolate(stepXValue.value, inputRange, outputRange));
    return Math.round(x / stepInterpolated) * stepInterpolated;
  };

  const trackAnimatedStyles = useAnimatedStyle(() => {
    if (useRange) {
      return {
        transform: [
          {translateX: defaultThumbOffset.value.x * rtlFix}
        ],
        width: activeTrackWidth.value
      };
    } else {
      return {
        width: activeTrackWidth.value
      };
    }
  });

  /** renders */

  const renderRangeThumb = () => {
    return (
      <GestureDetector gesture={rangeThumbGesture}>
        <View 
          reanimated
          style={[
            styles.thumbPosition,
            styles.thumbShadow,
            rangeThumbAnimatedStyles
          ]}
          hitSlop={thumbHitSlop}
        />
      </GestureDetector>
    );
  };

  const renderDefaultThumb = () => {
    return (
      <GestureDetector gesture={defaultThumbGesture}>
        <View
          reanimated
          style={[
            styles.thumbPosition,
            styles.thumbShadow,
            defaultThumbAnimatedStyles
          ]}
          hitSlop={thumbHitSlop}
          onLayout={onThumbLayout}
        />
      </GestureDetector>
    );
  };

  const renderCustomTrack = () => {
    return (
      <View
        style={[styles.track, trackStyle, {backgroundColor: maximumTrackTintColor}]}
        onLayout={onTrackLayout}
      >
        {renderTrack?.()}
      </View>
    );
  };

  const renderBackgroundTrack = () => {
    return (
      <View 
        style={[
          styles.track,
          trackStyle,
          {
            backgroundColor: 
              disabled ? Colors.$backgroundNeutralMedium : maximumTrackTintColor || Colors.$backgroundDisabled
          }
        ]} 
        onLayout={onTrackLayout}
      />
    );
  };

  const renderActiveTrack = () => {
    return (
      <View
        reanimated 
        style={[
          styles.track,
          trackStyle,
          styles.activeTrack,
          {
            backgroundColor: 
              disabled ? Colors.$backgroundDisabled : minimumTrackTintColor || Colors.$backgroundPrimaryHeavy
          },
          trackAnimatedStyles
        ]}
      />
    );
  };

  return (
    <View 
      style={[containerStyle, shouldDisableRTL && styles.disableRTL]} 
      testID={testID}
      {...accessibilityProps}
    >
      {shouldRenderCustomTrack ? renderCustomTrack() : renderBackgroundTrack()}
      {!shouldRenderCustomTrack && renderActiveTrack()}
      <View style={styles.touchArea} onTouchEnd={onTrackPress}/>
      {renderDefaultThumb()}
      {useRange && renderRangeThumb()}
    </View>
  );
};

// @ts-expect-error
export default forwardRef<SliderProps, Statics>(Slider);

const styles = StyleSheet.create({
  disableRTL: {
    transform: [{scaleX: -1}]
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2
  },
  activeTrack: {
    ...StyleSheet.absoluteFillObject
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    top: -(THUMB_SIZE - TRACK_HEIGHT) / 2,
    height: THUMB_SIZE,
    backgroundColor: Colors.transparent
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 6,
    borderColor: Colors.$backgroundElevatedLight
  },
  thumbPosition: {
    position: 'absolute'
  },
  thumbShadow: {
    shadowColor: Colors.rgba(Colors.black, 0.3),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 2
  }
});
