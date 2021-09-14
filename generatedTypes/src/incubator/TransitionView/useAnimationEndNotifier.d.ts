export declare type TransitionAnimationEndType = 'in' | 'out';
export interface AnimationNotifierEndProps {
    /**
     * Callback to the animation end.
     */
    onAnimationEnd?: (animationType: TransitionAnimationEndType) => void;
}
export default function useAnimationEndNotifier(props: AnimationNotifierEndProps): {
    onEnterAnimationEnd: (isFinished: boolean) => void;
    onExitAnimationEnd: (isFinished: boolean) => void;
};
