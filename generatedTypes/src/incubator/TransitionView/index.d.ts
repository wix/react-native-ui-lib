import React from 'react';
import { ViewProps } from '../../components/view';
import { TransitionViewAnimationType } from './useAnimationEndNotifier';
import { TransitionViewDirection, TransitionViewDirectionEnum } from './useAnimatedTranslator';
import { AnimatedTransitionProps } from './useAnimatedTransition';
export { TransitionViewDirection, TransitionViewDirectionEnum, TransitionViewAnimationType };
export interface TransitionViewProps extends AnimatedTransitionProps, ViewProps {
    ref?: any;
}
interface Statics {
    animateOut: () => void;
    directions: typeof TransitionViewDirectionEnum;
}
declare const _default: React.ComponentType<TransitionViewProps> & Statics;
export default _default;
