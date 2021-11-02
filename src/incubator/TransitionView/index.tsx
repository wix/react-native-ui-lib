import React, {PropsWithChildren, useCallback, useImperativeHandle} from 'react';
import {View as RNView, LayoutChangeEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import View, {ViewProps} from '../../components/view';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import useHiddenLocation from '../hooks/useHiddenLocation';
import {TransitionViewAnimationType} from './useAnimationEndNotifier';
import {TransitionViewDirection, TransitionViewDirectionEnum} from './useAnimatedTranslator';
import useAnimatedTransition, {AnimatedTransitionProps} from './useAnimatedTransition';
const AnimatedView = Animated.createAnimatedComponent(View);
export {TransitionViewDirection, TransitionViewDirectionEnum, TransitionViewAnimationType};

// TODO: might need to create a file for types and create a fake component for docs
export interface TransitionViewProps extends AnimatedTransitionProps, ViewProps {
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
  const {onLayout: hiddenLocationOnLayout, hiddenLocation} = useHiddenLocation({containerRef});
  const {exit, animatedStyle} = useAnimatedTransition({
    hiddenLocation,
    enterFrom,
    exitTo,
    onAnimationStart,
    onAnimationEnd
  });

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

TransitionView.displayName = 'TransitionView';
TransitionView.directions = TransitionViewDirectionEnum;

// @ts-expect-error TODO: should this be fixed in forwardRef?
export default forwardRef<TransitionViewProps, Statics>(TransitionView);
