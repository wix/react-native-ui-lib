import React, {useState, useCallback} from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Checkbox from '../index';

export const testID = 'checkbox';
const onValueChange = jest.fn();

const TestCase = props => {
  const {value, onValueChange, ...others} = props;

  const [_value, _setValue] = useState(value);
  const _onValueChange = useCallback(newValue => {
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

  it('Default value is false', async () => {
    const props = {onValueChange};
    const element = <TestCase {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('Send value (false)', async () => {
    const props = {onValueChange, value: false};
    const element = <TestCase {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('Send value (true)', async () => {
    const props = {onValueChange, value: true};
    const element = <TestCase {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('Multiple clicks', async () => {
    const props = {onValueChange};
    const element = <TestCase {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(onValueChange.mock.calls).toEqual([[true], [false]]);
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(3);
    expect(onValueChange.mock.calls).toEqual([[true], [false], [true]]);
  });

  it('Disabled (value = false)', async () => {
    const props = {onValueChange, value: false, disabled: true};
    const element = <TestCase {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(0);
  });

  it('Disabled (value = true)', async () => {
    const props = {onValueChange, value: true, disabled: true};
    const element = <TestCase {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(0);
  });
});
