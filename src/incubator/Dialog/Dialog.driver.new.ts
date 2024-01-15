import {DialogProps} from '../index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {ModalDriver} from '../../testkit/';

export const DialogDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver<DialogProps>(props);
  const dialogModal = ModalDriver({renderTree, testID: `${testID}.modal`});
  return {...dialogModal, ...driver};
};
