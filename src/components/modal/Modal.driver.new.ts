import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {ButtonDriver} from '../button/Button.driver.new';

export const ModalDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver(props);
  const overlayDriver = ButtonDriver({renderTree, testID: `${testID}.TouchableOverlay`});

  const isVisible = () => {
    return !!driver.getElementProps().visible;
  };

  return {...driver, isVisible, pressOnBackground: overlayDriver.press};
};
