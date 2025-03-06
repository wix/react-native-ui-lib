import {RefObject, useCallback, useState, useEffect} from 'react';
import _ from 'lodash';
import {PickerProps, PickerValue, PickerSingleValue, PickerMultiValue, PickerModes, PickerItemProps} from '../types';

interface UsePickerSelectionProps
  extends Pick<PickerProps, 'migrate' | 'value' | 'onChange' | 'getItemValue' | 'topBarProps' | 'mode'> {
  pickerExpandableRef: RefObject<any>;
  setSearchValue: (searchValue: string) => void;
  items?: PickerItemProps[];
}

const usePickerSelection = (props: UsePickerSelectionProps) => {
  const {migrate, value, onChange, topBarProps, pickerExpandableRef, getItemValue, setSearchValue, mode} = props;
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

  const toggleAllItemsSelection = useCallback((itemsToToggle: PickerItemProps[], select: boolean) => {
    if (!itemsToToggle) {
      return;
    }
    
    let newValue: PickerMultiValue = [];
    if (select) {
      // Select all items
      newValue = itemsToToggle.filter(item => !item.disabled).map(item => item.value);
    }
    
    setMultiDraftValue(newValue);
  }, []);

  return {
    multiDraftValue,
    onDoneSelecting,
    toggleItemSelection,
    cancelSelect,
    toggleAllItemsSelection
  };
};

export default usePickerSelection;
