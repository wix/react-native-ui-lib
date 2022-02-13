import React, {useEffect} from 'react';
import {ViewProps} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat
} from 'react-native-reanimated';
import {Constants, asBaseComponent} from '../../commons/new';


export type Directions = 'left' | 'right';

export type SlidingViewProps = ViewProps & {
  duration?: number;
  direction?: Directions;
  width?: number;
}

const SlidingView = (props: SlidingViewProps) => {
  const {children, duration = 6000, direction = 'left', width = Constants.screenWidth} = props;
  
  const isLeft = direction === 'left';
  const from = isLeft ? -width : Constants.screenWidth;
  const to = isLeft ? Constants.screenWidth : -width;
  const offset = useSharedValue(from);
  
  useEffect(() => {
    offset.value = withRepeat(withTiming(to, {duration, easing: Easing.linear}), -1);
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

SlidingView.displayName = 'SlidingView';
export default asBaseComponent<SlidingViewProps>(SlidingView);
