import React from 'react';
import { ViewProps } from '../../components/view';
import { Direction as TransitionViewDirection } from './useHiddenLocation';
import { TransitionViewAnimationType } from './useAnimationEndNotifier';
import { AnimatedTransitionProps } from './useAnimatedTransition';
export { TransitionViewDirection, TransitionViewAnimationType };
export interface TransitionViewProps extends AnimatedTransitionProps, ViewProps {
    ref?: any;
}
interface Statics {
    animateOut: () => void;
}
declare const _default: React.ComponentType<TransitionViewProps> & Statics;
export default _default;
