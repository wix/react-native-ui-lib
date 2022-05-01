import React, {useCallback, useState, forwardRef, PropsWithChildren, useImperativeHandle} from 'react';

import TouchableOpacity, {TouchableOpacityProps} from '../../components/touchableOpacity';
import View from '../../components/view';
import Modal, {ModalProps, ModalTopBarProps} from '../../components/modal';
import Dialog, {DialogProps} from '../../components/dialog';

export interface ExpandableOverlayMethods {
  openExpandable: () => void;
  closeExpandable: () => void;
  toggleExpandable: () => void;
}

export interface RenderCustomOverlayProps extends ExpandableOverlayMethods {
  visible: boolean;
}

export type ExpandableOverlayProps = TouchableOpacityProps &
  PropsWithChildren<{
    /**
     * The content to render inside the expandable modal/dialog
     */
    expandableContent?: React.ReactElement;
    /**
     * Whether to use a dialog as expandable container (by default the container will be a full screen modal)
     */
    useDialog?: boolean;
    /**
     * The props to pass to the modal expandable container
     */
    modalProps?: ModalProps;
    /**
     * The props to pass to the dialog expandable container
     */
    dialogProps?: DialogProps;
    /**
     * Whether to render a modal top bar (relevant only for modal)
     */
    showTopBar?: boolean;
    /**
     * The modal top bar props to pass on
     */
    topBarProps?: ModalTopBarProps;
    /**
     * A custom overlay to render instead of Modal or Dialog components
     */
    renderCustomOverlay?: (props: RenderCustomOverlayProps) => React.ReactElement | undefined | null;
    /**
     * Disabled opening expandable overlay
     */
    disabled?: boolean;
  }>;

const ExpandableOverlay = (props: ExpandableOverlayProps, ref: any) => {
  const {
    children,
    expandableContent,
    useDialog,
    modalProps,
    dialogProps,
    showTopBar,
    topBarProps,
    renderCustomOverlay,
    disabled,
    onPress,
    customValue,
    testID,
    ...others
  } = props;
  const [visible, setExpandableVisible] = useState(false);
  const openExpandable = useCallback(() => {
    setExpandableVisible(true);
    onPress?.(props);
  }, [onPress, customValue]);
  const closeExpandable = useCallback(() => {
    setExpandableVisible(false);
    useDialog ? dialogProps?.onDismiss?.() : modalProps?.onDismiss?.();
  }, [useDialog, dialogProps?.onDismiss, modalProps?.onDismiss]);

  const toggleExpandable = useCallback(() => (visible ? closeExpandable() : openExpandable()),
    [visible, openExpandable, closeExpandable]);

  useImperativeHandle(ref, () => ({
    openExpandable,
    closeExpandable,
    toggleExpandable
  }));

  const renderModal = () => {
    return (
      <Modal testID={`${testID}.overlay`} {...modalProps} visible={visible} onDismiss={closeExpandable}>
        {showTopBar && <Modal.TopBar onDone={closeExpandable} {...topBarProps}/>}
        {expandableContent}
      </Modal>
    );
  };

  const renderDialog = () => {
    return (
      <Dialog testID={`${testID}.overlay`} {...dialogProps} visible={visible} onDismiss={closeExpandable}>
        {expandableContent}
      </Dialog>
    );
  };

  const renderOverlay = () => {
    if (renderCustomOverlay) {
      return renderCustomOverlay({
        visible,
        openExpandable,
        closeExpandable,
        toggleExpandable
      });
    } else {
      return useDialog ? renderDialog() : renderModal();
    }
  };

  return (
    <TouchableOpacity {...others} onPress={openExpandable} disabled={disabled} testID={testID}>
      <View pointerEvents="none">{children}</View>
      {renderOverlay()}
    </TouchableOpacity>
  );
};

export default forwardRef<ExpandableOverlayMethods, ExpandableOverlayProps>(ExpandableOverlay);
