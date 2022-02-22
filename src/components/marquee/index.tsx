import React, {useEffect, useRef} from 'react';
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
  direction?: Directions;
  duration?: number;
  width?: number;
}

const Marquee = (props: MarqueeProps) => {
  const {children, duration = 6000, width: propsWidth = Constants.screenWidth, direction = 'right'} = props;
  const container = useRef();
  const isRight = direction === 'right';
  const offset = useSharedValue(-propsWidth);
  
  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      container?.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
        const targetLayoutInWindow = {x, y, width, height};
        if (!isRight) {
          offset.value = targetLayoutInWindow.width + propsWidth;
        }
        const toValue = isRight ? targetLayoutInWindow?.width : -propsWidth;
        offset.value = withRepeat(withTiming(toValue, {duration, easing: Easing.linear}), -1);
      });
    }, 0);
    
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
    // @ts-expect-error
    <View ref={container} style={styles.container}>
      <Animated.View style={[animatedStyles, {width: propsWidth}]}>
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
