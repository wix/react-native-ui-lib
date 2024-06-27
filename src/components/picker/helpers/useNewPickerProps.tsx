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
    customPickerProps,
    topBarProps,
    enableModalBlur,
    renderInput,
    renderHeader,
    renderOverlay
  } = props;

  const modalProps: ExpandableOverlayProps['modalProps'] = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel
  };

  const newProps: PickerProps = {
    renderHeader: renderCustomDialogHeader || renderHeader,
    renderInput: renderPicker || renderInput,
    renderOverlay: renderCustomModal || renderOverlay,
    customPickerProps: {modalProps: {onShow, ...modalProps, ...pickerModalProps}, ...customPickerProps}
  };
  return newProps;
};

export default useNewPickerProps;
