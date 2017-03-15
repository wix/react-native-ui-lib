import React, {PropTypes} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Typography, ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import * as Assets from '../../assets';


class PickerItem extends BaseComponent {
  static propTypes = {
    /**
     * The item label
     */
    label: PropTypes.string,
    /**
     * The item value
     */
    value: PropTypes.any,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {label, value, isSelected, onPress} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.5} style={this.styles.container} onPress={() => onPress({value})}>
        <Text style={this.styles.labelText}>{label}</Text>
        {isSelected && <Image style={this.styles.checkIcon} source={Assets.icons.check}/>}
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 56.5,
      paddingHorizontal: 23,
      borderColor: Colors.rgba(Colors.dark10, 0.1),
      borderBottomWidth: 1,
    },
    labelText: {
      ...Typography.text70,
      color: Colors.dark10,
    },
    checkIcon: {
      tintColor: ThemeManager.primaryColor,
    },
  });
}

export default PickerItem;
