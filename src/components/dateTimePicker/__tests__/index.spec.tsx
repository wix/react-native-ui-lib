import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import DateTimePicker, {DateTimePickerProps} from '../index';


const testID = 'dateTimePicker';
const TestCase = props => {
  const defaultProps: DateTimePickerProps = {
    value: new Date('2021-04-04T00:00:00Z'),
    migrateDialog: true,
    testID
  };
  return <DateTimePicker {...defaultProps} {...props}/>;
};

describe('DateTimePicker', () => {
  it('should not invoke onChange when value is not changed - mode time', () => {
    const onChange = jest.fn();
    const renderTree = render(<TestCase onChange={onChange} mode="time"/>);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.press(renderTree.getByTestId(testID));
    fireEvent.press(renderTree.getByTestId(`${testID}.done`));
    expect(onChange).not.toHaveBeenCalled();
  });
  it('should not invoke onChange when value is not changed - mode date', () => {
    const onChange = jest.fn();
    const renderTree = render(<TestCase onChange={onChange} mode="date"/>);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.press(renderTree.getByTestId(testID));
    fireEvent.press(renderTree.getByTestId(`${testID}.done`));
    expect(onChange).not.toHaveBeenCalled();
  });
});
