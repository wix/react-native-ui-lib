import {isEmpty} from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {PanGestureHandler, PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import {asBaseComponent} from '../../commons/new';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import {Constants} from '../../helpers';
import View, {ViewProps} from '../../components/view';
import {
  PanViewDirections,
  TranslationLock,
  Frame,
  PanViewDismissThreshold,
  getTranslation,
  getDismissVelocity,
  DEFAULT_THRESHOLD
} from './panningUtil';
export {PanViewDirections, TranslationLock, PanViewDismissThreshold};

export interface PanViewProps extends ViewProps {
  /**
   * The directions of the allowed pan (default is all)
   * Types: UP, DOWN, LEFT and RIGHT (using PanView.directions.###)
   */
  directions?: PanViewDirections[];
  /**
   * Will enable the dismissible behavior:
   * 1. Dismiss if over the threshold.
   * 2. Animate to start if no dismissed.
   */
  dismissible?: boolean;
  /**
   * Callback to the dismiss animation end
   */
  onDismiss?: () => void;
  /**
   * Should the direction of dragging be locked once a drag has started.
   */
  directionLock?: boolean;
  /**
   * Allows locking the translation when dragging or dropping.
   * i.e. cannot drag back when a certain direction is not allowed.
   * Only when dismissible={false}
   */
  translationLock?: TranslationLock;
  /**
   * Object to adjust the dismiss threshold limits (eg {x, y, velocity}).
   */
  threshold?: PanViewDismissThreshold;
  /**
   * Add a style to the container
   */
  containerStyle?: StyleProp<ViewStyle>;
}

interface StaticMembers {
  directions: typeof PanViewDirections;
  translationLock: typeof TranslationLock;
}

interface Props extends PanViewProps {
  children?: React.ReactNode | React.ReactNode[];
}

const RETURN_ANIMATION_SPRING_CONFIG = {velocity: 300, damping: 15, stiffness: 300, mass: 0.8};

const PanView = (props: Props) => {
  const {
    directions,
    dismissible,
    onDismiss,
    directionLock,
    translationLock,
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
      translationLock: dismissible ? TranslationLock.NONE : translationLock!,
      currentTranslation: {x: translationX.value, y: translationY.value}
    };
  };

  const setTranslation = (event: PanGestureHandlerEventPayload, initialTranslation: Frame) => {
    'worklet';
    const result = getTranslation(event, initialTranslation, directions!, getTranslationOptions());

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

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event: PanGestureHandlerEventPayload, context: {initialTranslation: Frame}) => {
      context.initialTranslation = {x: translationX.value, y: translationY.value};
    },
    onActive: (event: PanGestureHandlerEventPayload, context: {initialTranslation: Frame}) => {
      setTranslation(event, context.initialTranslation);
    },
    onEnd: (event: PanGestureHandlerEventPayload) => {
      if (dismissible) {
        const velocity = getDismissVelocity(event, directions!, getTranslationOptions(), threshold);
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
          translationX.value = withSpring(0, RETURN_ANIMATION_SPRING_CONFIG);
          translationY.value = withSpring(0, RETURN_ANIMATION_SPRING_CONFIG);
        }
      }
    }
  },
  [directions, dismissible, setTranslation]);

  return (
    // TODO: delete comments once completed
    // <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
    <View style={containerStyle}>
      <PanGestureHandler onGestureEvent={isEmpty(directions) ? undefined : onGestureEvent}>
        <Animated.View
          // !visible.current && styles.hidden is done to fix a bug is iOS
          //   style={[style, animatedStyle, !visible.current && styles.hidden]}
          style={[styles.wrapChild, animatedStyle]}
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
PanView.translationLock = TranslationLock;
PanView.defaultProps = {
  directions: [PanViewDirections.UP, PanViewDirections.DOWN, PanViewDirections.LEFT, PanViewDirections.RIGHT],
  translationLock: TranslationLock.NONE,
  threshold: DEFAULT_THRESHOLD
};

export default asBaseComponent<PanViewProps, StaticMembers>(PanView);

const styles = StyleSheet.create({
  wrapChild: {
    alignSelf: 'baseline'
  },
  hidden: {
    opacity: 0
  }
});
