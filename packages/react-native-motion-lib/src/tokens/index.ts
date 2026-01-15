import { Easing } from 'react-native-reanimated';

export type Spring = {
  damping: number;
  stiffness: number;
  mass: number;
};

export const Springs: Record<string, Spring> = {
  // Gentle spring (smooth, natural)
  gentle: {
    damping: 30,
    stiffness: 200,
    mass: 1,
  },
  
  // Bouncy spring (playful)
  bouncy: {
    damping: 15,
    stiffness: 300,
    mass: 1,
  },
  
  // Snappy spring (quick response)
  snappy: {
    damping: 20,
    stiffness: 400,
    mass: 0.8,
  },
  
  // Wobbly spring (exaggerated)
  wobbly: {
    damping: 10,
    stiffness: 200,
    mass: 1,
  },
} as const;

export const Easings = {
  linear: Easing.linear,
  ease: Easing.ease,
  easeIn: Easing.in(Easing.quad),
  easeOut: Easing.out(Easing.quad),
  easeInOut: Easing.inOut(Easing.quad),
  bounceOut: Easing.out(Easing.bounce),
  bounceIn: Easing.in(Easing.bounce),
  bounceInOut: Easing.inOut(Easing.bounce),
  backOut: Easing.out(Easing.back(1.7)),
  backIn: Easing.in(Easing.back(1.7)),
  backInOut: Easing.inOut(Easing.back(1.7)),
  elasticOut: Easing.out(Easing.elastic(1)),
  elasticIn: Easing.in(Easing.elastic(1)),
  elasticInOut: Easing.inOut(Easing.elastic(1)),
  sinIn: Easing.in(Easing.sin),
  sinOut: Easing.out(Easing.sin),
  sinInOut: Easing.inOut(Easing.sin),
  cubicIn: Easing.in(Easing.cubic),
  cubicOut: Easing.out(Easing.cubic),
  cubicInOut: Easing.inOut(Easing.cubic),
  bezier1: Easing.bezier(0.33, 1, 0.68, 1),
} as const;
