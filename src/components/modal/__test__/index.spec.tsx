import React from 'react';
import {render} from '@testing-library/react-native';
import Modal from '../';
import {ModalDriver} from '../Modal.driver.new';
import {ModalProps} from 'react-native';

const testID = 'modal';

const TestCase = (props: Omit<ModalProps, 'testID'>) => {
  return <Modal testID={testID} {...props}/>;
};

describe('Sanity modal test', () => {
  it('Should be visible', () => {
    const renderTree = render(<TestCase visible/>);
    const modal = ModalDriver({renderTree, testID});
    expect(modal.isVisible()).toBeTruthy();
  });
});
