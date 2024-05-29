import {ComponentProps} from '../../testkit/new/Component.driver';
import {TextFieldDriver} from '../textField/TextField.driver.new';
import {ModalDriver} from '../modal/Modal.driver.new';
import {DialogDriver} from '../../incubator/Dialog/Dialog.driver.new';
import {ButtonDriver} from '../button/Button.driver.new';

export const PickerDriver = (props: ComponentProps) => {
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

  const getValue = (): string | undefined => {
    return textFieldDriver.getValue();
  };

  const open = (): void => {
    textFieldDriver.press();
  };

  const cancel = (): void => {
    cancelButtonDriver.press();
  };

  const done = (): void => {
    doneButtonDriver.press();
  };

  const isOpen = (useDialog?: boolean): boolean => {
    if (useDialog) {
      return dialogDriver.getModal().isVisible();
    }
    return modalDriver.exists() && modalDriver.isVisible();
  };

  const dismissDialog = (useDialog?: boolean): void => {
    if (useDialog) {
      dialogDriver.getModal().pressOnBackground();
    }
  };

  const selectItem = (testID: string): void => {
    const itemDriver = ButtonDriver({renderTree: props.renderTree, testID});
    itemDriver.press();
  };

  return {
    getValue,
    open,
    cancel,
    done,
    isOpen,
    dismissDialog,
    selectItem
  };
};
