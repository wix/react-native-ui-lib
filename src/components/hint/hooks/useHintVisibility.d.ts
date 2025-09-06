import { Animated } from 'react-native';
export default function useHintVisibility(visible?: boolean): {
    hintUnmounted: boolean;
    visibilityProgress: Animated.Value;
    animateHint: () => void;
};
