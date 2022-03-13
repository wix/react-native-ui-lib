import { SharedValue } from 'react-native-reanimated';
import { GestureStateChangeEvent, GestureUpdateEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
interface Props {
    isDragged: SharedValue<boolean>;
    onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void;
    onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
    onDragEnd?: () => void;
}
declare const useDragAfterLongPressGesture: (props: Props) => {
    dragAfterLongPressGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").SimultaneousGesture;
    showDraggedAnimation: SharedValue<boolean>;
};
export default useDragAfterLongPressGesture;
