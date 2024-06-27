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
    mode,
    testID
  } = props;

  const modalProps: ExpandableOverlayProps['modalProps'] = {
    animationType: 'slide',
    transparent: Constants.isIOS && enableModalBlur,
    enableModalBlur: Constants.isIOS && enableModalBlur,
    onRequestClose: topBarProps?.onCancel
  };

  const showTopBar = (!useDialog || mode === PickerModes.MULTI) && !renderHeader;
  const overlayTopBarProps = showTopBar ? {testID: `${testID}.modal.topBar`, ...topBarProps} : undefined;

  const newProps: PickerProps = {
    renderHeader: renderCustomDialogHeader || renderHeader,
    renderInput: renderPicker || renderInput,
    renderOverlay: renderCustomModal || renderOverlay,
    customPickerProps: {
      modalProps: {onShow, ...modalProps, ...pickerModalProps},
      showTopBar,
      topBarProps: overlayTopBarProps,
      ...customPickerProps
    }
  };
  return newProps;
};

export default useNewPickerProps;
