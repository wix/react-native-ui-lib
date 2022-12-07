import {getInitialResult, parseInput, EMPTY, Options} from '../Presenter';

const EN_OPTIONS: Options = {
  localeOptions: {
    locale: 'en',
    decimalSeparator: '.',
    thousandSeparator: ','
  },
  fractionDigits: 2
};

const DE_OPTIONS: Options = {
  localeOptions: {
    locale: 'de',
    decimalSeparator: ',',
    thousandSeparator: '.'
  },
  fractionDigits: 2
};

describe('NumberInput', () => {
  describe('getInitialData', () => {
    it('should return undefined for undefined', () => {
      expect(getInitialResult(EN_OPTIONS, undefined)).toEqual(EMPTY);
    });

    it('should return one decimal point and not two', () => {
      expect(getInitialResult(EN_OPTIONS, 12.1)).toEqual({
        type: 'valid',
        userInput: '12.1',
        formattedNumber: '12.1',
        number: 12.1
      });
    });

    it('should return string that ends without a dot', () => {
      expect(getInitialResult(EN_OPTIONS, 12)).toEqual({
        type: 'valid',
        userInput: '12',
        formattedNumber: '12',
        number: 12
      });
    });

    describe('de', () => {
      it('should return one decimal point and not two', () => {
        expect(getInitialResult(DE_OPTIONS, 12.1)).toEqual({
          type: 'valid',
          userInput: '12,1',
          formattedNumber: '12,1',
          number: 12.1
        });
      });

      it('should return string that ends without a dot', () => {
        expect(getInitialResult(DE_OPTIONS, 12)).toEqual({
          type: 'valid',
          userInput: '12',
          formattedNumber: '12',
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
          formattedNumber: '1',
          number: 1
        });
      });

      it('second digit', () => {
        expect(parseInput('12', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12',
          formattedNumber: '12',
          number: 12
        });
      });

      it('decimal separator', () => {
        expect(parseInput('12.', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12.',
          formattedNumber: '12',
          number: 12
        });
      });

      it('digit after decimal separator', () => {
        expect(parseInput('12.3', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12.3',
          formattedNumber: '12.3',
          number: 12.3
        });
      });

      it('3rd digit after decimal separator', () => {
        expect(parseInput('12.345', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12.345',
          formattedNumber: '12.35',
          number: 12.35
        });
      });

      it('thousand separator', () => {
        expect(parseInput('1234', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '1234',
          formattedNumber: '1,234',
          number: 1234
        });
      });

      it('non-digit character', () => {
        expect(parseInput('1a', EN_OPTIONS)).toEqual({type: 'error', userInput: '1a'});
      });

      it('decimal separator first', () => {
        expect(parseInput('.', EN_OPTIONS)).toEqual({
          type: 'error',
          userInput: '.'
        });
      });

      it('decimal separator first and then a digit', () => {
        expect(parseInput('.1', EN_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '.1',
          formattedNumber: '0.1',
          number: 0.1
        });
      });

      describe('change fractionDigits', () => {
        it('fractionDigits=0 decimal separator first', () => {
          expect(parseInput('.1', {...EN_OPTIONS, fractionDigits: 0})).toEqual({
            type: 'valid',
            userInput: '.1',
            formattedNumber: '0',
            number: 0
          });
        });

        it('fractionDigits=0 after a few digits', () => {
          expect(parseInput('123.', {...EN_OPTIONS, fractionDigits: 0})).toEqual({
            type: 'valid',
            userInput: '123.',
            formattedNumber: '123',
            number: 123
          });
        });

        it('fractionDigits=3 3rd digit after decimal separator', () => {
          expect(parseInput('12.345', {...EN_OPTIONS, fractionDigits: 3})).toEqual({
            type: 'valid',
            userInput: '12.345',
            formattedNumber: '12.345',
            number: 12.345
          });
        });

        it('fractionDigits=3 4th digit after decimal separator', () => {
          expect(parseInput('12.3454', {...EN_OPTIONS, fractionDigits: 3})).toEqual({
            type: 'valid',
            userInput: '12.3454',
            formattedNumber: '12.345',
            number: 12.345
          });
        });
      });

      describe('zero handling', () => {
        it('zero: 0', () => {
          expect(parseInput('0', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '0',
            formattedNumber: '0',
            number: 0
          });
        });

        it('two zeroes: 00', () => {
          expect(parseInput('00', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '00',
            formattedNumber: '0',
            number: 0
          });
        });

        it('James Bond', () => {
          expect(parseInput('007', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '007',
            formattedNumber: '7',
            number: 7
          });
        });

        it('zero prefix and fraction: 0123.456', () => {
          expect(parseInput('0123.456', EN_OPTIONS)).toEqual({
            type: 'valid',
            userInput: '0123.456',
            formattedNumber: '123.46',
            number: 123.46
          });
        });
      });
    });

    describe('de', () => {
      it('first digit', () => {
        expect(parseInput('1', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '1',
          formattedNumber: '1',
          number: 1
        });
      });

      it('second digit', () => {
        expect(parseInput('12', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12',
          formattedNumber: '12',
          number: 12
        });
      });

      it('decimal separator', () => {
        expect(parseInput('12,', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12,',
          formattedNumber: '12',
          number: 12
        });
      });

      it('digit after decimal separator', () => {
        expect(parseInput('12,3', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12,3',
          formattedNumber: '12,3',
          number: 12.3
        });
      });

      it('3rd digit after decimal separator', () => {
        expect(parseInput('12,345', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '12,345',
          formattedNumber: '12,35',
          number: 12.35
        });
      });

      it('thousand separator', () => {
        expect(parseInput('1234', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: '1234',
          formattedNumber: '1.234',
          number: 1234
        });
      });

      it('non-digit character', () => {
        expect(parseInput('1a', DE_OPTIONS)).toEqual({type: 'error', userInput: '1a'});
      });

      it('decimal separator first', () => {
        expect(parseInput(',', DE_OPTIONS)).toEqual({
          type: 'error',
          userInput: ','
        });
      });

      it('decimal separator first and then a digit', () => {
        expect(parseInput(',1', DE_OPTIONS)).toEqual({
          type: 'valid',
          userInput: ',1',
          formattedNumber: '0,1',
          number: 0.1
        });
      });

      describe('change fractionDigits', () => {
        it('fractionDigits=0 decimal separator first', () => {
          expect(parseInput(',1', {...DE_OPTIONS, fractionDigits: 0})).toEqual({
            type: 'valid',
            userInput: ',1',
            formattedNumber: '0',
            number: 0
          });
        });

        it('fractionDigits=0 after a few digits', () => {
          expect(parseInput('123,', {...DE_OPTIONS, fractionDigits: 0})).toEqual({
            type: 'valid',
            userInput: '123,',
            formattedNumber: '123',
            number: 123
          });
        });

        it('fractionDigits=3 3rd digit after decimal separator', () => {
          expect(parseInput('12,345', {...DE_OPTIONS, fractionDigits: 3})).toEqual({
            type: 'valid',
            userInput: '12,345',
            formattedNumber: '12,345',
            number: 12.345
          });
        });

        it('fractionDigits=3 4th digit after decimal separator', () => {
          expect(parseInput('12,3454', {...DE_OPTIONS, fractionDigits: 3})).toEqual({
            type: 'valid',
            userInput: '12,3454',
            formattedNumber: '12,345',
            number: 12.345
          });
        });
      });
    });
  });
});
