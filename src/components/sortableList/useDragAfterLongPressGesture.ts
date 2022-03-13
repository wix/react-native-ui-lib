import {useContext} from 'react';
import {useSharedValue, useAnimatedReaction, SharedValue, runOnJS} from 'react-native-reanimated';
import {
  Gesture,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import {BaseItemProps} from './types';
import SortableListContext from './SortableListContext';

export interface DragAfterLongPressGestureProps extends Pick<BaseItemProps, 'index'> {
  isDragged: SharedValue<boolean>;
  ref: any;
  onDragStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void;
  onDragUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
  onDragEnd?: () => void;
}

const useDragAfterLongPressGesture = (props: DragAfterLongPressGestureProps) => {
  const {index, isDragged, ref, onDragStart, onDragUpdate, onDragEnd} = props;

  const {onDragStateChange, onDrag} = useContext(SortableListContext);

  const isLongPressed = useSharedValue<boolean>(false);
  const showDraggedAnimation = useSharedValue<boolean>(false);

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
    .onTouchesMove((event, stateManager) => {
      if (!isDragged.value) {
        if (isLongPressed.value && event.allTouches.length === 1) {
          stateManager.activate();
          isDragged.value = true;
        } else {
          stateManager.fail();
        }
      }
    })
    .onStart(event => {
      if (onDragStateChange) {
        runOnJS(onDragStateChange)(index);
      }

      onDragStart?.(event);
    })
    .onUpdate(event => {
      // TODO: Do we need to move this to onTouchesMove and verify there's still only one touch?
      onDrag?.(event.absoluteY, ref.current);
      onDragUpdate?.(event);
    })
    .onEnd(() => {
      isDragged.value = false;
      onDragEnd?.();
      if (onDragStateChange) {
        runOnJS(onDragStateChange)(undefined);
      }
    });

  const dragAfterLongPressGesture = Gesture.Simultaneous(longPressGesture, dragGesture);

  useAnimatedReaction(() => {
    return isDragged.value || isLongPressed.value;
  },
  (current, previous) => {
    if (previous !== null && current !== previous) {
      showDraggedAnimation.value = current;
    }
  });

  return {dragAfterLongPressGesture, showDraggedAnimation};
};

export default useDragAfterLongPressGesture;
