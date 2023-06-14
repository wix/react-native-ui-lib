
export function generateMonthItems(date: number, pastRange: number, futureRange: number) {
  const currentYear = new Date(date).getFullYear();
  const monthItems = [];
  for (let year = currentYear - pastRange; year <= currentYear + futureRange; year++) {
    for (let month = 0; month < 12; month++) {
      monthItems.push({year, month});
    }
  }
  return monthItems;
}
