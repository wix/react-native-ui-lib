import { HiddenLocation } from '../hooks/useHiddenLocation';
import { TransitionViewDirection } from './useAnimatedTranslator';
import { AnimationNotifierEndProps, TransitionViewAnimationType } from './useAnimationEndNotifier';
export interface AnimatedTransitionProps extends AnimationNotifierEndProps {
    /**
     * Callback to the animation start.
     */
    onAnimationStart?: (animationType: TransitionViewAnimationType) => void;
    /**
     * If this is given there will be an enter animation from this direction.
     */
    enterFrom?: TransitionViewDirection;
    /**
     * If this is given there will be an exit animation to this direction.
     */
    exitTo?: TransitionViewDirection;
}
declare type Props = AnimatedTransitionProps & {
    hiddenLocation: HiddenLocation;
};
export default function useAnimatedTransition(props: Props): {
    exit: () => void;
    animatedStyle: {
        transform: ({
            translateX: number;
            translateY?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
        })[];
        opacity: number;
    };
};
export {};
