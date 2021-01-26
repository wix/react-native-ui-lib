import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  PanResponder,
  ViewPropTypes,
  AccessibilityInfo,
  Animated
} from 'react-native';
import {Constants} from '../../helpers';
import {PureBaseComponent} from '../../commons';
import {Colors} from '../../style';
import View from '../view';

const TRACK_SIZE = 6;
const THUMB_SIZE = 24;
const BORDER_WIDTH = 6;
const SHADOW_RADIUS = 4;
const DEFAULT_COLOR = Colors.dark50;
const ACTIVE_COLOR = Colors.violet30;
const INACTIVE_COLOR = Colors.dark60;

/**
 * @description: A Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.js
 */
export default class Slider extends PureBaseComponent {
  static displayName = 'Slider';

  static propTypes = {
    /**
     * Initial value
     */
    value: PropTypes.number,
    /**
     * Minimum value
     */
    minimumValue: PropTypes.number,
    /**
     * Maximum value
     */
    maximumValue: PropTypes.number,
    /**
     * Step value of the slider. The value should be between 0 and (maximumValue - minimumValue)
     */
    step: PropTypes.number,
    /**
     * The color used for the track from minimum value to current value
     */
    minimumTrackTintColor: PropTypes.string,
    /**
     * The track color
     */
    maximumTrackTintColor: PropTypes.string,
    /**
     * Custom render instead of rendering the track
     */
    renderTrack: PropTypes.elementType,
    /**
     * Thumb color
     */
    thumbTintColor: PropTypes.string,
    /**
     * Callback for onValueChange
     */
    onValueChange: PropTypes.func,
    /**
     * Callback that notifies about slider seeking is started
     */
    onSeekStart: PropTypes.func,
    /**
     * Callback that notifies about slider seeking is finished
     */
    onSeekEnd: PropTypes.func,
    /**
     * The container style
     */
    containerStyle: ViewPropTypes.style,
    /**
     * The track style
     */
    trackStyle: ViewPropTypes.style,
    /**
     * The thumb style
     */
    thumbStyle: ViewPropTypes.style,
    /**
     * The active (during press) thumb style
     */
    activeThumbStyle: ViewPropTypes.style,
    /**
     * If true the Slider will not change it's style on press
     */
    disableActiveStyling: PropTypes.bool,
    /**
     * If true the Slider will be disabled and will appear in disabled color
     */
    disabled: PropTypes.bool,
    testID: PropTypes.string
  };

  static defaultProps = {
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    step: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      containerSize: {width: 0, height: 0},
      trackSize: {width: 0, height: 0},
      thumbSize: {width: 0, height: 0},
      thumbActiveAnimation: new Animated.Value(1),
      measureCompleted: false
    };

    this.thumb = undefined;
    this._thumbStyles = {style: {}};
    this.minTrack = undefined;
    this._minTrackStyles = {style: {}};
    this._x = 0;
    this._dx = 0;
    this._thumbAnimationConstants = {
      duration: 100,
      defaultScaleFactor: 1.5
    };

    this.initialValue = this.getRoundedValue(props.value);
    this.initialThumbSize = THUMB_SIZE;

    this.checkProps(props);

