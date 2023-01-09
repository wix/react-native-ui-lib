import * as DateUtils from '../helpers/DateUtils';
import {FirstDayOfWeek, DayNamesFormat} from '../types';

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
      it('2020 When Saturday is first day of the week - should return Saturday Jan 4th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, FirstDayOfWeek.Saturday);
        expect(firstDayInTheYear.getDate()).toBe(4);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2020 When Sunday is first day of the week - should return Sunday Dec 29th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, FirstDayOfWeek.Sunday);
        expect(firstDayInTheYear.getDate()).toBe(29);
        expect(firstDayInTheYear.getMonth()).toBe(11);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2020 When Monday is first day of the week - should return Monday Dec 30th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, FirstDayOfWeek.Monday);
        expect(firstDayInTheYear.getDate()).toBe(30);
        expect(firstDayInTheYear.getMonth()).toBe(11);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
    });

    describe('2021', () => {
      it('2021 When Saturday is first day of the week - should return Saturday Jan 2nd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, FirstDayOfWeek.Saturday);
        expect(firstDayInTheYear.getDate()).toBe(2);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2021 When Sunday is first day of the week - should return Sunday Jan 3rd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, FirstDayOfWeek.Sunday);
        expect(firstDayInTheYear.getDate()).toBe(3);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2021 When Monday is first day of the week - should return Monday Jan 4th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, FirstDayOfWeek.Monday);
        expect(firstDayInTheYear.getDate()).toBe(4);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
    });

    describe('2022', () => {
      it('2022 When Saturday is first day of the week - should return Saturday Jan 1st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, FirstDayOfWeek.Saturday);
        expect(firstDayInTheYear.getDate()).toBe(1);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2022 When Sunday is first day of the week - should return Sunday Jan 2nd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, FirstDayOfWeek.Sunday);
        expect(firstDayInTheYear.getDate()).toBe(2);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2022 When Monday is first day of the week - should return Monday Jan 3rd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, FirstDayOfWeek.Monday);
        expect(firstDayInTheYear.getDate()).toBe(3);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
    });

    describe('2023', () => {
      it('2023 When Saturday is first day of the week - should return Saturday Dec 31st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, FirstDayOfWeek.Saturday);
        expect(firstDayInTheYear.getDate()).toBe(31);
        expect(firstDayInTheYear.getMonth()).toBe(11);
        expect(firstDayInTheYear.getDay()).toBe(6);
      });

      it('2023 When Sunday is first day of the week - should return Sunday Jan 1st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, FirstDayOfWeek.Sunday);
        expect(firstDayInTheYear.getDate()).toBe(1);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(0);
      });

      it('2023 When Monday is first day of the week - should return Monday Jan 2nd', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, FirstDayOfWeek.Monday);
        expect(firstDayInTheYear.getDate()).toBe(2);
        expect(firstDayInTheYear.getMonth()).toBe(0);
        expect(firstDayInTheYear.getDay()).toBe(1);
      });
    });
  });

  describe('getDaysOfWeekNumber', () => {
    it('should return array of 7 items', () => {
      const daysInWeek = DateUtils.getDaysOfWeekNumber(2022, 11, FirstDayOfWeek.Monday);
      expect(daysInWeek.length).toBe(7);
    });
  });

  describe('getDayOfDate', () => {
    it('should return the day number from the date timestamp', () => {
      const day = DateUtils.getDayOfDate(new Date('2022-12-26').getTime());
      expect(day).toBe(26);
    });
  });

  describe('addMonths', () => {
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

  describe('getWeekDayNames', () => {
    it('should return the week days names for first day = Sunday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames();
      expect(weekDaysNames[0]).toBe('Sunday');
    });
    it('should return the week days names for first day = Monday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.Monday);
      expect(weekDaysNames[0]).toBe('Monday');
    });
    it('should return the week days names for first day = Saturday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.Saturday);
      expect(weekDaysNames[0]).toBe('Saturday');
    });

    it('should return the week days names for long abbreviation format', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.Sunday, DayNamesFormat.LONG_ABBREVIATION);
      expect(weekDaysNames[0]).toBe('Sun');
    });

    it('should return the week days names for first day = Sunday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.Sunday, DayNamesFormat.SHORT_ABBREVIATION);
      expect(weekDaysNames[0]).toBe('S');
    });
  });
});
