import React from 'react';
import {PickerProps, PickerModes} from '../types';
import Button from '../../button';

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

const usePickerDialogProps = (props: PickerProps, onDone: any) => {
  const {customPickerProps, mode, testID} = props;
  const migrateDialog = customPickerProps?.migrateDialog;
  const defaultProps = migrateDialog ? NEW_DIALOG_PROPS : DIALOG_PROPS;

  const modifiedHeaderProps = migrateDialog && {
    headerProps: {
      trailingAccessory: (
        <Button
          label="Save"
          link
          style={{height: 30}}
          onPress={mode === PickerModes.MULTI ? onDone : undefined}
          testID={`${testID}.dialog.header.save`}
        />
      ),
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
