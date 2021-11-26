import { Animated } from 'react-native';
import { ToastProps } from '../types';
interface UseToastAnimationProps extends Pick<ToastProps, 'visible' | 'preset' | 'position' | 'onAnimationEnd'> {
    toastHeight: number;
    playAccessibilityFeatures: () => void;
    setDismissTimer: () => void;
}
declare const _default: ({ visible, preset, position, toastHeight, onAnimationEnd, setDismissTimer, playAccessibilityFeatures }: UseToastAnimationProps) => {
    isAnimating: boolean | undefined;
    toggleToast: (show?: boolean, { delay }?: {
        delay?: number | undefined;
    }) => void;
    toastOpacity: Animated.AnimatedInterpolation;
    toastTranslateY: Animated.AnimatedInterpolation;
};
export default _default;
