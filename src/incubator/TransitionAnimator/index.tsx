/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
  useImperativeHandle
} from 'react';
import {View as RNView, LayoutChangeEvent} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import View, {ViewProps} from '../../components/view';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import useHiddenLocations, {HiddenLocation} from './useHiddenLocations';
const AnimatedView = Animated.createAnimatedComponent(View);

const DEFAULT_ANIMATION_VELOCITY = 300;
const ENTER_ANIMATION_CONFIG = {velocity: DEFAULT_ANIMATION_VELOCITY, damping: 18, stiffness: 300, mass: 0.4};

export type AnimationType = 'in' | 'out';

export interface TransitionAnimatorProps extends ViewProps {
  /**
   * Callback to the animation end.
   */
  onAnimationEnd?: (animationType: AnimationType) => void;
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

type AnimationAxis = 'none' | 'x' | 'y';

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
  const hide = useSharedValue<boolean>(!!enterAnimationLocation);
  const animationAxis = useSharedValue<AnimationAxis>('none');

  const getLocation = (location?: HiddenLocation) => {
    if (location) {
      return hiddenLocations[location];
    } else {
      return 0;
    }
  };

  const translation = useSharedValue<number>(getLocation(enterAnimationLocation));
  const animatedStyle = useAnimatedStyle(() => {
    if (animationAxis.value === 'y') {
      return {
        transform: [{translateY: translation.value}]
      };
    } else if (animationAxis.value === 'x') {
      return {
        transform: [{translateX: translation.value}]
      };
    }

    return {};
  }, [hide]);

  const style = useMemo(() => {
    // animatedStyle has to return an object (and not undefined),
    // this is done to prevent the view from disappearing sometimes (might be a debug only issue, when saving code)
    return [propsStyle, hide.value ? {opacity: 0} : undefined, translation.value !== 0 ? animatedStyle : undefined];
  }, [propsStyle, animatedStyle]);

  const animationEnded = useCallback((animationType: AnimationType) => {
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

  const animateOut = useCallback(() => {
    'worklet';
    if (exitAnimationLocation === 'top' || exitAnimationLocation === 'bottom') {
      animationAxis.value = 'y';
    } else if (exitAnimationLocation === 'left' || exitAnimationLocation === 'right') {
      animationAxis.value = 'x';
    } else {
      return;
    }

    translation.value = withSpring(getLocation(exitAnimationLocation), ENTER_ANIMATION_CONFIG, outAnimationEnd);
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
    translation.value = withSpring(0, ENTER_ANIMATION_CONFIG, inAnimationEnd);
  }, [inAnimationEnd]);

  useEffect(() => {
    if (animationAxis.value !== 'none' && !hiddenLocations.isDefault && enterAnimationLocation) {
      translation.value = withTiming(hiddenLocations[enterAnimationLocation], {duration: 0}, animateIn);
    }
  }, [hiddenLocations.isDefault]);

  const initAnimateIn = useCallback(() => {
    'worklet';
    hide.value = false;
    if (enterAnimationLocation === 'top' || enterAnimationLocation === 'bottom') {
      animationAxis.value = 'y';
    } else if (enterAnimationLocation === 'left' || enterAnimationLocation === 'right') {
      animationAxis.value = 'x';
    }
  }, [enterAnimationLocation]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    hiddenLocationOnLayout(event);
    initAnimateIn();
    propsOnLayout?.(event);
  }, []);

  return <AnimatedView {...others} onLayout={onLayout} style={style} ref={containerRef}/>;
};

export default forwardRef<Props, Statics>(TransitionAnimator);
