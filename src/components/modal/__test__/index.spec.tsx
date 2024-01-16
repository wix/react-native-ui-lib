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
    const modal = ModalDriver({renderTree, testID});
    expect(modal.isVisible()).toBeFalsy();
    renderTree.rerender(<TestCase visible/>);
    expect(modal.isVisible()).toBeTruthy();
  });
});
