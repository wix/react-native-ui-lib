import {DialogProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {ModalDriver} from '../modal/Modal.driver.new';

export const DialogDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver<DialogProps>(props);
  const modal = ModalDriver({renderTree, testID: `${testID}.modal`});
  return {...driver, isVisible: modal.isVisible};
};
