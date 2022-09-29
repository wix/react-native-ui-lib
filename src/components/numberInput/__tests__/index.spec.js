import {_forTests} from '../index';

describe('NumberInput', () => {
  describe('deriveData', () => {
    it('should return undefined for undefined', () => {
      expect(_forTests.deriveData(undefined)).toEqual(undefined);
    });

    it('should return one decimal point and not two', () => {
      expect(_forTests.deriveData(12.1)).toEqual({
        value: 12.1,
        endsWithDecimalSeparator: false,
        formattedNumber: '12.1',
        maxLength: 4
      });
    });

    it('should return string that ends with a dot', () => {
      expect(_forTests.deriveData(12, 'en', true)).toEqual({
        value: 12,
        endsWithDecimalSeparator: true,
        formattedNumber: '12.',
        maxLength: 3
      });
    });

    it('should return string that ends without a dot', () => {
      expect(_forTests.deriveData(12, 'en', false)).toEqual({
        value: 12,
        endsWithDecimalSeparator: false,
        formattedNumber: '12',
        maxLength: 2
      });
    });
  });

  describe('processKey', () => {
    describe('en', () => {
      it('first digit', () => {
        expect(_forTests.processKey('1')).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '1',
          maxLength: 1,
          value: 1
        });
      });

      it('second digit', () => {
        expect(_forTests.processKey('2', {
          endsWithDecimalSeparator: false,
          formattedNumber: '1',
          maxLength: 1,
          value: 1
        })).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '12',
          maxLength: 2,
          value: 12
        });
      });

      it('decimal separator', () => {
        expect(_forTests.processKey('.', {
          endsWithDecimalSeparator: false,
          formattedNumber: '12',
          maxLength: 2,
          value: 12
        })).toEqual({
          endsWithDecimalSeparator: true,
          formattedNumber: '12.',
          maxLength: 3,
          value: 12
        });
      });

      it('digit after decimal separator', () => {
        expect(_forTests.processKey('3', {
          endsWithDecimalSeparator: true,
          formattedNumber: '12.',
          maxLength: 3,
          value: 12
        })).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '12.3',
          maxLength: 4,
          value: 12.3
        });
      });

      it('3rd digit return null', () => {
        expect(_forTests.processKey('5', {
          endsWithDecimalSeparator: false,
          formattedNumber: '12.34',
          maxLength: 5,
          value: 12.34
        })).toEqual(null);
      });

      it('thousand separator', () => {
        expect(_forTests.processKey('4', {
          endsWithDecimalSeparator: false,
          formattedNumber: '123',
          maxLength: 3,
          value: 123
        })).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '1,234',
          maxLength: 5,
          value: 1234
        });
      });

      it('character', () => {
        expect(_forTests.processKey('a', {
          endsWithDecimalSeparator: false,
          formattedNumber: '1',
          maxLength: 1,
          value: 1
        })).toEqual(null);
      });

      it('decimal separator first', () => {
        expect(_forTests.processKey('.', undefined)).toEqual({
          endsWithDecimalSeparator: true,
          formattedNumber: '0.',
          maxLength: 2,
          value: 0
        });
      });

      describe('backspace', () => {
        it('no data', () => {
          expect(_forTests.processKey('Backspace')).toEqual(null);
        });

        it('1 digit', () => {
          expect(_forTests.processKey('Backspace', {
            endsWithDecimalSeparator: false,
            formattedNumber: '1',
            maxLength: 1,
            value: 1
          })).toEqual(undefined);
        });

        it('2 digits', () => {
          expect(_forTests.processKey('Backspace', {
            endsWithDecimalSeparator: false,
            formattedNumber: '12',
            maxLength: 2,
            value: 12
          })).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '1',
            maxLength: 1,
            value: 1
          });
        });

        it('decimal separator', () => {
          expect(_forTests.processKey('Backspace', {
            endsWithDecimalSeparator: true,
            formattedNumber: '12.',
            maxLength: 3,
            value: 12
          })).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '12',
            maxLength: 2,
            value: 12
          });
        });

        it('number after decimal separator', () => {
          expect(_forTests.processKey('Backspace', {
            endsWithDecimalSeparator: false,
            formattedNumber: '12.3',
            maxLength: 4,
            value: 12.3
          })).toEqual({
            endsWithDecimalSeparator: true,
            formattedNumber: '12.',
            maxLength: 3,
            value: 12
          });
        });

        it('thousand separator', () => {
          expect(_forTests.processKey('Backspace', {
            endsWithDecimalSeparator: false,
            formattedNumber: '1,234',
            maxLength: 5,
            value: 1234
          })).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '123',
            maxLength: 3,
            value: 123
          });
        });
      });
    });

    describe('de', () => {
      it('first digit', () => {
        expect(_forTests.processKey('1', undefined, 'de')).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '1',
          maxLength: 1,
          value: 1
        });
      });

      it('second digit', () => {
        expect(_forTests.processKey('2',
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '1',
            maxLength: 1,
            value: 1
          },
          'de')).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '12',
          maxLength: 2,
          value: 12
        });
      });

      it('decimal separator', () => {
        expect(_forTests.processKey(',',
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '12',
            maxLength: 2,
            value: 12
          },
          'de')).toEqual({
          endsWithDecimalSeparator: true,
          formattedNumber: '12,',
          maxLength: 3,
          value: 12
        });
      });

      it('digit after decimal separator', () => {
        expect(_forTests.processKey('3',
          {
            endsWithDecimalSeparator: true,
            formattedNumber: '12,',
            maxLength: 3,
            value: 12
          },
          'de')).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '12,3',
          maxLength: 4,
          value: 12.3
        });
      });

      it('3rd digit return null', () => {
        expect(_forTests.processKey('5',
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '12,34',
            maxLength: 5,
            value: 12.34
          },
          'de')).toEqual(null);
      });

      it('thousand separator', () => {
        expect(_forTests.processKey('4',
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '123',
            maxLength: 3,
            value: 123
          },
          'de')).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '1.234',
          maxLength: 5,
          value: 1234
        });
      });

      it('character', () => {
        expect(_forTests.processKey('a',
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '1',
            maxLength: 1,
            value: 1
          },
          'de')).toEqual(null);
      });

      it('decimal separator first', () => {
        expect(_forTests.processKey(',', undefined, 'de')).toEqual({
          endsWithDecimalSeparator: true,
          formattedNumber: '0,',
          maxLength: 2,
          value: 0
        });
      });

      describe('backspace', () => {
        it('no data', () => {
          expect(_forTests.processKey('Backspace')).toEqual(null);
        });

        it('1 digit', () => {
          expect(_forTests.processKey('Backspace',
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '1',
              maxLength: 1,
              value: 1
            },
            'de')).toEqual(undefined);
        });

        it('2 digits', () => {
          expect(_forTests.processKey('Backspace',
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '12',
              maxLength: 2,
              value: 12
            },
            'de')).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '1',
            maxLength: 1,
            value: 1
          });
        });

        it('decimal separator', () => {
          expect(_forTests.processKey('Backspace',
            {
              endsWithDecimalSeparator: true,
              formattedNumber: '12,',
              maxLength: 3,
              value: 12
            },
            'de')).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '12',
            maxLength: 2,
            value: 12
          });
        });

        it('number after decimal separator', () => {
          expect(_forTests.processKey('Backspace',
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '12,3',
              maxLength: 4,
              value: 12.3
            },
            'de')).toEqual({
            endsWithDecimalSeparator: true,
            formattedNumber: '12,',
            maxLength: 3,
            value: 12
          });
        });

        it('thousand separator', () => {
          expect(_forTests.processKey('Backspace',
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '1.234',
              maxLength: 5,
              value: 1234
            },
            'de')).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '123',
            maxLength: 3,
            value: 123
          });
        });
      });
    });
  });
});
