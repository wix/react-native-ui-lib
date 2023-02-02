const fs = require('fs');
const HOUR_TO_MS = 60 * 60 * 1000;
const ID_LENGTH = 10;

function generateId() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < ID_LENGTH; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const data = [];

for (let year = 2021; year <= 2023; ++year) {
  for (let month = 0; month <= 11; ++month) {
    for (let day = 1; day <= 31; day += Math.random() > 0.5 ? 2 : 1) {
      for (let hour = 9; hour <= 19; hour += Math.random() > 0.5 ? 4 : 3) {
        const startDate = new Date(year, month, day, hour, 0);
        if (startDate.getDay() >= 2 && startDate.getDay() <= 5) {
          const start = startDate.getTime();
          const end = start + HOUR_TO_MS * (Math.random() > 0.5 ? 0.5 : 1);
          const id = generateId();
          data.push({id, start, end});
        }
      }
    }
  }
}

console.log(`${data.length} events were created`);

fs.writeFileSync('demo/src/screens/incubatorScreens/IncubatorCalendarScreen/MockData.ts',
  `// Note: to generate new data run calendar:createMocks and update createCalendarMockData script \n` +
  `export const data = ${JSON.stringify(data)};`);
