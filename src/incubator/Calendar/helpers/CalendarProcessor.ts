
export function generateMonthItems(range: number) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const monthItems = [];
  for (let year = currentYear - range; year <= currentYear + range; year++) {
    for (let month = 0; month < 12; month++) {
      monthItems.push({year, month});
    }
  }
  return monthItems;
}
