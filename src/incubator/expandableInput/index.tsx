import React, {useCallback, useState, forwardRef, PropsWithChildren, useImperativeHandle} from 'react';

import TouchableOpacity, {TouchableOpacityProps} from '../../components/touchableOpacity';
import View from '../../components/view';
import Modal, {ModalProps} from '../../components/modal';
import Dialog, {DialogProps} from '../../components/dialog';

export type ExpandableInputProps = TouchableOpacityProps &
  PropsWithChildren<{
    expandableContent?: React.ReactElement;
    useDialog?: boolean;
    modalProps?: ModalProps;
    dialogProps?: DialogProps;
  }>;

interface ExpandableInputMethods {
  openExpandable: () => void;
  closeExpandable: () => void;
}

const ExpandableInput = ({children, expandableContent, useDialog, modalProps, dialogProps, ...props}: ExpandableInputProps,
  ref: any) => {
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
    if (!useDialog) {
      return (
        <Modal {...modalProps} visible={expandableVisible} onDismiss={hideExpandable}>
          {expandableContent}
        </Modal>
      );
    }
  };

  const renderDialog = () => {
    if (useDialog) {
      return (
        <Dialog {...dialogProps} visible={expandableVisible} onDismiss={hideExpandable}>
          {expandableContent}
        </Dialog>
      );
    }
  };

  return (
    <TouchableOpacity {...props} onPress={showExpandable}>
      <View pointerEvents="none">{children}</View>
      {renderModal()}
      {renderDialog()}
    </TouchableOpacity>
  );
};

export default forwardRef<ExpandableInputMethods, ExpandableInputProps>(ExpandableInput);
