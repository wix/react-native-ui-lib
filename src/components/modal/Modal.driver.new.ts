import {ModalProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {ButtonDriver} from '../button/Button.driver.new';

export const ModalDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver<ModalProps>(props);
  const overlayDriver = ButtonDriver({renderTree, testID: `${testID}.TouchableOverlay`});

  const isVisible = () => {
    return driver.getProps().visible;
  };

  return {...driver, isVisible, pressOnBackground: overlayDriver.press};
};
