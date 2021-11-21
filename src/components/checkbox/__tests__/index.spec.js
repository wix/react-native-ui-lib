import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CheckboxTestComponent, {testID} from './checkboxTester';

const onValueChange = jest.fn();

describe('Checkbox renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Default value is false', async () => {
    const props = {onValueChange};
    const element = <CheckboxTestComponent {...props}/>;

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
    const element = <CheckboxTestComponent {...props}/>;

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
    const element = <CheckboxTestComponent {...props}/>;

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
    const element = <CheckboxTestComponent {...props}/>;

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
    const element = <CheckboxTestComponent {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(0);
  });

  it('Disabled (value = true)', async () => {
    const props = {onValueChange, value: true, disabled: true};
    const element = <CheckboxTestComponent {...props}/>;

    const {getByTestId} = render(element);

    const checkbox = getByTestId(testID);
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledTimes(0);
  });
});
