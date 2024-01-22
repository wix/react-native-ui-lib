import React from 'react';
import {render} from '@testing-library/react-native';
import Toast, {ToastProps} from '../index';
import {ToastDriver} from '../Toast.driver.new';

const testID = 'toast';

const TestCase = (props: ToastProps) => {
  return <Toast visible testID={testID} {...props}/>;
};

const getDriver = (props?: ToastProps) => {
  const renderTree = render(<TestCase {...props}/>);
  const toastDriver = ToastDriver({renderTree, testID});
  return {render, toastDriver};
};

describe('Sanity checks', () => {
  it('Should show toast', () => {
    const {toastDriver} = getDriver();
    expect(toastDriver.exists()).toBeTruthy();
  });
  
  it('Should dismiss after time', async () => {
    const TIME = 50;
    const dismissFn = jest.fn();
    const {toastDriver} = getDriver({autoDismiss: TIME, onDismiss: dismissFn});
    expect(toastDriver.exists()).toBeTruthy();
    expect(dismissFn).not.toHaveBeenCalled();
    await new Promise(r => setTimeout(r, TIME + 50));
    expect(dismissFn).toHaveBeenCalled();
  });

  it('Should show an Hello World message', () => {
    const MESSAGE = 'Hello World';
    const {toastDriver} = getDriver({message: MESSAGE});
    expect(toastDriver.getMessage().getText()).toEqual(MESSAGE);
  });

  it('Should press on action button', () => {
    const actionFn = jest.fn();
    const {toastDriver} = getDriver({action: {onPress: actionFn}});
    expect(actionFn).not.toHaveBeenCalled();
    toastDriver.getActionButton().press();
    expect(actionFn).toHaveBeenCalled();
  });
});
