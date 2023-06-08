import _ from 'lodash';
import getWeek from 'date-fns/getWeek';
import {FirstDayOfWeek, DayNamesFormat, DateObjectWithOptionalDay, DateObjectWithDate, DateObject} from '../types';

export const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const WEEK_IN_MS = 7 * DAY_IN_MS;

function getNumberOfWeeksInMonth(year: number, month: number, firstDayOfWeek: FirstDayOfWeek) {
  const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
  const dayOfTheWeek = new Date(year, month, 1).getDay();
  
  // Modify day in the week based on the first day of the week
  const fixedDayOfTheWeek = (7 - (firstDayOfWeek - dayOfTheWeek)) % 7;
  const numberOfWeeks = Math.ceil((numberOfDaysInMonth + fixedDayOfTheWeek) / 7);
  
  return numberOfWeeks;
}

export function getWeekNumbersOfMonth(year: number, month: number, firstDayOfWeek: FirstDayOfWeek) {
  if (month < 0 || month > 11) {
    throw new Error('getWeekNumbersOfMonth util received an invalid month');
  }

  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekNumber = getWeek(firstDayOfMonth, {weekStartsOn: firstDayOfWeek});
  const numberOfWeeks = getNumberOfWeeksInMonth(year, month, firstDayOfWeek);
  
  const weekNumbers: number[] = [];
  _.times(numberOfWeeks, i => weekNumbers.push(i + firstWeekNumber));
  
  return weekNumbers;
}

function getFirstDayInTheWeek(date: DateObject, firstDayOfWeek: FirstDayOfWeek) {
  let result = date.timestamp - DAY_IN_MS * ((date.dayOfTheWeek - firstDayOfWeek) % 7);
  const dayInMonth = getDateObject(result).day;

  if (dayInMonth > 1 && dayInMonth <= 7) {
    result -= WEEK_IN_MS;
  }
  return result;
}

function getFirstDayInTheYear(year: number, firstDayOfWeek: FirstDayOfWeek) {
  const dayInFirstWeekOfYear = getDateObject({year, month: 0, day: 1});
  return getFirstDayInTheWeek(dayInFirstWeekOfYear, firstDayOfWeek);
}

// TODO: Fix to use Default behavior for week number
export function getDaysOfWeekNumber(year: number, weekNumber: number, firstDayOfWeek: FirstDayOfWeek) {
  const result = new Array(7).fill(null);
  const firstDayOfYear = getFirstDayInTheYear(year, firstDayOfWeek);
  const firstDayInRelevantWeek = firstDayOfYear + (weekNumber - 1) * WEEK_IN_MS;

  for (let day = 0; day <= 6; ++day) {
    result[day] = firstDayInRelevantWeek + DAY_IN_MS * day;
  }
  return result;
}

/* Worklets */

export function getDateObject(date: number | DateObjectWithDate) {
  'worklet';
  const isNumberType = typeof date === 'number';
  const d = isNumberType ? new Date(date) : new Date(date.year, date.month, date.day);

  return {
    day: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
    dayOfTheWeek: d.getDay(),
    timestamp: isNumberType ? date : d.getTime()
  };
}

export function addMonths(date: number, count: number, useFirstDay = false) {
  'worklet';
  if (count === 0) {
    return date;
  }

  const d = new Date(date);
  const month = d.getMonth();
  d.setMonth(month + count);
  if (useFirstDay) { // feature: setting the new month to the first day of the month
    d.setDate(1);
  }
  return d.getTime();
}

export function addYears(date: number, count: number) {
  'worklet';
  if (count === 0) {
    return date;
  }

  const d = new Date(date);
  const year = d.getFullYear();
  return d.setFullYear(year + count);
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

export function isToday(date: number | null) {
  'worklet';
  return date !== null && date !== undefined ? isSameDay(Date.now(), date) : false;
}

export function isPastDate(date: number) {
  const today = new Date();
  const d = new Date(date);

  if (today.getFullYear() > d.getFullYear()) {
    return true;
  }
  if (today.getFullYear() === d.getFullYear()) {
    if (today.getMonth() > d.getMonth()) {
      return true;
    }
    if (today.getMonth() === d.getMonth()) {
      if (today.getDate() > d.getDate()) {
        return true;
      }
    }
  }
  return false;
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

export function isSameMonth(d1: number | DateObjectWithOptionalDay, d2: number | DateObjectWithOptionalDay) {
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
