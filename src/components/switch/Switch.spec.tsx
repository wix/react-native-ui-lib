import React from 'react';
import {render} from '@testing-library/react-native';
import Switch, {SwitchProps} from './index';
import {SwitchDriverFactory} from './switch.driver';
import View from '../view';

describe('Switch', () => {

  const renderSwitch = (testID: string, props: Partial<SwitchProps>) => {
    const defaultProps: SwitchProps = {
      testID,
      value: false,
      onValueChange: jest.fn(),
      disabled: false
    };
    const component = render(<View><Switch {...defaultProps} {...props}/></View>);
    const driver = SwitchDriverFactory({
      wrappedComponent: component,
      testID
    });

    return {driver};
  };


  it('Should fire onChange event', () => {
    const testId = 'switch-comp';
    const onChange = jest.fn();
    const {driver} = renderSwitch(testId, {onValueChange: onChange});
    driver.press();
    expect(onChange).toHaveBeenCalled();
  });

  it('Should fire onChange event with false value when toggling off', () => {
    const testId = 'switch-comp';
    const onChange = jest.fn();
    const {driver} = renderSwitch(testId, {onValueChange: onChange, value: true});
    driver.press();
    expect(onChange).toHaveBeenCalledWith(false);
  });
  it('Should fire onChange event with true value when toggling on', () => {
    const testId = 'switch-comp';
    const onChange = jest.fn();
    const {driver} = renderSwitch(testId, {onValueChange: onChange, value: false});
    driver.press();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('Should not fire onChange when disabled', () => {
    const testId = 'switch-comp';
    const onValueChange = jest.fn();
    const {driver} = renderSwitch(testId, {disabled: true, onValueChange});

    driver.press();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('Accessibility value should be true when checked', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {value: true});

    expect(driver.getAccessibilityValue()).toBe(true);
  });

  it('Accessibility value should be false when not checked', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {value: false});

    expect(driver.isChecked()).toBe(false);
  });

  it('Accessibility value should be checked when checked', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {value: true});

    expect(driver.isChecked()).toBe(true);
  });

  it('Accessibility value should be false when not checked', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {value: false});

    expect(driver.getAccessibilityValue()).toBe(false);
  });

  it('Should be disabled', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {disabled: true});

    expect(driver.isDisabled()).toBe(true);
  });

  it('Should be disabled', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {disabled: false});

    expect(driver.isDisabled()).toBe(false);
  });

  it('Should pass correct color when on', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {value: true, onColor: 'red'});

    expect(driver.getColor()).toBe('red');
  });

  it('Should pass correct color when off', () => {
    const testId = 'switch-comp';
    const {driver} = renderSwitch(testId, {value: false, offColor: 'red'});

    expect(driver.getColor()).toBe('red');
  });
});
