import {ToastProps} from '../index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver} from '../../components/text/Text.driver.new';
import { fireEvent } from '@testing-library/react-native';

export const ToastDriver = (args: ComponentProps) => {
  const {renderTree, testID} = args;
  const driver = useComponentDriver<ToastProps>(args);

  const getMessage = () => {
    const messageDriver = TextDriver({renderTree, testID: `${testID}-message`});
    return messageDriver.getText();    
  };

  const pressOnAction = () => {
    const actionButton = renderTree.queryByTestId(`${testID}-action`);
    actionButton && fireEvent.press(actionButton);
  };

  return {...driver, getMessage, pressOnAction};
};
