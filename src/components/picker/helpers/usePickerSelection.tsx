import {RefObject, useCallback, useState, useEffect, useMemo} from 'react';
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

  const availableItems: PickerMultiValue = useMemo(() => {
    return items?.filter(item => !item.disabled).map(item => item.value) || [];
  }, [items]);

  const areAllItemsSelected = useMemo(() => {
    return multiDraftValue?.length === availableItems.length;
  }, [multiDraftValue, availableItems]);

  const selectedCount = useMemo(() => {
    return multiDraftValue?.length;
  }, [multiDraftValue]);

  const toggleAllItemsSelection = useCallback((selectAll: boolean) => {
    setMultiDraftValue(selectAll ? availableItems : []);
  },
  [availableItems]);

  return {
    multiDraftValue,
    onDoneSelecting,
    toggleItemSelection,
    cancelSelect,
    areAllItemsSelected,
    selectedCount,
    toggleAllItemsSelection
  };
};

export default usePickerSelection;
