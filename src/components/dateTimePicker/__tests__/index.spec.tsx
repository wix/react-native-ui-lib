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
  test.each(['time', 'date'])('should not invoke onChange when value is not changed - mode %s', mode => {
    const onChange = jest.fn();
    const renderTree = render(<TestCase onChange={onChange} mode={mode}/>);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.press(renderTree.getByTestId(testID));
    fireEvent.press(renderTree.getByTestId(`${testID}.done`));
    expect(onChange).not.toHaveBeenCalled();
  });
});
