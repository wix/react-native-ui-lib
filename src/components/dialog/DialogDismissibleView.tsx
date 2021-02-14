import React, {useEffect, useRef, useCallback, useState} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import {PanGestureHandler, PanGestureHandlerEventExtra} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  Easing,
  runOnJS,
  useWorkletCallback
} from 'react-native-reanimated';
import {Constants} from '../../helpers';
import View from '../view';
import {PanningDirections} from '../panningViews/panningProvider';

interface DialogDismissibleProps {
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The direction of the allowed pan (default is DOWN)
   * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
   */
  direction?: PanningDirections;
  /**
   * onDismiss callback
   */
  onDismiss: () => void;
  /**
   * The dialog`s container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Whether to show the dialog or not
   */
  visible?: boolean;
}

interface Props extends DialogDismissibleProps {
  children?: React.ReactNode | React.ReactNode[];
}

const DEFAULT_DIRECTION = PanningDirections.DOWN;
const FLING_VELOCITY_THRESHOLD = 1000;
const TOP_INSET = Constants.isIphoneX ? Constants.getSafeAreaInsets().top : Constants.isIOS ? 20 : 0;
const BOTTOM_INSET = Constants.isIphoneX ? Constants.getSafeAreaInsets().bottom : Constants.isIOS ? 20 : 0;
const TIMING_ANIMATION_CONFIG: Animated.WithTimingConfig = {
  duration: 300,
  easing: Easing.bezier(0.2, 0, 0.35, 1)
};

const DialogDismissibleView = (props: Props) => {
  const {direction = DEFAULT_DIRECTION, visible: propsVisible, containerStyle, style, children, onDismiss} = props;

  const isHorizontal = useCallback(() => {
    return direction === PanningDirections.LEFT || direction === PanningDirections.RIGHT;
  }, [direction]);

  const isHorizontalWorklet = useWorkletCallback(() => {
    return direction === PanningDirections.LEFT || direction === PanningDirections.RIGHT;
  }, [direction]);

  const containerRef = useRef<typeof View>();
  const size = useRef<number>(isHorizontal() ? Constants.screenWidth : Constants.screenHeight);
  const visible = useRef<boolean>(Boolean(propsVisible));
  const [threshold, setThreshold] = useState<number>(0);

  const getHiddenLocation = useCallback((location: number): number => {
    switch (direction) {
      case PanningDirections.LEFT:
        return -location - size.current;
      case PanningDirections.RIGHT:
        return Constants.screenWidth - location;
      case PanningDirections.UP:
        return -location - size.current - TOP_INSET;
      case PanningDirections.DOWN:
      default:
        return Constants.screenHeight - location + BOTTOM_INSET;
    }
  },
  [direction]);

  const hiddenLocation = useRef<number>(getHiddenLocation(0));

  const persistentAnimationValue = useRef<number>(hiddenLocation.current);
  const animationValue = useSharedValue<number>(persistentAnimationValue.current);
  const animatedStyle = useAnimatedStyle(() => {
    const transform = isHorizontalWorklet()
      ? [{translateX: animationValue.value}]
      : [{translateY: animationValue.value}];
    return {
      transform
    };
  }, [isHorizontalWorklet]);

  function open() {
    persistentAnimationValue.current = 0;
  }

  function openWorklet(isFinished: boolean) {
    'worklet';
    if (isFinished) {
      runOnJS(open)();
    }
  }

  const animateIn = useCallback(() => {
    animationValue.value = withTiming(0, TIMING_ANIMATION_CONFIG, openWorklet);
  }, []);

  function animateInWorklet() {
    'worklet';
    runOnJS(animateIn)();
  }

  function dismiss() {
    visible.current = false;
    persistentAnimationValue.current = hiddenLocation.current;
    onDismiss();
  }

  function dismissWorklet(isFinished: boolean) {
    'worklet';
    if (isFinished) {
      runOnJS(dismiss)();
    }
  }

  const animateOut = useCallback(() => {
    animationValue.value = withTiming(hiddenLocation.current, TIMING_ANIMATION_CONFIG, dismissWorklet);
  }, [onDismiss]);

  function animateOutWorklet() {
    'worklet';
    runOnJS(animateOut)();
  }

  useEffect(() => {
    if (visible.current && !propsVisible) {
      animateOut();
    }
  }, [propsVisible, animateOut]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    // DO NOT move the width\height into the measureInWindow - it causes errors with orientation change
    const layout = event.nativeEvent.layout;
    size.current = isHorizontal() ? layout.width : layout.height;
    setThreshold(size.current / 2);
    if (containerRef.current) {
      // @ts-ignore TODO: can we fix this on ViewProps \ View?
      containerRef.current.measureInWindow((x: number, y: number) => {
        hiddenLocation.current = getHiddenLocation(isHorizontal() ? x : y);
        persistentAnimationValue.current = hiddenLocation.current;
        animationValue.value = hiddenLocation.current;
        animateIn();
      });
    }
  },
  [isHorizontal, setThreshold, getHiddenLocation, animateIn]);

  const isFling = useWorkletCallback((event: PanGestureHandlerEventExtra) => {
    switch (direction) {
      case PanningDirections.LEFT:
        return event.velocityX < -FLING_VELOCITY_THRESHOLD;
      case PanningDirections.RIGHT:
        return event.velocityX > FLING_VELOCITY_THRESHOLD;
      case PanningDirections.UP:
        return event.velocityY < -FLING_VELOCITY_THRESHOLD;
      case PanningDirections.DOWN:
      default:
        return event.velocityY > FLING_VELOCITY_THRESHOLD;
    }
  },
  [direction]);

  const isGreaterThanThreshold = useWorkletCallback((event: PanGestureHandlerEventExtra, context: {start: number}) => {
    const value = context.start + (isHorizontalWorklet() ? event.translationX : event.translationY);
    return (
      ((direction === PanningDirections.LEFT || direction === PanningDirections.UP) && value <= -threshold) ||
        ((direction === PanningDirections.RIGHT || direction === PanningDirections.DOWN) && value >= threshold)
    );
  },
  [isHorizontalWorklet, direction, threshold]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_event: PanGestureHandlerEventExtra, context: {start: number}) => {
      context.start = animationValue.value;
    },
    onActive: (event: PanGestureHandlerEventExtra, context: {start: number}) => {
      switch (direction) {
        case PanningDirections.LEFT:
          animationValue.value = Math.min(0, context.start + event.translationX);
          break;
        case PanningDirections.RIGHT:
          animationValue.value = Math.max(0, context.start + event.translationX);
          break;
        case PanningDirections.UP:
          animationValue.value = Math.min(0, context.start + event.translationY);
          break;
        case PanningDirections.DOWN:
        default:
          animationValue.value = Math.max(0, context.start + event.translationY);
          break;
      }
    },
    onEnd: (event: PanGestureHandlerEventExtra, context: {start: number}) => {
      if (isFling(event) || isGreaterThanThreshold(event, context)) {
        animateOutWorklet();
      } else {
        animateInWorklet();
      }
    }
  },
  [direction, isFling, isGreaterThanThreshold]);

  return (
    // @ts-ignore
    <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
      <PanGestureHandler onGestureEvent={direction ? gestureHandler : undefined}>
        <Animated.View
          // !visible.current && styles.hidden is done to fix a bug is iOS
          style={[style, animatedStyle, !visible.current && styles.hidden]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

DialogDismissibleView.displayName = 'IGNORE';
DialogDismissibleView.defaultProps = {
  direction: DEFAULT_DIRECTION
};

export default DialogDismissibleView;

const styles = StyleSheet.create({
  hidden: {
    opacity: 0
  }
});
