import {RefObject, useCallback, useState, useEffect} from 'react';
import _ from 'lodash';
import {PickerProps, PickerValue, PickerSingleValue, PickerMultiValue, PickerModes} from '../types';

interface UsePickerSelectionProps
  extends Pick<PickerProps, 'migrate' | 'value' | 'onChange' | 'getItemValue' | 'topBarProps' | 'mode' | 'items'> {
  pickerExpandableRef: RefObject<any>;
  setSearchValue: (searchValue: string) => void;
}

const usePickerSelection = (props: UsePickerSelectionProps) => {
  const {migrate, value, onChange, topBarProps, pickerExpandableRef, getItemValue, setSearchValue, mode, items} = props;
  const [multiDraftValue, setMultiDraftValue] = useState(value as PickerMultiValue);
  const [multiFinalValue, setMultiFinalValue] = useState(value as PickerMultiValue);

  useEffect(() => {
    if (mode === PickerModes.MULTI && multiFinalValue !== value) {
      setMultiDraftValue(value as PickerMultiValue);
      setMultiFinalValue(value as PickerMultiValue);
    }
  }, [value]);

  const onDoneSelecting = useCallback((item: PickerValue) => {
    setSearchValue('');
    setMultiFinalValue(item as PickerMultiValue);
    pickerExpandableRef.current?.closeExpandable?.();
    onChange?.(item);
  },
  [onChange]);

  const toggleItemSelection = useCallback((item: PickerSingleValue) => {
    let newValue;
    const itemAsArray = [item];
    if (!migrate) {
      newValue = _.xorBy(multiDraftValue, itemAsArray, getItemValue || 'value');
    } else {
      newValue = _.xor(multiDraftValue, itemAsArray);
    }

    setMultiDraftValue(newValue);
  },
  [multiDraftValue, getItemValue]);

  const cancelSelect = useCallback(() => {
    setSearchValue('');
    setMultiDraftValue(multiFinalValue);
    pickerExpandableRef.current?.closeExpandable?.();
    topBarProps?.onCancel?.();
  }, [multiFinalValue, topBarProps]);

  const selectAll = useCallback(() => {
    if (mode !== PickerModes.MULTI) {
      return;
    }
    
    if (!migrate) {
      const allValues = (items?.map(item => ({value: getItemValue?.(item as unknown as PickerValue) || item.value})) || []) as unknown as PickerMultiValue;
      const isAllSelected = _.isEqual(_.sortBy(multiDraftValue, 'value'), _.sortBy(allValues, 'value'));
      setMultiDraftValue(isAllSelected ? [] : allValues);
    } else {
      const allValues = (items?.map(item => getItemValue?.(item as unknown as PickerValue) || item.value) || []) as unknown as PickerMultiValue;
      const isAllSelected = _.isEqual(_.sortBy(multiDraftValue), _.sortBy(allValues));
      setMultiDraftValue(isAllSelected ? [] : allValues);
    }
  }, [mode, items, multiDraftValue, getItemValue, migrate]);

  return {
    multiDraftValue,
    onDoneSelecting,
    toggleItemSelection,
    cancelSelect,
    selectAll
  };
};

export default usePickerSelection;
