import {useCallback} from 'react';
import {useSharedValue, useAnimatedStyle, withSpring, withTiming} from 'react-native-reanimated';
import {PanningDirections, PanningDirectionsEnum} from '../panView';
export const TransitionViewDirectionEnum = PanningDirectionsEnum;
export type TransitionViewDirection = PanningDirections;

export interface TranslatorProps {
  initialVisibility: boolean;
}

const DEFAULT_ANIMATION_VELOCITY = 300;
const DEFAULT_ANIMATION_CONFIG = {velocity: DEFAULT_ANIMATION_VELOCITY, damping: 18, stiffness: 100, mass: 0.4};

export default function useAnimatedTranslator(props: TranslatorProps) {
  const {initialVisibility} = props;

  // Has to start at {0, 0} with {opacity: 0} so layout can be measured
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  const visible = useSharedValue<boolean>(initialVisibility);

  const init = useCallback((to: {x: number; y: number},
    animationDirection: TransitionViewDirection,
    callback: (isFinished?: boolean) => void) => {
    'worklet';
    // @ts-expect-error
    if ([TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(animationDirection)) {
      translateX.value = withTiming(to.x, {duration: 0}, callback);
      // @ts-expect-error
    } else if ([TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(animationDirection)) {
      translateY.value = withTiming(to.y, {duration: 0}, callback);
    }

    visible.value = true;
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const animate = useCallback((to: {x: number; y: number},
    animationDirection: TransitionViewDirection,
    callback: (isFinished?: boolean) => void) => {
    'worklet';
    // @ts-expect-error
    if ([TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(animationDirection)) {
      translateX.value = withSpring(to.x, DEFAULT_ANIMATION_CONFIG, callback);
      // @ts-expect-error
    } else if ([TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(animationDirection)) {
      translateY.value = withSpring(to.y, DEFAULT_ANIMATION_CONFIG, callback);
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}, {translateY: translateY.value}],
      // TODO: do we want to take the component's opacity here? - I think combining opacities is buggy
      opacity: Number(visible.value)
    };
  }, []);

  return {init, animate, animatedStyle};
}
