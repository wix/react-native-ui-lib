import React from 'react';
import {render} from '@testing-library/react-native';
import Dialog, {DialogProps} from '../index';
import {DialogDriver} from '../Dialog.driver.new';

const testID = 'dialog';

const TestCase = (props: Omit<DialogProps, 'testID'>) => {
  return <Dialog testID={testID} {...props}/>;
};

const getDriver = (props: DialogProps) => {
  const renderTree = render(<TestCase {...props}/>);
  const driver = DialogDriver({renderTree, testID});
  return {renderTree, driver};
};

describe('Sanity checks', () => {
  it('Should show dialog', () => {
    const {driver} = getDriver({visible: true});
    expect(driver.isVisible()).toBeTruthy();
  });
  it('Should dismiss dialog on background press', () => {
    const {driver} = getDriver({visible: true});
    driver.pressOnBackground();
    expect(driver.isVisible()).toBeFalsy();
  });
});
