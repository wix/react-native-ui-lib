import getWeek from 'date-fns/getWeek';
import {FirstDayOfWeek, DayNamesFormat, MonthProps} from '../types';

export const HOUR_TO_MS = 60 * 60 * 1000;
const DAY_TO_MS = 24 * HOUR_TO_MS;
const WEEK_TO_MS = 7 * DAY_TO_MS;

export function getWeekNumbersOfMonth(year: number, month: number, firstDayOfWeek: FirstDayOfWeek) {
  if (month < 0 || month > 11) {
    throw new Error('getWeekNumbersOfMonth util received an invalid month');
  }

  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const firstWeekNumber = getWeek(firstDayOfMonth, {weekStartsOn: firstDayOfWeek});
  const numberOfWeeks = getNumberOfWeeksInMonth(year, month, firstDayOfWeek);
  const weekNumbers: number[] = [];
  _.times(numberOfWeeks, i => weekNumbers.push(i + firstWeekNumber));

  return weekNumbers;
}

function getNumberOfWeeksInMonth(year: number, month: number, firstDayOfWeek: FirstDayOfWeek) {
  const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
  const dayOfTheWeek = new Date(year, month, 1).getDay();
  // Modify day in the week based on the first day of the week
  const fixedDayOfTheWeek = (7 - (firstDayOfWeek - dayOfTheWeek)) % 7;
  const numberOfWeeks = Math.ceil((numberOfDaysInMonth + fixedDayOfTheWeek) / 7);
  return numberOfWeeks;
}

function getFirstDayInTheWeek(date: Date, firstDayOfWeek: FirstDayOfWeek) {
  let result = new Date(date.getTime() - DAY_TO_MS * ((date.getDay() - firstDayOfWeek) % 7));
  const dayInMonth = result.getDate();

  if (dayInMonth >= 7 && dayInMonth < 14) {
    result = new Date(result.getTime() - WEEK_TO_MS);
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
  const firstDayInRelevantWeek = firstDayOfYear.getTime() + (weekNumber - 1) * WEEK_TO_MS;

  for (let day = 0; day <= 6; ++day) {
    result[day] = new Date(firstDayInRelevantWeek + DAY_TO_MS * day).getTime();
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

export function getMonthForIndex(index: number) {
  'worklet';
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  if (index >= 0 && index < 12) {
    return months[index];
  }
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

export function getWeekDayNames(firstDayOfWeek = 0, format?: DayNamesFormat) {
  //TODO: consider 'options' param
  'worklet';
  let weekDaysNames = getWeekDaysNames(format);
  const dayShift = firstDayOfWeek % 7;

  if (dayShift) {
    weekDaysNames = weekDaysNames.slice(dayShift).concat(weekDaysNames.slice(0, dayShift));
  }
  return weekDaysNames;
}

export function isSameDay(d1: number, d2: number) {
  'worklet';
  const a = getDateObject(d1);
  const b = getDateObject(d2);

  if (a.year === b.year) {
    if (a.month === b.month) {
      if (a.day === b.day) {
        return true;
      }
    }
  }
  return false;
}

export function isSameMonth(d1: number | MonthProps, d2: number | MonthProps) {
  'worklet';
  const a = typeof d1 === 'number' ? getDateObject(d1) : d1;
  const b = typeof d2 === 'number' ? getDateObject(d2) : d2;
  
  if (a.year === b.year) {
    if (a.month === b.month) {
      return true;
    }
  }
  return false;
}

export const _forTesting = {getFirstDayInTheYear}; // exporting private functions for testing only
