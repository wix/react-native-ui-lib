import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {Colors} from '../../style';
import Assets from '../../assets';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;
const DEFAULT_ICON_COLOR = Colors.red;

/**
 * Checkbox component for toggling boolean value related to some context
 */
class Checkbox extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: new Animated.Value(props.value ? 1 : 0),
    };

    this.animationStyle = {
      opacity: this.state.isChecked.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scaleX: this.state.isChecked.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
        {
          scaleY: this.state.isChecked.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ],
    };
  }

  static displayName = 'Checkbox';
  static propTypes = {
    /**
     * The value of the Checkbox. If true the switch will be turned on. Default value is false.
     */
    value: PropTypes.bool,
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange: PropTypes.func,
    /**
     * Whether the checkbox should be disabled
     */
    disabled: PropTypes.bool,
    /**
     * The Checkbox color
     */
    color: PropTypes.string,
    /**
     * The size of the checkbox. affect both width and height
     */
    size: PropTypes.number,
    /**
     * The Checkbox border radius
     */
    borderRadius: PropTypes.number,
    /**
     * The icon asset to use for the selected indication (accept only local assets)
     */
    selectedIcon: PropTypes.number,
    /**
     * The selected icon color
     */
    iconColor: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.check(nextProps.value);
    }
  }

  check(nextProps) {
    const {isChecked} = this.state;

    Animated.timing(isChecked, {
      duration: 220,
      easing: Easing.bezier(0.77, 0.0, 0.175, 1.0),
      toValue: nextProps.value,
      useNativeDriver: true,
    }).start();
  }

  onPress = () => {
    const {disabled} = this.getThemeProps();
    if (!disabled) {
      _.invoke(this.props, 'onValueChange', !this.props.value);
      this.check(!this.props.value);
    }
  };

  getBorderColor() {
    const {value, color, style: propsStyle, disabled} = this.getThemeProps();
    const style = [this.styles.containerBorder];
    if (value) {
      if (disabled) {
        style.push({borderColor: Colors.dark70});
      } else {
        style.push({borderColor: color || DEFAULT_COLOR});
      }
    }
    style.push(propsStyle);
    return style;
  }

  getFillColor() {
    const {value, color, disabled} = this.getThemeProps();
    if (value) {
      if (disabled) {
        return {backgroundColor: Colors.dark70};
      } else {
        return {backgroundColor: color || DEFAULT_COLOR};
      }
    } else {
      return {backgroundColor: 'transparent'};
    }
  }

  render() {
    const {value, selectedIcon, style, color, iconColor, disabled, testID, ...others} = this.getThemeProps();
    return (
      <TouchableOpacity
        activeOpacity={1}
        testID={testID}
        {...others}
        style={[this.getBorderColor()]}
        onPress={this.onPress}
      >
        {value && (
          <Animated.View
            style={[this.styles.container, this.getFillColor(), value && {opacity: this.animationStyle.opacity}]}
          >
            <Animated.Image
              style={[
                this.styles.selectedIcon,
                color && {tintColor: iconColor},
                {transform: this.animationStyle.transform},
                disabled && {tintColor: DEFAULT_ICON_COLOR},
              ]}
              source={selectedIcon || Assets.icons.checkSmall}
              testID={`${testID}.selected`}
            />
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  }
}

function createStyles({color = DEFAULT_COLOR, iconColor = DEFAULT_ICON_COLOR, size = DEFAULT_SIZE, borderRadius}) {
  return StyleSheet.create({
    containerBorder: {
      width: size,
      height: size,
      borderRadius: borderRadius || 8,
      borderWidth: 2,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      width: size,
      height: size,
      borderRadius: borderRadius || 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedIcon: {
      height: size,
      width: size,
      tintColor: iconColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

export default Checkbox;
