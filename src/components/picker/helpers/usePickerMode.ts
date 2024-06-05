import {ExpandableOverlayProps} from 'src/incubator';
import {PickerProps, PickerModeTypes} from '../index';
import {CustomPickerProps} from '../types';

type PickerType = {
  dialog?: boolean;
  wheelPicker?: boolean;
  modal?: boolean;
  custom?: boolean;
};

const usePickerMode = (props: PickerProps) => {
  let type: PickerType = {dialog: false, wheelPicker: false, modal: false, custom: false};
  let headerProps: any;
  let renderCustomModal: CustomPickerProps['renderCustomModal'];
  let dialogProps: ExpandableOverlayProps['dialogProps'];
  let pickerModalProps: ExpandableOverlayProps['modalProps'];
  if ('pickerType' in props) {
    const {pickerType} = props;
    if (pickerType) {
      type[pickerType] = true;
    }
    switch (pickerType) {
      case PickerModeTypes.Modal:
        headerProps = props.headerProps;
        pickerModalProps = props.pickerModalProps || props.modalProps;
        break;
      case PickerModeTypes.Dialog:
      case PickerModeTypes.WheelPicker:
        headerProps = props.headerProps;
        dialogProps = headerProps && {...props?.customPickerProps?.dialogProps, headerProps: props.headerProps};
        break;
      case PickerModeTypes.Custom:
        renderCustomModal = props.renderCustomModal;
        break;
    }
    //@ts-expect-error
    return {type, headerProps, renderCustomModal, dialogProps, pickerModalProps, migrateDialog: props.migrateDialog};
  } else {
    const {useDialog, useWheelPicker} = props;
    type = {dialog: !!useDialog, wheelPicker: !!useWheelPicker, modal: !useDialog && !useWheelPicker, custom: false};

    return {type};
  }
};

export default usePickerMode;
