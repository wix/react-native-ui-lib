import React, {useState, useCallback} from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Checkbox from '../index';

const testID = 'checkbox';
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

  it('Default value is false', () => {
    const props = {onValueChange};

    const {getByTestId} = render(<TestCase {...props}/>);

    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('Send value (false)', () => {
    const props = {onValueChange, value: false};

    const {getByTestId} = render(<TestCase {...props}/>);

    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('Send value (true)', () => {
    const props = {onValueChange, value: true};

    const {getByTestId} = render(<TestCase {...props}/>);

    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('Multiple clicks', () => {
    const props = {onValueChange};

    const {getByTestId} = render(<TestCase {...props}/>);

    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
    fireEvent.press(checkbox);
    expect(onValueChange.mock.calls).toEqual([[true], [false]]);
    fireEvent.press(checkbox);
    expect(onValueChange.mock.calls).toEqual([[true], [false], [true]]);
  });

  it('Disabled (value = false)', () => {
    const props = {onValueChange, value: false, disabled: true};

    const {getByTestId} = render(<TestCase {...props}/>);

    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('Disabled (value = true)', () => {
    const props = {onValueChange, value: true, disabled: true};
    const {getByTestId} = render(<TestCase {...props}/>);

    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
