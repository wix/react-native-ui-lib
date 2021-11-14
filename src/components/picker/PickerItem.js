import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useContext} from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import {LogService} from '../../services';
import {Colors, Typography} from '../../style';
import * as Modifiers from '../../commons/modifiers';
import Assets from '../../assets';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Image from '../image';
import Text from '../text';
import {getItemLabel, isItemSelected} from './PickerPresenter';
import PickerContext from './PickerContext';

/**
 * @description: Picker.Item, for configuring the Picker's selectable options
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PickerScreen.js
 */
const PickerItem = props => {
  const {
    value,
    label,
    labelStyle,
    disabled,
    selectedIcon = Assets.icons.check,
    selectedIconColor = Colors.primary,
    testID
  } = props;
  const context = useContext(PickerContext);
  const {migrate} = context;
  const customRenderItem = context.renderItem || props.renderItem;
  const itemValue = !migrate && _.isPlainObject(value) ? value?.value : value;
  const isSelected = isItemSelected(itemValue, context.value);
  const itemLabel = getItemLabel(label, value, props.getItemLabel || context.getItemLabel);
  const selectedCounter = context.selectionLimit && context.value?.length;
  const accessibilityProps = {
    accessibilityState: isSelected ? {selected: true} : undefined,
    accessibilityHint: 'Double click to select this suggestion',
    ...Modifiers.extractAccessibilityProps(props)
  };

  const isItemDisabled = useMemo(() => {
    return disabled || (!isSelected && context.selectionLimit && context.selectionLimit === selectedCounter);
  }, [selectedCounter]);
  
  useEffect(() => {
    if (_.isPlainObject(value)) {
      LogService.warn('UILib Picker.Item will stop supporting passing object as value & label (e.g {value, label}) in the next major version. Please pass separate label and value props');
    }
  }, [value]);

  const selectedIndicator = useMemo(() => {
    if (isSelected) {
      return <Image source={selectedIcon} tintColor={isItemDisabled ? Colors.grey60 : selectedIconColor}/>;
    }
  }, [isSelected, isItemDisabled, selectedIcon, selectedIconColor]);

  const _onPress = useCallback(() => {
    if (migrate) {
      context.onPress(value);
    } else {
      context.onPress((_.isPlainObject(value) || context.isMultiMode) ? value : {value, label: itemLabel});
    }
  }, [migrate, value, context.onPress]);

  const onSelectedLayout = useCallback((...args) => {
    _.invoke(context, 'onSelectedLayout', ...args);
  }, []);

  const _renderItem = () => {
    return (
      <View style={styles.container} flex row spread centerV>
        <Text numberOfLines={1} style={[styles.labelText, isItemDisabled && styles.labelTextDisabled, labelStyle]}>
          {itemLabel}
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
      disabled={isItemDisabled}
      testID={testID}
      throttleTime={0}
      {...accessibilityProps}
    >
      {customRenderItem ? customRenderItem(value, {...props, isSelected}, itemLabel) : _renderItem()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56.5,
    paddingHorizontal: 23,
    borderColor: Colors.rgba(Colors.grey10, 0.1),
    borderBottomWidth: 1
  },
  labelText: {
    ...Typography.text70,
    color: Colors.grey10,
    flex: 1,
    textAlign: 'left'
  },
  labelTextDisabled: {
    color: Colors.grey60
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
   * Item's label style
   */
  labelStyle: RNText.propTypes.style,
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
