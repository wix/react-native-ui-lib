import React, {useCallback, useContext} from 'react';
import Button from '../button';
import Checkbox from '../checkbox';
import View from '../view';
import Text from '../text';
import PickerContext from './PickerContext';
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
  const {containerStyle, getLabel, selectAllType = 'button', showLabel = true, renderBottomCustomElement} = props;
  const context = useContext(PickerContext);
  const {toggleAllItemsSelection, value = [], areAllItemsSelected} = context;
  const _value: PickerMultiValue = Array.isArray(value) ? value : [];

  const checkboxIndeterminate = _value.length > 0 && !areAllItemsSelected;
  const label =
    getLabel?.({selectedCount: _value.length, value: _value, areAllItemsSelected}) ??
    `${_value.length} Selected ${areAllItemsSelected ? '(All)' : ''}`;

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
    const newSelectionState = !areAllItemsSelected;
    toggleAllItemsSelection?.(newSelectionState);
    buttonProps?.onPress?.({selectionValue: newSelectionState});
    checkboxProps?.onValueChange?.(newSelectionState);
  }, [areAllItemsSelected, toggleAllItemsSelection, buttonProps, checkboxProps]);

  const renderSelectionStatus = () => {
    if (selectAllType === 'button') {
      return (
        <Button
          label={areAllItemsSelected ? 'Deselect All' : 'Select All'}
          link
          {...buttonProps}
          onPress={handlePress}
        />
      );
    } else if (selectAllType === 'checkbox') {
      return (
        <Checkbox
          {...checkboxProps}
          value={_value.length > 0}
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
  };

  return (
    <View>
      <View row spread centerV paddingH-page style={containerStyle}>
        {renderLabel()}
        {renderSelectionStatus()}
      </View>
      {renderBottomCustomElement?.()}
    </View>
  );
}
