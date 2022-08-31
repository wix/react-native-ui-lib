import React, {useEffect, useState, useMemo} from 'react';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing} from 'react-native-reanimated';
import {asBaseComponent, forwardRef} from '../../commons/new';
import {View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {MarqueeProps, MarqueeDirections} from './types';
import {useMeasure} from '../../hooks';

function Marquee(props: MarqueeProps) {
  const {direction = MarqueeDirections.RIGHT, duration = 3000, numberOfReps = -1, children} = props;

  const [offsetValue, setOffsetValue] = useState(0);

  const {ref: childrenRef, measurements: childrenMeasurements} = useMeasure();
  const {ref: containerRef, measurements: containerMeasurements} = useMeasure();

  let axisX = false;
  let axisY = false;

  if (direction === MarqueeDirections.RIGHT || direction === MarqueeDirections.LEFT) {
    axisX = true;
  } else {
    axisY = true;
  }

  const childrenClone = useMemo(() => {
    if (children) {
      return React.cloneElement(children, {
        ref: childrenRef
      });
    }
  }, [children]);

  const offset = useSharedValue(offsetValue);

  const translateXStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withRepeat(withTiming(offset.value, {duration, easing: Easing.bezier(1, 1, 1, 1)}), numberOfReps)
        }
      ]
    };
  }, [offsetValue]);

  const translateYStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withRepeat(withTiming(offset.value, {duration, easing: Easing.bezier(1, 1, 0.5, 0.5)}),
            numberOfReps)
        }
      ]
    };
  }, [offsetValue]);

  useEffect(() => {
    if (childrenMeasurements && containerMeasurements) {
      console.log(`direction:`, direction);
      if (direction === MarqueeDirections.RIGHT) {
        setOffsetValue(-childrenMeasurements.width);
        offset.value = containerMeasurements.width + childrenMeasurements.width;
      }
      if (direction === MarqueeDirections.LEFT) {
        setOffsetValue(containerMeasurements.width);
        offset.value = -(containerMeasurements.width + childrenMeasurements.width);
      }
      if (direction === MarqueeDirections.UP) {
        setOffsetValue(childrenMeasurements.height);
        offset.value = containerMeasurements.height + childrenMeasurements.height;
      }
      if (direction === MarqueeDirections.DOWN) {
        setOffsetValue(-containerMeasurements.height);
        offset.value = -(containerMeasurements.height + childrenMeasurements.height);
      }
    }
  }, [childrenMeasurements, containerMeasurements]);

  return (
    <View flex={axisY} ref={containerRef} style={{overflow: 'hidden'}}>
      <Animated.View
        style={[
          axisX && translateXStyle,
          axisY && translateYStyle,
          {
            right: offsetValue && direction === MarqueeDirections.RIGHT ? -offsetValue : undefined,
            left: offsetValue && direction === MarqueeDirections.LEFT ? offsetValue : undefined,
            top: offsetValue && direction === MarqueeDirections.UP ? -offsetValue : undefined,
            bottom: offsetValue && direction === MarqueeDirections.DOWN ? offsetValue : undefined
          }
        ]}
      >
        {childrenClone}
      </Animated.View>
    </View>
  );
}

export {MarqueeProps, MarqueeDirections};

export default asBaseComponent<MarqueeProps>(forwardRef(Marquee));
