import React, { PropsWithChildren } from 'react';
import { ViewProps } from '../../components/view';
import { ForwardRefInjectedProps } from '../../commons/new';
import { Direction } from './useHiddenLocation';
import { TransitionAnimationEndType } from './useAnimationEndNotifier';
import { AnimatedTransitionProps } from './useAnimatedTransition';
export { Direction, TransitionAnimationEndType };
export declare type TransitionAnimatorProps = AnimatedTransitionProps & ViewProps;
declare type Props = PropsWithChildren<TransitionAnimatorProps> & ForwardRefInjectedProps;
interface Statics {
    animateOut: () => void;
}
declare const _default: React.ComponentType<Props> & Statics;
export default _default;
