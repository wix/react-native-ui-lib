import * as DateUtils from '../helpers/DateUtils';

describe('Calendar/DateUtils', () => {
  describe('getWeekNumbersOfMonth', () => {
    it('should return array of 4-6 items', () => {
      let weekNumbers = DateUtils.getWeekNumbersOfMonth(2022, 11);
      expect(weekNumbers.length).toBeGreaterThan(3);
      expect(weekNumbers.length).toBeLessThan(7);

      weekNumbers = DateUtils.getWeekNumbersOfMonth(2022, 0);
      expect(weekNumbers.length).toBeGreaterThan(3);
      expect(weekNumbers.length).toBeLessThan(7);
    });

    it('should throw error when passing invalid month', () => {
      expect(() => DateUtils.getWeekNumbersOfMonth(2022, 12)).toThrowError('getWeekNumbersOfMonth got invalid month');
    });
  });

  describe('getDaysOfWeekNumber', () => {
    it('should return array of 7 items', () => {
      const daysInWeek = DateUtils.getDaysOfWeekNumber(2022, 11);
      expect(daysInWeek.length).toBe(7);
    });
  });

  describe('getDayOfDate', () => {
    it('should return the day number from the date timestamp', () => {
      const day = DateUtils.getDayOfDate(new Date('2022-12-26').getTime());
      expect(day).toBe(26);
    });
  });
});
