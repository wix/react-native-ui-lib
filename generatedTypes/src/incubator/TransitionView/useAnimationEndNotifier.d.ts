export declare type TransitionViewAnimationType = 'enter' | 'exit';
export interface AnimationNotifierEndProps {
    /**
     * Callback to the animation end.
     */
    onAnimationEnd?: (animationType: TransitionViewAnimationType) => void;
}
export default function useAnimationEndNotifier(props: AnimationNotifierEndProps): {
    onEnterAnimationEnd: (isFinished: boolean) => void;
    onExitAnimationEnd: (isFinished: boolean) => void;
};
