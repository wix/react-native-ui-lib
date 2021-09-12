import React, { PropsWithChildren } from 'react';
import { ViewProps } from '../../components/view';
import { ForwardRefInjectedProps } from '../../commons/new';
import { Direction } from './useHiddenLocation';
import { TransitionAnimationEndType, AnimationNotifierEndProps } from './useAnimationEndNotifier';
export { Direction, TransitionAnimationEndType };
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
declare type Props = PropsWithChildren<TransitionAnimatorProps> & ForwardRefInjectedProps;
interface Statics {
    animateOut: () => void;
}
declare const _default: React.ComponentType<Props> & Statics;
export default _default;
