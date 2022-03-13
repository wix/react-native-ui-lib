import { BaseItemProps } from './types';
declare const useDraggableAnimation: (props: BaseItemProps) => {
    dragAfterLongPressGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").SimultaneousGesture;
    draggedAnimatedStyle: {
        transform: ({
            scaleY: number;
            translateY?: undefined;
        } | {
            translateY: number;
            scaleY?: undefined;
        })[];
        zIndex: number;
    };
};
export default useDraggableAnimation;
