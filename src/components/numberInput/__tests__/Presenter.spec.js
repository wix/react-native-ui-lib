import { getInitialNumber, parseInput } from "../Presenter";
const EN_OPTIONS = {
  localeOptions: {
    locale: 'en',
    decimalSeparator: '.',
    thousandSeparator: ','
  },
  fractionDigits: 2
};
const DE_OPTIONS = {
  localeOptions: {
    locale: 'de',
    decimalSeparator: ',',
    thousandSeparator: '.'
  },
  fractionDigits: 2
};
describe('NumberInput', () => {
  describe('getInitialNumber', () => {
    it('should return 0 for undefined', () => {
      expect(getInitialNumber(undefined, EN_OPTIONS)).toEqual(0);
    });
    it('should return 0 for 0', () => {
      expect(getInitialNumber(0, EN_OPTIONS)).toEqual(0);
    });
    it('should return 100 for 1', () => {
      expect(getInitialNumber(1, EN_OPTIONS)).toEqual(100);
    });
    it('should return 1 for 1 if fractionDigits is 0', () => {
      expect(getInitialNumber(1, {
        ...EN_OPTIONS,
        fractionDigits: 0
      })).toEqual(1);
    });
    it('should return 10 for 1 if fractionDigits is 1', () => {
      expect(getInitialNumber(1, {
        ...EN_OPTIONS,
        fractionDigits: 1
      })).toEqual(10);
    });
    it('Handle wrong result with some X.XX numbers', () => {
      expect(getInitialNumber(8.97, {
        ...EN_OPTIONS
      })).toEqual(897);
    });
  });
  describe('getInitialData', () => {
    const getInitialData = (options, initialNumber) => {
      return parseInput(`${getInitialNumber(initialNumber, options)}`, options);
    };
    it('should return undefined for undefined', () => {
      expect(getInitialData(EN_OPTIONS, undefined)).toEqual({
        formattedNumber: '0.00',
        userInput: '0',
        number: 0,
        type: 'valid'
      });
    });
    it('should return one decimal point and not two', () => {
      expect(getInitialData(EN_OPTIONS, 12.1)).toEqual({
        type: 'valid',
        userInput: '1210',
        formattedNumber: '12.10',
        number: 12.1
      });
    });
    it('should return string that ends without a dot', () => {
      expect(getInitialData(EN_OPTIONS, 12)).toEqual({
        type: 'valid',
        userInput: '1200',
        formattedNumber: '12.00',
        number: 12
      });
    });
    describe('de', () => {
      it('should return one decimal point and not two', () => {
        expect(getInitialData(DE_OPTIONS, 12.1)).toEqual({
          type: 'valid',
          userInput: '1210',
          formattedNumber: '12,10',
          number: 12.1
        });
      });
      it('should return string that ends without a dot', () => {
        expect(getInitialData(DE_OPTIONS, 12)).toEqual({
          type: 'valid',
          userInput: '1200',
          formattedNumber: '12,00',
          number: 12
        });
      });
    });
  });
  describe('parseInput', () => {
    describe('en', () => {
      it('first digit', () => {
        expect(parseInput('1', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '1',
          formattedNumber: '0.01',
          number: 0.01
        });
      });
      it('second digit', () => {
        expect(parseInput('12', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12',
          formattedNumber: '0.12',
          number: 0.12
        });
      });
      it('decimal separator', () => {
        expect(parseInput('12.', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12',
          formattedNumber: '0.12',
          number: 0.12
        });
      });
      it('digit after decimal separator', () => {
        expect(parseInput('1.23', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '123',
          formattedNumber: '1.23',
          number: 1.23
        });
      });
      it('3rd digit', () => {
        expect(parseInput('123', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '123',
          formattedNumber: '1.23',
          number: 1.23
        });
      });
      it('3rd digit after decimal separator', () => {
        expect(parseInput('12.345', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12345',
          formattedNumber: '123.45',
          number: 123.45
        });
      });
      it('thousand separator', () => {
        expect(parseInput('123456', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '123456',
          formattedNumber: '1,234.56',
          number: 1234.56
        });
      });
      it('non-digit character', () => {
        expect(parseInput('1a', EN_OPTIONS)).toEqual({
          type: 'error',
          userInput: '1a'
        });
      });
      it('decimal separator first', () => {
        expect(parseInput('.', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '',
          formattedNumber: '0.00',
          number: 0
        });
      });
      it('decimal separator first and then a digit', () => {
        expect(parseInput('.1', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '1',
          formattedNumber: '0.01',
          number: 0.01
        });
      });
      describe('change fractionDigits', () => {
        it('fractionDigits=0 decimal separator first', () => {
          expect(parseInput('.1', {
            ...EN_OPTIONS,
            fractionDigits: 0
          })).toEqual({
            type: 'valid',
            userInput: '1',
            formattedNumber: '1',
            number: 1
          });
        });
        it('fractionDigits=0 after a few digits', () => {
          expect(parseInput('123.', {
            ...EN_OPTIONS,
            fractionDigits: 0
          })).toEqual({
            type: 'valid',
            userInput: '123',
            formattedNumber: '123',
            number: 123
          });
        });
        it('fractionDigits=3 3rd digit after decimal separator', () => {
          expect(parseInput('12.345', {
            ...EN_OPTIONS,
            fractionDigits: 3
          })).toEqual({
            type: 'valid',
            userInput: '12345',
            formattedNumber: '12.345',
            number: 12.345
          });
        });
        it('fractionDigits=3 4th digit after decimal separator', () => {
          expect(parseInput('12.3454', {
            ...EN_OPTIONS,
            fractionDigits: 3
          })).toEqual({
            type: 'valid',
            userInput: '123454',
            formattedNumber: '123.454',
            number: 123.454
          });
        });
      });
      describe('zero handling', () => {
        it('zero: 0', () => {
          expect(parseInput('0', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '0',
            formattedNumber: '0.00',
            number: 0
          });
        });
        it('two zeroes: 00', () => {
          expect(parseInput('00', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '00',
            formattedNumber: '0.00',
            number: 0
          });
        });
        it('James Bond', () => {
          expect(parseInput('007', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '007',
            formattedNumber: '0.07',
            number: 0.07
          });
        });
        it('zero prefix and fraction: 0123.456', () => {
          expect(parseInput('0123.456', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '0123456',
            formattedNumber: '1,234.56',
            number: 1234.56
          });
        });
      });
    });
    describe('de', () => {
      it('first digit', () => {
        expect(parseInput('1', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '1',
          formattedNumber: '0,01',
          number: 0.01
        });
      });
      it('second digit', () => {
        expect(parseInput('12', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12',
          formattedNumber: '0,12',
          number: 0.12
        });
      });
      it('decimal separator', () => {
        expect(parseInput('12,', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12',
          formattedNumber: '0,12',
          number: 0.12
        });
      });
      it('digit after decimal separator', () => {
        expect(parseInput('12,3', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '123',
          formattedNumber: '1,23',
          number: 1.23
        });
      });
      it('3rd digit after decimal separator', () => {
        expect(parseInput('12,345', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12345',
          formattedNumber: '123,45',
          number: 123.45
        });
      });
      it('thousand separator', () => {
        expect(parseInput('123456', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '123456',
          formattedNumber: '1.234,56',
          number: 1234.56
        });
      });
      it('non-digit character', () => {
        expect(parseInput('1a', DE_OPTIONS)).toEqual({
          type: 'error',
          userInput: '1a'
        });
      });
      it('decimal separator first', () => {
        expect(parseInput(',', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '',
          formattedNumber: '0,00',
          number: 0
        });
      });
      it('decimal separator first and then a digit', () => {
        expect(parseInput(',1', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '1',
          formattedNumber: '0,01',
          number: 0.01
        });
      });
      describe('change fractionDigits', () => {
        it('fractionDigits=0 decimal separator first', () => {
          expect(parseInput(',1', {
            ...DE_OPTIONS,
            fractionDigits: 0
          })).toEqual({
            type: 'valid',
            userInput: '1',
            formattedNumber: '1',
            number: 1
          });
        });
        it('fractionDigits=0 after a few digits', () => {
          expect(parseInput('123,', {
            ...DE_OPTIONS,
            fractionDigits: 0
          })).toEqual({
            type: 'valid',
            userInput: '123',
            formattedNumber: '123',
            number: 123
          });
        });
        it('fractionDigits=3 3rd digit after decimal separator', () => {
          expect(parseInput('12,345', {
            ...DE_OPTIONS,
            fractionDigits: 3
          })).toEqual({
            type: 'valid',
            userInput: '12345',
            formattedNumber: '12,345',
            number: 12.345
          });
        });
        it('fractionDigits=3 4th digit after decimal separator', () => {
          expect(parseInput('12,3454', {
            ...DE_OPTIONS,
            fractionDigits: 3
          })).toEqual({
            type: 'valid',
            userInput: '123454',
            formattedNumber: '123,454',
            number: 123.454
          });
        });
      });
    });
  });
});