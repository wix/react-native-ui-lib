import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Animated} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';
import {Colors, BorderRadiuses} from '../../style';

const INNER_PADDING = 2;
const DEFAULT_WIDTH = 42;
const DEFAULT_HEIGHT = 24;
const DEFAULT_THUMB_SIZE = 20;


/**
 * Switch component for toggling boolean value related to some context
 */
class Switch extends BaseComponent {
  static displayName = 'Switch';

  static propTypes = {
    /**
     * The value of the switch. If true the switch will be turned on. Default value is false.
     */
    value: PropTypes.bool,
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange: PropTypes.func,
    /**
     * The Switch width
     */
    width: PropTypes.number,
    /**
     * The Switch height
     */
    height: PropTypes.number,
    /**
     * The Switch background color when it's turned on
     */
    onColor: PropTypes.string,
    /**
     * The Switch background color when it's turned off
     */
    offColor: PropTypes.string,
    /**
     * The Switch's thumb color
     */
    thumbColor: PropTypes.string,
    /**
     * The Switch's thumb size (width & height)
     */
    thumbSize: PropTypes.number,
    /**
     * The Switch's thumb style
     */
    thumbStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  state = {
    thumbPosition: new Animated.Value(0),
  };

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.toggle(nextProps.value);
    }
  }

  toggle(value) {
    const {thumbPosition} = this.state;
    Animated.timing(thumbPosition, {
      toValue: value ? 1 : 0,
      duration: 100,
    }).start();
  }

  onPress = () => {
    _.invoke(this.props, 'onValueChange', !this.props.value);
    this.toggle(!this.props.value);
  };

  calcThumbOnPosition() {
    const props = this.getThemeProps();
    const width = props.width || DEFAULT_WIDTH;
    const thumbSize = props.thumbSize || DEFAULT_THUMB_SIZE;
    const position = width - ((2 * INNER_PADDING) + thumbSize);
    return position;
  }

  renderThumb() {
    const {thumbStyle} = this.getThemeProps();
    const {thumbPosition} = this.state;
    const interpolatedTranslateX = thumbPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.calcThumbOnPosition()],
    });

    const thumbPositionStyle = {
      transform: [{translateX: interpolatedTranslateX}],
    };

    return <Animated.View style={[this.styles.thumb, thumbPositionStyle, thumbStyle]} />;
  }

  render() {
    const {value, style, ...others} = this.getThemeProps();
    return (
      <TouchableOpacity
        activeOpacity={1}
        {...others}
        style={[this.styles.switch, value ? this.styles.switchOn : this.styles.switchOff, style]}
        onPress={this.onPress}
      >
        {this.renderThumb()}
      </TouchableOpacity>
    );
  }
}

function createStyles({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  onColor = Colors.blue30,
  offColor = Colors.blue60,
  thumbColor = Colors.white,
  thumbSize = DEFAULT_THUMB_SIZE,
}) {
  return StyleSheet.create({
    switch: {
      width,
      height,
      borderRadius: BorderRadiuses.br100,
      justifyContent: 'center',
      padding: INNER_PADDING,
    },
    switchOn: {
      backgroundColor: onColor,
    },
    switchOff: {
      backgroundColor: offColor,
    },
    thumb: {
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
      backgroundColor: thumbColor,
    },
  });
}

export default Switch;
