/* eslint-disable react-hooks/exhaustive-deps */
import React, {PropsWithChildren, useEffect, useCallback, useImperativeHandle} from 'react';
import {View as RNView, LayoutChangeEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import View, {ViewProps} from '../../components/view';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import useHiddenLocation, {Direction} from './useHiddenLocation';
import useAnimatedTranslator from './useAnimatedTranslator';
import useAnimationEndNotifier, {
  TransitionAnimationEndType,
  AnimationNotifierEndProps
} from './useAnimationEndNotifier';
const AnimatedView = Animated.createAnimatedComponent(View);
export {Direction, TransitionAnimationEndType};

export interface TransitionAnimatorProps extends AnimationNotifierEndProps, ViewProps {
  /**
   * If this is given there will be an enter animation from this direction.
   */
  enterFrom?: Direction;
  /**
   * If this is given there will be an exit animation to this direction.
   */
  exitTo?: Direction;
}

type Props = PropsWithChildren<TransitionAnimatorProps> & ForwardRefInjectedProps;
interface Statics {
  animateOut: () => void;
}

const TransitionAnimator = (props: Props) => {
  const {
    onAnimationEnd,
    enterFrom,
    exitTo,
    forwardedRef,
    style: propsStyle,
    onLayout: propsOnLayout,
    ...others
  } = props;
  const containerRef = React.createRef<RNView>();
  const {onLayout: hiddenLocationOnLayout, hiddenLocation} = useHiddenLocation({containerRef});
  const {init, animate, animatedStyle} = useAnimatedTranslator({initialVisibility: !enterFrom});
  const {onEnterAnimationEnd, onExitAnimationEnd} = useAnimationEndNotifier({onAnimationEnd});

  const getLocation = (direction?: Direction) => {
    return {
      x: direction && ['left', 'right'].includes(direction) ? hiddenLocation[direction] : 0,
      y: direction && ['top', 'bottom'].includes(direction) ? hiddenLocation[direction] : 0
    };
  };

  const exit = useCallback(() => {
    'worklet';
    animate(getLocation(exitTo), onExitAnimationEnd, exitTo);
  }, [hiddenLocation, exitTo, onExitAnimationEnd]);

  const enter = useCallback(() => {
    'worklet';
    animate({x: 0, y: 0}, onEnterAnimationEnd, enterFrom);
  }, [onEnterAnimationEnd]);

  useImperativeHandle(forwardedRef,
    () => ({
      animateOut: exit // TODO: should this be renamed as well?
    }),
    [exit]);

  useEffect(() => {
    if (!hiddenLocation.isDefault && enterFrom) {
      const location = getLocation(enterFrom);
      init(location, enter, enterFrom);
    }
  }, [hiddenLocation.isDefault]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    hiddenLocationOnLayout(event);
    propsOnLayout?.(event);
  }, []);

  return <AnimatedView {...others} onLayout={onLayout} style={[propsStyle, animatedStyle]} ref={containerRef}/>;
};

export default forwardRef<Props, Statics>(TransitionAnimator);
