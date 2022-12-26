export function getWeekNumbersOfMonth(year: number, month: number) {
  return [3, 4, 5, 6];
}

export function getDaysOfWeekNumber(year: number, weekNumber: number) {
  return [1, 2, 3, 4, 5, 6, 7];
}

export function getDayOfDate(date: number) {
  return new Date(date).getDate();
}
