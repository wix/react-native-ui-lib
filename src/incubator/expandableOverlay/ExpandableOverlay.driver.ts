import {ModalDriver} from '../../components/modal/Modal.driver.new';
import {DialogDriver} from '../../components/dialog/Dialog.driver.new';
import {type ComponentProps, useComponentDriver} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const ExpandableOverlayDriver = (props: ComponentProps, useDialog: boolean) => {
  const {renderTree, testID} = props;

  const driver = usePressableDriver(useComponentDriver({renderTree, testID}));
  // const isUsingDialog = !!renderTree.queryByTestId(`${testID}.overlay.modal`);

  const overlayDriver = (useDialog ? DialogDriver : ModalDriver)({
    renderTree,
    testID: `${testID}.overlay`
  });

  const exists = () => {
    return overlayDriver.exists();
  };

  const open = () => {
    driver.press();
  };

  const isOpen = () => {
    return overlayDriver.isVisible();
  };

  const pressOnBackground = () => {
    overlayDriver.pressOnBackground();
  };

  return {exists, open, isOpen, pressOnBackground};
};
