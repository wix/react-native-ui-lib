import React, {useRef} from 'react';
import {useDidUpdate} from 'hooks';
import ImperativeDialog, {
  ImperativeDialogProps,
  DialogDirections,
  DialogDirectionsEnum,
  ImperativeDialogMethods
} from './ImperativeDialog';
export {DialogDirections, DialogDirectionsEnum};

export interface DialogProps extends Omit<ImperativeDialogProps, 'initialVisibility'> {
  /**
   * The visibility of the dialog.
   */
  visible?: boolean;
}

const Dialog = (props: DialogProps) => {
  const {visible, ...others} = props;
  const initialVisibility = useRef(visible);
  const dialogRef = React.createRef<ImperativeDialogMethods>();

  useDidUpdate(() => {
    if (visible) {
      dialogRef.current?.open();
    } else {
      dialogRef.current?.close();
    }
  }, [visible]);

  return <ImperativeDialog {...others} initialVisibility={initialVisibility.current} ref={dialogRef}/>;
};

Dialog.displayName = 'Incubator.Dialog';
Dialog.directions = DialogDirectionsEnum;

export default Dialog;
