import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import DateTimePicker, {DateTimePickerProps} from '../index';
import {act} from 'react-test-renderer';

const testID = 'dateTimePicker';
const TestCase = (props: Partial<Omit<DateTimePickerProps, 'dialogProps'>>) => {
  const defaultProps: DateTimePickerProps = {
    value: new Date('2021-04-04T00:00:00Z'),
    migrateDialog: true,
    testID
  };
  return <DateTimePicker {...defaultProps} {...props}/>;
};

const someDate = new Date('2021-04-04T00:00:00Z');
const someDateNextDay = new Date(someDate.getTime() + 24 * 60 * 60 * 1000);
const someDateNextHour = new Date(someDate.getTime() + 60 * 60 * 1000);
jest.mock('../../../optionalDependencies', () => {
  const actualOptional = jest.requireActual('../../../optionalDependencies');
  const view = jest.requireActual('../../view').default;
  return {
    ...actualOptional,
    DateTimePickerPackage: view
  };
});

describe('DateTimePicker', () => {
  test.each(['time', 'date'] as const)('should not invoke onChange when value is not changed - mode %s', mode => {
    const onChange = jest.fn();
    const renderTree = render(<TestCase onChange={onChange} mode={mode}/>);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.press(renderTree.getByTestId(`${testID}.overlay`));
    fireEvent.press(renderTree.getByTestId(`${testID}.done`));
    expect(onChange).not.toHaveBeenCalled();
  });
  test.each(['time', 'date'] as const)('should invoke onChange when value is changed - mode %s', async mode => {
    const onChange = jest.fn();
    const renderTree = render(<TestCase onChange={onChange} mode={mode} value={someDate}/>);
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      fireEvent.press(renderTree.getByTestId(`${testID}.overlay`));
    });
    fireEvent(renderTree.getByTestId(`${testID}.picker`),
      'onChange',
      {type: 'set'},
      mode === 'time' ? someDateNextHour : someDateNextDay);
    fireEvent.press(renderTree.getByTestId(`${testID}.done`));
    expect(onChange).toHaveBeenCalled();
  });
});
