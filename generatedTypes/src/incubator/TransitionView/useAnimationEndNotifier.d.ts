export declare type TransitionViewAnimationType = 'enter' | 'exit';
export interface AnimationNotifierEndProps {
    /**
     * Callback to the animation end.
     */
    onAnimationEnd?: (animationType: TransitionViewAnimationType) => void;
}
export default function useAnimationEndNotifier(props: AnimationNotifierEndProps): {
    onEnterAnimationEnd: (isFinished?: boolean | undefined) => void;
    onExitAnimationEnd: (isFinished?: boolean | undefined) => void;
};
