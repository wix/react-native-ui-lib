import React, {useCallback, useState, forwardRef, PropsWithChildren, useImperativeHandle} from 'react';

import TouchableOpacity, {TouchableOpacityProps} from '../../components/touchableOpacity';
import View from '../../components/view';
import Modal, {ModalProps, ModalTopBarProps} from '../../components/modal';
import Dialog, {DialogProps} from '../../components/dialog';

export type ExpandableInputProps = TouchableOpacityProps &
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
  }>;

interface ExpandableInputMethods {
  openExpandable: () => void;
  closeExpandable: () => void;
}

const ExpandableInput = (props: ExpandableInputProps, ref: any) => {
  const {children, expandableContent, useDialog, modalProps, dialogProps, showTopBar, topBarProps} = props;
  const [expandableVisible, setExpandableVisible] = useState(false);
  const showExpandable = useCallback(() => setExpandableVisible(true), []);
  const hideExpandable = useCallback(() => setExpandableVisible(false), []);

  useImperativeHandle(ref, () => ({
    openExpandable: () => {
      showExpandable();
    },
    closeExpandable: () => {
      hideExpandable();
    }
  }));

  const renderModal = () => {
    return (
      <Modal {...modalProps} visible={expandableVisible} onDismiss={hideExpandable}>
        {showTopBar && <Modal.TopBar onDone={hideExpandable} {...topBarProps}/>}
        {expandableContent}
      </Modal>
    );
  };

  const renderDialog = () => {
    return (
      <Dialog {...dialogProps} visible={expandableVisible} onDismiss={hideExpandable}>
        {expandableContent}
      </Dialog>
    );
  };

  return (
    <TouchableOpacity {...props} onPress={showExpandable}>
      <View pointerEvents="none">{children}</View>
      {useDialog ? renderDialog() : renderModal()}
    </TouchableOpacity>
  );
};

export default forwardRef<ExpandableInputMethods, ExpandableInputProps>(ExpandableInput);
