import _ from 'lodash';
import React, {useEffect, useRef, useCallback, useState} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerProperties,
  PanGestureHandlerGestureEvent,
  FlingGestureHandler,
  FlingGestureHandlerGestureEvent,
  FlingGestureHandlerStateChangeEvent,
  TapGestureHandler,
  State,
  Directions
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  Easing,
  runOnJS,
  useWorkletCallback
} from 'react-native-reanimated';
import {Constants} from '../../helpers';
import View from '../view';
import {
  PanningDirections,
  PanAmountsProps,
  PanDirectionsProps,
  PanLocationProps
} from '../panningViews/panningProvider';

const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

// TODO: move this to panningContext
interface PanContextProps {
  isPanning: boolean;
  dragDeltas: PanAmountsProps;
  swipeDirections: PanDirectionsProps;
}

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

interface LocationProps {
  left: number;
  top: number;
}

const DEFAULT_DIRECTION = PanningDirections.DOWN;
const TOP_INSET = Constants.isIphoneX ? Constants.getSafeAreaInsets().top : Constants.isIOS ? 20 : 0;
const BOTTOM_INSET = Constants.isIphoneX ? Constants.getSafeAreaInsets().bottom : Constants.isIOS ? 20 : 0;
const TIMING_ANIMATION_CONFIG: Animated.WithTimingConfig = {
  duration: 300,
  easing: Easing.bezier(0.2, 0, 0.35, 1)
};

const DialogDismissibleView = (props: Props) => {
  const {direction = DEFAULT_DIRECTION, visible: propsVisible, containerStyle, style, children, onDismiss} = props;

  const width = useRef<number>(Constants.screenWidth);
  const height = useRef<number>(Constants.screenHeight);
  const containerRef = useRef<typeof View>();
  const visible = useRef<boolean>(Boolean(propsVisible));
  const [threshold, setThreshold] = useState<PanAmountsProps>({x: 0, y: 0});

  const getHiddenLocation = useCallback((left: number, top: number): LocationProps => {
    const result = {left: 0, top: 0};
    switch (direction) {
      case PanningDirections.LEFT:
        result.left = -left - width.current;
        break;
      case PanningDirections.RIGHT:
        result.left = Constants.screenWidth - left;
        break;
      case PanningDirections.UP:
        result.top = -top - height.current - TOP_INSET;
        break;
      case PanningDirections.DOWN:
      default:
        result.top = Constants.screenHeight - top + BOTTOM_INSET;
        break;
    }

    return result;
  },
  [direction]);

  const hiddenLocation = useRef<LocationProps>(getHiddenLocation(0, 0));

  const animationValue = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animationValue.value}]
    };
  });

  function dismiss() {
    visible.current = false;
    onDismiss();
  }

  function dismissWorklet(isFinished: boolean) {
    'worklet';
    runOnJS(dismiss)();
  }

  const animateIn = useCallback(() => {
    animationValue.value = withTiming(0, TIMING_ANIMATION_CONFIG);
  }, []);

  const animateOut = useCallback(() => {
    animationValue.value = withTiming(hiddenLocation.current.top, TIMING_ANIMATION_CONFIG, dismissWorklet);
  }, [onDismiss]);

  useEffect(() => {
    if (visible.current && !propsVisible) {
      animateOut();
    }
  }, [propsVisible, animateOut]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    // DO NOT move the width\height into the measureInWindow - it causes errors with orientation change
    const layout = event.nativeEvent.layout;
    width.current = layout.width;
    height.current = layout.height;
    setThreshold({x: width.current / 2, y: height.current / 2});
    if (containerRef.current) {
      // @ts-ignore TODO: can we fix this on ViewProps \ View?
      containerRef.current.measureInWindow((x: number, y: number) => {
        hiddenLocation.current = getHiddenLocation(x, y);
        animationValue.value = hiddenLocation.current.top;
        animateIn();
      });
    }
  },
  [setThreshold, getHiddenLocation, animateIn]);

  const isHorizontal = useCallback(() => {
    return direction === PanningDirections.LEFT || direction === PanningDirections.RIGHT;
  }, [direction]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_event, context: {start: number}) => {
      context.start = animationValue.value;
    },
    onActive: (event, context) => {
      animationValue.value = Math.max(0, context.start + event.translationY);
    },
    onEnd: (event, context) => {
      const value = context.start + (isHorizontal() ? event.translationX : event.translationY);
      if (
        (direction === PanningDirections.LEFT && value <= -threshold.x) ||
          (direction === PanningDirections.RIGHT && value >= threshold.x) ||
          (direction === PanningDirections.UP && value <= -threshold.y) ||
          (direction === PanningDirections.DOWN && value >= threshold.y)
      ) {
        (() => {
          'worklet';
          runOnJS(animateOut)();
        })();
      } else {
        (() => {
          'worklet';
          runOnJS(animateIn)();
        })();
      }
    }
  },
  [threshold]);

  // TODO: change to useAnimatedGestureHandler?
  const flingHandler = useCallback((event: FlingGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      animateOut();
    }
  },
  [animateOut]);

  return (
    // @ts-ignore
    <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          // !visible.current && styles.hidden is done to fix a bug is iOS
          // Have to have two Animated.View because of this error:
          // nesting touch handlers with native animated driver is not supported yet
          style={[style, animatedStyle, !visible.current && styles.hidden]}
        >
          {/* <FlingGestureHandler onHandlerStateChange={flingHandler} direction={Directions.DOWN | Directions.UP}> */}
          <FlingGestureHandler
            numberOfPointers={MAXIMUM_DRAGS_AFTER_SWIPE}
            onHandlerStateChange={flingHandler}
            direction={Directions.DOWN}
          >
            <Animated.View>{children}</Animated.View>
          </FlingGestureHandler>
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
