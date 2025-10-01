import * as DateUtils from "../helpers/DateUtils";
import { FirstDayOfWeek, DayNamesFormat } from "../types";
describe('Calendar/DateUtils', () => {
  describe('getWeekNumbersOfMonth', () => {
    it('should return week numbers of first month in a year', () => {
      let weekNumbers = DateUtils.getWeekNumbersOfMonth(2023, 0, FirstDayOfWeek.MONDAY);
      expect(weekNumbers).toEqual([1, 2, 3, 4, 5, 6]);
      weekNumbers = DateUtils.getWeekNumbersOfMonth(2023, 0, FirstDayOfWeek.SUNDAY);
      expect(weekNumbers).toEqual([1, 2, 3, 4, 5]);
      weekNumbers = DateUtils.getWeekNumbersOfMonth(2022, 0, FirstDayOfWeek.MONDAY);
      expect(weekNumbers).toEqual([1, 2, 3, 4, 5, 6]);
      weekNumbers = DateUtils.getWeekNumbersOfMonth(2022, 0, FirstDayOfWeek.SUNDAY);
      expect(weekNumbers).toEqual([1, 2, 3, 4, 5, 6]);
      weekNumbers = DateUtils.getWeekNumbersOfMonth(2018, 0, FirstDayOfWeek.MONDAY);
      expect(weekNumbers).toEqual([1, 2, 3, 4, 5]);
      weekNumbers = DateUtils.getWeekNumbersOfMonth(2018, 0, FirstDayOfWeek.SUNDAY);
      expect(weekNumbers).toEqual([1, 2, 3, 4, 5]);
    });
    it('should return week numbers of last month in a year', () => {
      let weekNumbers = DateUtils.getWeekNumbersOfMonth(2022, 11, FirstDayOfWeek.MONDAY);
      expect(weekNumbers).toEqual([49, 50, 51, 52, 53]);
      weekNumbers = DateUtils.getWeekNumbersOfMonth(2018, 11, FirstDayOfWeek.MONDAY);
      expect(weekNumbers).toEqual([48, 49, 50, 51, 52, 53]);
    });
    it('should return week numbers of a month with 6 weeks', () => {
      let weekNumbers = DateUtils.getWeekNumbersOfMonth(2018, 3, FirstDayOfWeek.MONDAY);
      expect(weekNumbers).toEqual([13, 14, 15, 16, 17, 18]);
      weekNumbers = DateUtils.getWeekNumbersOfMonth(2018, 8, FirstDayOfWeek.SUNDAY);
      expect(weekNumbers).toEqual([35, 36, 37, 38, 39, 40]);
    });
    it('should throw error when passing invalid month', () => {
      expect(() => DateUtils.getWeekNumbersOfMonth(2022, 12, FirstDayOfWeek.MONDAY)).toThrowError('getWeekNumbersOfMonth util received an invalid month');
    });
  });
  describe('getFirstDayInTheYear', () => {
    describe('2020', () => {
      it('2020 When Saturday is first day of the week - should return Saturday Dec 28th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, FirstDayOfWeek.SATURDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(28);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(6);
      });
      it('2020 When Sunday is first day of the week - should return Sunday Dec 29th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, FirstDayOfWeek.SUNDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(29);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(0);
      });
      it('2020 When Monday is first day of the week - should return Monday Dec 30th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2020, FirstDayOfWeek.MONDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(30);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(1);
      });
    });
    describe('2021', () => {
      it('2021 When Saturday is first day of the week - should return Saturday Dec 26th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, FirstDayOfWeek.SATURDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(26);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(6);
      });
      it('2021 When Sunday is first day of the week - should return Sunday Dec 27th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, FirstDayOfWeek.SUNDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(27);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(0);
      });
      it('2021 When Monday is first day of the week - should return Monday Dec 28th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2021, FirstDayOfWeek.MONDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(28);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(1);
      });
    });
    describe('2022', () => {
      it('2022 When Saturday is first day of the week - should return Saturday Jan 1st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, FirstDayOfWeek.SATURDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(1);
        expect(dayObject.month).toBe(0);
        expect(dayObject.dayOfTheWeek).toBe(6);
      });
      it('2022 When Sunday is first day of the week - should return Sunday Dec 26th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, FirstDayOfWeek.SUNDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(26);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(0);
      });
      it('2022 When Monday is first day of the week - should return Monday Dec 27th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2022, FirstDayOfWeek.MONDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(27);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(1);
      });
    });
    describe('2023', () => {
      it('2023 When Saturday is first day of the week - should return Saturday Dec 31st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, FirstDayOfWeek.SATURDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(31);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(6);
      });
      it('2023 When Sunday is first day of the week - should return Sunday Jan 1st', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, FirstDayOfWeek.SUNDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(1);
        expect(dayObject.month).toBe(0);
        expect(dayObject.dayOfTheWeek).toBe(0);
      });
      it('2023 When Monday is first day of the week - should return Monday Dec 26th', () => {
        const firstDayInTheYear = DateUtils._forTesting.getFirstDayInTheYear(2023, FirstDayOfWeek.MONDAY);
        const dayObject = DateUtils.getDateObject(firstDayInTheYear);
        expect(dayObject.day).toBe(26);
        expect(dayObject.month).toBe(11);
        expect(dayObject.dayOfTheWeek).toBe(1);
      });
    });
  });
  describe('getDaysOfWeekNumber', () => {
    it('should return array of 7 items', () => {
      const daysInWeek = DateUtils.getDaysOfWeekNumber(2022, 11, FirstDayOfWeek.MONDAY);
      expect(daysInWeek.length).toBe(7);
    });
    it('should return the right days at the first week of year - FirstDayOfWeek.SUNDAY', () => {
      const daysInWeek = DateUtils.getDaysOfWeekNumber(2023, 1, FirstDayOfWeek.SUNDAY);
      const firstDay = daysInWeek[0];
      const lastDay = daysInWeek[6];
      const firstDayObject = DateUtils.getDateObject(firstDay);
      expect(firstDayObject.day).toBe(1);
      expect(firstDayObject.month).toBe(0);
      expect(firstDayObject.year).toBe(2023);
      const lastDayObject = DateUtils.getDateObject(lastDay);
      expect(lastDayObject.day).toBe(7);
      expect(lastDayObject.month).toBe(0);
      expect(lastDayObject.year).toBe(2023);
    });

    // TODO: We need to fix this test
    it('should return the right days at the first week of year - FirstDayOfWeek.MONDAY', () => {
      const daysInWeek = DateUtils.getDaysOfWeekNumber(2023, 1, FirstDayOfWeek.MONDAY);
      const firstDay = daysInWeek[0];
      const lastDay = daysInWeek[6];
      const firstDayObject = DateUtils.getDateObject(firstDay);
      expect(firstDayObject.day).toBe(26);
      expect(firstDayObject.month).toBe(11);
      expect(firstDayObject.year).toBe(2022);
      const lastDayObject = DateUtils.getDateObject(lastDay);
      expect(lastDayObject.day).toBe(1);
      expect(lastDayObject.month).toBe(0);
      expect(lastDayObject.year).toBe(2023);
    });
  });
  describe('addMonths', () => {
    it('should return the date timestamp for the next (1) months in the next (1) years', () => {
      const date = DateUtils.addMonths(new Date(2022, 11, 26).getTime(), 1);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(0);
      expect(dayObject.year).toBe(2023);
    });
    it('should return the date timestamp for the next (5) months in the same year', () => {
      const date = DateUtils.addMonths(new Date(2023, 0, 26).getTime(), 5);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(5);
      expect(dayObject.year).toBe(2023);
    });
    it('should return the date timestamp for the next (13) months in the next (2) years', () => {
      const date = DateUtils.addMonths(new Date(2022, 11, 26).getTime(), 13);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(0);
      expect(dayObject.year).toBe(2024);
    });
    it('should return the date timestamp for the next (24) months in the next (2) years', () => {
      const date = DateUtils.addMonths(new Date(2022, 11, 26).getTime(), 24);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(11);
      expect(dayObject.year).toBe(2024);
    });

    // subtract
    it('should return the date timestamp for the previous (-1) months in the previous (1) years', () => {
      const date = DateUtils.addMonths(new Date(2023, 0, 26).getTime(), -1);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(11);
      expect(dayObject.year).toBe(2022);
    });
    it('should return the date timestamp for the previous (-5) months in the same year', () => {
      const date = DateUtils.addMonths(new Date(2022, 11, 26).getTime(), -5);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(6);
      expect(dayObject.year).toBe(2022);
    });
    it('should return the date timestamp for the previous (-13) months in the previous (2) years', () => {
      const date = DateUtils.addMonths(new Date(2022, 11, 26).getTime(), -13);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(10);
      expect(dayObject.year).toBe(2021);
    });
    it('should return the date timestamp for the previous (-24) months in the previous (2) years', () => {
      const date = DateUtils.addMonths(new Date(2022, 11, 26).getTime(), -24);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(11);
      expect(dayObject.year).toBe(2020);
    });

    // useFirstDay
    it('should return the date timestamp for the 1st day of the next (1) months in the next (1) years', () => {
      const date = DateUtils.addMonths(new Date(2022, 11, 26).getTime(), 1, true);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(1);
      expect(dayObject.month).toBe(0);
      expect(dayObject.year).toBe(2023);
    });
  });
  describe('addYears', () => {
    it('should return the date timestamp for the next (1) year in the same month', () => {
      const date = DateUtils.addYears(new Date(2022, 11, 26).getTime(), 1);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(11);
      expect(dayObject.year).toBe(2023);
    });
    it('should return the date timestamp for the previous (-1) year in the same month', () => {
      const date = DateUtils.addYears(new Date(2022, 11, 26).getTime(), -1);
      const dayObject = DateUtils.getDateObject(date);
      expect(dayObject.day).toBe(26);
      expect(dayObject.month).toBe(11);
      expect(dayObject.year).toBe(2021);
    });
  });
  describe('getWeekDayNames', () => {
    it('should return the week days names for first day = Sunday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames();
      expect(weekDaysNames[0]).toBe('Sunday');
    });
    it('should return the week days names for first day = Monday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.MONDAY);
      expect(weekDaysNames[0]).toBe('Monday');
    });
    it('should return the week days names for first day = Saturday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.SATURDAY);
      expect(weekDaysNames[0]).toBe('Saturday');
    });
    it('should return the week days names for long abbreviation format', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.SUNDAY, DayNamesFormat.LONG_ABBREVIATION);
      expect(weekDaysNames[0]).toBe('Sun');
    });
    it('should return the week days names for first day = Sunday', () => {
      const weekDaysNames = DateUtils.getWeekDayNames(FirstDayOfWeek.SUNDAY, DayNamesFormat.SHORT_ABBREVIATION);
      expect(weekDaysNames[0]).toBe('S');
    });
  });
  describe('isPastDate', () => {
    it('should return true for a past date', () => {
      expect(DateUtils.isPastDate(new Date('2022-12-26').getTime())).toBe(true);
    });
    it('should return false for a future date', () => {
      expect(DateUtils.isPastDate(new Date('2222-12-26').getTime())).toBe(false);
    });
  });
  describe('isSameDay', () => {
    it('should return true for same dates using Date objects', () => {
      expect(DateUtils.isSameDay(new Date().getTime(), Date.now())).toBe(true);
    });
    it('should return true for same dates using timestamps', () => {
      expect(DateUtils.isSameDay(1673442316000, 1673463916000)).toBe(true);
    });
    it('should return false for different dates using Date objects', () => {
      expect(DateUtils.isSameDay(new Date('2022-12-26').getTime(), new Date('2022-12-27').getTime())).toBe(false);
    });
    it('should return false for different dates using timestamps', () => {
      expect(DateUtils.isSameDay(1673442316000, 1674327916)).toBe(false);
    });
  });
  describe('isSameMonth', () => {
    it('should return true for same months using Date objects', () => {
      expect(DateUtils.isSameMonth(new Date().getTime(), Date.now())).toBe(true);
    });
    it('should return true for same months using timestamps', () => {
      expect(DateUtils.isSameMonth(1673950085000, 1674122885000)).toBe(true);
    });
    it('should return false for different months using Date objects', () => {
      expect(DateUtils.isSameMonth(new Date('2023-12-27').getTime(), new Date('2023-11-27').getTime())).toBe(false);
    });
    it('should return false for different years using Date objects', () => {
      expect(DateUtils.isSameMonth(new Date('2023-12-27').getTime(), new Date('2022-12-27').getTime())).toBe(false);
    });
    it('should return false for different months using timestamps', () => {
      expect(DateUtils.isSameMonth(1673949947000, 1676628347000)).toBe(false);
    });
    it('should return true for different years using timestamps', () => {
      expect(DateUtils.isSameMonth(1673949947000, 1705485947000)).toBe(false);
    });
    it('should return false for same month in MonthProps date format', () => {
      expect(DateUtils.isSameMonth({
        month: 11,
        year: 2026,
        timestamp: new Date(2026, 11, 1).getTime()
      }, {
        month: 10,
        year: 2026,
        timestamp: new Date(2026, 10, 1).getTime()
      })).toBe(false);
    });
    it('should return false for same month in MonthProps date format', () => {
      expect(DateUtils.isSameMonth({
        month: 10,
        year: 2023,
        timestamp: new Date(2023, 10, 1).getTime()
      }, {
        month: 10,
        year: 2026,
        timestamp: new Date(2026, 10, 1).getTime()
      })).toBe(false);
    });
    it('should return true for same month in MonthProps date format', () => {
      expect(DateUtils.isSameMonth({
        month: 10,
        year: 2026,
        timestamp: new Date(2026, 10, 1).getTime()
      }, {
        month: 10,
        year: 2026,
        timestamp: new Date(2026, 10, 1).getTime()
      })).toBe(true);
    });
    it('should return true for same month in different date format', () => {
      expect(DateUtils.isSameMonth({
        month: 0,
        year: 2022,
        timestamp: new Date(2022, 0, 1).getTime()
      }, new Date('2022-01-27').getTime())).toBe(true);
    });
    it('should return true for same month in different date format', () => {
      expect(DateUtils.isSameMonth(new Date('2026-11-27').getTime(), {
        month: 10,
        year: 2026,
        timestamp: new Date(2026, 10, 1).getTime()
      })).toBe(true);
    });
  });
  describe('getMonthForIndex', () => {
    it('should return January for index 0 ', () => {
      expect(DateUtils.getMonthForIndex(0)).toBe('January');
    });
    it('should return December for index 11 ', () => {
      expect(DateUtils.getMonthForIndex(11)).toBe('December');
    });
  });
});