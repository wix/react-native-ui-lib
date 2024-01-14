import {ModalProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';

export const ModalDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<ModalProps>(props);
  const isVisible = () => {
    return !!driver.getProps().visible;
  };

  return {...driver, isVisible};
};
