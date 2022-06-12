import React, {PropsWithChildren, useCallback, useImperativeHandle, useMemo} from 'react';
import {View as RNView, LayoutChangeEvent} from 'react-native';
import View, {ViewProps} from '../../components/view';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import useHiddenLocation from '../hooks/useHiddenLocation';
import {TransitionViewAnimationType} from './useAnimationEndNotifier';
import {TransitionViewDirection, TransitionViewDirectionEnum} from './useAnimatedTranslator';
import useAnimatedTransition, {AnimatedTransitionProps} from './useAnimatedTransition';
export {TransitionViewDirection, TransitionViewDirectionEnum, TransitionViewAnimationType};

export interface TransitionViewProps extends Omit<AnimatedTransitionProps, 'hiddenLocation'>, ViewProps {
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
  const {animateOut, animatedStyle} = useAnimatedTransition({
    hiddenLocation,
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

  const style = useMemo(() => {
    return [propsStyle, animatedStyle];
  }, [propsStyle, animatedStyle]);

  return <View reanimated {...others} onLayout={onLayout} style={style} ref={containerRef}/>;
};

TransitionView.displayName = 'TransitionView';
TransitionView.directions = TransitionViewDirectionEnum;

// @ts-expect-error TODO: should this be fixed in forwardRef?
export default forwardRef<TransitionViewProps, Statics>(TransitionView);
