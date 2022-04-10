import {useSharedValue, useAnimatedReaction, SharedValue} from 'react-native-reanimated';
import {
  Gesture,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';

interface Props {
  isDragged: SharedValue<boolean>;
  onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void;
  onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
  onDragEnd?: () => void;
}

const useDragAfterLongPressGesture = (props: Props) => {
  const {isDragged, onDragStart, onDragUpdate, onDragEnd} = props;

  const isLongPressed = useSharedValue<boolean>(false);
  const isFloating = useSharedValue<boolean>(false);

  const longPressGesture = Gesture.LongPress()
    .minDuration(150)
    .onStart(() => {
      isLongPressed.value = true;
    })
    .onEnd(() => {
      isLongPressed.value = false;
    });

  const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_event, stateManager) => {
      if (!isDragged.value) {
        if (isLongPressed.value) {
          isDragged.value = true;
          stateManager.activate();
        } else {
          isDragged.value = false;
          stateManager.fail();
        }
      }
    })
    .onStart(event => {
      onDragStart?.(event);
    })
    .onUpdate(event => {
      // TODO: Do we need to move this to onTouchesMove and verify there's still only one touch?
      onDragUpdate?.(event);
    })
    .onEnd(() => {
      onDragEnd?.();
    })
    .onFinalize(() => {
      if (isDragged.value) {
        isDragged.value = false;
        isLongPressed.value = false;
      }
    });

  const dragAfterLongPressGesture = Gesture.Simultaneous(longPressGesture, dragGesture);

  useAnimatedReaction(() => {
    return isDragged.value || isLongPressed.value;
  },
  (current, previous) => {
    if (previous !== null && current !== previous) {
      isFloating.value = current;
    }
  });

  return {dragAfterLongPressGesture, isFloating};
};

export default useDragAfterLongPressGesture;
