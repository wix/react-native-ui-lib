import React from 'react';
import { render } from '@testing-library/react-native';
import DateTimePicker from "../index";
import { DateTimePickerDriver } from "../DateTimePicker.driver";
const testID = 'dateTimePicker';
const someDate = new Date('2021-04-04T00:00:00Z');
const someDateNextDay = new Date(someDate.getTime() + 24 * 60 * 60 * 1000);
const someDateNextHour = new Date(someDate.getTime() + 60 * 60 * 1000);
const TestCase = props => {
  const defaultProps = {
    value: someDate,
    migrateDialog: true,
    testID
  };
  return <DateTimePicker {...defaultProps} {...props} />;
};
describe('DateTimePicker', () => {
  test.each(['time', 'date'])('should invoke onChange when value is changed - mode %s', mode => {
    const onChange = jest.fn();
    const renderTree = render(<TestCase onChange={onChange} mode={mode} value={someDate} />);
    expect(onChange).not.toHaveBeenCalled();
    const driver = DateTimePickerDriver({
      renderTree,
      testID
    });
    driver.open();
    const dateToChangeTo = mode === 'time' ? someDateNextHour : someDateNextDay;
    driver.changeDateTo(dateToChangeTo);
    expect(onChange).not.toHaveBeenCalled();
    driver.select();
    expect(onChange).toHaveBeenCalledWith(dateToChangeTo);
  });
  test.each(['time', 'date'])('should not invoke onChange when value is not changed - mode %s', mode => {
    const onChange = jest.fn();
    const renderTree = render(<TestCase onChange={onChange} mode={mode} />);
    expect(onChange).not.toHaveBeenCalled();
    const driver = DateTimePickerDriver({
      renderTree,
      testID
    });
    driver.open();
    driver.select();
    expect(onChange).not.toHaveBeenCalled();
  });
});