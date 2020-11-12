import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../style';
import * as Modifiers from '../../commons/modifiers';
import Assets from '../../assets';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Image from '../image';
import Text from '../text';

/**
 * @description: Picker.Item, for configuring the Picker's selectable options
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PickerScreen.js
 */
const PickerItem = props => {
  const {
    renderItem,
    value,
    label,
    onPress,
    disabled,
    isSelected,
    selectedIcon = Assets.icons.check,
    selectedIconColor = Colors.primary,
    testID
  } = props;

  useEffect(() => {
    if (_.isPlainObject(value)) {
      console.warn('UILib Picker.Item will stop supporting passing object as value & label (e.g {value, label}) in the next major version. Please pass separate label and value props');
    }
  }, [value]);

  // TODO: deprecate the check for object
  const _onPress = useCallback(() => {
    // onPress(_.isObject(value) ? value : {value, label});
    onPress(value);
  }, [value, onPress]);

  const onSelectedLayout = useCallback((...args) => {
    _.invoke(props, 'onSelectedLayout', ...args);
  }, []);

  const getLabel = () => {
    if (_.isObject(value)) {
      return _.invoke(props, 'getItemLabel', value) || _.get(value, 'label');
    }
    return label;
  };

  const selectedIndicator = useMemo(() => {
    if (isSelected) {
      return <Image source={selectedIcon} tintColor={disabled ? Colors.dark60 : selectedIconColor}/>;
    }
  }, [isSelected, disabled, selectedIcon, selectedIconColor]);

  const _renderItem = () => {
    return (
      <View style={styles.container} flex row spread centerV>
        <Text numberOfLines={1} style={[styles.labelText, disabled && styles.labelTextDisabled]}>
          {getLabel()}
        </Text>
        {selectedIndicator}
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={_onPress}
      onLayout={isSelected ? onSelectedLayout : undefined}
      disabled={disabled}
      testID={testID}
      throttleTime={0}
      {...Modifiers.extractAccessibilityProps(props)}
    >
      {renderItem ? renderItem(value, props, getLabel()) : _renderItem()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56.5,
    paddingHorizontal: 23,
    borderColor: Colors.rgba(Colors.dark10, 0.1),
    borderBottomWidth: 1
  },
  labelText: {
    ...Typography.text70,
    color: Colors.dark10,
    flex: 1,
    textAlign: 'left'
  },
  labelTextDisabled: {
    color: Colors.dark60
  }
});

PickerItem.displayName = 'Picker.Item';
PickerItem.propTypes = {
  /**
   * Item's value
   */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  /**
   * Item's label
   */
  label: PropTypes.string,
  /**
   * Custom function for the item label (e.g (value) => customLabel)
   */
  getItemLabel: PropTypes.func,
  /**
   * DEPRECATE: Function to return the value out of the item value prop when value is custom shaped.
   */
  getItemValue: PropTypes.func,
  /**
   * Is the item selected
   */
  isSelected: PropTypes.bool,
  /**
   * Pass to change the selected icon
   */
  selectedIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  /**
   * Pass to change the selected icon color
   */
  selectedIconColor: PropTypes.string,
  /**
   * Is the item disabled
   */
  disabled: PropTypes.bool,
  /**
   * Render custom item
   */
  renderItem: PropTypes.elementType,
  /**
   * Callback for onPress action
   */
  onPress: PropTypes.func,
  /**
   * Callback for onLayout event
   */
  onSelectedLayout: PropTypes.func
};

export default PickerItem;
