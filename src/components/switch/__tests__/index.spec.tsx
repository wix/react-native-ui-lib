import React from 'react';
import {render} from '@testing-library/react-native';
import View from '../../view';
import Switch, {SwitchProps} from '../index';
import {SwitchDriver} from '../Switch.driver';

const testID = 'switch';
const defaultProps: SwitchProps = {
  value: false,
  onValueChange: jest.fn(),
  disabled: false
};
const onColor = 'red';
const offColor = 'grey';

const switchDriver = (testID: string, props: Partial<SwitchProps>) => {
  const renderTree = render(<View><Switch testID={testID} {...defaultProps} {...props}/></View>);
  return SwitchDriver({renderTree, testID});
};

describe('Switch', () => {
  it('Should fire onChange event', async () => {
    const onChange = jest.fn();
    const driver = switchDriver(testID, {onValueChange: onChange});
    driver.press();
    expect(onChange).toHaveBeenCalled();
  });

  it('Should fire onChange event with false value when toggling off', async () => {
    const onChange = jest.fn();
    const driver = switchDriver(testID, {onValueChange: onChange, value: true});
    driver.press();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('Should fire onChange event with true value when toggling on', async () => {
    const onChange = jest.fn();
    const driver = switchDriver(testID, {onValueChange: onChange, value: false});
    driver.press();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('Should not fire onChange when disabled', async () => {
    const onValueChange = jest.fn();
    const driver = switchDriver(testID, {disabled: true, onValueChange});

    driver.press();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('Accessibility value should be true when checked', async () => {
    const driver = switchDriver(testID, {value: true});

    expect(driver.getAccessibilityValue()).toBe(true);
  });

  it('Accessibility value should be false when not checked', async () => {
    const driver = switchDriver(testID, {value: false});

    expect(driver.isChecked()).toBe(false);
  });

  it('Accessibility value should be checked when checked', async () => {
    const driver = switchDriver(testID, {value: true});

    expect(driver.isChecked()).toBe(true);
  });

  it('Accessibility value should be false when not checked', async () => {
    const driver = switchDriver(testID, {value: false});

    expect(driver.getAccessibilityValue()).toBe(false);
  });

  it('Should be disabled', async () => {
    const driver = switchDriver(testID, {disabled: true});

    expect(driver.isDisabled()).toBe(true);
  });

  it('Should be disabled', async () => {
    const driver = switchDriver(testID, {disabled: false});

    expect(driver.isDisabled()).toBe(false);
  });

  it('Should pass correct color when on', async () => {
    const driver = switchDriver(testID, {value: true, onColor, offColor});
    
    expect(driver.getStyle()?.backgroundColor).toBe(onColor);
  });

  it('Should pass correct color when off', async () => {
    const driver = switchDriver(testID, {value: false, onColor, offColor});

    expect(driver.getStyle()?.backgroundColor).toBe(offColor);
  });
});
