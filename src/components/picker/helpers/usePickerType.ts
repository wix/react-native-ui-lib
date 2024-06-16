import {ExpandableOverlayProps} from 'src/incubator';
import {PickerProps, PickerModeTypes} from '../index';
import {CustomPickerProps} from '../types';

type PickerType = {
  dialog?: boolean;
  wheelPicker?: boolean;
  modal?: boolean;
  custom?: boolean;
};

const usePickerType = (props: PickerProps) => {
  const {pickerType} = props;
  let type: PickerType = {dialog: false, wheelPicker: false, modal: false, custom: false};
  let headerProps: any;
  let renderCustomModal: CustomPickerProps['renderCustomModal'];
  let dialogProps: ExpandableOverlayProps['dialogProps'];
  let pickerModalProps: ExpandableOverlayProps['modalProps'];
  if (pickerType) {
    if (pickerType) {
      type[pickerType] = true;
    }
    switch (pickerType) {
      case PickerModeTypes.Modal:
        headerProps = props.headerProps;
        //@ts-ignore
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
    return {type, headerProps, renderCustomModal, dialogProps, pickerModalProps};
  } else {
    const {useDialog, useWheelPicker} = props;
    type = {dialog: !!useDialog, wheelPicker: !!useWheelPicker, modal: !useDialog && !useWheelPicker, custom: false};
  }

  return {type};
};

export default usePickerType;
