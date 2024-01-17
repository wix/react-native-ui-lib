import React from 'react';
import {render} from '@testing-library/react-native';
import Modal, {ModalProps} from '../';
import {ModalDriver} from '../Modal.driver.new';

const testID = 'modal';

const TestCase = (props: Omit<ModalProps, 'testID'>) => {
  return <Modal testID={testID} {...props}/>;
};

describe('Sanity modal test', () => {
  it('Should be not visible at first and visible at second render', () => {
    const renderTree = render(<TestCase/>);
    const modalDriver = ModalDriver({renderTree, testID});
    expect(modalDriver.isVisible()).toBeFalsy();
    renderTree.rerender(<TestCase visible/>);
    expect(modalDriver.isVisible()).toBeTruthy();
  });

  it('Should press on background', () => {
    const backgroundPressHandler = jest.fn();
    const renderTree = render(<TestCase visible onBackgroundPress={backgroundPressHandler}/>);
    const modalDriver = ModalDriver({renderTree, testID});
    expect(backgroundPressHandler).not.toHaveBeenCalled();
    modalDriver.pressOnBackground();
    expect(backgroundPressHandler).toHaveBeenCalledTimes(1);
  });
});
