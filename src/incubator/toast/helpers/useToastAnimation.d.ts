import { Animated } from 'react-native';
import { ToastProps } from '../types';
type UseToastAnimationProps = Pick<ToastProps, 'visible' | 'position' | 'onAnimationEnd' | 'enableHapticFeedback'> & {
    toastHeight?: number;
    playAccessibilityFeatures: () => void;
    setTimer: () => void;
};
declare const _default: ({ visible, position, toastHeight, onAnimationEnd, enableHapticFeedback, setTimer, playAccessibilityFeatures }: UseToastAnimationProps) => {
    isAnimating: boolean | undefined;
    toggleToast: (show?: boolean, { delay }?: {
        delay?: number | undefined;
    }) => void;
    opacityStyle: {
        opacity: Animated.AnimatedInterpolation<string | number>;
    };
    translateStyle: {
        transform: {
            translateY: Animated.AnimatedInterpolation<string | number>;
        }[];
    };
};
export default _default;
