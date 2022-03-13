import { SharedValue } from 'react-native-reanimated';
import { GestureStateChangeEvent, GestureUpdateEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { BaseItemProps } from './types';
export interface DragAfterLongPressGestureProps extends Pick<BaseItemProps, 'index'> {
    isDragged: SharedValue<boolean>;
    ref: any;
    onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void;
    onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
    onDragEnd?: () => void;
}
declare const useDragAfterLongPressGesture: (props: DragAfterLongPressGestureProps) => {
    dragAfterLongPressGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").SimultaneousGesture;
    showDraggedAnimation: SharedValue<boolean>;
};
export default useDragAfterLongPressGesture;
