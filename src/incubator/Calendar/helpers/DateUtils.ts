import getWeek from 'date-fns/getWeek';

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

export function getDaysOfWeekNumber(year: number, weekNumber: number) {
  return [1672056000000, 1672142400000, 1672228800000, 1672315200000, 1672401600000, 1672488000000, 1672574400000];
}

export function getDayOfDate(date: number) {
  return new Date(date).getDate();
}
