import * as DateUtils from '../helpers/DateUtils';

describe('Calendar/DateUtils', () => {
  describe('getWeekNumbersOfMonth', () => {
    it('should return array of 4-6 items', () => {

      const weekNumbers = DateUtils.getWeekNumbersOfMonth(2022, 11);
      expect(weekNumbers.length).toBeGreaterThan(3);
      expect(weekNumbers.length).toBeLessThan(7);

    });
  });

  describe('getDaysOfWeekNumber', () => {});

  describe('getDayOfDate', () => {
    it('should return the day number from the date timestamp', () => {

      const day = DateUtils.getDayOfDate(new Date('2022-12-26').getTime());
      expect(day).toBe(26);
    });
  });
});
