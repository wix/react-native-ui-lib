/// <reference types="react-native-reanimated" />
import { BaseItemProps } from './types';
declare const useDraggableAnimation: (props: BaseItemProps) => {
    dragAfterLongPressGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").SimultaneousGesture;
    draggedAnimatedStyle: {
        transform: {
            translateY: number;
        }[];
        zIndex: number;
    };
    isDragged: import("react-native-reanimated").SharedValue<boolean>;
};
export default useDraggableAnimation;
