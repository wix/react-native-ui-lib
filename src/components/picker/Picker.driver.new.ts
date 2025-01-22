import {ComponentProps} from '../../testkit/new/Component.driver';
import {TextFieldDriver} from '../textField/TextField.driver.new';
import {ModalDriver} from '../modal/Modal.driver.new';
import {DialogDriver} from '../dialog/Dialog.driver.new';
import {ButtonDriver} from '../button/Button.driver.new';
import {ExpandableOverlayDriver} from '../../incubator/expandableOverlay/ExpandableOverlay.driver';

export const PickerDriver = (props: ComponentProps, useDialog: boolean) => {
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

  const getValue = (): string | undefined => {
    return textFieldDriver.getValue();
  };

  const open = (): void => {
    expandableOverlayDriver.open();
  };

  const cancel = (): void => {
    cancelButtonDriver.press();
  };

  const done = (): void => {
    doneButtonDriver.press();
  };

  const isOpen = (): boolean => {
    if (dialogDriver.exists()) {
      return dialogDriver.isVisible();
    }
    return modalDriver.exists() && modalDriver.isVisible();
  };

  const dismissDialog = (): void => {
    if (dialogDriver.isVisible()) {
      dialogDriver.pressOnBackground();
    }
  };

  const selectItem = (testID: string): void => {
    const itemDriver = ButtonDriver({renderTree: props.renderTree, testID});
    itemDriver.press();
  };

  return {
    exists,
    getValue,
    open,
    cancel,
    done,
    isOpen,
    dismissDialog,
    selectItem
  };
};
