import React, {useCallback, useContext} from 'react';
import Button from '../button';
import Checkbox from '../checkbox';
import View from '../view';
import Text from '../text';
import Dividers from '../../style/dividers';
import PickerContext from './PickerContext';
import {PickerSelectionStatusProps, PickerMultiValue} from './types';

export default function PickerSelectionStatusBar(props: PickerSelectionStatusProps) {
  const {containerStyle, getLabel, showLabel = true, selectAllType = 'button'} = props;
  const context = useContext(PickerContext);
  const {toggleAllItemsSelection, value = [], areAllItemsSelected} = context;
  const _value: PickerMultiValue = Array.isArray(value) ? value : [];

  const checkboxIndeterminate = _value.length > 0 && !areAllItemsSelected;
  const label =
    getLabel?.({selectedCount: _value.length, value: _value, areAllItemsSelected}) ??
    `${_value.length} Selected ${areAllItemsSelected ? '(All)' : ''}`;

  const isButton = selectAllType === 'button' && 'buttonProps' in props;
  const isCheckbox = selectAllType === 'checkbox' && 'checkboxProps' in props;

  const handlePress = useCallback(() => {
    const newSelectionState = !areAllItemsSelected;
    toggleAllItemsSelection?.(newSelectionState);
    if (isButton) {
      props.buttonProps?.onPress?.({customValue: newSelectionState});
    } else if (isCheckbox) {
      props.checkboxProps?.onValueChange?.(newSelectionState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areAllItemsSelected, toggleAllItemsSelection]);

  const renderSelectionStatus = () => {
    if (isButton) {
      return (
        <Button
          label={areAllItemsSelected ? 'Deselect All' : 'Select All'}
          link
          {...props.buttonProps}
          onPress={handlePress}
        />
      );
    } else if (isCheckbox) {
      return (
        <Checkbox
          {...props.checkboxProps}
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
      <View row spread centerV paddingH-page marginV-s4 style={containerStyle}>
        {renderLabel()}
        {renderSelectionStatus()}
      </View>
      <View style={Dividers.d20}/>
    </View>
  );
}
