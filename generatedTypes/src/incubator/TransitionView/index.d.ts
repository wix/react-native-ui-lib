import React, { PropsWithChildren } from 'react';
import { ViewProps } from '../../components/view';
import { ForwardRefInjectedProps } from '../../commons/new';
import { Direction } from '../hooks/useHiddenLocation';
import { TransitionViewAnimationType } from './useAnimationEndNotifier';
import { AnimatedTransitionProps } from './useAnimatedTransition';
export { Direction, TransitionViewAnimationType };
export declare type TransitionViewProps = AnimatedTransitionProps & ViewProps;
declare type Props = PropsWithChildren<TransitionViewProps> & ForwardRefInjectedProps;
interface Statics {
    animateOut: () => void;
}
declare const _default: React.ComponentType<Props> & Statics;
export default _default;
