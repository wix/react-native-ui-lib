import { Constants } from "../../../commons/new";
const useNewPickerProps = props => {
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
  const defaultModalProps = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel
  };
  const mergedModalProps = {
    ...defaultModalProps,
    ...(onShow && {
      onShow
    }),
    ...pickerModalProps,
    ...customPickerProps?.modalProps
  };
  const newProps = {
    renderHeader: renderCustomDialogHeader || renderHeader,
    renderInput: renderPicker || renderInput,
    renderOverlay: renderCustomModal || renderOverlay,
    customPickerProps: {
      ...customPickerProps,
      modalProps: mergedModalProps
    }
  };
  return newProps;
};
export default useNewPickerProps;