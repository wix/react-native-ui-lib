import React, {Component} from 'react';
import {
  PanResponder,
  Animated,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleProp,
  ViewStyle
} from 'react-native';
import {Constants, asBaseComponent} from '../../commons/new';

export enum GestureDirections {
  // VERTICAL
  UP = 'up',
  DOWN = 'down'
}

export interface PanGestureViewProps {
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>;
  /**
   * onDismiss callback
   */
  onDismiss?: () => void;
  /**
   * The direction of the allowed pan (default is down)
   */
  direction?: GestureDirections;
  children?: React.ReactNode;
}

const SWIPE_VELOCITY = 1.8;
const SPEED = 20;
const BOUNCINESS = 6;

interface State {
  deltaY: Animated.AnimatedValue;
}

/**
 * @description: PanGestureView component for drag and swipe gestures (supports only vertical gestures at the moment)
 */
class PanGestureView extends Component<PanGestureViewProps, State> {
  static displayName = 'PanGestureView';

  static defaultProps: Partial<PanGestureViewProps> = {
    direction: GestureDirections.DOWN
  };

  static directions = GestureDirections;

  private panResponder: PanResponderInstance;
  private swipe?: boolean;
  private layout?: LayoutRectangle;

  constructor(props: PanGestureViewProps) {
    super(props);

    this.state = {
      deltaY: new Animated.Value(0)
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
  }

  handleMoveShouldSetPanResponder = (_e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean => {
    // return true if user is swiping, return false if it's a single click
    const {dy} = gestureState;
    return dy > 5 || dy < -5;
  };
  handlePanResponderGrant = () => {
    this.swipe = false;
  };
  handlePanResponderMove = (_e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const {direction} = this.props;
    let newValue = 0;

    // VERTICAL
    const up = direction === GestureDirections.UP;
    const panDeltaY = gestureState.dy;
    const panVelocityY = gestureState.vy;

    if (Math.abs(panVelocityY) >= SWIPE_VELOCITY) {
      if ((up && panVelocityY < 0) || (!up && panVelocityY > 0)) {
        // Swipe
        this.swipe = true;
      }
    } else if ((up && panDeltaY < 0) || (!up && panDeltaY > 0)) {
      // Drag
      newValue = panDeltaY;
      this.animateDeltaY(Math.round(newValue));
    }
  };
  handlePanResponderEnd = () => {
    if (!this.swipe) {
      const {direction} = this.props;

      // VERTICAL
      const up = direction === GestureDirections.UP;
      const {deltaY} = this.state;
      // @ts-ignore
      const threshold = this.layout.height / 2;
      // @ts-ignore
      const endValue = Math.round(deltaY._value);

      if ((up && endValue <= -threshold) || (!up && endValue >= threshold)) {
        this.animateDismiss();
      } else {
        // back to initial position
        this.animateDeltaY(0);
      }
    } else {
      this.animateDismiss();
    }
  };

  animateDeltaY(toValue: number) {
    const {deltaY} = this.state;

    Animated.spring(deltaY, {
      toValue,
      useNativeDriver: true,
      speed: SPEED,
      bounciness: BOUNCINESS
    }).start();
  }

  animateDismiss() {
    const {direction} = this.props;

    // VERTICAL
    const up = direction === GestureDirections.UP;
    const {deltaY} = this.state;
    // @ts-ignore
    const newValue = up ? -this.layout.height - Constants.statusBarHeight : deltaY._value + Constants.screenHeight;

    Animated.timing(deltaY, {
      toValue: Math.round(newValue),
      useNativeDriver: true,
      duration: 280
    }).start(this.onAnimatedFinished);
  }

  onAnimatedFinished = ({finished}: {finished: boolean}) => {
    if (finished) {
      this.onDismiss();
    }
  };

  onDismiss = () => {
    this.initPositions();
    this.props.onDismiss?.();
  };

  initPositions() {
    this.setState({
      deltaY: new Animated.Value(0)
    });
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.layout = event.nativeEvent.layout;
  };

  render() {
    const {style} = this.props;

    // VERTICAL
    const {deltaY} = this.state;

    return (
      <Animated.View
        style={[
          style,
          {
            transform: [
              {
                translateY: deltaY
              }
            ]
          }
        ]}
        {...this.panResponder.panHandlers}
        onLayout={this.onLayout}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default asBaseComponent<PanGestureViewProps>(PanGestureView);
