import _isFunction from "lodash/isFunction";
import React, { PureComponent } from 'react';
import { StyleSheet, PanResponder, AccessibilityInfo, Animated } from 'react-native';
import { Constants, asBaseComponent } from "../../commons/new";
import { extractAccessibilityProps } from "../../commons/modifiers";
import { Colors } from "../../style";
import View from "../view";
import IncubatorSlider from "../../incubator/slider";
import Thumb from "./Thumb";
const TRACK_SIZE = 6;
const THUMB_SIZE = 24;
const SHADOW_RADIUS = 4;
const DEFAULT_COLOR = Colors.$backgroundDisabled;
const ACTIVE_COLOR = Colors.$backgroundPrimaryHeavy;
const INACTIVE_COLOR = Colors.$backgroundNeutralMedium;
const MIN_RANGE_GAP = 4;
const defaultProps = {
  value: 0,
  minimumValue: 0,
  maximumValue: 1,
  step: 0,
  thumbHitSlop: {
    top: 10,
    bottom: 10,
    left: 24,
    right: 24
  },
  useGap: true
};

/**
 * @description: A Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Slider/Slider.gif?raw=true
 */
class Slider extends PureComponent {
  static displayName = 'Slider';
  static defaultProps = defaultProps;
  thumb = React.createRef();
  minThumb = React.createRef();
  minTrack = React.createRef();
  _minTrackStyles = {};
  _x = 0;
  _x_min = 0;
  lastDx = 0;
  initialValue = this.getRoundedValue(this.getInitialValue());
  minInitialValue = this.getRoundedValue(this.props.initialMinimumValue || this.props.minimumValue);
  lastValue = this.initialValue;
  lastMinValue = this.minInitialValue;
  _thumbStyles = {};
  _minThumbStyles = {
    left: this.minInitialValue
  };
  initialThumbSize = {
    width: THUMB_SIZE,
    height: THUMB_SIZE
  };
  constructor(props) {
    super(props);
    this.activeThumbRef = this.thumb;
    this.didMount = false;
    this.state = {
      containerSize: {
        width: 0,
        height: 0
      },
      trackSize: {
        width: 0,
        height: 0
      },
      thumbSize: {
        width: 0,
        height: 0
      },
      thumbActiveAnimation: new Animated.Value(1),
      measureCompleted: false
    };
    this.checkProps(props);
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onStartShouldSetPanResponder: () => true,
      onPanResponderEnd: () => true,
      onPanResponderTerminationRequest: () => false
    });
  }
  reset() {
    // NOTE: used with ref
    this.lastValue = this.initialValue;
    this.lastMinValue = this.minInitialValue;
    this.lastDx = 0;
    this.setActiveThumb(this.thumb);
    this.set_x(this.getXForValue(this.initialValue));
    this.moveTo(this._x);
    if (this.props.useRange) {
      this.setActiveThumb(this.minThumb);
      this.set_x(this.getXForValue(this.minInitialValue));
      this.moveMinTo(this._x_min);
    }
    this.props.onReset?.();
  }
  getInitialValue() {
    const {
      useRange,
      initialMaximumValue,
      value,
      maximumValue
    } = this.props;
    return useRange ? initialMaximumValue || maximumValue : value;
  }
  checkProps(props) {
    const {
      useRange,
      minimumValue,
      maximumValue,
      value
    } = props;
    if (minimumValue >= maximumValue) {
      console.warn('Slider minimumValue must be lower than maximumValue');
    }
    if (!useRange && (value < minimumValue || value > maximumValue)) {
      console.warn('Slider value is not in range');
    }
  }
  getAccessibilityProps() {
    const {
      disabled
    } = this.props;
    return {
      accessibilityLabel: 'Slider',
      accessible: true,
      accessibilityRole: 'adjustable',
      accessibilityState: disabled ? {
        disabled
      } : undefined,
      accessibilityActions: [{
        name: 'increment',
        label: 'increment'
      }, {
        name: 'decrement',
        label: 'decrement'
      }],
      ...extractAccessibilityProps(this.props)
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      useRange,
      value,
      initialMinimumValue
    } = this.props;
    if (!useRange && prevProps.value !== value) {
      this.initialValue = this.getRoundedValue(value);

      // set position for new value
      this._x = this.getXForValue(this.initialValue);
      this.moveTo(this._x);
    }
    if (prevState.measureCompleted !== this.state.measureCompleted) {
      this.initialThumbSize = this.state.thumbSize; // for thumb enlargement

      // set initial position
      this._x = this.getXForValue(this.initialValue);
      this._x_min = this.getXForValue(this.minInitialValue);
      this.moveTo(this._x);
      if (useRange && initialMinimumValue) {
        this.moveMinTo(this._x_min);
      }
      this.didMount = true;
    }
  }
  componentDidMount() {
    this.dimensionsChangeListener = Constants.addDimensionsEventListener(this.onOrientationChanged);
  }
  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.dimensionsChangeListener || this.onOrientationChanged);
  }

  /* Gesture Recognizer */

  handleMoveShouldSetPanResponder = () => {
    return true;
  };
  handlePanResponderGrant = () => {
    this.lastDx = 0;
    this.onSeekStart();
  };
  handlePanResponderMove = (_e, gestureState) => {
    const {
      disabled
    } = this.props;
    if (disabled) {
      return;
    }
    // dx = accumulated distance since touch start
    const dx = gestureState.dx * (Constants.isRTL && !this.disableRTL ? -1 : 1);
    this.update(dx - this.lastDx);
    this.lastDx = dx;
  };
  handlePanResponderEnd = () => {
    this.bounceToStep();
    this.onSeekEnd();
  };

  /* Actions */

  setActiveThumb = ref => {
    this.activeThumbRef = ref;
  };
  get_x() {
    if (this.isDefaultThumbActive()) {
      return this._x;
    } else {
      return this._x_min;
    }
  }
  set_x(x) {
    if (this.isDefaultThumbActive()) {
      this._x = x;
    } else {
      this._x_min = x;
    }
  }
  update(dx) {
    // calc x in range (instead of: this._x += dx)
    let x = this.get_x();
    x += dx;
    x = Math.max(Math.min(x, this.state.trackSize.width), 0);
    this.set_x(x);
    this.moveTo(x);
    if (!this.props.useRange) {
      this.updateValue(x);
    }
  }
  bounceToStep() {
    if (this.props.step > 0) {
      const value = this.getValueForX(this.get_x());
      const roundedValue = this.getRoundedValue(value);
      const x = this.getXForValue(roundedValue);
      this.set_x(x);
      this.moveTo(x);
    }
  }
  updateValue(x) {
    const value = this.getValueForX(x);
    if (this.props.useRange) {
      this.onRangeChange(value);
    } else {
      this.onValueChange(value);
    }
  }
  moveTo(x) {
    if (this.isDefaultThumbActive()) {
      if (this.thumb.current) {
        const {
          useRange,
          useGap
        } = this.props;
        const {
          trackSize,
          thumbSize
        } = this.state;
        const nonOverlappingTrackWidth = trackSize.width - this.initialThumbSize.width;
        const _x = this.shouldForceLTR ? trackSize.width - x : x; // adjust for RTL
        const left = trackSize.width === 0 ? _x : _x * nonOverlappingTrackWidth / trackSize.width; // do not render above prefix\suffix icon\text

        if (useRange) {
          const minThumbPosition = this._minThumbStyles?.left;
          if (useGap && left > minThumbPosition + thumbSize.width + MIN_RANGE_GAP || !useGap && left >= minThumbPosition) {
            this._thumbStyles.left = left;
            const width = left - minThumbPosition;
            this._minTrackStyles.width = width;
            if (this.didMount) {
              this.updateValue(x);
            }
          }
        } else {
          this._thumbStyles.left = left;
          this._minTrackStyles.width = Math.min(trackSize.width, x);
        }
        this.thumb.current?.setNativeProps?.(this._thumbStyles);
        this.minTrack.current?.setNativeProps?.(this._minTrackStyles);
      }
    } else {
      this.moveMinTo(x);
    }
  }
  moveMinTo(x) {
    const {
      useGap
    } = this.props;
    const {
      trackSize,
      thumbSize
    } = this.state;
    if (this.minThumb.current) {
      const nonOverlappingTrackWidth = trackSize.width - this.initialThumbSize.width;
      const _x = this.shouldForceLTR ? nonOverlappingTrackWidth - x : x; // adjust for RTL
      const left = trackSize.width === 0 ? _x : _x * nonOverlappingTrackWidth / trackSize.width; // do not render above prefix\suffix icon\text

      const maxThumbPosition = this._thumbStyles?.left;
      if (useGap && left < maxThumbPosition - thumbSize.width - MIN_RANGE_GAP || !useGap && left <= maxThumbPosition) {
        this._minThumbStyles.left = left;
        this._minTrackStyles.width = maxThumbPosition - x;
        this._minTrackStyles.left = x;
        this.minThumb.current?.setNativeProps?.(this._minThumbStyles);
        this.minTrack.current?.setNativeProps?.(this._minTrackStyles);
        if (this.didMount) {
          this.updateValue(x);
        }
      }
    }
  }
  updateTrackStepAndStyle = ({
    nativeEvent
  }) => {
    const {
      step,
      useRange
    } = this.props;
    const {
      trackSize
    } = this.state;
    const newX = Constants.isRTL && !this.disableRTL ? trackSize.width - nativeEvent.locationX : nativeEvent.locationX;
    if (useRange) {
      if (this.isDefaultThumbActive() && this._minThumbStyles?.left && newX < this._minThumbStyles?.left) {
        // new x is smaller then min but the active thumb is the max
        this.setActiveThumb(this.minThumb);
      } else if (!this.isDefaultThumbActive() && this._thumbStyles.left && newX > this._thumbStyles.left) {
        // new x is bigger then max but the active thumb is the min
        this.setActiveThumb(this.thumb);
      }
    }
    this.set_x(newX);
    if (!useRange) {
      this.updateValue(this.get_x());
    }
    if (step > 0) {
      this.bounceToStep();
    } else {
      this.moveTo(this.get_x());
    }
  };

  /** Values */

  get disableRTL() {
    const {
      disableRTL,
      useRange
    } = this.props;
    if (useRange) {
      // block forceRTL on range slider
      return false;
    }
    return disableRTL;
  }
  shouldForceLTR = Constants.isRTL && this.disableRTL;
  isDefaultThumbActive = () => {
    return this.activeThumbRef === this.thumb;
  };
  getRoundedValue(value) {
    const {
      step
    } = this.props;
    const v = this.getValueInRange(value);
    return step > 0 ? Math.round(v / step) * step : v;
  }
  getValueInRange(value) {
    const {
      minimumValue,
      maximumValue
    } = this.props;
    const v = value < minimumValue ? minimumValue : value > maximumValue ? maximumValue : value;
    return v;
  }
  getXForValue(value) {
    const {
      minimumValue
    } = this.props;
    const range = this.getRange();
    const relativeValue = minimumValue - value;
    const v = minimumValue < 0 ? Math.abs(relativeValue) : value - minimumValue; // for negatives
    const ratio = v / range;
    const x = ratio * this.state.trackSize.width;
    return x;
  }
  getValueForX(x) {
    const {
      maximumValue,
      minimumValue,
      step
    } = this.props;
    const ratio = x / (this.state.trackSize.width - this.initialThumbSize.width / 2);
    const range = this.getRange();
    if (step) {
      return Math.max(minimumValue, Math.min(maximumValue, minimumValue + Math.round(ratio * range / step) * step));
    } else {
      return Math.max(minimumValue, Math.min(maximumValue, ratio * range + minimumValue));
    }
  }
  getRange() {
    const {
      minimumValue,
      maximumValue
    } = this.props;
    const range = maximumValue - minimumValue;
    return range;
  }

  /* Events */

  onOrientationChanged = () => {
    this.initialValue = this.lastValue;
    this.minInitialValue = this.lastMinValue;
    this.setState({
      measureCompleted: false
    });
  };
  onRangeChange = value => {
    if (this.isDefaultThumbActive()) {
      this.lastValue = value;
    } else {
      this.lastMinValue = value;
    }
    let values = {
      min: this.lastMinValue,
      max: this.lastValue
    };
    if (Constants.isRTL && this.props.disableRTL) {
      // forceRTL for range slider
      const {
        maximumValue
      } = this.props;
      values = {
        min: maximumValue - this.lastValue,
        max: maximumValue - this.lastMinValue
      };
    }
    this.props.onRangeChange?.(values);
  };
  onValueChange = value => {
    this.lastValue = value;
    this.props.onValueChange?.(value);
  };
  onSeekStart() {
    this.props.onSeekStart?.();
  }
  onSeekEnd() {
    this.props.onSeekEnd?.();
  }
  onContainerLayout = nativeEvent => {
    this.handleMeasure('containerSize', nativeEvent);
  };
  onTrackLayout = nativeEvent => {
    this.setState({
      measureCompleted: false
    });
    this.handleMeasure('trackSize', nativeEvent);
  };
  onThumbLayout = nativeEvent => {
    this.handleMeasure('thumbSize', nativeEvent);
  };
  handleTrackPress = event => {
    if (this.props.disabled) {
      return;
    }
    this.onSeekStart();
    this.updateTrackStepAndStyle(event);
    this.onSeekEnd();
  };
  handleMeasure = (name, {
    nativeEvent
  }) => {
    const {
      width,
      height
    } = nativeEvent.layout;
    const size = {
      width,
      height
    };
    const currentSize = this[name];
    if (currentSize && width === currentSize.width && height === currentSize.height) {
      return;
    }
    this[name] = size;
    if (this.containerSize && this.thumbSize && this.trackSize) {
      this.setState({
        containerSize: this.containerSize,
        trackSize: this.trackSize,
        thumbSize: this.thumbSize
      }, () => {
        this.setState({
          measureCompleted: true
        });
      });
    }
  };
  onAccessibilityAction = event => {
    const {
      maximumValue,
      minimumValue,
      step
    } = this.props;
    const value = this.getValueForX(this._x);
    let newValue;
    switch (event.nativeEvent.actionName) {
      case 'increment':
        newValue = value !== maximumValue ? value + step : value;
        break;
      case 'decrement':
        newValue = value !== minimumValue ? value - step : value;
        break;
      default:
        newValue = value;
        break;
    }
    this._x = this.getXForValue(newValue);
    this.updateValue(this._x);
    this.moveTo(this._x);
    AccessibilityInfo.announceForAccessibility?.(`New value ${newValue}`);
  };
  onMinTouchStart = () => {
    this.setActiveThumb(this.minThumb);
  };
  onTouchStart = () => {
    this.setActiveThumb(this.thumb);
  };
  getThumbProps = () => {
    const {
      thumbStyle,
      activeThumbStyle,
      disableActiveStyling,
      disabled,
      thumbTintColor,
      thumbHitSlop
    } = this.props;
    return {
      disabled,
      thumbTintColor,
      thumbStyle,
      activeThumbStyle,
      disableActiveStyling,
      thumbHitSlop,
      onLayout: this.onThumbLayout
    };
  };

  /* Renders */
  renderMinThumb = () => {
    return <Thumb {...this.getThumbProps()} ref={this.minThumb} onTouchStart={this.onMinTouchStart} {...this.panResponder.panHandlers} />;
  };
  renderThumb = () => {
    return <Thumb {...this.getThumbProps()} ref={this.thumb} onTouchStart={this.onTouchStart} {...this.panResponder.panHandlers} />;
  };
  renderTrack() {
    const {
      trackStyle,
      renderTrack,
      disabled,
      minimumTrackTintColor = ACTIVE_COLOR,
      maximumTrackTintColor = DEFAULT_COLOR
    } = this.props;
    return _isFunction(renderTrack) ? <View style={[styles.track, {
      backgroundColor: maximumTrackTintColor
    }, trackStyle]} onLayout={this.onTrackLayout}>
        {renderTrack()}
      </View> : <View>
        <View style={[styles.track, trackStyle, {
        backgroundColor: disabled ? INACTIVE_COLOR : maximumTrackTintColor
      }]} onLayout={this.onTrackLayout} />
        <View ref={this.minTrack} style={[styles.track, trackStyle, styles.minimumTrack, this.shouldForceLTR && styles.trackDisableRTL, {
        backgroundColor: disabled ? DEFAULT_COLOR : minimumTrackTintColor
      }]} />
      </View>;
  }
  renderRangeThumb() {
    const {
      useRange,
      useGap
    } = this.props;
    if (useRange) {
      if (useGap) {
        return this.renderMinThumb();
      }
      return <View style={{
        zIndex: this.isDefaultThumbActive() ? 0 : 1,
        top: '-50%'
      }}>{this.renderMinThumb()}</View>;
    }
  }
  render() {
    const {
      containerStyle,
      testID,
      migrate
    } = this.props;
    if (migrate) {
      return <IncubatorSlider {...this.props} />;
    }
    return <View style={[styles.container, containerStyle]} onLayout={this.onContainerLayout} onAccessibilityAction={this.onAccessibilityAction} testID={testID} {...this.getAccessibilityProps()}>
        {this.renderTrack()}
        <View style={styles.touchArea} onTouchEnd={this.handleTrackPress} />
        {this.renderRangeThumb()}
        {this.renderThumb()}
      </View>;
  }
}
export default asBaseComponent(Slider);
const styles = StyleSheet.create({
  container: {
    height: THUMB_SIZE + SHADOW_RADIUS,
    justifyContent: 'center'
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
    overflow: 'hidden'
  },
  minimumTrack: {
    position: 'absolute'
  },
  trackDisableRTL: {
    right: 0
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent'
  }
});