import React from 'react';
import {render} from '@testing-library/react-native';
import Toast, {ToastProps} from '../index';
import {ToastDriver} from '../Toast.driver.new';

const testID = 'toast';
const shortMessage = 'short message';

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

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should dismiss after one second', async () => {
    const TIME = 1000;
    const dismissFn = jest.fn();
    const {toastDriver} = getDriver({autoDismiss: TIME, onDismiss: dismissFn});
    expect(toastDriver.exists()).toBeTruthy();
    expect(dismissFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME);
    expect(dismissFn).toHaveBeenCalledTimes(1);
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
    toastDriver.getAction().press();
    expect(actionFn).toHaveBeenCalled();
  });

  it('should dismiss with passed autoDismiss time', async () => {
    const TIME = 1000;
    const dismissFn = jest.fn();
    const {toastDriver} = getDriver({autoDismiss: TIME, onDismiss: dismissFn, message: shortMessage});
    expect(toastDriver.exists()).toBeTruthy();
    expect(dismissFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME / 2);
    expect(dismissFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIME / 2);
    expect(dismissFn).toHaveBeenCalledTimes(1);
  });

  it('should dismiss after 3 sec when message is short and autoDismiss is true', async () => {
    const threeSeconds = 3000;
    const dismissFn = jest.fn();
    const {toastDriver} = getDriver({autoDismiss: true, onDismiss: dismissFn, message: shortMessage});
    expect(toastDriver.exists()).toBeTruthy();
    expect(dismissFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(threeSeconds / 2);
    expect(dismissFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(threeSeconds / 2);
    expect(dismissFn).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('should not dismiss even after 7 sec when autoDismissed is not passed', async () => {
    const sevenSeconds = 7000;
    const dismissFn = jest.fn();
    const {toastDriver} = getDriver({message: shortMessage});
    expect(toastDriver.exists()).toBeTruthy();
    expect(dismissFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(sevenSeconds);
    expect(dismissFn).not.toHaveBeenCalled();
  });
});
