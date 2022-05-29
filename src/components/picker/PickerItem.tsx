import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useContext} from 'react';
import {StyleSheet} from 'react-native';
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
import {PickerItemProps} from './types';

/**
 * @description: Picker.Item, for configuring the Picker's selectable options
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PickerScreen.tsx
 */
const PickerItem = (props: PickerItemProps) => {
  const {
    value,
    label,
    labelStyle,
    disabled,
    selectedIcon = Assets.icons.check,
    selectedIconColor = Colors.$iconPrimary,
    testID
  } = props;
  const context = useContext(PickerContext);
  const {migrate} = context;
  const customRenderItem = context.renderItem || props.renderItem;
  const itemValue = !migrate && typeof value === 'object' ? value?.value : value;
  const isSelected = isItemSelected(itemValue, context.value);
  const itemLabel = getItemLabel(label, value, props.getItemLabel || context.getItemLabel);
  const selectedCounter = context.selectionLimit && _.isArray(context.value) && context.value?.length;
  const accessibilityProps = {
    accessibilityState: isSelected ? {selected: true} : undefined,
    accessibilityHint: 'Double click to select this suggestion',
    ...Modifiers.extractAccessibilityProps(props)
  };

  const isItemDisabled = useMemo(() => {
    return !!(disabled || (!isSelected && context.selectionLimit && context.selectionLimit === selectedCounter));
  }, [selectedCounter]);

  useEffect(() => {
    if (_.isPlainObject(value)) {
      LogService.warn('UILib Picker.Item will stop supporting passing object as value & label (e.g {value, label}) in the next major version. Please pass separate label and value props');
    }
  }, [value]);

  const selectedIndicator = useMemo(() => {
    if (isSelected) {
      return <Image source={selectedIcon} tintColor={isItemDisabled ? Colors.$iconDisabled : selectedIconColor}/>;
    }
  }, [isSelected, isItemDisabled, selectedIcon, selectedIconColor]);

  const itemLabelStyle = useMemo(() => {
    return [styles.labelText, isItemDisabled ? styles.labelTextDisabled : undefined, labelStyle];
  }, [isItemDisabled, labelStyle]);

  const _onPress = useCallback(() => {
    if (migrate) {
      context.onPress(value);
    } else {
      context.onPress(typeof value === 'object' || context.isMultiMode ? value : {value, label: itemLabel});
    }
  }, [migrate, value, context.onPress]);

  const onSelectedLayout = useCallback((...args: any[]) => {
    _.invoke(context, 'onSelectedLayout', ...args);
  }, []);

  const _renderItem = () => {
    return (
      <View style={styles.container} flex row spread centerV>
        <Text numberOfLines={1} style={itemLabelStyle}>
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
      {customRenderItem ? customRenderItem(value, {...props, isSelected, isItemDisabled}, itemLabel) : _renderItem()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56.5,
    paddingHorizontal: 23,
    borderColor: Colors.$outlineDefault,
    borderBottomWidth: 1
  },
  labelText: {
    ...Typography.text70,
    color: Colors.$textDefault,
    flex: 1,
    textAlign: 'left'
  },
  labelTextDisabled: {
    color: Colors.$textDisabled
  }
});

PickerItem.displayName = 'Picker.Item';

export default PickerItem;
