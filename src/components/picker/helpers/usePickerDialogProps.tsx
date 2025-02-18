import React from 'react';
import {StyleSheet, DimensionValue} from 'react-native';
import {PickerProps, PickerModes} from '../types';
import Button from '../../button';
import {Colors} from '../../../style';

const DIALOG_PROPS = {
  bottom: true,
  width: '100%' as DimensionValue,
  useSafeArea: true
};

type HookProps = PickerProps & {
  shouldDisableDoneButton?: boolean;
};

const usePickerDialogProps = (props: HookProps, onDone: any) => {
  const {customPickerProps, mode, testID, selectionOptions, shouldDisableDoneButton} = props;
  const migrateDialog = customPickerProps?.migrateDialog;
  const defaultProps = DIALOG_PROPS;
  const {validationMessage, validationMessageStyle} = selectionOptions || {};

  const modifiedHeaderProps = migrateDialog &&
    validationMessage && {
    headerProps: {
      trailingAccessory: validationMessage && (
        <Button
          label="Save"
          link
          style={{height: 30}}
          onPress={mode === PickerModes.MULTI ? onDone : undefined}
          testID={`${testID}.dialog.header.save`}
          disabled={!shouldDisableDoneButton}
        />
      ),
      subtitle: !shouldDisableDoneButton && validationMessage,
      subtitleStyle: [styles.validationMessage, validationMessageStyle],
      ...customPickerProps?.dialogProps?.headerProps
    }
  };

  const dialogProps: PickerProps['customPickerProps'] = {
    dialogProps: {
      ...defaultProps,
      ...customPickerProps?.dialogProps,
      ...modifiedHeaderProps
    }
  };

  return dialogProps;
};

export default usePickerDialogProps;

const styles = StyleSheet.create({
  validationMessage: {
    color: Colors.red30
  }
});
