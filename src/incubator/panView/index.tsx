import {isEmpty} from 'lodash';
import React, {useCallback} from 'react';
import {StyleProp, View as RNView, ViewStyle} from 'react-native';
import {PanGestureHandler, PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import {asBaseComponent} from '../../commons/new';
import View, {ViewProps} from '../../components/view';
import {
  PanningDirections,
  PanningDirectionsEnum,
  PanningDismissThreshold,
  Frame,
  getTranslation,
  getDismissVelocity,
  DEFAULT_THRESHOLD
} from './panningUtil';
import useHiddenLocation from '../hooks/useHiddenLocation';
type PanViewDirections = PanningDirections;
const PanViewDirectionsEnum = PanningDirectionsEnum;
type PanViewDismissThreshold = PanningDismissThreshold;
export {PanningDirections, PanningDirectionsEnum, PanViewDirections, PanViewDirectionsEnum, PanViewDismissThreshold};

export interface PanViewProps extends ViewProps {
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
  /**
   * Add a style to the container
   */
  containerStyle?: StyleProp<ViewStyle>;
}

interface Props extends PanViewProps {
  children?: React.ReactNode | React.ReactNode[];
}

const SPRING_BACK_ANIMATION_CONFIG = {velocity: 300, damping: 20, stiffness: 300, mass: 0.8};

const PanView = (props: Props) => {
  const {
    directions = [
      PanViewDirectionsEnum.UP,
      PanViewDirectionsEnum.DOWN,
      PanViewDirectionsEnum.LEFT,
      PanViewDirectionsEnum.RIGHT
    ],
    dismissible,
    animateToOrigin,
    onDismiss,
    directionLock,
    threshold,
    containerStyle,
    children,
    ...others
  } = props;

  const waitingForDismiss = useSharedValue<boolean>(false);
  const translationX = useSharedValue<number>(0);
  const translationY = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}, {translateY: translationY.value}]
    };
  }, []);

  const containerRef = React.createRef<RNView>();
  const {onLayout, hiddenLocation} = useHiddenLocation({containerRef});

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

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event: PanGestureHandlerEventPayload, context: {initialTranslation: Frame}) => {
      context.initialTranslation = {x: translationX.value, y: translationY.value};
    },
    onActive: (event: PanGestureHandlerEventPayload, context: {initialTranslation: Frame}) => {
      setTranslation(event, context.initialTranslation);
    },
    onEnd: (event: PanGestureHandlerEventPayload) => {
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
    }
  },
  [directions, dismissible, setTranslation, returnToOrigin]);

  return (
    // TODO: delete comments once completed
    <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
      {/* @ts-expect-error missing children TS error started with react 18 */}
      <PanGestureHandler onGestureEvent={isEmpty(directions) ? undefined : onGestureEvent}>
        <Animated.View
          // !visible.current && styles.hidden is done to fix a bug is iOS
          //   style={[style, animatedStyle, !visible.current && styles.hidden]}
          style={animatedStyle}
          //   style={[style]}
        >
          <View {...others}>{children}</View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

PanView.displayName = 'PanView';
PanView.directions = PanViewDirectionsEnum;
PanView.defaultProps = {
  threshold: DEFAULT_THRESHOLD
};

export default asBaseComponent<PanViewProps, typeof PanView>(PanView);
