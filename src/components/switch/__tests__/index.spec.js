import React from 'react';
import { render } from '@testing-library/react-native';
import Switch from "../index";
import { SwitchDriver } from "../Switch.driver";
const testID = 'switch';
const defaultProps = {
  value: false,
  onValueChange: jest.fn(),
  disabled: false
};
const onColor = 'red';
const offColor = 'grey';
const testCase = (testID, props) => {
  const renderTree = render(<Switch testID={testID} {...defaultProps} {...props} />);
  return SwitchDriver({
    renderTree,
    testID
  });
};
describe('Switch', () => {
  it('Should fire onChange event', async () => {
    const onChange = jest.fn();
    const driver = testCase(testID, {
      onValueChange: onChange
    });
    driver.press();
    expect(onChange).toHaveBeenCalled();
  });
  it('Should fire onChange event with false value when toggling off', async () => {
    const onChange = jest.fn();
    const driver = testCase(testID, {
      onValueChange: onChange,
      value: true
    });
    driver.press();
    expect(onChange).toHaveBeenCalledWith(false);
  });
  it('Should fire onChange event with true value when toggling on', async () => {
    const onChange = jest.fn();
    const driver = testCase(testID, {
      onValueChange: onChange,
      value: false
    });
    driver.press();
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it('Should not fire onChange when disabled', async () => {
    const onValueChange = jest.fn();
    const driver = testCase(testID, {
      disabled: true,
      onValueChange
    });
    driver.press();
    expect(onValueChange).not.toHaveBeenCalled();
  });
  it('Accessibility value should be false when not checked', async () => {
    const driver = testCase(testID, {
      value: false
    });
    expect(driver.isChecked()).toBe(false);
  });
  it('Accessibility value should be checked when checked', async () => {
    const driver = testCase(testID, {
      value: true
    });
    expect(driver.isChecked()).toBe(true);
  });
  it('Should be disabled', async () => {
    const driver = testCase(testID, {
      disabled: true
    });
    expect(driver.isDisabled()).toBe(true);
  });
  it('Should be disabled', async () => {
    const driver = testCase(testID, {
      disabled: false
    });
    expect(driver.isDisabled()).toBe(false);
  });
  it('Should pass correct color when on', async () => {
    const driver = testCase(testID, {
      value: true,
      onColor,
      offColor
    });
    expect(driver.getStyle()?.backgroundColor).toBe(onColor);
  });
  it('Should pass correct color when off', async () => {
    const driver = testCase(testID, {
      value: false,
      onColor,
      offColor
    });
    expect(driver.getStyle()?.backgroundColor).toBe(offColor);
  });
});