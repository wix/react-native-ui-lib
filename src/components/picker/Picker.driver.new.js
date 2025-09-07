import { TextFieldDriver } from "../textField/TextField.driver.new";
import { ModalDriver } from "../modal/Modal.driver.new";
import { DialogDriver } from "../../incubator/dialog/Dialog.driver.new";
import { ButtonDriver } from "../button/Button.driver.new";
import { ExpandableOverlayDriver } from "../../incubator/expandableOverlay/ExpandableOverlay.driver";
export const PickerDriver = (props, useDialog) => {
  const expandableOverlayDriver = ExpandableOverlayDriver({
    renderTree: props.renderTree,
    testID: props.testID
  }, useDialog);
  const textFieldDriver = TextFieldDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.input`
  });
  const modalDriver = ModalDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.overlay`
  });
  const dialogDriver = DialogDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.overlay`
  });
  const cancelButtonDriver = ButtonDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.modal.topBar.cancel`
  });
  const doneButtonDriver = ButtonDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.modal.topBar.done`
  });
  const exists = () => {
    return expandableOverlayDriver.exists();
  };
  const getValue = () => {
    return textFieldDriver.getValue();
  };
  const open = () => {
    expandableOverlayDriver.open();
  };
  const cancel = () => {
    cancelButtonDriver.press();
  };
  const done = () => {
    doneButtonDriver.press();
  };
  const isOpen = () => {
    if (dialogDriver.exists()) {
      return dialogDriver.isVisible();
    }
    return modalDriver.exists() && modalDriver.isVisible();
  };
  const dismissDialog = () => {
    if (dialogDriver.isVisible()) {
      dialogDriver.pressOnBackground();
    }
  };
  const itemDriver = testID => ButtonDriver({
    renderTree: props.renderTree,
    testID
  });
  const selectItem = testID => {
    const driver = itemDriver(testID);
    driver.press();
  };
  return {
    exists,
    getValue,
    open,
    cancel,
    done,
    isOpen,
    dismissDialog,
    itemDriver,
    selectItem
  };
};