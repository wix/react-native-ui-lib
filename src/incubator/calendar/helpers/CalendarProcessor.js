export function generateMonthItems(date, pastRange, futureRange) {
  const currentYear = new Date(date).getFullYear();
  const monthItems = [];
  for (let year = currentYear - pastRange; year <= currentYear + futureRange; year++) {
    for (let month = 0; month < 12; month++) {
      monthItems.push({
        timestamp: date,
        year,
        month
      });
    }
  }
  return monthItems;
}