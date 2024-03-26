import {useComponentDriver, ComponentProps, ComponentDriverResult} from '../../testkit/new/Component.driver';
import {ButtonDriver} from '../button/Button.driver.new';


export interface ModalDriverInterface extends ComponentDriverResult {
  isVisible: () => boolean;
  pressOnBackground: () => void;
}


export const ModalDriver = (props: ComponentProps): ModalDriverInterface => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver(props);
  const overlayDriver = ButtonDriver({renderTree, testID: `${testID}.TouchableOverlay`});

  const isVisible = () => {
    return !!driver.getElement().props.visible;
  };

  return {...driver, isVisible, pressOnBackground: overlayDriver.press};
};
