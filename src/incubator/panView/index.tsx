import {isEmpty} from 'lodash';
import React, {useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {PanGestureHandler, PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import {asBaseComponent} from '../../commons/new';
import {Constants} from '../../helpers';
import View, {ViewProps} from '../../components/view';
import {
  PanViewDirections,
  Frame,
  PanViewDismissThreshold,
  getTranslation,
  getDismissVelocity,
  DEFAULT_THRESHOLD
} from './panningUtil';
export {PanViewDirections, PanViewDismissThreshold};

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
  springBack?: boolean;
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

const RETURN_ANIMATION_SPRING_CONFIG = {velocity: 300, damping: 20, stiffness: 300, mass: 0.8};

const PanView = (props: Props) => {
  const {
    directions = [PanViewDirections.UP, PanViewDirections.DOWN, PanViewDirections.LEFT, PanViewDirections.RIGHT],
    dismissible,
    springBack,
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

  const dismiss = useCallback((isFinished: boolean) => {
    'worklet';
    if (isFinished && waitingForDismiss.value && onDismiss) {
      waitingForDismiss.value = false;
      runOnJS(onDismiss)();
    }
  },
  [onDismiss]);

  const shouldDismissX = useCallback((isFinished: boolean) => {
    'worklet';
    dismiss(isFinished);
  },
  [dismiss]);

  const shouldDismissY = useCallback((isFinished: boolean) => {
    'worklet';
    dismiss(isFinished);
  },
  [dismiss]);

  const springBackIfNeeded = useCallback(() => {
    'worklet';
    if (springBack) {
      translationX.value = withSpring(0, RETURN_ANIMATION_SPRING_CONFIG);
      translationY.value = withSpring(0, RETURN_ANIMATION_SPRING_CONFIG);
    }
  }, [springBack]);

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
          if (velocity.x !== 0) {
            const toX = Math.sign(translationX.value) * (Math.abs(translationX.value) + Constants.screenWidth);
            translationX.value = withSpring(toX, {velocity: velocity.x, damping: 50}, shouldDismissX);
          }
          if (velocity.y !== 0) {
            const toY = Math.sign(translationY.value) * (Math.abs(translationY.value) + Constants.screenHeight);
            translationY.value = withSpring(toY, {velocity: velocity.y, damping: 50}, shouldDismissY);
          }
        } else {
          springBackIfNeeded();
        }
      } else {
        springBackIfNeeded();
      }
    }
  },
  [directions, dismissible, setTranslation, springBackIfNeeded]);

  return (
    // TODO: delete comments once completed
    // <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
    <View style={containerStyle}>
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
PanView.directions = PanViewDirections;
PanView.defaultProps = {
  threshold: DEFAULT_THRESHOLD
};

export default asBaseComponent<PanViewProps, typeof PanView>(PanView);
