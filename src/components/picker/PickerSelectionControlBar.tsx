import React, {useMemo, useCallback} from 'react';
import Button from '../button';
import Checkbox from '../checkbox';
import View from '../view';
import Text from '../text';
import {PickerItemProps, PickerProps, PickerContextProps, PickerMultiValue} from './types';

export type PickerSelectionControlBarProps = PickerProps['selectionStatus'] &
  Partial<PickerContextProps> & {
    value?: PickerMultiValue;
    items?: PickerItemProps[];
  };

export default function PickerSelectionControlBar(props: PickerSelectionControlBarProps) {
  const {
    selectAllType = 'none',
    buttonProps = {},
    checkboxProps = {},
    containerStyle,
    value = [],
    items = [],
    toggleAllItemsSelection,
    showLabel = true,
    customLabel
  } = props;

  const availableItems = useMemo(() => items.filter(item => !item.disabled).map(item => item.value), [items]);
  const isAllSelected = value.length === availableItems.length;
  const checkboxIndeterminate = value.length > 0 && value.length < availableItems.length;
  const defaultLabel = `${value.length} Selected ${isAllSelected ? '(All)' : ''}`;

  const handlePress = useCallback(() => {
    const newSelectionState = !isAllSelected;
    toggleAllItemsSelection?.(availableItems, newSelectionState);
    if (selectAllType === 'button') {
      buttonProps.onPress?.(availableItems);
    } else if (selectAllType === 'checkbox') {
      checkboxProps.onValueChange?.(newSelectionState);
    }
  }, [isAllSelected, toggleAllItemsSelection, availableItems, selectAllType, buttonProps, checkboxProps]);

  const renderSelectionStatus = () => {
    if (selectAllType === 'button') {
      return (
        <Button label={isAllSelected ? 'Deselect All' : 'Select All'} link {...buttonProps} onPress={handlePress}/>
      );
    } else if (selectAllType === 'checkbox') {
      return (
        <Checkbox
          {...checkboxProps}
          value={value.length > 0}
          indeterminate={checkboxIndeterminate}
          onValueChange={handlePress}
        />
      );
    }
  };

  const renderLabel = () => {
    if (showLabel) {
      return <Text>{customLabel || defaultLabel}</Text>;
    }
    return null;
  };

  return (
    <View row spread centerV paddingH-page style={containerStyle}>
      {renderLabel()}
      {renderSelectionStatus()}
    </View>
  );
}
