import {PickerProps} from '../types';
import {ExpandableOverlayProps} from '../../../incubator/expandableOverlay';
import {Constants} from '../../../commons/new';

const useNewPickerProps = (props: PickerProps) => {
  const {
    renderCustomDialogHeader,
    renderPicker,
    renderCustomModal,
    onShow,
    pickerModalProps,
    containerStyle,
    customPickerProps,
    topBarProps,
    enableModalBlur,
    renderInput,
    renderCustomOverlayHeader,
    renderPickerOverlay,
    inputContainerStyle
  } = props;

  const modalProps: ExpandableOverlayProps['modalProps'] = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel
  };

  const newProps: PickerProps = {
    renderCustomOverlayHeader: renderCustomDialogHeader || renderCustomOverlayHeader,
    renderInput: renderPicker || renderInput,
    renderPickerOverlay: renderCustomModal || renderPickerOverlay,
    customPickerProps: {modalProps: {onShow, ...modalProps, ...pickerModalProps}, ...customPickerProps},
    inputContainerStyle: containerStyle || inputContainerStyle
  };
  return newProps;
};

export default useNewPickerProps;
