import Constants from '../../../commons/Constants';
import {ExpandableOverlayProps} from 'src/incubator';
import {CustomPickerProps, PickerModeBooleans, PickerProps, PickerModeTypes} from '../types';

type ComponentPropsType = {
  headerProps: any;
  customModal: CustomPickerProps['renderCustomModal'];
  dialogProps: ExpandableOverlayProps['dialogProps'];
  pickerModalProps: ExpandableOverlayProps['modalProps'];
};

//TODO: remove onShow when migration is finished, the prop should be passed via modalProps in pickerType='modal' mode
const modalProps = (props: PickerProps,
  pickerModalProps: ComponentPropsType['pickerModalProps']): ExpandableOverlayProps['modalProps'] => {
  const {onShow, enableModalBlur} = props;
  return {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onShow,
    ...pickerModalProps
  };
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
        componentProps.pickerModalProps = modalProps(props, props.modalProps || props.pickerModalProps);
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
    //TODO: remove this block when migration is finished
    const {useDialog, useWheelPicker, topBarProps, pickerModalProps, customPickerProps} = props;
    type = {dialog: !!useDialog, wheelPicker: !!useWheelPicker, modal: !useDialog && !useWheelPicker, custom: false};
    componentProps.pickerModalProps = modalProps(props, pickerModalProps);
    componentProps.headerProps =
      //@ts-expect-error
      topBarProps || customPickerProps?.dialogProps?.pannableHeaderProps || customPickerProps?.dialogProps?.headerProps;
    componentProps.customModal = props.renderCustomModal;
    componentProps.dialogProps = props?.customPickerProps?.dialogProps;
  }
  return {type, componentProps};
};

export default usePickerType;
