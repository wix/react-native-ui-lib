import React from 'react';
import {render} from '@testing-library/react-native';
import Dialog, {DialogProps} from '../index';
import {DialogDriver} from '../Dialog.driver.new';

const testID = 'dialog';

const TestCase = (props: Omit<DialogProps, 'testID'>) => {
  return <Dialog testID={testID} {...props}/>;
};

const getDriver = (Element: React.JSX.Element) => {
  const renderTree = render(Element);
  const dialogDriver = DialogDriver({renderTree, testID});
  return {renderTree, dialogDriver};
};

describe('Sanity checks', () => {
  it('Should show dialog', () => {
    const {dialogDriver} = getDriver(<TestCase visible/>);
    expect(dialogDriver.isVisible()).toBeTruthy();
  });

  it('Should dismiss dialog on background press', () => {
    const {dialogDriver} = getDriver(<TestCase visible/>);
    expect(dialogDriver.isVisible()).toBeTruthy();
    dialogDriver.pressOnBackground();
    expect(dialogDriver.isVisible()).toBeFalsy();
  });
});
