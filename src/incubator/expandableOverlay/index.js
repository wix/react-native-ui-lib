import React, { useCallback, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { AccessibilityInfo, findNodeHandle } from 'react-native';
import TouchableOpacity from "../../components/touchableOpacity";
import View from "../../components/view";
import Modal from "../../components/modal";
import DialogOld from "../../components/dialog";
import DialogNew from "../dialog";
import { Colors } from "../../style";
const ExpandableOverlay = (props, ref) => {
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
  const toggleExpandable = useCallback(() => visible ? closeExpandable() : openExpandable(), [visible, openExpandable, closeExpandable]);
  useImperativeHandle(ref, () => ({
    openExpandable,
    closeExpandable,
    toggleExpandable
  }));
  const renderModal = () => {
    return <Modal testID={`${testID}.overlay`} overlayBackgroundColor={Colors.$backgroundDefault} {...modalProps} visible={visible} onDismiss={closeExpandable} onRequestClose={closeExpandable} onBackgroundPress={closeExpandable}>
        {showTopBar && <Modal.TopBar onDone={closeExpandable} {...topBarProps} />}
        {expandableContent}
      </Modal>;
  };
  const renderDialog = () => {
    const Dialog = migrateDialog ? DialogNew : DialogOld;
    return <Dialog testID={`${testID}.overlay`} {...dialogProps} visible={visible} onDismiss={closeExpandable}>
        {expandableContent}
      </Dialog>;
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
  return <TouchableOpacity ref={containerRef} {...others} onPress={openExpandable} disabled={disabled} testID={testID}>
      <View pointerEvents="none">{children}</View>
      {renderOverlay()}
    </TouchableOpacity>;
};
ExpandableOverlay.displayName = 'IGNORE';
export default forwardRef(ExpandableOverlay);