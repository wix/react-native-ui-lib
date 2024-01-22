// import {PickerProps} from './types';
import {/* useComponentDriver,  */ ComponentProps} from '../../testkit/new/Component.driver';
import {TextFieldDriver} from '../textField/TextField.driver.new';
import {ModalDriver} from '../modal/Modal.driver.new';
import {DialogDriver} from '../../incubator/Dialog/Dialog.driver.new';
import {ButtonDriver} from '../button/Button.driver.new';

export const PickerDriver = (props: ComponentProps) => {
  // const driver = useComponentDriver<PickerProps>(props);

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

  const isOpen = (): boolean => {
    // TODO: we should find a better solution for when using useDialog (maybe in the refactor)
    if (modalDriver.exists()) {
      return modalDriver.isVisible();
    } else {
      return dialogDriver.getModal().isVisible();
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
    selectItem
  };
};
