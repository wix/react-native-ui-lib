import React, {PropsWithChildren, useCallback, useImperativeHandle, useMemo} from 'react';
import {View as RNView, LayoutChangeEvent} from 'react-native';
import View, {ViewProps} from '../../components/view';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import useHiddenLocation from '../hooks/useHiddenLocation';
import useAnimatedTransition, {
  AnimatedTransitionProps,
  TransitionViewAnimationType,
  TransitionViewDirection,
  TransitionViewDirectionEnum
} from './useAnimatedTransition';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
export {TransitionViewDirection, TransitionViewDirectionEnum, TransitionViewAnimationType};

export interface TransitionViewProps
  extends Omit<AnimatedTransitionProps, 'hiddenLocation' | 'onInitPosition'>,
    ViewProps {
  ref?: any;
}

type Props = PropsWithChildren<TransitionViewProps> & ForwardRefInjectedProps;
interface Statics {
  animateOut: () => void;
  directions: typeof TransitionViewDirectionEnum;
}

const TransitionView = (props: Props) => {
  const {
    onAnimationStart,
    onAnimationEnd,
    enterFrom,
    exitTo,
    forwardedRef,
    style: propsStyle,
    onLayout: propsOnLayout,
    ...others
  } = props;
  const containerRef = React.createRef<RNView>();
  const opacity = useSharedValue<number>(Number(!enterFrom));
  const {onLayout: hiddenLocationOnLayout, hiddenLocation} = useHiddenLocation({containerRef});

  const onInitPosition = useCallback(() => {
    if (opacity.value === 0) {
      opacity.value = withTiming(1, {duration: 0});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {animateOut, translation} = useAnimatedTransition({
    hiddenLocation,
    onInitPosition,
    enterFrom,
    exitTo,
    onAnimationStart,
    onAnimationEnd
  });

  useImperativeHandle(forwardedRef,
    () => ({
      animateOut
    }),
    [animateOut]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    hiddenLocationOnLayout(event);
    propsOnLayout?.(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translation.x.value}, {translateY: translation.y.value}],
      // TODO: do we want to take the component's opacity here? - I think combining opacities is buggy
      opacity: opacity.value
    };
  }, []);

  const style = useMemo(() => {
    return [propsStyle, animatedStyle];
  }, [propsStyle, animatedStyle]);

  return <View reanimated {...others} onLayout={onLayout} style={style} ref={containerRef}/>;
};

TransitionView.displayName = 'TransitionView';
TransitionView.directions = TransitionViewDirectionEnum;

// @ts-expect-error TODO: should this be fixed in forwardRef?
export default forwardRef<TransitionViewProps, Statics>(TransitionView);
