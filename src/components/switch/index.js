import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';

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
     * The value of the switch. If true the switch will be turned on. Default value is false
     */
    value: PropTypes.bool,
    /**
     * Invoked with the new value when the value changes
     */
    onValueChange: PropTypes.func,
    /**
     * Whether the switch should be disabled
     */
    disabled: PropTypes.bool,
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
     * The Switch background color when it's disabled
     */
    disabledColor: PropTypes.string,
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
    thumbStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  };

  state = {
    thumbPosition: new Animated.Value(this.props.value ? 1 : 0)
  };

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  componentDidUpdate(prevProps) {
    const {value} = this.getThemeProps();
    if (prevProps.value !== value) {
      this.toggle(value);
    }
  }

  getAccessibilityProps() {
    const {disabled, value} = this.getThemeProps();

    return {
      accessible: true,
      accessibilityRole: 'switch',
      accessibilityStates: disabled ? ['disabled'] : value ? ['checked'] : ['unchecked']
    };
  }

  toggle(value) {
    const {thumbPosition} = this.state;

    Animated.timing(thumbPosition, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.77, 0.0, 0.175, 1.0),
      useNativeDriver: true
    }).start();
  }

  onPress = () => {
    const {disabled} = this.getThemeProps();

    if (!disabled) {
      _.invoke(this.props, 'onValueChange', !this.props.value);
    }
  };

  calcThumbOnPosition() {
    const props = this.getThemeProps();
    const width = props.width || DEFAULT_WIDTH;
    const thumbSize = props.thumbSize || DEFAULT_THUMB_SIZE;
    let position = width - (2 * INNER_PADDING + thumbSize);
    position *= Constants.isRTL ? -1 : 1;
    return position;
  }

  getSwitchStyle() {
    const {value, onColor, offColor, style: propsStyle, disabled, disabledColor} = this.getThemeProps();
    const style = [this.styles.switch];

    if (disabled) {
      style.push(disabledColor ? {backgroundColor: disabledColor} : this.styles.switchDisabled);
    } else if (value) {
      style.push(onColor ? {backgroundColor: onColor} : this.styles.switchOn);
    } else {
      style.push(offColor ? {backgroundColor: offColor} : this.styles.switchOff);
    }

    style.push(propsStyle);
    return style;
  }

  renderThumb() {
    const {thumbStyle} = this.getThemeProps();
    const {thumbPosition} = this.state;

    const interpolatedTranslateX = thumbPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.calcThumbOnPosition()]
    });

    const thumbPositionStyle = {
      transform: [{translateX: interpolatedTranslateX}]
    };

    return <Animated.View style={[this.styles.thumb, thumbPositionStyle, thumbStyle]}/>;
  }

  render() {
    const {...others} = this.getThemeProps();

    return (
      <TouchableOpacity
        {...this.getAccessibilityProps()}
        activeOpacity={1}
        {...others}
        style={this.getSwitchStyle()}
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
  disabledColor = Colors.dark70,
  thumbColor = Colors.white,
  thumbSize = DEFAULT_THUMB_SIZE
}) {
  return StyleSheet.create({
    switch: {
      width,
      height,
      borderRadius: BorderRadiuses.br100,
      justifyContent: 'center',
      padding: INNER_PADDING
    },
    switchOn: {
      backgroundColor: onColor
    },
    switchOff: {
      backgroundColor: offColor
    },
    switchDisabled: {
      backgroundColor: disabledColor
    },
    thumb: {
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
      backgroundColor: thumbColor
    }
  });
}

export default Switch;
