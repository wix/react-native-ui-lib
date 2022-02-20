import React, {useEffect} from 'react';
import {StyleSheet, ViewProps, View} from 'react-native';
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
  start?: number;
  end?: number
}

const Marquee = (props: MarqueeProps) => {
  const {children, duration = 6000, direction = 'right', width = Constants.screenWidth, start = 0, end = 0} = props;
  
  const isRight = direction === 'right';
  const fromValue = isRight ? start - end - width : Constants.screenWidth - start - end;
  const toValue = isRight ? Constants.screenWidth - end - start : end - start - width;
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
    <View style={styles.container}>
      <Animated.View style={[animatedStyles, {width}]}>
        {children}
      </Animated.View>
    </View>
  );
};

Marquee.displayName = 'Marquee';
export default asBaseComponent<MarqueeProps>(Marquee);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});
