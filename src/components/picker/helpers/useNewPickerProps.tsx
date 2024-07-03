import {PickerProps, PickerModes} from '../types';
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
    renderOverlay,
    useDialog,
    useWheelPicker,
    mode
  } = props;

  const modalProps: ExpandableOverlayProps['modalProps'] = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel
  };

  const showTopBar = (!useDialog || mode === PickerModes.MULTI) && !renderHeader && !useWheelPicker;

  const newProps: PickerProps = {
    renderHeader: renderCustomDialogHeader || renderHeader,
    renderInput: renderPicker || renderInput,
    renderOverlay: renderCustomModal || renderOverlay,
    customPickerProps: {
      modalProps: {onShow, ...modalProps, ...pickerModalProps},
      showTopBar,
      topBarProps,
      ...customPickerProps
    }
  };
  return newProps;
};

export default useNewPickerProps;
