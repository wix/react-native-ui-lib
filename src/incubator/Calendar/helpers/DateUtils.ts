import getWeek from 'date-fns/getWeek';
import {FirstDayOfWeek, DayNamesFormat} from '../types';

export const HOUR_TO_MS = 60 * 60 * 1000;
const DAY_TO_MS = 24 * HOUR_TO_MS;
const WEEK_TO_MS = 7 * DAY_TO_MS;

export function getWeekNumbersOfMonth(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1);

  const weekNumbers = [];

  while (firstDayOfMonth.getMonth() === month) {
    // Push the week number for the current day to the array
    weekNumbers.push(getWeek(firstDayOfMonth));
    // Increment the date by one day
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 7);
  }

  return weekNumbers;
}

function getFirstDayInTheWeek(date: Date, firstDayOfWeek: FirstDayOfWeek) {
  let result = new Date(date.valueOf() -
      DAY_TO_MS * ((date.getDay() - firstDayOfWeek) % 7));
  const dayInMonth = result.getDate();
  if (dayInMonth >= 7 && dayInMonth < 14) {
    result = new Date(result.valueOf() - WEEK_TO_MS);
  }

  return result;
}

function getFirstDayInTheYear(year: number, firstDayOfWeek: FirstDayOfWeek) {
  // Note: Using Jan 4th as the marker for the first week of the year (https://en.wikipedia.org/wiki/ISO_week_date)
  // Must add Date.UTC or the local timezone might be added which can affect the date (one day before)
  const dayInFirstWeekOfYear = new Date(Date.UTC(year, 0, 4));
  return getFirstDayInTheWeek(dayInFirstWeekOfYear, firstDayOfWeek);
}

export function getDaysOfWeekNumber(year: number, weekNumber: number, firstDayOfWeek: FirstDayOfWeek) {
  const result = new Array(7).fill(null);
  const firstDayOfYear = getFirstDayInTheYear(year, firstDayOfWeek);

  const firstDayInRelevantWeek = firstDayOfYear.valueOf() + (weekNumber - 1) * WEEK_TO_MS;

  for (let day = 0; day <= 6; ++day) {
    result[day] = new Date(firstDayInRelevantWeek + DAY_TO_MS * day);
  }

  return result;
}

export function getDayOfDate(date: number) {
  return new Date(date).getDate();
}

/* Worklets */
export function getDateObject(date: number) {
  'worklet';
  const d = new Date(date);

  return {
    day: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear()
  };
}

export function addMonths(date: number, count: number) {
  'worklet';
  if (count === 0) {
    return date;
  }
  const month = getDateObject(date).month;
  return new Date(date).setMonth(month + count);
}

function getWeekDaysNames(format?: DayNamesFormat) {
  //TODO: localize
  switch (format) {
    case 1:
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    case 2:
      return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    default:
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }
}

export function getWeekDayNames(firstDayOfWeek = 0, format?: DayNamesFormat) { //TODO: consider 'options' param
  'worklet';
  let weekDaysNames = getWeekDaysNames(format);
  const dayShift = firstDayOfWeek % 7;
  if (dayShift) {
    weekDaysNames = weekDaysNames.slice(dayShift).concat(weekDaysNames.slice(0, dayShift));
  }
  return weekDaysNames;
}

export const _forTesting = {getFirstDayInTheYear};
