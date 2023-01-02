import {useCallback} from 'react';
import {PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import {useSharedValue, useAnimatedGestureHandler, runOnJS} from 'react-native-reanimated';
import {
  PanningDirections,
  PanningDirectionsEnum,
  PanningDismissThreshold,
  Frame,
  getTranslation,
  getDismissVelocity,
  DEFAULT_THRESHOLD
} from './panningUtil';
import type {HiddenLocation} from '../hooks/useHiddenLocation';
import {AnimationDetails, SPRING_BACK_ANIMATION_CONFIG} from '../AnimationUtils';

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
  const animationDetails = useSharedValue<AnimationDetails>({to: {x: 0, y: 0}});

  const getTranslationOptions = useCallback(() => {
    'worklet';
    return {
      directionLock,
      currentTranslation: {x: animationDetails.value.to.x, y: animationDetails.value.to.y}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionLock]);

  const setTranslation = useCallback((event: PanGestureHandlerEventPayload, initialTranslation: Frame) => {
    'worklet';
    const result = getTranslation(event, initialTranslation, directions, getTranslationOptions());

    animationDetails.value = {to: {x: result.x, y: result.y}};
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [directions, getTranslationOptions]);

  const reset = useCallback(() => {
    animationDetails.value = {to: {x: 0, y: 0}};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      animationDetails.value = {
        to: {x: 0, y: 0},
        prev: {x: animationDetails.value.to.x, y: animationDetails.value.to.y},
        animationType: 'withSpring',
        animationConfig: SPRING_BACK_ANIMATION_CONFIG
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateToOrigin]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event: PanGestureHandlerEventPayload, context: {initialTranslation: Frame}) => {
      context.initialTranslation = {x: animationDetails.value.to.x, y: animationDetails.value.to.y};
    },
    onActive: (event: PanGestureHandlerEventPayload, context: {initialTranslation: Frame}) => {
      setTranslation(event, context.initialTranslation);
    },
    onEnd: (event: PanGestureHandlerEventPayload) => {
      if (dismissible) {
        const velocity = getDismissVelocity(event, directions, getTranslationOptions(), threshold);
        if (velocity) {
          waitingForDismiss.value = true;
          if (animationDetails.value.to.x !== 0 && velocity.x !== undefined && velocity.x !== 0) {
            const toX = velocity.x > 0 ? hiddenLocation.right : hiddenLocation.left;
            const duration = Math.abs((toX - animationDetails.value.to.x) / velocity.x) * 1000;
            animationDetails.value = {
              to: {x: toX, y: 0},
              prev: {x: animationDetails.value.to.x, y: animationDetails.value.to.y},
              animationType: 'withTiming',
              animationConfig: {duration},
              animationCallback: dismiss
            };
          }

          if (animationDetails.value.to.y !== 0 && velocity.y !== undefined && velocity.y !== 0) {
            const toY = velocity.y > 0 ? hiddenLocation.down : hiddenLocation.up;
            const duration = Math.abs((toY - animationDetails.value.to.y) / velocity.y) * 1000;
            animationDetails.value = {
              to: {x: 0, y: toY},
              prev: {x: animationDetails.value.to.x, y: animationDetails.value.to.y},
              animationType: 'withTiming',
              animationConfig: {duration},
              animationCallback: dismiss
            };
          }
        } else {
          returnToOrigin();
        }
      } else {
        returnToOrigin();
      }
    }
  },
  [directions, dismissible, setTranslation, returnToOrigin]);

  return {animationDetails, panGestureEvent: onGestureEvent, reset};
};

export default usePanGesture;
