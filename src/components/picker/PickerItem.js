import React, {PropTypes} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Typography} from '../../style';
import * as Assets from '../../assets';

const PickerItem = ({label, value, isSelected, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress({value})}>
      <Text style={styles.labelText}>{label}</Text>
      {isSelected && <Image source={Assets.icons.check}/>}
    </TouchableOpacity>
  );
};

PickerItem.propTypes = {
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

export default PickerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56.5,
    paddingHorizontal: 23,
    borderColor: `${Colors.dark10}1A`,
    borderBottomWidth: 1,
  },
  labelText: {
    ...Typography.text70,
    color: Colors.dark10,
  },
});
