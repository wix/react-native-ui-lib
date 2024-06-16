import {ExpandableOverlayProps} from 'src/incubator';
import {PickerProps, PickerModeTypes} from '../index';
import {CustomPickerProps, PickerModeBooleans} from '../types';

type ComponentPropsType = {
  headerProps: any;
  customModal: CustomPickerProps['renderCustomModal'];
  dialogProps: ExpandableOverlayProps['dialogProps'];
  pickerModalProps: ExpandableOverlayProps['modalProps'];
};

const usePickerType = (props: PickerProps) => {
  const {pickerType} = props;
  let type: PickerModeBooleans = {dialog: false, wheelPicker: false, modal: false, custom: false};
  const componentProps: ComponentPropsType = {
    headerProps: undefined,
    customModal: undefined,
    dialogProps: undefined,
    pickerModalProps: undefined
  };
  if (pickerType) {
    type[pickerType] = true;
    switch (pickerType) {
      case PickerModeTypes.Modal:
        componentProps.headerProps = props.headerProps;
        //@ts-ignore
        componentProps.pickerModalProps = props.pickerModalProps || props.modalProps;
        break;
      case PickerModeTypes.Dialog:
      case PickerModeTypes.WheelPicker:
        componentProps.headerProps = props.headerProps;
        componentProps.dialogProps = componentProps.headerProps && {
          ...props?.customPickerProps?.dialogProps,
          headerProps: props.headerProps
        };
        break;
      case PickerModeTypes.Custom:
        componentProps.customModal = props.renderCustomModal;
        break;
    }
  } else {
    const {useDialog, useWheelPicker, topBarProps, pickerModalProps, customPickerProps} = props;
    type = {dialog: !!useDialog, wheelPicker: !!useWheelPicker, modal: !useDialog && !useWheelPicker, custom: false};
    componentProps.pickerModalProps = pickerModalProps;
    componentProps.headerProps =
      //@ts-expect-error
      topBarProps || customPickerProps?.dialogProps?.pannableHeaderProps || customPickerProps?.dialogProps?.headerProps;
    componentProps.customModal = props.renderCustomModal;
    componentProps.dialogProps = props?.customPickerProps?.dialogProps;
  }
  return {type, componentProps};
};

export default usePickerType;
