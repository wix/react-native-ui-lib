import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';
import Assets from '../../assets';
import {Colors} from '../../style';

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

  onPress = () => {
    _.invoke(this.props, 'onValueChange', !this.props.value);
  };

  render() {
    const {value, selectedIcon, style} = this.getThemeProps();
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[this.styles.container, value && this.styles.containerSelected, style]}
        onPress={this.onPress}
      >
        {value && <Image style={this.styles.selectedIcon} source={selectedIcon || Assets.icons.checkSmall} />}
      </TouchableOpacity>
    );
  }
}

function createStyles({color = DEFAULT_COLOR, iconColor = DEFAULT_ICON_COLOR, size = DEFAULT_SIZE, borderRadius}) {
  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: borderRadius || size / 2,
      borderWidth: 1,
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
