import _xor from "lodash/xor";
import _xorBy from "lodash/xorBy";
import { useCallback, useState, useEffect, useMemo } from 'react';
import { PickerModes } from "../types";
const usePickerSelection = props => {
  const {
    migrate,
    value,
    onChange,
    topBarProps,
    pickerExpandableRef,
    getItemValue,
    setSearchValue,
    mode,
    items
  } = props;
  const [multiDraftValue, setMultiDraftValue] = useState(value);
  const [multiFinalValue, setMultiFinalValue] = useState(value);
  useEffect(() => {
    if (mode === PickerModes.MULTI && multiFinalValue !== value) {
      setMultiDraftValue(value);
      setMultiFinalValue(value);
    }
  }, [value]);
  const onDoneSelecting = useCallback(item => {
    setSearchValue('');
    setMultiFinalValue(item);
    pickerExpandableRef.current?.closeExpandable?.();
    onChange?.(item);
  }, [onChange]);
  const toggleItemSelection = useCallback(item => {
    let newValue;
    const itemAsArray = [item];
    if (!migrate) {
      newValue = _xorBy(multiDraftValue, itemAsArray, getItemValue || 'value');
    } else {
      newValue = _xor(multiDraftValue, itemAsArray);
    }
    setMultiDraftValue(newValue);
  }, [multiDraftValue, getItemValue]);
  const cancelSelect = useCallback(() => {
    setSearchValue('');
    setMultiDraftValue(multiFinalValue);
    pickerExpandableRef.current?.closeExpandable?.();
    topBarProps?.onCancel?.();
  }, [multiFinalValue, topBarProps]);
  const availableItems = useMemo(() => {
    return items?.filter(item => !item.disabled).map(item => item.value) || [];
  }, [items]);
  const areAllItemsSelected = useMemo(() => {
    return multiDraftValue?.length === availableItems.length;
  }, [multiDraftValue, availableItems]);
  const selectedCount = useMemo(() => {
    return multiDraftValue?.length;
  }, [multiDraftValue]);
  const toggleAllItemsSelection = useCallback(selectAll => {
    setMultiDraftValue(selectAll ? availableItems : []);
  }, [availableItems]);
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