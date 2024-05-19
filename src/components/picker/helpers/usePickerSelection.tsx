import {RefObject, useCallback, useState, useEffect} from 'react';
import _ from 'lodash';
import {PickerProps, PickerValue, PickerSingleValue, PickerMultiValue, PickerModes} from '../types';

interface UsePickerSelectionProps
  extends Pick<PickerProps, 'value' | 'onChange' | 'getItemValue' | 'topBarProps' | 'mode'> {
  pickerExpandableRef: RefObject<any>;
  setSearchValue: (searchValue: string) => void;
}

const usePickerSelection = (props: UsePickerSelectionProps) => {
  const {value, onChange, topBarProps, pickerExpandableRef, getItemValue, setSearchValue, mode} = props;
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
    const itemAsArray = [item];
    const newValue = _.xor(multiDraftValue, itemAsArray);
    setMultiDraftValue(newValue);
  },
  [multiDraftValue, getItemValue]);

  const cancelSelect = useCallback(() => {
    setSearchValue('');
    setMultiDraftValue(multiFinalValue);
    pickerExpandableRef.current?.closeExpandable?.();
    topBarProps?.onCancel?.();
  }, [multiFinalValue, topBarProps]);

  return {
    multiDraftValue,
    onDoneSelecting,
    toggleItemSelection,
    cancelSelect
  };
};

export default usePickerSelection;
