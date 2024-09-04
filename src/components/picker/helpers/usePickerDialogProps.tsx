import React from 'react';
import {StyleSheet} from 'react-native';
import {PickerProps, PickerModes} from '../types';
import Button from '../../button';
import {Colors} from '../../../style';

const DIALOG_PROPS = {
  bottom: true,
  width: '100%',
  height: 250
};

const NEW_DIALOG_PROPS = {
  bottom: true,
  useSafeArea: true,
  height: '60%',
  width: '95%'
};

type HookProps = PickerProps & {
  shouldDisableDoneButton?: boolean;
};

const usePickerDialogProps = (props: HookProps, onDone: any) => {
  const {customPickerProps, mode, testID, selectionOptions, shouldDisableDoneButton} = props;
  const migrateDialog = customPickerProps?.migrateDialog;
  const defaultProps = migrateDialog ? NEW_DIALOG_PROPS : DIALOG_PROPS;
  const {validationMessage, validationMessageStyle} = selectionOptions || {};

  console.log(`shouldDisableDoneButton?`, shouldDisableDoneButton);

  const modifiedHeaderProps = migrateDialog && {
    headerProps: {
      trailingAccessory: (
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
