import React, {useCallback, useMemo, useState, forwardRef, PropsWithChildren, useImperativeHandle} from 'react';

import TouchableOpacity, {TouchableOpacityProps} from '../../components/touchableOpacity';
import View from '../../components/view';
import Modal, {ModalProps, ModalTopBarProps} from '../../components/modal';
import DialogOld from '../../components/dialog';
import DialogNew, {DialogMigrationProps} from '../Dialog';
import {Colors} from 'style';

export interface ExpandableOverlayMethods {
  openExpandable: () => void;
  closeExpandable: () => void;
  toggleExpandable: () => void;
}

export interface RenderCustomOverlayProps extends ExpandableOverlayMethods {
  visible: boolean;
}

export type ExpandableOverlayProps = TouchableOpacityProps &
  DialogMigrationProps &
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
    migrateDialog,
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

  const topBar = useMemo(() => showTopBar && <Modal.TopBar onDone={closeExpandable} {...topBarProps}/>,
    [showTopBar, closeExpandable, topBarProps]);

  const renderModal = () => {
    return (
      <Modal
        testID={`${testID}.overlay`}
        overlayBackgroundColor={Colors.$backgroundDefault}
        {...modalProps}
        visible={visible}
        onDismiss={closeExpandable}
        onRequestClose={closeExpandable}
      >
        {topBar}
        {expandableContent}
      </Modal>
    );
  };

  const renderDialog = () => {
    const Dialog = migrateDialog ? DialogNew : DialogOld;
    return (
      // @ts-expect-error
      <Dialog testID={`${testID}.overlay`} {...dialogProps} visible={visible} onDismiss={closeExpandable}>
        {topBar}
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
