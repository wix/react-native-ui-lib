import React, {useCallback, useState, forwardRef, PropsWithChildren, useImperativeHandle, useRef} from 'react';
import {AccessibilityInfo, findNodeHandle} from 'react-native';
import TouchableOpacity, {TouchableOpacityProps} from '../../components/touchableOpacity';
import View from '../../components/view';
import Modal, {ModalProps, ModalTopBarProps} from '../../components/modal';
import DialogOld from '../../components/dialog';
import DialogNew, {DialogMigrationProps} from '../dialog';
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
  const containerRef = useRef(null);

  const focusAccessibility = useCallback(() => {
    const reactTag = findNodeHandle(containerRef.current);
    if (reactTag) {
      AccessibilityInfo.setAccessibilityFocus(reactTag);
    }
  }, []);

  const openExpandable = useCallback(() => {
    setExpandableVisible(true);
    onPress?.(props);
  }, [onPress, customValue]);

  const closeExpandable = useCallback(() => {
    setExpandableVisible(false);
    focusAccessibility();
    useDialog ? dialogProps?.onDismiss?.() : modalProps?.onDismiss?.();
  }, [useDialog, dialogProps?.onDismiss, modalProps?.onDismiss, focusAccessibility]);

  const dismissModal = useCallback(() => {
    setExpandableVisible(false);
  }, []);

  const toggleExpandable = useCallback(() => (visible ? closeExpandable() : openExpandable()),
    [visible, openExpandable, closeExpandable]);

  useImperativeHandle(ref, () => ({
    openExpandable,
    closeExpandable,
    toggleExpandable
  }));

  const renderModal = () => {
    return (
      <Modal
        testID={`${testID}.overlay`}
        overlayBackgroundColor={Colors.$backgroundDefault}
        {...modalProps}
        visible={visible}
        onDismiss={dismissModal}
        onRequestClose={closeExpandable}
        onBackgroundPress={closeExpandable}
      >
        {showTopBar && <Modal.TopBar onDone={closeExpandable} {...topBarProps}/>}
        {expandableContent}
      </Modal>
    );
  };

  const renderDialog = () => {
    const Dialog = migrateDialog ? DialogNew : DialogOld;
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
    <TouchableOpacity ref={containerRef} {...others} onPress={openExpandable} disabled={disabled} testID={testID}>
      <View pointerEvents="none">{children}</View>
      {renderOverlay()}
    </TouchableOpacity>
  );
};

ExpandableOverlay.displayName = 'IGNORE';

export default forwardRef<ExpandableOverlayMethods, ExpandableOverlayProps>(ExpandableOverlay);
