import {useComponentDriver, ComponentProps, ComponentDriverResult} from '../../testkit/new/Component.driver';
import {ModalDriver, ModalDriverInterface} from '../../components/modal/Modal.driver.new';

export interface DialogDriverInterface extends ComponentDriverResult {
  getModal: () => ModalDriverInterface;
}

export const DialogDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver(props);
  const modalDriver = ModalDriver({renderTree, testID: `${testID}.modal`});
  return {...driver, getModal: () => modalDriver};
};
