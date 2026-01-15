import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { View } from 'react-native-ui-lib'; // TODO remove this import
import { Springs } from '../tokens';
import type { Spring } from '../tokens';

type FlipEffectProps = {
  FrontComponent: React.ReactNode;
  BackComponent: React.ReactNode;
  height: number;
  flipped: boolean;
  spring?: Spring;
};

export function FlipEffect({FrontComponent, BackComponent, height, flipped = false, spring = Springs.gentle}: FlipEffectProps) {
  const rotate = useSharedValue(0);
  const zIndexFront = useDerivedValue(() => (rotate.value < 90 ? 1 : 0));
  const zIndexBack = useDerivedValue(() => (rotate.value >= 90 ? 1 : 0));

  const animStyleF = useAnimatedStyle(() => ({
    transform: [
      {rotateY: `${rotate.value}deg`},
    ],
    zIndex: zIndexFront.value,
  }));
  const animStyleB = useAnimatedStyle(() => ({
    transform: [
      {rotateY: `${rotate.value + 180}deg`},
    ],
    zIndex: zIndexBack.value,
  }));

  useEffect(() => {
    rotate.value = withSpring(flipped ? 180 : 0, spring);
  }, [flipped]);
  
  return (
    <>
      <View center height={height}>
        <Animated.View style={[animStyleF, {position: 'absolute' as const}]}>
          {FrontComponent}
        </Animated.View>

        <Animated.View style={[animStyleB, {position: 'absolute' as const} ]}>
          {BackComponent}
        </Animated.View>
      </View>
    </>
  );
}
