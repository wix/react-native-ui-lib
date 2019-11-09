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
const DEFAULT_ICON_COLOR = Colors.white;
const DEFAULT_DISABLED_COLOR = Colors.dark70;

/**
 * Checkbox component for toggling boolean value related to some context
 */
class Checkbox extends BaseComponent {
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
    iconColor: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: new Animated.Value(this.props.value ? 1 : 0)
    };

    this.animationStyle = {
      opacity: this.state.isChecked,
      transform: [
        {
          scaleX: this.state.isChecked
        },
        {
          scaleY: this.state.isChecked
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    const {value} = this.getThemeProps();
    if (prevProps.value !== value) {
      this.animateCheckbox(value);
    }
  }

  getAccessibilityProps() {
    const {accessibilityLabel, disabled, value} = this.getThemeProps();
    const checkedState = value ? 'checked' : 'unchecked';

    return {
      accessible: true,
      accessibilityLabel: accessibilityLabel ? `${accessibilityLabel} ${checkedState}` : `checkbox ${checkedState}`, //TODO: RN60 fix - label and role and convert to accessibilityActions
      accessibilityRole: 'button',
      accessibilityStates: disabled ? ['disabled'] : undefined
    };
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  animateCheckbox(value) {
    const {isChecked} = this.state;

    Animated.timing(isChecked, {
      duration: 170,
      easing: Easing.bezier(0.77, 0.0, 0.175, 1.0),
      toValue: Number(value),
      useNativeDriver: true
    }).start();
  }

  onPress = () => {
    const {disabled} = this.getThemeProps();

    if (!disabled) {
      _.invoke(this.props, 'onValueChange', !this.props.value);
    }
  };

  getColor() {
    const {color, disabled} = this.getThemeProps();
    return disabled ? DEFAULT_DISABLED_COLOR : color || DEFAULT_COLOR;
  }

  getBorderStyle() {
    const {style: propsStyle} = this.getThemeProps();
    const borderColor = {borderColor: this.getColor()};
    const style = [this.styles.container, {borderWidth: 2}, borderColor, propsStyle];

    return style;
  }

  render() {
    const {selectedIcon, color, iconColor, disabled, testID, ...others} = this.getThemeProps();
    return (
      <TouchableOpacity
        {...this.getAccessibilityProps()}
        activeOpacity={1}
        testID={testID}
        {...others}
        style={this.getBorderStyle()}
        onPress={this.onPress}
      >
        {
          <Animated.View
            style={[this.styles.container, {backgroundColor: this.getColor()}, {opacity: this.animationStyle.opacity}]}
          >
            <Animated.Image
              style={[
                this.styles.selectedIcon,
                color && {tintColor: iconColor},
                {transform: this.animationStyle.transform},
                disabled && {tintColor: DEFAULT_ICON_COLOR}
              ]}
              source={selectedIcon || Assets.icons.checkSmall}
              testID={`${testID}.selected`}
            />
          </Animated.View>
        }
      </TouchableOpacity>
    );
  }
}

function createStyles({color = DEFAULT_COLOR, iconColor = DEFAULT_ICON_COLOR, size = DEFAULT_SIZE, borderRadius}) {
  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: borderRadius || 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: color
    },
    selectedIcon: {
      tintColor: iconColor,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
}

export default Checkbox;
