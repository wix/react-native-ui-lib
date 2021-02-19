import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Animated, Easing, StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import {Constants} from '../../helpers';
import View from '../view';
import asPanViewConsumer from '../panningViews/asPanViewConsumer';
import PanningProvider, {PanningDirections, PanAmountsProps, PanDirectionsProps, PanLocationProps} from '../panningViews/panningProvider';
import PanResponderView from '../panningViews/panResponderView';

const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

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
  onDismiss?: () => void;
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
  context: PanContextProps;
}

interface State {
  visible?: boolean;
  hide: boolean;
}

interface LocationProps {
  left: number;
  top: number;
}

const DEFAULT_DIRECTION = PanningProvider.Directions.DOWN;

class DialogDismissibleView extends PureComponent<Props, State> {
  static displayName = 'IGNORE';

  public static defaultProps: Partial<Props> = {
    direction: DEFAULT_DIRECTION,
    onDismiss: () => {}
  };

  private hiddenLocation: LocationProps;
  private animatedValue = new Animated.Value(0);
  private width = Constants.screenWidth;
  private height = Constants.screenHeight;
  private counter = 0;
  private swipe: PanDirectionsProps = {};
  private thresholdX = 0;
  private thresholdY = 0;
  private ref = React.createRef<any>();

  constructor(props: Props) {
    super(props);

    this.hiddenLocation = this.getHiddenLocation(0, 0);
    this.state = {
      visible: props.visible,
      hide: false
    };
  }

  componentDidUpdate(prevProps: Props) {
    const {isPanning, dragDeltas, swipeDirections} = this.props.context;
    const {dragDeltas: prevDragDeltas, swipeDirections: prevSwipeDirections} = prevProps.context;
    const {hide} = this.state;

    if (
      isPanning &&
      (dragDeltas.x || dragDeltas.y) &&
      (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)
    ) {
      this.onDrag();
    }

    if (
      isPanning &&
      (swipeDirections.x || swipeDirections.y) &&
      (swipeDirections.x !== prevSwipeDirections.x || swipeDirections.y !== prevSwipeDirections.y)
    ) {
      this.onSwipe(swipeDirections);
    }

    if (hide) {
      this.hide();
    }
  }

  static getDerivedStateFromProps(nextProps: DialogDismissibleProps, prevState: State) {
    const {visible} = nextProps;
    const {visible: prevVisible} = prevState;

    if (prevVisible && !visible) {
      return {hide: true};
    }

    return null;
  }

  resetSwipe = () => {
    this.counter = 0;
    this.swipe = {};
  };

  isSwiping = (): boolean => {
    return !_.isUndefined(this.swipe.x) || !_.isUndefined(this.swipe.y);
  };

  onDrag = () => {
    if (this.isSwiping()) {
      if (this.counter < MAXIMUM_DRAGS_AFTER_SWIPE) {
        this.counter += 1;
      } else {
        this.resetSwipe();
      }
    }
  };

  onSwipe = (swipeDirections: PanDirectionsProps) => {
    this.swipe = swipeDirections;
  };

  getHiddenLocation = (left: number, top: number): LocationProps => {
    const {direction} = this.props;
    const topInset = Constants.isIphoneX ? Constants.getSafeAreaInsets().top : Constants.isIOS ? 20 : 0;
    const bottomInset = Constants.isIphoneX ? Constants.getSafeAreaInsets().bottom : Constants.isIOS ? 20 : 0;
    
    const result = {left: 0, top: 0};
    switch (direction) {
      case PanningProvider.Directions.LEFT:
        result.left = -left - this.width;
        break;
      case PanningProvider.Directions.RIGHT:
        result.left = Constants.screenWidth - left;
        break;
      case PanningProvider.Directions.UP:
        result.top = -top - this.height - topInset;
        break;
      case PanningProvider.Directions.DOWN:
      default:
        result.top = Constants.screenHeight - top + bottomInset;
        break;
    }

    return result;
  };

  animateTo = (toValue: number, animationEndCallback?: Animated.EndCallback) => {
    Animated.timing(this.animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.bezier(0.2, 0, 0.35, 1),
      useNativeDriver: true
    }).start(animationEndCallback);
  };

  getAnimationStyle = () => {
    return {
      transform: [
        {
          translateX: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.hiddenLocation.left, 0]
          })
        },
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.hiddenLocation.top, 0]
          })
        }
      ]
    };
  };

  onLayout = (event: LayoutChangeEvent) => {
    // DO NOT move the width\height into the measureInWindow - it causes errors with orientation change
    const layout = event.nativeEvent.layout;
    this.width = layout.width;
    this.height = layout.height;
    this.thresholdX = this.width / 2;
    this.thresholdY = this.height / 2;
    if (this.ref.current) {
      this.ref.current.measureInWindow((x: number, y: number) => {
        this.hiddenLocation = this.getHiddenLocation(x, y);
        this.animateTo(1);
      });
    }
  };

  hide = () => {
    const {onDismiss} = this.props;
    // TODO: test we're not animating?
    this.animateTo(0, () => this.setState({visible: false, hide: false}, onDismiss));
  };

  resetToShown = (left: number, top: number, direction: PanningDirections) => {
    const toValue = [PanningProvider.Directions.LEFT, PanningProvider.Directions.RIGHT].includes(direction)
      ? 1 + left / this.hiddenLocation.left
      : 1 + top / this.hiddenLocation.top;

    this.animateTo(toValue);
  };

  onPanLocationChanged = ({left = 0, top = 0}: PanLocationProps) => {
    const {direction = DEFAULT_DIRECTION} = this.props;
    const endValue = {x: Math.round(left), y: Math.round(top)};
    if (this.isSwiping()) {
      this.hide();
    } else {
      this.resetSwipe();
      if (
        (direction === PanningProvider.Directions.LEFT && endValue.x <= -this.thresholdX) ||
        (direction === PanningProvider.Directions.RIGHT && endValue.x >= this.thresholdX) ||
        (direction === PanningProvider.Directions.UP && endValue.y <= -this.thresholdY) ||
        (direction === PanningProvider.Directions.DOWN && endValue.y >= this.thresholdY)
      ) {
        this.hide();
      } else {
        this.resetToShown(left, top, direction);
      }
    }
  };

  render() {
    const {containerStyle, style} = this.props;
    const {visible} = this.state;

    return (
      <View ref={this.ref} style={containerStyle} onLayout={this.onLayout}>
        <PanResponderView
          // !visible && styles.hidden is done to fix a bug is iOS
          style={[style, this.getAnimationStyle(), !visible && styles.hidden]}
          isAnimated
          onPanLocationChanged={this.onPanLocationChanged}
        >
          {this.props.children}
        </PanResponderView>
      </View>
    );
  }
}

export default asPanViewConsumer<DialogDismissibleProps>(DialogDismissibleView);

const styles = StyleSheet.create({
  hidden: {
    opacity: 0
  }
});
