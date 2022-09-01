import React, {useEffect, useMemo} from 'react';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withRepeat} from 'react-native-reanimated';
import {asBaseComponent, forwardRef} from '../../commons/new';
import {View} from 'react-native-ui-lib';
import {MarqueeProps, MarqueeDirections} from './types';
import {useMeasure} from '../../hooks';

function Marquee(props: MarqueeProps) {
  const {direction = MarqueeDirections.RIGHT, duration = 3000, numberOfReps = -1, children} = props;

  const offset = useSharedValue(undefined);

  const {ref: childrenRef, measurements: childrenMeasurements} = useMeasure();
  const {ref: containerRef, measurements: containerMeasurements} = useMeasure();

  let initialOffset = 0;
  let axisX = false;
  let axisY = false;

  const childrenClone = useMemo(() => {
    if (children) {
      return React.cloneElement(children, {
        ref: childrenRef
      });
    }
  }, [children]);

  if (direction === MarqueeDirections.RIGHT || direction === MarqueeDirections.LEFT) {
    axisX = true;
  } else {
    axisY = true;
  }

  const startAnimation = (fromValue: number, toValue: number, backToValue: number) => {
    initialOffset = fromValue;
    offset.value = initialOffset;

    offset.value = withRepeat(withTiming(toValue, {duration}), numberOfReps, false, finished => {
      if (finished) {
        offset.value = initialOffset;
        offset.value = withTiming(backToValue, {duration: 1500});
      }
    });
  };

  const translateStyle = useAnimatedStyle(() => {
    if (offset.value) {
      return {
        transform: [{translateX: axisX ? offset.value : 0}, {translateY: axisY ? offset.value : 0}]
      };
    }
    return {};
  });

  useEffect(() => {
    if (childrenMeasurements && containerMeasurements) {
      if (direction === MarqueeDirections.RIGHT) {
        startAnimation(-childrenMeasurements.width, containerMeasurements.width, 0);
        return;
      }
      if (direction === MarqueeDirections.LEFT) {
        startAnimation(containerMeasurements.width,
          -childrenMeasurements.width,
          containerMeasurements.width - childrenMeasurements.width);
        return;
      }
      if (direction === MarqueeDirections.UP) {
        startAnimation(containerMeasurements.height,
          -childrenMeasurements.height,
          containerMeasurements.height - childrenMeasurements.height);
        return;
      }
      if (direction === MarqueeDirections.DOWN) {
        startAnimation(-childrenMeasurements.height, containerMeasurements.height, 0);
        return;
      }
    }
  }, [childrenMeasurements, containerMeasurements]);

  return (
    <View flex={axisY} ref={containerRef} style={{overflow: 'hidden'}}>
      <Animated.View style={[translateStyle]}>{childrenClone}</Animated.View>
    </View>
  );
}

export {MarqueeProps, MarqueeDirections};

export default asBaseComponent<MarqueeProps>(forwardRef(Marquee));
