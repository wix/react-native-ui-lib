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

  const defaultModalProps = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel
  } satisfies ExpandableOverlayProps['modalProps'];

  const mergedModalProps = {
    ...defaultModalProps,
    ...(onShow && {onShow}),
    ...pickerModalProps,
    ...customPickerProps?.modalProps
  };

  const newProps: PickerProps = {
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
