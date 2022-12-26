export function getWeekNumbersOfMonth(year: number, month: number) {
  return [3, 4, 5, 6];
}

export function getDaysOfWeekNumber(year: number, weekNumber: number) {
  return [1672056000, 1672142400, 1672228800, 1672315200, 1672401600, 1672488000, 1672574400];
}

export function getDayOfDate(date: number) {
  return new Date(date).getDate();
}
