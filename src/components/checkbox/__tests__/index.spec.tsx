import React, {useState, useCallback} from 'react';
import Checkbox, {CheckboxProps} from '../index';
import {CheckboxDriver} from '../Checkbox.driver';

const testID = 'checkbox';
const onValueChange = jest.fn();

const TestCase = (props: CheckboxProps) => {
  const {value, onValueChange, ...others} = props;

  const [_value, _setValue] = useState(value);
  const _onValueChange = useCallback((newValue: boolean) => {
    _setValue(newValue);
    onValueChange?.(newValue);
  },
  [_setValue, onValueChange]);

  return <Checkbox {...others} onValueChange={_onValueChange} value={_value} testID={testID}/>;
};

describe('Checkbox renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => CheckboxDriver.clear());

  it('Default value is false', async () => {
    const props = {onValueChange};
    const component = <TestCase {...props}/>;
    const driver = new CheckboxDriver({component, testID});

    await driver.press();

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it.each`
  checkboxInitialValue  | checkboxExpectedValue
  ${false}              | ${true}
  ${true}               | ${false}
  `('Send value ($checkboxInitialValue)', async ({checkboxInitialValue, checkboxExpectedValue}: {checkboxInitialValue: boolean; checkboxExpectedValue: boolean}) => {
    const props = {onValueChange, value: checkboxInitialValue};
    const component = <TestCase {...props}/>;
    const driver = new CheckboxDriver({component, testID});

    await driver.press();

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(checkboxExpectedValue);
  });

  it('Multiple clicks', async () => {
    const props = {onValueChange};
    const component = <TestCase {...props}/>;
    const driver = new CheckboxDriver({component, testID});

    await driver.press();
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
    await driver.press();
    expect(onValueChange.mock.calls).toEqual([[true], [false]]);
    await driver.press();
    expect(onValueChange.mock.calls).toEqual([[true], [false], [true]]);
  });

  it.each`
  checkboxInitialValue
  ${false}
  ${true}
  `('Disabled (value = $checkboxInitialValue)', async ({checkboxInitialValue}: {checkboxInitialValue: boolean}) => {
    const props = {onValueChange, value: checkboxInitialValue, disabled: true};
    const component = <TestCase {...props}/>;
    const driver = new CheckboxDriver({component, testID});

    await driver.press();

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
