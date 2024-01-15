import {ModalProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {fireEvent} from '@testing-library/react-native';

export const ModalDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver<ModalProps>(props);

  const isVisible = () => {
    return !!driver.getProps().visible;
  };

  const pressOnBackground = () => {
    const overlay = renderTree.getByTestId(`${testID}.TouchableOverlay`);
    fireEvent.press(overlay);
  };

  return {...driver, isVisible, pressOnBackground};
};
