import { useCallback } from 'react';
import { useSharedValue, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { PanningDirectionsEnum, getTranslation, getDismissVelocity, DEFAULT_THRESHOLD } from "./panningUtil";
export const PanViewDirectionsEnum = PanningDirectionsEnum;
export const DEFAULT_DIRECTIONS = [PanViewDirectionsEnum.UP, PanViewDirectionsEnum.DOWN, PanViewDirectionsEnum.LEFT, PanViewDirectionsEnum.RIGHT];
const DEFAULT_ANIMATION_VELOCITY = 300;
export const DEFAULT_ANIMATION_CONFIG = {
  velocity: DEFAULT_ANIMATION_VELOCITY,
  damping: 18,
  stiffness: 100,
  mass: 0.4
};
const SPRING_BACK_ANIMATION_CONFIG = {
  velocity: DEFAULT_ANIMATION_VELOCITY,
  damping: 20,
  stiffness: 300,
  mass: 0.8
};
const usePanGesture = props => {
  const {
    directions = DEFAULT_DIRECTIONS,
    dismissible,
    animateToOrigin,
    onDismiss,
    directionLock,
    threshold = DEFAULT_THRESHOLD,
    hiddenLocation
  } = props;
  const waitingForDismiss = useSharedValue(false);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const initialTranslation = useSharedValue({
    x: 0,
    y: 0
  });
  const getTranslationOptions = () => {
    'worklet';

    return {
      directionLock,
      currentTranslation: {
        x: translationX.value,
        y: translationY.value
      }
    };
  };
  const setTranslation = (event, initialTranslation) => {
    'worklet';

    const result = getTranslation(event, initialTranslation, directions, getTranslationOptions());
    translationX.value = result.x;
    translationY.value = result.y;
  };
  const dismiss = useCallback(isFinished => {
    'worklet';

    if (isFinished && waitingForDismiss.value && onDismiss) {
      waitingForDismiss.value = false;
      runOnJS(onDismiss)();
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [onDismiss]);
  const returnToOrigin = useCallback(() => {
    'worklet';

    if (animateToOrigin) {
      translationX.value = withSpring(0, SPRING_BACK_ANIMATION_CONFIG);
      translationY.value = withSpring(0, SPRING_BACK_ANIMATION_CONFIG);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateToOrigin]);
  const reset = useCallback(() => {
    'worklet';

    translationX.value = withSpring(0, DEFAULT_ANIMATION_CONFIG);
    translationY.value = withSpring(0, DEFAULT_ANIMATION_CONFIG);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateToOrigin]);
  const panGesture = Gesture.Pan().onStart(() => {
    initialTranslation.value = {
      x: translationX.value,
      y: translationY.value
    };
  }).onUpdate(event => {
    setTranslation(event, initialTranslation.value);
  }).onEnd(event => {
    if (dismissible) {
      const velocity = getDismissVelocity(event, directions, getTranslationOptions(), threshold);
      if (velocity) {
        waitingForDismiss.value = true;
        if (translationX.value !== 0 && velocity.x !== undefined && velocity.x !== 0) {
          const toX = velocity.x > 0 ? hiddenLocation.right : hiddenLocation.left;
          const duration = Math.abs((toX - translationX.value) / velocity.x) * 1000;
          translationX.value = withTiming(toX, {
            duration
          }, dismiss);
        }
        if (translationY.value !== 0 && velocity.y !== undefined && velocity.y !== 0) {
          const toY = velocity.y > 0 ? hiddenLocation.down : hiddenLocation.up;
          const duration = Math.abs((toY - translationY.value) / velocity.y) * 1000;
          translationY.value = withTiming(toY, {
            duration
          }, dismiss);
        }
      } else {
        returnToOrigin();
      }
    } else {
      returnToOrigin();
    }
  });
  return {
    translation: {
      x: translationX,
      y: translationY
    },
    gesture: panGesture,
    reset
  };
};
export default usePanGesture;