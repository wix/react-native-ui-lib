import _ from 'lodash';
import React, {useEffect, useRef, useCallback, useContext} from 'react';
import {StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import {Constants} from '../../helpers';
import View from '../view';
import PanningContext from '../panningViews/panningContext';
import PanningProvider, {
  PanningDirections,
  PanAmountsProps,
  PanDirectionsProps,
  PanLocationProps
} from '../panningViews/panningProvider';
import PanResponderView from '../panningViews/panResponderView';

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

const DEFAULT_DIRECTION = PanningProvider.Directions.DOWN;
const TOP_INSET = Constants.isIphoneX ? Constants.getSafeAreaInsets().top : Constants.isIOS ? 20 : 0;
const BOTTOM_INSET = Constants.isIphoneX ? Constants.getSafeAreaInsets().bottom : Constants.isIOS ? 20 : 0;
const TIMING_ANIMATION_CONFIG: Animated.WithTimingConfig = {
  duration: 300,
  easing: Easing.bezier(0.2, 0, 0.35, 1)
};

const DialogDismissibleView = (props: Props) => {
  const {direction = DEFAULT_DIRECTION, visible: propsVisible, containerStyle, style, children, onDismiss} = props;
  // @ts-expect-error
  const {isPanning, dragDeltas, swipeDirections} = useContext<PanContextProps>(PanningContext);

  const width = useRef<number>(Constants.screenWidth);
  const height = useRef<number>(Constants.screenHeight);
  const thresholdX = useRef<number>(0);
  const thresholdY = useRef<number>(0);
  const counter = useRef<number>(0);
  const containerRef = useRef<typeof View>();
  const swipe = useRef<PanDirectionsProps>({});
  const prevDragDeltas = useRef<PanAmountsProps>();
  const prevSwipeDirections = useRef<PanDirectionsProps>();
  const visible = useRef<boolean>(Boolean(propsVisible));

  const getHiddenLocation = useCallback((left: number, top: number): LocationProps => {
    const result = {left: 0, top: 0};
    switch (direction) {
      case PanningProvider.Directions.LEFT:
        result.left = -left - width.current;
        break;
      case PanningProvider.Directions.RIGHT:
        result.left = Constants.screenWidth - left;
        break;
      case PanningProvider.Directions.UP:
        result.top = -top - height.current - TOP_INSET;
        break;
      case PanningProvider.Directions.DOWN:
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
    console.log('Miki', 'dismissWorklet', isFinished);
    runOnJS(dismiss)();
  }

  const animateIn = useCallback(() => {
    animationValue.value = hiddenLocation.current.top;
    animationValue.value = withTiming(0, TIMING_ANIMATION_CONFIG);
  }, []);

  const animateOut = useCallback(() => {
    animationValue.value = withTiming(hiddenLocation.current.top, TIMING_ANIMATION_CONFIG, dismissWorklet);
  }, [onDismiss]);

  const animateTo = useCallback(() => {
    // TODO:
  }, []);

  const isSwiping = useCallback((): boolean => {
    return !_.isUndefined(swipe.current.x) || !_.isUndefined(swipe.current.y);
  }, []);

  const resetSwipe = useCallback(() => {
    counter.current = 0;
    swipe.current = {};
  }, []);

  const onDrag = useCallback(() => {
    if (isSwiping()) {
      if (counter.current < MAXIMUM_DRAGS_AFTER_SWIPE) {
        counter.current += 1;
      } else {
        resetSwipe();
      }
    }
  }, [isSwiping, resetSwipe]);

  const hide = useCallback(() => {
    // TODO:
  }, []);

  useEffect(() => {
    if (
      isPanning &&
      (dragDeltas.x || dragDeltas.y) &&
      (dragDeltas.x !== prevDragDeltas.current?.x || dragDeltas.y !== prevDragDeltas.current?.y)
    ) {
      onDrag();
      prevDragDeltas.current = dragDeltas;
    }
  }, [isPanning, dragDeltas, onDrag, hide]);

  useEffect(() => {
    if (
      isPanning &&
      (swipeDirections.x || swipeDirections.y) &&
      (swipeDirections.x !== prevSwipeDirections.current?.x || swipeDirections.y !== prevSwipeDirections.current?.y)
    ) {
      swipe.current = swipeDirections;
    }
  }, [isPanning, swipeDirections, hide]);

  useEffect(() => {
    if (visible.current && !propsVisible) {
      console.log('Miki', 'useEffect', 'should hide');
      animateOut();
    }
  }, [propsVisible, animateOut]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    console.log('Miki', 'onLayout');
    // DO NOT move the width\height into the measureInWindow - it causes errors with orientation change
    const layout = event.nativeEvent.layout;
    width.current = layout.width;
    height.current = layout.height;
    thresholdX.current = width.current / 2;
    thresholdY.current = height.current / 2;
    if (containerRef.current) {
      // @ts-ignore TODO: can we fix this on ViewProps \ View?
      containerRef.current.measureInWindow((x: number, y: number) => {
        hiddenLocation.current = getHiddenLocation(x, y);
        animateIn();
      });
    }
  },
  [getHiddenLocation, animateTo]);

  const resetToShown = useCallback((left: number, top: number, direction: PanningDirections) => {
    const toValue = [PanningProvider.Directions.LEFT, PanningProvider.Directions.RIGHT].includes(direction)
      ? 1 + left / hiddenLocation.current.left
      : 1 + top / hiddenLocation.current.top;

    animateTo(toValue);
  },
  [animateTo]);

  const onPanLocationChanged = useCallback(({left = 0, top = 0}: PanLocationProps) => {
    const endValue = {x: Math.round(left), y: Math.round(top)};
    if (isSwiping()) {
      hide();
    } else {
      resetSwipe();
      if (
        (direction === PanningProvider.Directions.LEFT && endValue.x <= -thresholdX.current) ||
          (direction === PanningProvider.Directions.RIGHT && endValue.x >= thresholdX.current) ||
          (direction === PanningProvider.Directions.UP && endValue.y <= -thresholdY.current) ||
          (direction === PanningProvider.Directions.DOWN && endValue.y >= thresholdY.current)
      ) {
        hide();
      } else {
        resetToShown(left, top, direction);
      }
    }
  },
  [isSwiping, hide, resetSwipe, direction, resetToShown]);

  console.log('Miki', 'render', animationValue.value);
  return (
    // @ts-ignore
    <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
      <PanResponderView
        // !visible.current && styles.hidden is done to fix a bug is iOS
        style={[style, animatedStyle, !visible.current && styles.hidden]}
        reanimated
        onPanLocationChanged={onPanLocationChanged}
      >
        {children}
      </PanResponderView>
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
