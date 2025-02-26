import {useCallback} from 'react';
import {PickerProps} from '../types';

interface UsePickerDialogPropsProps
  extends Pick<PickerProps, 'selectionValidation' | 'selectionOptions' | 'customPickerProps'> {
  shouldDisableDoneButton?: boolean;
}

const usePickerDialogProps = (props: UsePickerDialogPropsProps) => {
  const {selectionValidation, selectionOptions, customPickerProps, shouldDisableDoneButton} = props;
  const {validationMessage, validationMessageStyle} = selectionOptions || {};

  const getDialogHeader = useCallback(() => {
    if (selectionValidation && validationMessage) {
      return {
        title: validationMessage,
        titleStyle: validationMessageStyle,
        showDone: true,
        doneDisabled: !shouldDisableDoneButton,
        ...(customPickerProps?.dialogProps as any)?.headerProps
      };
    }
    return (customPickerProps?.dialogProps as any)?.headerProps;
  }, [
    selectionValidation,
    validationMessage,
    validationMessageStyle,
    shouldDisableDoneButton,
    customPickerProps?.dialogProps
  ]);

  const getDialogProps = useCallback(() => {
    return {
      ...customPickerProps?.dialogProps,
      headerProps: getDialogHeader()
    };
  }, [customPickerProps?.dialogProps, getDialogHeader]);

  return {
    getDialogProps
  };
};

export default usePickerDialogProps;
