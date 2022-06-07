import React from 'react';
import Switch, {SwitchProps} from '../index';
import View from '../../view';
import {SwitchDriver} from '../Switch.driver';

describe('Switch', () => {
  afterEach(() => {
    SwitchDriver.clear();
  });

  const switchDriver = (testID: string, props: Partial<SwitchProps>) => {
    const defaultProps: SwitchProps = {
      testID,
      value: false,
      onValueChange: jest.fn(),
      disabled: false
    };

    const component = (<View><Switch {...defaultProps} {...props}/></View>);
    return new SwitchDriver({
      component,
      testID
    });
  };


  it('Should fire onChange event', async () => {
    const testId = 'switch-comp';
    const onChange = jest.fn();
    const driver = await switchDriver(testId, {onValueChange: onChange});
    await driver.press();
    expect(onChange).toHaveBeenCalled();
  });

  it('Should fire onChange event with false value when toggling off', async () => {
    const testId = 'switch-comp';
    const onChange = jest.fn();
    const driver = await switchDriver(testId, {onValueChange: onChange, value: true});
    await driver.press();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('Should fire onChange event with true value when toggling on', async () => {
    const testId = 'switch-comp';
    const onChange = jest.fn();
    const driver = await switchDriver(testId, {onValueChange: onChange, value: false});
    await driver.press();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('Should not fire onChange when disabled', async () => {
    const testId = 'switch-comp';
    const onValueChange = jest.fn();
    const driver = await switchDriver(testId, {disabled: true, onValueChange});

    await driver.press();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('Accessibility value should be true when checked', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {value: true});

    expect(await driver.getAccessibilityValue()).toBe(true);
  });

  it('Accessibility value should be false when not checked', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {value: false});

    expect(await driver.isChecked()).toBe(false);
  });

  it('Accessibility value should be checked when checked', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {value: true});

    expect(await driver.isChecked()).toBe(true);
  });

  it('Accessibility value should be false when not checked', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {value: false});

    expect(await driver.getAccessibilityValue()).toBe(false);
  });

  it('Should be disabled', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {disabled: true});

    expect(await driver.isDisabled()).toBe(true);
  });

  it('Should be disabled', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {disabled: false});

    expect(await driver.isDisabled()).toBe(false);
  });

  it('Should pass correct color when on', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {value: true, onColor: 'red'});

    expect(await driver.getColor()).toBe('red');
  });

  it('Should pass correct color when off', async () => {
    const testId = 'switch-comp';
    const driver = await switchDriver(testId, {value: false, offColor: 'red'});

    expect(await driver.getColor()).toBe('red');
  });
});
