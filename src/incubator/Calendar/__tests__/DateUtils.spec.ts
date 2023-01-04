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

  describe('getFirstDayInTheYear', () => {
    describe('2020', () => {
      it('2020 Saturday should be Saturday Jan 4th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, 'Saturday');
        expect(firstDayInTheYear.getDate()).toBe(4);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2020 Sunday should be Sunday Dec 29th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, 'Sunday');
        expect(firstDayInTheYear.getDate()).toBe(29);
        expect(firstDayInTheYear.getMonth()).toBe(11);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2020 Monday should be Monday Dec 30th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, 'Monday');
        expect(firstDayInTheYear.getDate()).toBe(30);
        expect(firstDayInTheYear.getMonth()).toBe(11);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
    });

    describe('2021', () => {
      it('2021 When Saturday is first day of the week - should return Saturday Jan 2nd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, 'Saturday');
        expect(firstDayInTheYear.getDate()).toBe(2);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2021 Sunday should be Sunday Jan 3rd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, 'Sunday');
        expect(firstDayInTheYear.getDate()).toBe(3);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2021 Monday should be Monday Jan 4th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, 'Monday');
        expect(firstDayInTheYear.getDate()).toBe(4);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
    });

    describe('2022', () => {
      it('2022 Saturday should be Saturday Jan 1st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, 'Saturday');
        expect(firstDayInTheYear.getDate()).toBe(1);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2022 Sunday should be Sunday Jan 2nd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, 'Sunday');
        expect(firstDayInTheYear.getDate()).toBe(2);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2022 Monday should be Monday Jan 3rd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, 'Monday');
        expect(firstDayInTheYear.getDate()).toBe(3);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
    });

    describe('2023', () => {
      it('2023 Saturday should be Saturday Dec 31st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, 'Saturday');
        expect(firstDayInTheYear.getDate()).toBe(31);
        expect(firstDayInTheYear.getMonth()).toBe(11);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2023 Sunday should be Sunday Jan 1st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, 'Sunday');
        expect(firstDayInTheYear.getDate()).toBe(1);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2023 Monday should be Monday Jan 2nd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, 'Monday');
        expect(firstDayInTheYear.getDate()).toBe(2);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
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

  describe.only('addMonths', () => {
    it('should return the date timestamp for the next (1) months in the next (1) years', () => {
      const date = new Date(DateUtils.addMonths(new Date('2022-12-26').getTime(), 1));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(0);
      expect(date.getFullYear()).toBe(2023);
    });

    it('should return the date timestamp for the next (5) months in the same year', () => {
      const date = new Date(DateUtils.addMonths(new Date('2023-01-26').getTime(), 5));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(5);
      expect(date.getFullYear()).toBe(2023);
    });

    it('should return the date timestamp for the next (13) months in the next (2) years', () => {
      const date = new Date(DateUtils.addMonths(new Date('2022-12-26').getTime(), 13));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(0);
      expect(date.getFullYear()).toBe(2024);
    });

    it('should return the date timestamp for the next (24) months in the next (2) years', () => {
      const date = new Date(DateUtils.addMonths(new Date('2022-12-26').getTime(), 24));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(11);
      expect(date.getFullYear()).toBe(2024);
    });

    // subtract
    it('should return the date timestamp for the previous (-1) months in the previous (1) years', () => {
      const date = new Date(DateUtils.addMonths(new Date('2023-01-26').getTime(), -1));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(11);
      expect(date.getFullYear()).toBe(2022);
    });

    it('should return the date timestamp for the previous (-5) months in the same year', () => {
      const date = new Date(DateUtils.addMonths(new Date('2022-12-26').getTime(), -5));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(6);
      expect(date.getFullYear()).toBe(2022);
    });

    it('should return the date timestamp for the previous (-13) months in the previous (2) years', () => {
      const date = new Date(DateUtils.addMonths(new Date('2022-12-26').getTime(), -13));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(10);
      expect(date.getFullYear()).toBe(2021);
    });

    it('should return the date timestamp for the previous (-24) months in the previous (2) years', () => {
      const date = new Date(DateUtils.addMonths(new Date('2022-12-26').getTime(), -24));
      expect(date.getDate()).toBe(26);
      expect(date.getMonth()).toBe(11);
      expect(date.getFullYear()).toBe(2020);
    });
  });
});
