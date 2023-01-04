import isNumber from 'lodash/isNumber';
import React, {useImperativeHandle, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import View from '../view';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate
} from 'react-native-reanimated';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import {Colors, Spacings} from '../../style';
import {SliderProps} from '.';

type Props = SliderProps & ForwardRefInjectedProps;

enum ThumbType {
  BLUE = 'blue',
  GREEN = 'green'
}
const trackHeight = 6;
const thumbSize = 24;

const SliderNew = (props: Props) => {
  // Missing props, ui, custom layout calcs, orientation change, RTL, Accessibility
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

  const getXForValue = (value: number, trackWidth: number) => {
    const range = maximumValue - minimumValue;
    const relativeValue = minimumValue - value;
    const v = minimumValue < 0 ? Math.abs(relativeValue) : value - minimumValue; // for negatives
    const ratio = v / range;
    const x = ratio * (trackWidth - thumbCenter);
    return x;
  };

  const getValueForX = (x: number) => {
    const ratio = x / (trackWidth.value - thumbCenter);
    const range = maximumValue - minimumValue;

    if (shouldBounceToStep) {
      return Math.max(minimumValue, Math.min(maximumValue, minimumValue + Math.round((ratio * range) / step) * step));
    } else {
      return Math.max(minimumValue, Math.min(maximumValue, ratio * range + minimumValue));
    }
  };

  const onTrackLayout = useCallback((event) => {
    const width = event.nativeEvent.layout.width;
    trackWidth.value = width;
    setPositions(width);
  }, []);

  const setPositions = (trackWidth: number) => {
    if (useRange) {
      const bluePosition = getXForValue(initialMinimumValue, trackWidth);
      const greenPosition = getXForValue(initialMaximumValue, trackWidth);
      activeTrackWidth.value = trackWidth - bluePosition - greenPosition + thumbCenter;
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

  const onTrackPress = useCallback((event) => {
    let locationX = Math.min(event.nativeEvent.locationX, trackWidth.value - thumbCenter);
    console.warn(locationX);
    if (shouldBounceToStep) {
      locationX = getStepComputedX(locationX);
    }
    if (useRange) {
      if (locationX === offset.value.x) {
        activeThumb.value = ThumbType.GREEN;
        updateGreen(locationX);
      } else if (locationX === offsetGreen.value.x) {
        activeThumb.value = ThumbType.BLUE;
        updateBlue(locationX);
      } else if (locationX > offsetGreen.value.x) {
        activeThumb.value = ThumbType.GREEN;
        updateGreen(locationX);
      } else if (locationX < offset.value.x) {
        activeThumb.value = ThumbType.BLUE;
        updateBlue(locationX);
      } else if (locationX > offset.value.x && locationX < offsetGreen.value.x) {
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

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});

  const isPressedGreen = useSharedValue(false);
  const offsetGreen = useSharedValue({x: 0, y: 0});
  const startGreen = useSharedValue({x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: withSpring(isPressed.value ? 1.3 : 1)}
      ],
      backgroundColor: isPressed.value ? 'lightblue' : 'blue'
    };
  });

  const animatedStylesGreen = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offsetGreen.value.x},
        {translateY: offsetGreen.value.y},
        {scale: withSpring(isPressedGreen.value ? 1.3 : 1)}
      ],
      backgroundColor: isPressedGreen.value ? 'lightgreen' : 'green'
    };
  });

  const updateBlue = (x: number) => {
    offset.value = {
      x,
      y: 0
    };
    start.value = {
      x,
      y: 0
    };
    activeTrackWidth.value = Math.abs(useRange ? startGreen.value.x - x : x) + (x > thumbCenter ? thumbCenter : 0);
    onChange(useRange ? {min: x, max: startGreen.value.x} : x);
  };

  const updateGreen = (x : number) => {
    const newX = x;
    offsetGreen.value = {
      x: newX,
      y: 0
    };
    startGreen.value = {
      x: newX,
      y: 0
    };
    activeTrackWidth.value = x - start.value.x + thumbCenter;
    onChange({min: start.value.x, max: x});
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      activeThumb.value = ThumbType.BLUE;
    })
    .onUpdate((e) => {
      onSeekStart?.();
      let newX = start.value.x + e.translationX;
      if (newX < startGreen.value.x - rangeGap && newX > -thumbCenter) {
        newX = Math.min(newX, trackWidth.value - thumbCenter);
        offset.value = {
          x: newX,
          y: 0
        };
        newX = Math.max(0, newX);
        activeTrackWidth.value = (useRange ? startGreen.value.x - offset.value.x : newX) + thumbCenter;
        runOnJS(onChange)(useRange ? {min: newX, max: startGreen.value.x} : newX);
      }
    })
    .onEnd(() => {
      onSeekEnd?.();
      start.value = {
        x: offset.value.x,
        y: 0
      };
    })
    .onFinalize(() => {
      isPressed.value = false;

      if (shouldBounceToStep) {
        const x = offset.value.x;
        const stepInterpolated = 
          interpolate(stepXValue.value, [minimumValue, maximumValue], [0, trackWidth.value - thumbCenter]);
        const newX = Math.round(x / stepInterpolated) * stepInterpolated;
        console.warn('gesture: ', stepInterpolated, newX/* , getStepComputedX(x) */); // worklet error
        runOnJS(updateBlue)(newX === 0 ? -thumbCenter : newX);
      }
    });

  const gestureGreen = Gesture.Pan()
    .onBegin(() => {
      isPressedGreen.value = true;
      activeThumb.value = ThumbType.GREEN;
    })
    .onUpdate((e) => {
      onSeekStart?.();
      const newX = startGreen.value.x + e.translationX;
      if (newX > start.value.x + rangeGap && newX < trackWidth.value - thumbCenter + 1) {
        offsetGreen.value = {
          x: newX,
          y: 0
        };
        activeTrackWidth.value = offsetGreen.value.x - start.value.x + thumbCenter;
        runOnJS(onChange)(useRange ? {min: start.value.x, max: newX} : newX);
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
        const stepInterpolated = 
          interpolate(stepXValue.value, [minimumValue, maximumValue], [0, trackWidth.value - thumbCenter]);
        const newX = Math.round(x / stepInterpolated) * stepInterpolated;
        // console.warn('gestureGreen: ', newX, getStepComputedX(x)); // worklet error
        runOnJS(updateGreen)(newX);
      }
    });

  const getStepComputedX = (x: number) => {
    'worklet';
    const stepInterpolated = 
      interpolate(stepXValue.value, [minimumValue, maximumValue], [0, trackWidth.value - thumbCenter]);
    return Math.round(x / stepInterpolated) * stepInterpolated;
  };

  const trackAnimatedStyles = useAnimatedStyle(() => {
    if (useRange) {
      return {
        transform: [
          {translateX: offset.value.x},
          {translateY: offset.value.y}
        ],
        width: activeTrackWidth.value
      };
    } else {
      return {width: activeTrackWidth.value};
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
        />
      </GestureDetector>
    );
  };

  const renderBlueThumb = () => {
    return (
      <GestureDetector gesture={gesture}>
        <View
          reanimated
          style={[
            styles.thumb,
            animatedStyles
          ]}
        />
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
export default forwardRef<SliderProps, Statics>(SliderNew);

const styles = StyleSheet.create({
  container: {
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
    top: -(thumbSize - trackHeight) / 2
  }
});
