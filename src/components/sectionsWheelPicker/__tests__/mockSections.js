import _map from "lodash/map";
import _times from "lodash/times";
export const labels = ['Days', 'Hrs', 'Mins'];
const DAYS = _times(10, i => i);
const HOURS = _times(24, i => i);
const MINUTES = _times(60, i => i);
const getItems = values => {
  return _map(values, item => ({
    label: '' + item,
    value: item
  }));
};
const onDaysChange = jest.fn();
const onHoursChange = jest.fn();
const onMinutesChange = jest.fn();
export const sections = [{
  items: getItems(DAYS),
  onChange: onDaysChange,
  label: labels[0]
}, {
  items: getItems(HOURS),
  onChange: onHoursChange,
  label: labels[1]
}, {
  items: getItems(MINUTES),
  onChange: onMinutesChange,
  label: labels[2]
}];