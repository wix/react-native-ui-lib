import {DialogProps} from '../../components/dialog/index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {ModalDriver} from '../../testkit/';

export const DialogDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver<DialogProps>(props);
  const modal = ModalDriver({renderTree, testID: `${testID}.modal`});
  return {...driver, isVisible: modal.isVisible};
};
