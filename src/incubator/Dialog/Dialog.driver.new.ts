import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {ModalDriver} from '../../testkit/';

export const DialogDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver(props);
  const modalDriver = ModalDriver({renderTree, testID: `${testID}.modal`});
  return {...driver, getModal: () => modalDriver};
};
