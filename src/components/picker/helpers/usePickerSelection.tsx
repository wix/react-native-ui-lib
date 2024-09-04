import {RefObject, useCallback, useState, useEffect} from 'react';
import _ from 'lodash';
import {PickerProps, PickerValue, PickerSingleValue, PickerMultiValue, PickerModes} from '../types';

interface UsePickerSelectionProps
  extends Pick<
    PickerProps,
    | 'migrate'
    | 'value'
    | 'onChange'
    | 'getItemValue'
    | 'topBarProps'
    | 'mode'
    | 'selectionValidation'
    | 'selectionOptions'
    | 'useDialog'
  > {
  pickerExpandableRef: RefObject<any>;
  setSearchValue: (searchValue: string) => void;
}

const usePickerSelection = (props: UsePickerSelectionProps) => {
  const {
    migrate,
    value,
    onChange,
    topBarProps,
    pickerExpandableRef,
    getItemValue,
    setSearchValue,
    mode,
    selectionValidation,
    selectionOptions,
    useDialog
  } = props;
  const {onValidationFailed, validateOnStart} = selectionOptions || {};
  const [multiDraftValue, setMultiDraftValue] = useState(value as PickerMultiValue);
  const [multiFinalValue, setMultiFinalValue] = useState(value as PickerMultiValue);
  const [isValid, setIsValid] = useState<boolean | undefined>(true);

  useEffect(() => {
    if (mode === PickerModes.MULTI && multiFinalValue !== value) {
      setMultiDraftValue(value as PickerMultiValue);
      setMultiFinalValue(value as PickerMultiValue);
    }
  }, [value]);

  useEffect(() => {
    if (validateOnStart) {
      _selectionValidation?.(value);
    }
  }, []);

  const _selectionValidation = (item: PickerValue) => {
    if (useDialog) {
      const isValid = selectionValidation?.(item);
      console.log(`isValid:`, isValid);
      if (!isValid) {
        onValidationFailed?.(item);
      }
      setIsValid(isValid);
    }
  };

  const onDoneSelecting = useCallback((item: PickerValue) => {
    setSearchValue('');
    setMultiFinalValue(item as PickerMultiValue);
    pickerExpandableRef.current?.closeExpandable?.();
    _selectionValidation(item);
    onChange?.(item);
  },
  [onChange, useDialog, selectionValidation]);

  const toggleItemSelection = useCallback((item: PickerSingleValue) => {
    let newValue;
    const itemAsArray = [item];
    if (!migrate) {
      newValue = _.xorBy(multiDraftValue, itemAsArray, getItemValue || 'value');
    } else {
      newValue = _.xor(multiDraftValue, itemAsArray);
    }

    _selectionValidation(newValue);
    setMultiDraftValue(newValue);
  },
  [multiDraftValue, getItemValue, useDialog, selectionValidation]);

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
    cancelSelect,
    shouldDisableDoneButton: isValid
  };
};

export default usePickerSelection;
