import React, {useEffect} from 'react';
import {ViewProps} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  cancelAnimation
} from 'react-native-reanimated';
import {Constants, asBaseComponent} from '../../commons/new';


export type Directions = 'left' | 'right';

export type MarqueeProps = ViewProps & {
  duration?: number;
  direction?: Directions;
  width?: number;
}

const Marquee = (props: MarqueeProps) => {
  const {children, duration = 6000, direction = 'right', width = Constants.screenWidth} = props;
  
  const isRight = direction === 'right';
  const fromValue = isRight ? -width : Constants.screenWidth;
  const toValue = isRight ? Constants.screenWidth : -width;
  const offset = useSharedValue(fromValue);
  
  useEffect(() => {
    offset.value = withRepeat(withTiming(toValue, {duration, easing: Easing.linear}), -1);
    
    return () => { // cleanup
      cancelAnimation(offset);
    };
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}]
    };
  });

  return (
    <Animated.View style={[animatedStyles, {width}]}>
      {children}
    </Animated.View>
  );
};

Marquee.displayName = 'Marquee';
export default asBaseComponent<MarqueeProps>(Marquee);
