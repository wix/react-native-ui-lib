/* eslint-disable react-hooks/exhaustive-deps */
import React, {PropsWithChildren, useEffect, useCallback, useImperativeHandle} from 'react';
import {View as RNView, LayoutChangeEvent} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS} from 'react-native-reanimated';
import View, {ViewProps} from '../../components/view';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import useHiddenLocations, {HiddenLocation} from './useHiddenLocations';
const AnimatedView = Animated.createAnimatedComponent(View);
export {HiddenLocation as TransitionLocation};

const DEFAULT_ANIMATION_VELOCITY = 300;
const DEFAULT_ANIMATION_CONFIG = {velocity: DEFAULT_ANIMATION_VELOCITY, damping: 18, stiffness: 300, mass: 0.4};

export type TransitionAnimationEndType = 'in' | 'out';

export interface TransitionAnimatorProps extends ViewProps {
  /**
   * Callback to the animation end.
   */
  onAnimationEnd?: (animationType: TransitionAnimationEndType) => void;
  /**
   * If this is given there will be an enter animation from this location.
   */
  enterAnimationLocation?: HiddenLocation;
  /**
   * If this is given there will be an exit animation in this location.
   */
  exitAnimationLocation?: HiddenLocation;
}

type Props = PropsWithChildren<TransitionAnimatorProps> & ForwardRefInjectedProps;
interface Statics {
  animateOut: () => void;
}

const TransitionAnimator = (props: Props) => {
  const {
    onAnimationEnd,
    enterAnimationLocation,
    exitAnimationLocation,
    forwardedRef,
    style: propsStyle,
    onLayout: propsOnLayout,
    ...others
  } = props;
  const containerRef = React.createRef<RNView>();
  const {onLayout: hiddenLocationOnLayout, hiddenLocations} = useHiddenLocations({containerRef});
  const visible = useSharedValue<boolean>(!enterAnimationLocation);

  const getLocation = (location?: HiddenLocation) => {
    if (location === 'left' || location === 'right') {
      return {x: hiddenLocations[location], y: 0};
    } else if (location === 'top' || location === 'bottom') {
      return {x: 0, y: hiddenLocations[location]};
    } else {
      return {x: 0, y: 0};
    }
  };

  // Has to start at {0, 0} with {opacity: 0} so layout can be measured
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}, {translateY: translateY.value}],
      // TODO: do we want to take the component's opacity here? - I think combining opacities is buggy
      opacity: Number(visible.value)
    };
  }, []);

  const animationEnded = useCallback((animationType: TransitionAnimationEndType) => {
    onAnimationEnd?.(animationType);
  },
  [onAnimationEnd]);

  const outAnimationEnd = useCallback((isFinished: boolean) => {
    'worklet';
    if (isFinished) {
      runOnJS(animationEnded)('out');
    }
  },
  [animationEnded]);

  const animate = (to: {x: number; y: number},
    callback: (isFinished: boolean) => void,
    animationLocation?: HiddenLocation) => {
    'worklet';
    if (animationLocation === 'left' || animationLocation === 'right') {
      translateX.value = withSpring(to.x, DEFAULT_ANIMATION_CONFIG, callback);
    } else if (animationLocation === 'top' || animationLocation === 'bottom') {
      translateY.value = withSpring(to.y, DEFAULT_ANIMATION_CONFIG, callback);
    }
  };

  const animateOut = useCallback(() => {
    'worklet';
    animate(getLocation(exitAnimationLocation), outAnimationEnd, exitAnimationLocation);
  }, [hiddenLocations, exitAnimationLocation, outAnimationEnd]);

  useImperativeHandle(forwardedRef,
    () => ({
      animateOut
    }),
    [animateOut]);

  const inAnimationEnd = useCallback((isFinished: boolean) => {
    'worklet';
    if (isFinished) {
      runOnJS(animationEnded)('in');
    }
  },
  [animationEnded]);

  const animateIn = useCallback(() => {
    'worklet';
    animate({x: 0, y: 0}, inAnimationEnd, enterAnimationLocation);
  }, [inAnimationEnd]);

  useEffect(() => {
    if (!hiddenLocations.isDefault && enterAnimationLocation) {
      const location = getLocation(enterAnimationLocation);
      if (enterAnimationLocation === 'left' || enterAnimationLocation === 'right') {
        translateX.value = withTiming(location.x, {duration: 0}, animateIn);
      } else {
        translateY.value = withTiming(location.y, {duration: 0}, animateIn);
      }

      visible.value = true;
    }
  }, [hiddenLocations.isDefault]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    hiddenLocationOnLayout(event);
    propsOnLayout?.(event);
  }, []);

  return <AnimatedView {...others} onLayout={onLayout} style={[propsStyle, animatedStyle]} ref={containerRef}/>;
};

export default forwardRef<Props, Statics>(TransitionAnimator);
