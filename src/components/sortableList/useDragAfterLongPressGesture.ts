import {useSharedValue, useAnimatedReaction, runOnJS} from 'react-native-reanimated';
import {
  Gesture,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import {HapticService, HapticType} from '../../services';

interface Props {
  onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void;
  onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
  onDragEnd?: () => void;
  hapticComponentName: string | null;
}

const useDragAfterLongPressGesture = (props: Props) => {
  const {onDragStart, onDragUpdate, onDragEnd, hapticComponentName} = props;

  const isDragging = useSharedValue(false);
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
      if (!isDragging.value) {
        if (isLongPressed.value) {
          isDragging.value = true;
          stateManager.activate();
          if (hapticComponentName) {
            // TODO: this should be changed IMO since Android does not support this type - consulting UX
            runOnJS(HapticService.triggerHaptic)(HapticType.selection, hapticComponentName);
          }
        } else {
          isDragging.value = false;
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
      if (isDragging.value) {
        isDragging.value = false;
        isLongPressed.value = false;
      }
    });

  const dragAfterLongPressGesture = Gesture.Simultaneous(longPressGesture, dragGesture);

  useAnimatedReaction(() => {
    return isDragging.value || isLongPressed.value;
  },
  (current, previous) => {
    if (previous !== null && current !== previous) {
      isFloating.value = current;
    }
  });

  return {dragAfterLongPressGesture, isFloating};
};

export default useDragAfterLongPressGesture;
