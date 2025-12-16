import {useCallback} from 'react';
import {useSharedValue, withSpring, withTiming, runOnJS} from 'react-native-reanimated';
import {PanGestureHandlerEventPayload, Gesture} from 'react-native-gesture-handler';
import {
  PanningDirections,
  PanningDirectionsEnum,
  PanningDismissThreshold,
  Frame,
  getTranslation,
  getDismissVelocity,
  DEFAULT_THRESHOLD
} from './panningUtil';
import type {HiddenLocation} from '../../hooks/useHiddenLocation';

export type PanViewDirections = PanningDirections;
export const PanViewDirectionsEnum = PanningDirectionsEnum;
export type PanViewDismissThreshold = PanningDismissThreshold;
export const DEFAULT_DIRECTIONS = [
  PanViewDirectionsEnum.UP,
  PanViewDirectionsEnum.DOWN,
  PanViewDirectionsEnum.LEFT,
  PanViewDirectionsEnum.RIGHT
];

export interface PanGestureProps {
  /**
   * The directions of the allowed pan (default is all)
   * Types: UP, DOWN, LEFT and RIGHT (using PanView.directions.###)
   */
  directions?: PanViewDirections[];
  /**
   * Dismiss the view if over the threshold (translation or velocity).
   */
  dismissible?: boolean;
  /**
   * Animate to start if not dismissed.
   */
  animateToOrigin?: boolean;
  /**
   * Callback to the dismiss animation end
   */
  onDismiss?: () => void;
  /**
   * Should the direction of dragging be locked once a drag has started.
   */
  directionLock?: boolean;
  /**
   * Object to adjust the dismiss threshold limits (eg {x, y, velocity}).
   */
  threshold?: PanViewDismissThreshold;
  hiddenLocation: HiddenLocation;
}

const DEFAULT_ANIMATION_VELOCITY = 300;
export const DEFAULT_ANIMATION_CONFIG = {velocity: DEFAULT_ANIMATION_VELOCITY, damping: 18, stiffness: 100, mass: 0.4};
const SPRING_BACK_ANIMATION_CONFIG = {velocity: DEFAULT_ANIMATION_VELOCITY, damping: 20, stiffness: 300, mass: 0.8};

const usePanGesture = (props: PanGestureProps) => {
  const {
    directions = DEFAULT_DIRECTIONS,
    dismissible,
    animateToOrigin,
    onDismiss,
    directionLock,
    threshold = DEFAULT_THRESHOLD,
    hiddenLocation
  } = props;

  const waitingForDismiss = useSharedValue<boolean>(false);
  const translationX = useSharedValue<number>(0);
  const translationY = useSharedValue<number>(0);
  const initialTranslation = useSharedValue<Frame>({x: 0, y: 0});

  const getTranslationOptions = () => {
    'worklet';
    return {
      directionLock,
      currentTranslation: {x: translationX.value, y: translationY.value}
    };
  };

  const setTranslation = (event: PanGestureHandlerEventPayload, initialTranslation: Frame) => {
    'worklet';
    const result = getTranslation(event, initialTranslation, directions, getTranslationOptions());

    translationX.value = result.x;
    translationY.value = result.y;
  };

  const dismiss = useCallback((isFinished?: boolean) => {
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

  const panGesture = Gesture.Pan()
    .onStart(() => {
      initialTranslation.value = {x: translationX.value, y: translationY.value};
    })
    .onUpdate((event: PanGestureHandlerEventPayload) => {
      setTranslation(event, initialTranslation.value);
    })
    .onEnd((event: PanGestureHandlerEventPayload) => {
      if (dismissible) {
        const velocity = getDismissVelocity(event, directions, getTranslationOptions(), threshold);
        if (velocity) {
          waitingForDismiss.value = true;
          if (translationX.value !== 0 && velocity.x !== undefined && velocity.x !== 0) {
            const toX = velocity.x > 0 ? hiddenLocation.right : hiddenLocation.left;
            const duration = Math.abs((toX - translationX.value) / velocity.x) * 1000;
            translationX.value = withTiming(toX, {duration}, dismiss);
          }

          if (translationY.value !== 0 && velocity.y !== undefined && velocity.y !== 0) {
            const toY = velocity.y > 0 ? hiddenLocation.down : hiddenLocation.up;
            const duration = Math.abs((toY - translationY.value) / velocity.y) * 1000;
            translationY.value = withTiming(toY, {duration}, dismiss);
          }
        } else {
          returnToOrigin();
        }
      } else {
        returnToOrigin();
      }
    });

  return {translation: {x: translationX, y: translationY}, gesture: panGesture, reset};
};

export default usePanGesture;