    this.createPanResponderConfig();
  }

  checkProps(props) {
    if (props.minimumValue >= props.maximumValue) {
      console.warn('Slider minimumValue must be lower than maximumValue');
    }
    if (props.value < props.minimumValue || props.value > props.maximumValue) {
      console.warn('Slider value is not in range');
    }
  }

  createPanResponderConfig() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onStartShouldSetPanResponder: () => true,
      onPanResponderEnd: () => true,
      onPanResponderTerminationRequest: () => false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.initialValue = this.getRoundedValue(this.props.value);
      // set position for new value
      this._x = this.getXForValue(this.initialValue);
      this.updateStyles(this._x);
    }

    if (prevState.measureCompleted !== this.state.measureCompleted) {
      this.initialThumbSize = this.state.thumbSize; // for thumb enlargement
      // set initial position
      this._x = this.getXForValue(this.initialValue);
      this.updateStyles(this._x);
    }
  }

  /* Gesture Recognizer */

  handleMoveShouldSetPanResponder = () => {
    return true;
  };
  handlePanResponderGrant = () => {
    this.updateThumbStyle(true);
    this._dx = 0;
    this.onSeekStart();
  };
  handlePanResponderMove = (_e, gestureState) => {
    if (this.props.disabled) {
      return;
    }
    const dx = gestureState.dx * (Constants.isRTL ? -1 : 1);
    this.update(dx - this._dx);
    this._dx = dx;
  };
  handlePanResponderEnd = () => {
    this.updateThumbStyle(false);
    this.bounceToStep();
    this.onSeekEnd();
  };

  /* Actions */

  update(dx) {
    // calc x in range (instead of: this._x += dx)
    let x = this._x;
    x += dx;
    x = Math.max(Math.min(x, this.state.trackSize.width), 0);

    this._x = x;

    this.updateStyles(this._x);
    this.updateValue(this._x);
  }

  bounceToStep() {
    if (this.props.step > 0) {
      const v = this.getValueForX(this._x);
      const round = this.getRoundedValue(v);
      const x = this.getXForValue(round);
      this._x = x;
      this.updateStyles(x);
    }
  }

  updateStyles(x) {
    if (this.thumb) {
      const {trackSize} = this.state;
      const position = x - this.initialThumbSize.width / 2;
      const deviation = 3;

      if (position + deviation < 0) {
        this._thumbStyles.left = 0;
      } else if (position - deviation > trackSize.width - this.initialThumbSize.width) {
        this._thumbStyles.left = trackSize.width - this.initialThumbSize.width;
      } else {
        this._thumbStyles.left = position;
      }

      this.thumb.setNativeProps(this._thumbStyles);
    }

    if (this.minTrack) {
      this._minTrackStyles.width = x;
      this.minTrack.setNativeProps(this._minTrackStyles);
    }
  }

  updateValue(x) {
    const value = this.getValueForX(x);
    this.onValueChange(value);
  }

  updateThumbStyle(start) {
    if (this.thumb && !this.props.disableActiveStyling) {
      const {thumbStyle, activeThumbStyle} = this.props;
      const style = thumbStyle || styles.thumb;
      const activeStyle = activeThumbStyle || styles.activeThumb;

      const activeOrInactiveStyle = !this.props.disabled && (start ? activeStyle : style);
      this._thumbStyles.style = _.omit(activeOrInactiveStyle, 'height', 'width');
      this.thumb.setNativeProps(this._thumbStyles);
      this.scaleThumb(start);
    }
  }

  scaleThumb = start => {
    const scaleFactor = start ? this.calculatedThumbActiveScale() : 1;
    this.thumbAnimationAction(scaleFactor);
  }

  thumbAnimationAction = (toValue) => {
    const {thumbActiveAnimation} = this.state;
    const {duration} = this._thumbAnimationConstants;
    Animated.timing(thumbActiveAnimation, {
      toValue,
      duration,
      useNativeDriver: true
    }).start();
  }

  getRoundedValue(value) {
    const {step} = this.props;
    const v = this.getValueInRange(value);
    return step > 0 ? Math.round(v / step) * step : v;
  }

  getValueInRange(value) {
    const {minimumValue, maximumValue} = this.props;
    const v = value < minimumValue ? minimumValue : value > maximumValue ? maximumValue : value;
    return v;
  }

  getXForValue(v) {
    const {minimumValue, maximumValue} = this.props;
    const range = this.getRange();
    const relativeValue = maximumValue > 0 ? minimumValue - v : maximumValue - v; // for negatives in min value
    const value = minimumValue < 0 ? Math.abs(relativeValue) : v - minimumValue; // for negatives
    const ratio = value / range;
    const x = ratio * (this.state.trackSize.width - this.initialThumbSize.width / 2);
    return x;
  }

  getValueForX(x) {
    const {maximumValue, minimumValue, step} = this.props;
    const ratio = x / (this.state.trackSize.width - this.initialThumbSize.width / 2);
    const range = this.getRange();

    if (step) {
      return Math.max(minimumValue, Math.min(maximumValue, minimumValue + Math.round((ratio * range) / step) * step));
    } else {
      return Math.max(minimumValue, Math.min(maximumValue, ratio * range + minimumValue));
    }
  }

  getRange() {
    const {minimumValue, maximumValue} = this.props;
    const range = maximumValue - minimumValue;
    return range;
  }

  setMinTrackRef = r => {
    this.minTrack = r;
  };

  setThumbRef = r => {
    this.thumb = r;
  };

  shouldDoubleSizeByDefault = () => {
    const {activeThumbStyle, thumbStyle} = this.props;
    return !activeThumbStyle || !thumbStyle;
  }

  calculatedThumbActiveScale = () => {
    const {activeThumbStyle, thumbStyle, disabled, disableActiveStyling} = this.props;
    if (disabled || disableActiveStyling) {
      return 1;
    }
    
    const {defaultScaleFactor} = this._thumbAnimationConstants;
    if (this.shouldDoubleSizeByDefault()) { 
      return defaultScaleFactor;
    }
      
    const scaleRatioFromSize = activeThumbStyle.height / thumbStyle.height;
    return scaleRatioFromSize || defaultScaleFactor;
  };

  updateTrackStepAndStyle = ({nativeEvent}) => {
    this._x = nativeEvent.locationX;
    this.updateValue(nativeEvent.locationX);
  
    if (this.props.step > 0) {
      this.bounceToStep();
    } else {
      this.updateStyles(nativeEvent.locationX);
    }
  }

  /* Events */

  onValueChange = value => {
    _.invoke(this.props, 'onValueChange', value);
  };

  onSeekStart() {
    _.invoke(this.props, 'onSeekStart');
  }

  onSeekEnd() {
    _.invoke(this.props, 'onSeekEnd');
  }

  onContainerLayout = ({nativeEvent}) => {
    this.handleMeasure('containerSize', nativeEvent);
  };

  onTrackLayout = ({nativeEvent}) => {
    this.handleMeasure('trackSize', nativeEvent);
  };

  onThumbLayout = ({nativeEvent}) => {
    this.handleMeasure('thumbSize', nativeEvent);
  };

  handleTrackPress = ({nativeEvent}) => {
    if (this.props.disabled) {
      return;
    }
    
    this.updateTrackStepAndStyle({nativeEvent});
    this.onSeekEnd();
  };

  handleMeasure = (name, nativeEvent) => {
    const {width, height} = nativeEvent.layout;
    const size = {width, height};
    const layoutName = `${name}`;
    const currentSize = this[layoutName];

    if (currentSize && width === currentSize.width && height === currentSize.height) {
      return;
    }

    this[layoutName] = size;

    if (this.containerSize && this.thumbSize && this.trackSize) {
      this.setState({
        containerSize: this.containerSize,
        trackSize: this.trackSize,
        thumbSize: this.thumbSize,
        measureCompleted: true
      });
    }
  };

  onAccessibilityAction = event => {
    const {maximumValue, minimumValue, step} = this.props;
    const value = this.getValueForX(this._x);
    let newValue;

    // switch (event.nativeEvent.action) {
    switch (event.nativeEvent.actionName) {
      case 'increment':
        newValue = value !== maximumValue ? value + step : value;
        break;
      case 'decrement':
        newValue = value !== minimumValue ? value - step : value;
        break;
      default:
        break;
    }

    this._x = this.getXForValue(newValue);
    this.updateValue(this._x);
    this.updateStyles(this._x);
    _.invoke(AccessibilityInfo, 'announceForAccessibility', `New value ${newValue}`);
  };

  thumbHitSlop = {top: 10, bottom: 10, left: 24, right: 24};

  /* Renders */

  renderThumb = () => {
    const {
      thumbStyle,
      disabled,
      thumbTintColor
    } = this.getThemeProps();
    return (
      <Animated.View
        hitSlop={this.thumbHitSlop}
        ref={this.setThumbRef}
        onLayout={this.onThumbLayout}
        {...this._panResponder.panHandlers}
        style={[
          styles.thumb,
          thumbStyle,
          {
            backgroundColor: disabled
              ? DEFAULT_COLOR
              : thumbTintColor || ACTIVE_COLOR
          },
          {
            transform: [
              {
                scale: this.state.thumbActiveAnimation
              }
            ]
          }
        ]}
      />
    );
  }

  render() {
    const {
      containerStyle,
      trackStyle,
      renderTrack,
      disabled,
      minimumTrackTintColor = ACTIVE_COLOR,
      maximumTrackTintColor = DEFAULT_COLOR,
      testID
    } = this.getThemeProps();

    return (
      <View
        style={[styles.container, containerStyle]}
        onLayout={this.onContainerLayout}
        accessible
        accessibilityLabel={'Slider'}
        {...this.extractAccessibilityProps()}
        accessibilityRole={'adjustable'}
        accessibilityStates={disabled ? ['disabled'] : []}
        // accessibilityActions={['increment', 'decrement']}
        accessibilityActions={[{name: 'increment', label: 'increment'}, {name: 'decrement', label: 'decrement'}]}
        onAccessibilityAction={this.onAccessibilityAction}
        testID={testID}
      >
        {_.isFunction(renderTrack) ? (
          <View
            style={[styles.track, {backgroundColor: maximumTrackTintColor}, trackStyle]}
            onLayout={this.onTrackLayout}
          >
            {renderTrack()}
          </View>
        ) : (
          <View>
            <View
              style={[
                styles.track,
                trackStyle,
                {
                  backgroundColor: disabled ? INACTIVE_COLOR : maximumTrackTintColor
                }
              ]}
              onLayout={this.onTrackLayout}
            />
            <View
              ref={this.setMinTrackRef}
              style={[
                styles.track,
                trackStyle,
                styles.minimumTrack,
                {
                  backgroundColor: disabled ? DEFAULT_COLOR : minimumTrackTintColor
                }
              ]}
            />
          </View>
        )}
        
        <View style={styles.touchArea} onTouchEnd={this.handleTrackPress}/>
        {this.renderThumb()}
      </View>
    );
  }
}

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
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: Colors.white,
    shadowColor: Colors.rgba(Colors.black, 0.3),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: SHADOW_RADIUS,
    elevation: 2
  },
  activeThumb: {
    width: THUMB_SIZE + 16,
    height: THUMB_SIZE + 16,
    borderRadius: (THUMB_SIZE + 16) / 2,
    borderWidth: BORDER_WIDTH
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent'
  }
});
