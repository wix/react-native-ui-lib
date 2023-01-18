import isNumber from 'lodash/isNumber';
import React, {useImperativeHandle, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate
} from 'react-native-reanimated';
import {forwardRef, ForwardRefInjectedProps, Constants} from '../../commons/new';
import {Colors, Spacings} from '../../style';
import View from '../../components/view';
import {SliderProps} from '../../components/slider';

type Props = SliderProps & ForwardRefInjectedProps;

enum ThumbType {
  BLUE = 'blue',
  GREEN = 'green'
}
const trackHeight = 6;
const thumbSize = 24;
const innerThumbPadding = 12;

const Slider = (props: Props) => {
  // negative values, Missing props, ui, custom layout calcs, orientation change, RTL + disable RTL, Accessibility
  const {
    forwardedRef,
    useRange,
    onValueChange,
    onRangeChange,
    minimumValue = 0,
    maximumValue = 1,
    value = minimumValue,
    initialMinimumValue = minimumValue,
    initialMaximumValue = maximumValue,
    step = 0,
    onSeekStart,
    onSeekEnd,
    useGap
  } = props;

  useImperativeHandle(forwardedRef, () => ({
    reset: () => reset()
  }));

  const reset = () => {
    activeThumb.value = ThumbType.BLUE;
    setPositions(trackWidth.value);
    props.onReset?.();
  };

  const thumbCenter = thumbSize / 2;
  const rangeGap = useRange && useGap ? Spacings.s2 + thumbSize : 0;
  const trackWidth = useSharedValue(0);
  const activeTrackWidth = useSharedValue(0);
  const stepXValue = useSharedValue(step);
  const shouldBounceToStep = step > 0;

  const getXForValue = (value: number, trackWidth: number) => {
    const range = maximumValue - minimumValue;
    const relativeValue = minimumValue - value;
    const v = minimumValue < 0 ? Math.abs(relativeValue) : value - minimumValue; // for negative values
    const ratio = v / range;
    const x = ratio * trackWidth;
    return x;
  };

  const getValueForX = (x: number) => {
    const ratio = x / trackWidth.value;
    const range = maximumValue - minimumValue;

    if (shouldBounceToStep) {
      return Math.max(minimumValue, Math.min(maximumValue, minimumValue + Math.round((ratio * range) / step) * step));
    } else {
      return Math.max(minimumValue, Math.min(maximumValue, ratio * range + minimumValue));
    }
  };

  const rtlFix = Constants.isRTL ? -1 : 1;

  const setPositions = (trackWidth: number) => {
    validateValues();
    if (useRange) {
      const bluePosition = getXForValue(initialMinimumValue, trackWidth);
      const greenPosition = getXForValue(initialMaximumValue, trackWidth);
      
      activeTrackWidth.value = trackWidth - bluePosition - greenPosition;
      
      updateBlue(bluePosition);
      updateGreen(greenPosition);
    } else {
      startGreen.value = {
        x: trackWidth,
        y: 0
      };
      updateBlue(getXForValue(value, trackWidth));
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
      const min = value.min;
      const max = value.max;
      onRangeChange?.({min: getValueForX(min), max: getValueForX(max)});
    } else if (isNumber(value)) {
      const val = getValueForX(value);
      onValueChange?.(val);
    }
  };

  const onTrackLayout = useCallback((event) => {
    const width = event.nativeEvent.layout.width;
    trackWidth.value = width;
    setPositions(width);
  }, []);

  const onTrackPress = useCallback((event) => {
    let locationX = Math.min(event.nativeEvent.locationX, trackWidth.value);
    if (Constants.isRTL) {
      locationX = trackWidth.value - locationX;
    }
    if (shouldBounceToStep) {
      locationX = getStepComputedX(locationX);
    }

    if (useRange) {
      if (locationX === offsetBlue.value.x) {
        activeThumb.value = ThumbType.GREEN;
        updateGreen(locationX);
      } else if (locationX === offsetGreen.value.x) {
        activeThumb.value = ThumbType.BLUE;
        updateBlue(locationX);
      } else if (locationX > offsetGreen.value.x) {
        activeThumb.value = ThumbType.GREEN;
        updateGreen(locationX);
      } else if (locationX < offsetBlue.value.x) {
        activeThumb.value = ThumbType.BLUE;
        updateBlue(locationX);
      } else if (locationX > offsetBlue.value.x && locationX < offsetGreen.value.x) {
        if (activeThumb.value === ThumbType.BLUE) {
          updateBlue(locationX);
        } else {
          updateGreen(locationX);
        }
      }
    } else {
      updateBlue(locationX);
    }
  }, []);

  /** gestures and animations */

  const activeThumb = useSharedValue(ThumbType.BLUE);

  const isPressedBlue = useSharedValue(false);
  const offsetBlue = useSharedValue({x: 0, y: 0});
  const startBlue = useSharedValue({x: 0, y: 0});

  const isPressedGreen = useSharedValue(false);
  const offsetGreen = useSharedValue({x: 0, y: 0});
  const startGreen = useSharedValue({x: 0, y: 0});

  const animatedStylesBlue = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: (offsetBlue.value.x - thumbCenter) * rtlFix},
        {scale: withSpring(isPressedBlue.value ? 1.3 : 1)}
      ],
      backgroundColor: isPressedBlue.value ? 'lightblue' : 'blue'
    };
  });

  const animatedStylesGreen = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: (offsetGreen.value.x - thumbCenter) * rtlFix},
        {scale: withSpring(isPressedGreen.value ? 1.3 : 1)}
      ],
      backgroundColor: isPressedGreen.value ? 'lightgreen' : 'green'
    };
  });

  const updateBlue = (x: number) => {
    offsetBlue.value = {
      x,
      y: 0
    };
    startBlue.value = {
      x,
      y: 0
    };

    activeTrackWidth.value = Math.abs(useRange ? startGreen.value.x - x : x);
    
    onChange(useRange ? {min: x, max: startGreen.value.x} : x);
  };

  const updateGreen = (x : number) => {
    offsetGreen.value = {
      x,
      y: 0
    };
    startGreen.value = {
      x,
      y: 0
    };
    
    activeTrackWidth.value = x - startBlue.value.x;
    
    onChange({min: startBlue.value.x, max: x});
  };

  const gestureBlue = Gesture.Pan()
    .onBegin(() => {
      isPressedBlue.value = true;
      activeThumb.value = ThumbType.BLUE;
    })
    .onUpdate((e) => {
      onSeekStart?.();

      let newX = startBlue.value.x + e.translationX * rtlFix;
      if (newX < 0) { // bottom edge
        newX = 0;
      } else if (!useRange && newX > trackWidth.value) { // top edge
        newX = trackWidth.value;
      }
      if (newX <= startGreen.value.x - rangeGap && newX >= 0) { // range
        offsetBlue.value = {
          x: newX,
          y: 0
        };
        
        activeTrackWidth.value = (useRange ? startGreen.value.x - newX : newX);
        
        runOnJS(onChange)(useRange ? {min: newX, max: startGreen.value.x} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();

      startBlue.value = {
        x: offsetBlue.value.x,
        y: 0
      };
    })
    .onFinalize(() => {
      isPressedBlue.value = false;

      if (shouldBounceToStep) {
        const x = offsetBlue.value.x;
        
        const outputRange = [0, trackWidth.value];
        const inputRange = 
          minimumValue < 0 ? [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
        const stepInterpolated = 
          interpolate(stepXValue.value, inputRange, outputRange);
        
        const newX = Math.round(x / stepInterpolated) * stepInterpolated; // getStepComputedX(x) - worklet error
        runOnJS(updateBlue)(newX);
      }
    });

  const gestureGreen = Gesture.Pan()
    .onBegin(() => {
      isPressedGreen.value = true;
      activeThumb.value = ThumbType.GREEN;
    })
    .onUpdate((e) => {
      onSeekStart?.();

      let newX = startGreen.value.x + e.translationX * rtlFix;
      if (newX > trackWidth.value) { // top edge
        newX = trackWidth.value;
      }
      if (newX >= startBlue.value.x + rangeGap && newX <= trackWidth.value) { // range
        offsetGreen.value = {
          x: newX,
          y: 0
        };

        activeTrackWidth.value = offsetGreen.value.x - startBlue.value.x;
        
        runOnJS(onChange)(useRange ? {min: startBlue.value.x, max: newX} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();

      startGreen.value = {
        x: offsetGreen.value.x,
        y: 0
      };
    })
    .onFinalize(() => {
      isPressedGreen.value = false;

      if (shouldBounceToStep) {
        const x = offsetGreen.value.x;
        
        const outputRange = [0, trackWidth.value];
        const inputRange = 
          minimumValue < 0 ? [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
        const stepInterpolated = 
          interpolate(stepXValue.value, inputRange, outputRange);

        const newX = Math.round(x / stepInterpolated) * stepInterpolated; // getStepComputedX(x) - worklet error
        
        runOnJS(updateGreen)(newX);
      }
    });

  const getStepComputedX = (x: number) => {
    'worklet';
    const outputRange = [0, trackWidth.value];
    const inputRange = 
      minimumValue < 0 ? [Math.abs(maximumValue), Math.abs(minimumValue)] : [minimumValue, maximumValue];
    const stepInterpolated = Math.abs(interpolate(stepXValue.value, inputRange, outputRange));
    return Math.round(x / stepInterpolated) * stepInterpolated;
  };

  const trackAnimatedStyles = useAnimatedStyle(() => {
    if (useRange) {
      return {
        transform: [
          {translateX: offsetBlue.value.x * rtlFix}
        ],
        width: activeTrackWidth.value
      };
    } else {
      return {
        width: activeTrackWidth.value
      };
    }
  });

  const renderGreenThumb = () => {
    return (
      <GestureDetector gesture={gestureGreen}>
        <View 
          reanimated
          style={[
            styles.thumb,
            animatedStylesGreen
          ]}
        >
          <View style={styles.innerThumb}/>
        </View>
      </GestureDetector>
    );
  };

  const renderBlueThumb = () => {
    return (
      <GestureDetector gesture={gestureBlue}>
        <View
          reanimated
          style={[
            styles.thumb,
            animatedStylesBlue
          ]}
        >
          <View style={styles.innerThumb}/>
        </View>
      </GestureDetector>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgTrack} onLayout={onTrackLayout}/>
      <View
        reanimated 
        style={[
          styles.track,
          trackAnimatedStyles
        ]}
      />
      <View style={styles.touchArea} onTouchEnd={onTrackPress}/>
      {renderBlueThumb()}
      {useRange && renderGreenThumb()}
    </View>
  );
};

// @ts-expect-error
export default forwardRef<SliderProps, Statics>(Slider);

const styles = StyleSheet.create({
  container: {
    // transform: [{scaleX: -1}]
  },
  bgTrack: {
    backgroundColor: Colors.$backgroundDisabled,
    height: trackHeight,
    borderRadius: trackHeight / 2
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.$backgroundPrimaryHeavy,
    height: trackHeight,
    borderRadius: trackHeight / 2
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    top: -(thumbSize - trackHeight) / 2,
    height: thumbSize,
    backgroundColor: Colors.transparent
  },
  thumb: {
    position: 'absolute',
    width: thumbSize,
    height: thumbSize,
    top: -(thumbSize - trackHeight) / 2,
    borderRadius: thumbSize / 2
  },
  innerThumb: {
    position: 'absolute',
    alignSelf: 'center',
    top: innerThumbPadding / 2,
    width: thumbSize - innerThumbPadding,
    height: thumbSize - innerThumbPadding,
    borderRadius: (thumbSize - 4) / 2,
    backgroundColor: Colors.white
  }
});
