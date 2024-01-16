import {ToastProps} from '../index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver} from '../../components/text/Text.driver.new';
import {fireEvent} from '@testing-library/react-native';

export const ToastDriver = (props: ComponentProps) => {
  const {renderTree, testID} = props;
  const driver = useComponentDriver<ToastProps>(props);

  // const isVisible = () => {

  // };

  const getMessage = () => {
    const messageDriver = TextDriver({renderTree, testID: `${testID}-message`});
    return messageDriver;
  };

  const pressOnAction = () => {
    const actionButton = renderTree.queryByTestId(`${testID}-action`);
    actionButton && fireEvent.press(actionButton);
  };

  return {...driver, getMessage, pressOnAction};
};
