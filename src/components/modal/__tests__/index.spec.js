import React, { useState } from 'react';
import { render } from '@testing-library/react-native';
import Modal from "../";
import { ModalDriver } from "../Modal.driver.new";
import View from "../../view";
import Button from "../../button";
import { ButtonDriver } from "../../button/Button.driver.new";
const testID = 'modal';
const TestCase = props => {
  return <Modal testID={testID} {...props} />;
};
describe('Sanity modal test', () => {
  it('Testing visibility', () => {
    const renderTree = render(<TestCase />);
    const modalDriver = ModalDriver({
      renderTree,
      testID
    });
    expect(modalDriver.isVisible()).toBeFalsy();
    renderTree.rerender(<TestCase visible />);
    expect(modalDriver.isVisible()).toBeTruthy();
  });
  it('Should press on background', () => {
    const backgroundPressHandler = jest.fn();
    const renderTree = render(<TestCase visible onBackgroundPress={backgroundPressHandler} />);
    const modalDriver = ModalDriver({
      renderTree,
      testID
    });
    expect(backgroundPressHandler).not.toHaveBeenCalled();
    modalDriver.pressOnBackground();
    expect(backgroundPressHandler).toHaveBeenCalledTimes(1);
  });
  it('Should dismiss modal', () => {
    const onDismissHandler = jest.fn();
    const TestCase = () => {
      const [showModal, setShowModal] = useState(true);
      return <View>
          <Modal testID={testID} onDismiss={onDismissHandler} visible={showModal} />
          <Button testID={'button-dismiss'} onPress={() => setShowModal(false)} />
        </View>;
    };
    const renderTree = render(<TestCase />);
    const modalDriver = ModalDriver({
      renderTree,
      testID
    });
    const buttonDriver = ButtonDriver({
      renderTree,
      testID: 'button-dismiss'
    });
    expect(modalDriver.isVisible()).toBeTruthy();
    expect(onDismissHandler).not.toHaveBeenCalled();
    buttonDriver.press();
    expect(modalDriver.isVisible()).toBeFalsy();
    expect(onDismissHandler).toHaveBeenCalledTimes(1);
  });
});