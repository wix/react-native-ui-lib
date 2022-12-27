import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import View from '../view';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import {SliderProps} from '.';

const SliderNew = (props: SliderProps) => {
  // Missing props, ui, custom layout calcs, values conversions (for initial position and callback param), orientation change, RTL
  
  const {useRange, onValueChange, onRangeChange, minimumValue = 0, maximumValue = 1} = props;
  
  enum ThumbType {
    BLUE = 'blue',
    GREEN = 'green'
  }
  const thumbSize = 20;
  const activeTrackWidth = useSharedValue(0);

  const onTrackLayout = useCallback((event) => {
    const trackWidth = event.nativeEvent.layout.width;

    if (useRange) {
      activeTrackWidth.value = trackWidth;
      const thumbX = trackWidth - thumbSize / 2;
      offsetGreen.value = {
        x: thumbX,
        y: 0
      };
      startGreen.value = {
        x: thumbX,
        y: 0
      };
    } else {
      startGreen.value = {
        x: trackWidth,
        y: 0
      };
    }
  }, []);

  const onTrackPress = useCallback((event) => {
    const locationX = event.nativeEvent.locationX;
    if (useRange) {
      if (locationX > offsetGreen.value.x) {
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

  const onChange = (value: number | {min: number, max: number}) => {
    if (useRange) {
      onRangeChange?.({min: value.min, max: value.max});
    } else {
      onValueChange?.(value);
    }
  };

  // const interpolateValues = ({a = 0, b = 100}) => {
  //   const value = useSharedValue(0);
  //   value.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: ['0%', '100%']
  //   });
  // };

  /** gestures and animations */

  const activeThumb = useSharedValue(ThumbType.BLUE);

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});

  const isPressedGreen = useSharedValue(false);
  const offsetGreen = useSharedValue({x: 0, y: 0});
  const startGreen = useSharedValue({x: 0, y: 0});

  const updateBlue = (x: number) => {
    'worklet';
    offset.value = {
      x,
      y: 0
    };
    start.value = {
      x,
      y: 0
    };

    activeTrackWidth.value = useRange ? startGreen.value.x - x : x;
    onChange(useRange ? {min: x, max: startGreen.value.x} : x);
  };

  const updateGreen = (x : number) => {
    'worklet';
    offsetGreen.value = {
      x,
      y: 0
    };
    startGreen.value = {
      x,
      y: 0
    };
    activeTrackWidth.value = x - start.value.x;
    onChange({min: start.value.x, max: x});
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: withSpring(isPressed.value ? 1.2 : 1)}
      ],
      backgroundColor: isPressed.value ? 'lightblue' : 'blue'
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      activeThumb.value = ThumbType.BLUE;
    })
    .onUpdate((e) => {
      const newX = start.value.x + e.translationX;
      if (newX < startGreen.value.x) {
        offset.value = {
          x: newX,
          y: 0
        };
        activeTrackWidth.value = useRange ? startGreen.value.x - offset.value.x : newX;
        runOnJS(onChange)(useRange ? {min: newX, max: startGreen.value.x} : newX);
      }
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: 0
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedStylesGreen = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offsetGreen.value.x},
        {translateY: offsetGreen.value.y},
        {scale: withSpring(isPressedGreen.value ? 1.2 : 1)}
      ],
      backgroundColor: isPressedGreen.value ? 'lightgreen' : 'green'
    };
  });

  const gestureGreen = Gesture.Pan()
    .onBegin(() => {
      isPressedGreen.value = true;
      activeThumb.value = ThumbType.GREEN;
    })
    .onUpdate((e) => {
      const newX = startGreen.value.x + e.translationX;
      if (newX > start.value.x) {
        offsetGreen.value = {
          x: newX,
          y: 0
        };
        activeTrackWidth.value = offsetGreen.value.x - start.value.x;
        runOnJS(onChange)(useRange ? {min: start.value.x, max: newX} : newX);
      }
    })
    .onEnd(() => {
      startGreen.value = {
        x: offsetGreen.value.x,
        y: 0
      };
    })
    .onFinalize(() => {
      isPressedGreen.value = false;
    });

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

export default SliderNew;

const styles = StyleSheet.create({
  container: {
  },
  bgTrack: {
    height: 6,
    backgroundColor: 'grey'
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    height: 6,
    backgroundColor: 'pink'
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    top: -7,
    height: 20,
    backgroundColor: 'transparent'
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -7
  }
});
