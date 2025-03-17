import React, {useCallback} from 'react';
import Button from '../button';
import Checkbox from '../checkbox';
import View from '../view';
import Text from '../text';
import {
  PickerProps,
  PickerContextProps,
  PickerMultiValue,
  PickerSelectAllType,
  ButtonSelectionStatus,
  CheckboxSelectionStatus
} from './types';

export type PickerSelectionStatusToolbarBaseProps = PickerProps['selectionStatus'] & {
  value?: PickerMultiValue;
  availableItems?: PickerMultiValue;
};

export type PickerSelectionStatusToolbarProps =
  | (Partial<PickerContextProps> & (ButtonSelectionStatus & PickerSelectionStatusToolbarBaseProps))
  | (Partial<PickerContextProps> & (CheckboxSelectionStatus & PickerSelectionStatusToolbarBaseProps));

export default function PickerSelectionStatusToolbar(props: PickerSelectionStatusToolbarProps) {
  const {
    containerStyle,
    getLabel,
    availableItems = [],
    selectAllType = 'none',
    showLabel = true,
    toggleAllItemsSelection,
    value = [],
    renderTopCustomElement,
    renderBottomCustomElement
  } = props;

  const isAllSelected = value.length === availableItems.length;
  const checkboxIndeterminate = value.length > 0 && value.length < availableItems.length;
  const label =
    getLabel?.({selectedCount: value.length, value, isAllSelected}) ??
    `${value.length} Selected ${isAllSelected ? '(All)' : ''}`;

  let buttonProps: ButtonSelectionStatus['buttonProps'] | undefined;
  let checkboxProps: CheckboxSelectionStatus['checkboxProps'] | undefined;

  switch (props.selectAllType) {
    case PickerSelectAllType.button:
      buttonProps = props.buttonProps;
      break;
    case PickerSelectAllType.checkbox:
      checkboxProps = props.checkboxProps;
      break;
  }

  const handlePress = useCallback(() => {
    const newSelectionState = !isAllSelected;
    toggleAllItemsSelection?.(newSelectionState);
    buttonProps?.onPress?.(availableItems);
    checkboxProps?.onValueChange?.(newSelectionState);
  }, [isAllSelected, toggleAllItemsSelection, availableItems, buttonProps, checkboxProps]);

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
      return <Text>{label}</Text>;
    }
    return null;
  };

  return (
    <View>
      {renderTopCustomElement?.()}
      <View row spread centerV paddingH-page style={containerStyle}>
        {renderLabel()}
        {renderSelectionStatus()}
      </View>
      {renderBottomCustomElement?.()}
    </View>
  );
}
