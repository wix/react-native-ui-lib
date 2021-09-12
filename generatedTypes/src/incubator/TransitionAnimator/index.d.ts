import React, { PropsWithChildren } from 'react';
import { ViewProps } from '../../components/view';
import { ForwardRefInjectedProps } from '../../commons/new';
import { Direction } from './useHiddenLocation';
export { Direction };
export declare type TransitionAnimationEndType = 'in' | 'out';
export interface TransitionAnimatorProps extends ViewProps {
    /**
     * Callback to the animation end.
     */
    onAnimationEnd?: (animationType: TransitionAnimationEndType) => void;
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
