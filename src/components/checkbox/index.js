import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Colors} from '../../style';
import Assets from '../../assets';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';


const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;
const DEFAULT_ICON_COLOR = Colors.white;

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
    iconColor: PropTypes.string,
    /**
     * Use to identify the checkbox in tests
     */
    testID: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  onPress = () => {
    const {disabled} = this.getThemeProps();
    if (!disabled) {
      _.invoke(this.props, 'onValueChange', !this.props.value);
    }
  };

  getContainerStyle() {
    const {value, color, style: propsStyle, disabled} = this.getThemeProps();
    const style = [this.styles.container];

    if (value) {
      if (disabled) {
        style.push({backgroundColor: Colors.dark70, borderColor: Colors.dark70});
      } else {
        style.push(color ? {backgroundColor: color} : this.styles.containerSelected);
      }
    } else {
      if (disabled) {
        style.push({borderColor: Colors.dark70});
      }
      if (color) {
        style.push({borderColor: color});
      }
    }

    style.push(propsStyle);
    return style;
  }

  render() {
    const {value, selectedIcon, style, color, iconColor, disabled, testID, ...others} = this.getThemeProps();
    return (
      <TouchableOpacity
        activeOpacity={1}
        testID={testID}
        {...others}
        style={this.getContainerStyle()}
        onPress={this.onPress}
      >
        {value && (
          <Image
            style={[this.styles.selectedIcon, color && {tintColor: iconColor}, disabled && {tintColor: DEFAULT_ICON_COLOR}]}
            source={selectedIcon || Assets.icons.checkSmall}
            testID={`${testID}.selected`}
          />
        )}
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
      borderWidth: 2,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerSelected: {
      backgroundColor: color,
    },
    selectedIcon: {
      tintColor: iconColor,
    },
  });
}

export default Checkbox;
