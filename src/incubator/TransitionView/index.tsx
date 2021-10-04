import React, {PropsWithChildren, useCallback, useImperativeHandle} from 'react';
import {View as RNView, LayoutChangeEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import View, {ViewProps} from '../../components/view';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import useHiddenLocation, {Direction} from './useHiddenLocation';
import {TransitionViewAnimationType} from './useAnimationEndNotifier';
import useAnimatedTransition, {AnimatedTransitionProps} from './useAnimatedTransition';
const AnimatedView = Animated.createAnimatedComponent(View);
export {Direction, TransitionViewAnimationType};

// TODO: might need to create a file for types and create a fake component for docs
export type TransitionViewProps = AnimatedTransitionProps & ViewProps;

type Props = PropsWithChildren<TransitionViewProps> & ForwardRefInjectedProps;
interface Statics {
  animateOut: () => void;
}

const TransitionView = (props: Props) => {
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
  const {exit, animatedStyle} = useAnimatedTransition({hiddenLocation, enterFrom, exitTo, onAnimationEnd});

  useImperativeHandle(forwardedRef,
    () => ({
      animateOut: exit // TODO: should this be renamed as well?
    }),
    [exit]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    hiddenLocationOnLayout(event);
    propsOnLayout?.(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AnimatedView {...others} onLayout={onLayout} style={[propsStyle, animatedStyle]} ref={containerRef}/>;
};

export default forwardRef<Props, Statics>(TransitionView);
