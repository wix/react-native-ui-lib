import _ from 'lodash';

export const labels = ['Days', 'Hrs', 'Mins'];

const DAYS = _.times(10, i => i);
const HOURS = _.times(24, i => i);
const MINUTES = _.times(60, i => i);

const getItems = (values: (number | string)[]) => {
  return _.map(values, item => ({label: '' + item, value: item}));
};

const onDaysChange = jest.fn();
const onHoursChange = jest.fn();
const onMinutesChange = jest.fn();

export const sections = [
  {
    items: getItems(DAYS),
    onChange: onDaysChange,
    // initialValue: selectedDays,
    label: labels[0]
  },
  {
    items: getItems(HOURS),
    onChange: onHoursChange,
    // initialValue: selectedHours,
    label: labels[1]
  },
  {
    items: getItems(MINUTES),
    onChange: onMinutesChange,
    // initialValue: selectedMinutes,
    label: labels[2]
  }
];
