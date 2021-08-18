import React, { PropsWithChildren } from 'react';
import { ViewProps } from '../../components/view';
import { ForwardRefInjectedProps } from '../../commons/new';
import { HiddenLocation } from './useHiddenLocations';
export { HiddenLocation as TransitionLocation };
export declare type TransitionAnimationEndType = 'in' | 'out';
export interface TransitionAnimatorProps extends ViewProps {
    /**
     * Callback to the animation end.
     */
    onAnimationEnd?: (animationType: TransitionAnimationEndType) => void;
    /**
     * If this is given there will be an enter animation from this location.
     */
    enterAnimationLocation?: HiddenLocation;
    /**
     * If this is given there will be an exit animation in this location.
     */
    exitAnimationLocation?: HiddenLocation;
}
declare type Props = PropsWithChildren<TransitionAnimatorProps> & ForwardRefInjectedProps;
interface Statics {
    animateOut: () => void;
}
declare const _default: React.ComponentType<Props> & Statics;
export default _default;
