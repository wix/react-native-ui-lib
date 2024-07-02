import {ModalDriver} from '../../components/modal/Modal.driver.new';
import {DialogDriver} from '../Dialog/Dialog.driver.new';
import {type ComponentProps, useComponentDriver} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const ExpandableOverlayDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;

  const driver = usePressableDriver(useComponentDriver({renderTree, testID}));
  const isUsingDialog = !!renderTree.queryByTestId(`${testID}.overlay.modal`);

  const overlayDriver = (isUsingDialog ? DialogDriver : ModalDriver)({
    renderTree,
    testID: `${testID}.overlay`
  });

  const getOverlay = () => {
    return overlayDriver;
  };

  return {...driver, getOverlay};
};
