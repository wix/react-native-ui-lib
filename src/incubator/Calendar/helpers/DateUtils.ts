import getWeek from 'date-fns/getWeek';
import {FirstDayOfWeek} from '../types';

const DAY_TO_MILLIS = 24 * 60 * 60 * 1000;
const WEEK_TO_MILLIS = 7 * DAY_TO_MILLIS;

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
  let firstDay;
  switch (firstDayOfWeek) {
    case 'Saturday':
      firstDay = 6;
      break;
    case 'Sunday':
      firstDay = 0;
      break;
    case 'Monday':
    default:
      firstDay = 1;
      break;
  }

  let result = new Date(date.valueOf() - DAY_TO_MILLIS * ((date.getDay() - firstDay) % 7));
  const dayInMonth = result.getDate();
  if (dayInMonth >= 7 && dayInMonth < 14) {
    result = new Date(result.valueOf() - WEEK_TO_MILLIS);
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

  const firstDayInRelevantWeek = firstDayOfYear.valueOf() + (weekNumber - 1) * WEEK_TO_MILLIS;

  for (let day = 0; day <= 6; ++day) {
    result[day] = new Date(firstDayInRelevantWeek + DAY_TO_MILLIS * day);
  }

  return result;
}

export function getDayOfDate(date: number) {
  return new Date(date).getDate();
}

export const _forTesting = {getFirstDayInTheYear};
