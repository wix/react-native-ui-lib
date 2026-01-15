import {Easing as ReanimatedEasing, type EasingFunction} from 'react-native-reanimated';

export type Spring = {
  damping: number;
  stiffness: number;
  mass: number;
};

export type Easing = EasingFunction;

export const Springs: Record<string, Spring> = {
  // Gentle spring (smooth, natural)
  gentle: {
    damping: 30,
    stiffness: 200,
    mass: 1
  },
  
  // Bouncy spring (playful)
  bouncy: {
    damping: 15,
    stiffness: 300,
    mass: 1
  },
  
  // Snappy spring (quick response)
  snappy: {
    damping: 20,
    stiffness: 400,
    mass: 0.8
  },
  
  // Wobbly spring (exaggerated)
  wobbly: {
    damping: 10,
    stiffness: 200,
    mass: 1
  }
} as const;

export const Easings = {
  standard: ReanimatedEasing.bezier(0.4, 0.0, 0.2, 1),
  accelerate: ReanimatedEasing.bezier(0.4, 0.0, 1, 1),
  decelerate: ReanimatedEasing.bezier(0.0, 0.0, 0.2, 1),
  sharp: ReanimatedEasing.bezier(0.4, 0.0, 0.6, 1),
  bounce: ReanimatedEasing.bounce,

  linear: ReanimatedEasing.linear,
  ease: ReanimatedEasing.ease,
  easeIn: ReanimatedEasing.in(ReanimatedEasing.quad),
  easeOut: ReanimatedEasing.out(ReanimatedEasing.quad),
  easeInOut: ReanimatedEasing.inOut(ReanimatedEasing.quad),
  bounceOut: ReanimatedEasing.out(ReanimatedEasing.bounce),
  bounceIn: ReanimatedEasing.in(ReanimatedEasing.bounce),
  bounceInOut: ReanimatedEasing.inOut(ReanimatedEasing.bounce),
  backOut: ReanimatedEasing.out(ReanimatedEasing.back(1.7)),
  backIn: ReanimatedEasing.in(ReanimatedEasing.back(1.7)),
  backInOut: ReanimatedEasing.inOut(ReanimatedEasing.back(1.7)),
  elasticOut: ReanimatedEasing.out(ReanimatedEasing.elastic(1)),
  elasticIn: ReanimatedEasing.in(ReanimatedEasing.elastic(1)),
  elasticInOut: ReanimatedEasing.inOut(ReanimatedEasing.elastic(1)),
  sinIn: ReanimatedEasing.in(ReanimatedEasing.sin),
  sinOut: ReanimatedEasing.out(ReanimatedEasing.sin),
  sinInOut: ReanimatedEasing.inOut(ReanimatedEasing.sin),
  cubicIn: ReanimatedEasing.in(ReanimatedEasing.cubic),
  cubicOut: ReanimatedEasing.out(ReanimatedEasing.cubic),
  cubicInOut: ReanimatedEasing.inOut(ReanimatedEasing.cubic),
  bezier1: ReanimatedEasing.bezier(0.33, 1, 0.68, 1)
} as const;

export const Durations = {
  micro: {
    default: 100,
    slow: 150
  },
  small: {
    default: 200,
    slow: 250
  },
  medium: {
    default: 350,
    slow: 400
  },
  complex: {
    default: 600,
    slow: 800
  }
} as const;
