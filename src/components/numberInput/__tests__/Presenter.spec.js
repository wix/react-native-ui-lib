import {deriveData, processKey} from '../Presenter';

describe('NumberInput', () => {
  describe('deriveData', () => {
    it('should return undefined for undefined', () => {
      expect(deriveData(undefined)).toEqual(undefined);
    });

    it('should return one decimal point and not two', () => {
      expect(deriveData({locale: 'en', decimalSeparator: '.'}, 2, 12.1)).toEqual({
        value: 12.1,
        endsWithDecimalSeparator: false,
        formattedNumber: '12.1',
        maxLength: 4
      });
    });

    it('should return string that ends with a dot', () => {
      expect(deriveData({locale: 'en', decimalSeparator: '.'}, 2, 12, true)).toEqual({
        value: 12,
        endsWithDecimalSeparator: true,
        formattedNumber: '12.',
        maxLength: 3
      });
    });

    it('should return string that ends without a dot', () => {
      expect(deriveData({locale: 'en', decimalSeparator: '.'}, 2, 12, false)).toEqual({
        value: 12,
        endsWithDecimalSeparator: false,
        formattedNumber: '12',
        maxLength: 2
      });
    });

    describe('de', () => {
      it('should return one decimal point and not two', () => {
        expect(deriveData({locale: 'de', decimalSeparator: ','}, 2, 12.1)).toEqual({
          value: 12.1,
          endsWithDecimalSeparator: false,
          formattedNumber: '12,1',
          maxLength: 4
        });
      });

      it('should return string that ends with a dot', () => {
        expect(deriveData({locale: 'de', decimalSeparator: ','}, 2, 12, true)).toEqual({
          value: 12,
          endsWithDecimalSeparator: true,
          formattedNumber: '12,',
          maxLength: 3
        });
      });

      it('should return string that ends without a dot', () => {
        expect(deriveData({locale: 'de', decimalSeparator: ','}, 2, 12, false)).toEqual({
          value: 12,
          endsWithDecimalSeparator: false,
          formattedNumber: '12',
          maxLength: 2
        });
      });
    });
  });

  describe('processKey', () => {
    describe('en', () => {
      it('first digit', () => {
        expect(processKey('1', 2, {locale: 'en', decimalSeparator: '.'})).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '1',
          maxLength: 1,
          value: 1
        });
      });

      it('second digit', () => {
        expect(processKey('2',
          2,
          {locale: 'en', decimalSeparator: '.'},
          {
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
        expect(processKey('.',
          2,
          {locale: 'en', decimalSeparator: '.'},
          {
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
        expect(processKey('3',
          2,
          {locale: 'en', decimalSeparator: '.'},
          {
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

      it('3rd digit after decimal separator', () => {
        expect(processKey('5',
          2,
          {locale: 'en', decimalSeparator: '.'},
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '12.34',
            maxLength: 5,
            value: 12.34
          })).toEqual(null);
      });

      it('thousand separator', () => {
        expect(processKey('4',
          2,
          {locale: 'en', decimalSeparator: '.'},
          {
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
        expect(processKey('a',
          2,
          {locale: 'en', decimalSeparator: '.'},
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '1',
            maxLength: 1,
            value: 1
          })).toEqual(null);
      });

      it('decimal separator first', () => {
        expect(processKey('.', 2, {locale: 'en', decimalSeparator: '.'}, undefined)).toEqual({
          endsWithDecimalSeparator: true,
          formattedNumber: '0.',
          maxLength: 2,
          value: 0
        });
      });

      describe('change fractionDigits', () => {
        it('fractionDigits=0 decimal separator first', () => {
          expect(processKey('.', 0, {locale: 'en', decimalSeparator: '.'}, undefined)).toEqual(null);
        });

        it('fractionDigits=0 after a few digits', () => {
          expect(processKey('.',
            0,
            {locale: 'en', decimalSeparator: '.'},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '123',
              maxLength: 3,
              value: 123
            })).toEqual(null);
        });

        it('fractionDigits=3 3rd digit after decimal separator', () => {
          expect(processKey('5',
            3,
            {locale: 'en', decimalSeparator: '.'},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '12.34',
              maxLength: 5,
              value: 12.34
            })).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '12.345',
            maxLength: 6,
            value: 12.345
          });
        });

        it('fractionDigits=3 4th digit after decimal separator', () => {
          expect(processKey('6',
            3,
            {locale: 'en', decimalSeparator: '.'},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '12.345',
              maxLength: 6,
              value: 12.345
            })).toEqual(null);
        });
      });

      describe('backspace', () => {
        it('no data', () => {
          expect(processKey('Backspace', 2, {locale: 'en', decimalSeparator: '.'})).toEqual(null);
        });

        it('1 digit', () => {
          expect(processKey('Backspace',
            2,
            {locale: 'en', decimalSeparator: '.'},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '1',
              maxLength: 1,
              value: 1
            })).toEqual(undefined);
        });

        it('2 digits', () => {
          expect(processKey('Backspace',
            2,
            {locale: 'en', decimalSeparator: '.'},
            {
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
          expect(processKey('Backspace',
            2,
            {locale: 'en', decimalSeparator: '.'},
            {
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
          expect(processKey('Backspace',
            2,
            {locale: 'en', decimalSeparator: '.'},
            {
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
          expect(processKey('Backspace',
            2,
            {locale: 'en', decimalSeparator: '.'},
            {
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
        expect(processKey('1', 2, {locale: 'de', decimalSeparator: ','}, undefined)).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '1',
          maxLength: 1,
          value: 1
        });
      });

      it('second digit', () => {
        expect(processKey('2',
          2,
          {locale: 'de', decimalSeparator: ','},
          {
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
        expect(processKey(',',
          2,
          {locale: 'de', decimalSeparator: ','},
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '12',
            maxLength: 2,
            value: 12
          })).toEqual({
          endsWithDecimalSeparator: true,
          formattedNumber: '12,',
          maxLength: 3,
          value: 12
        });
      });

      it('digit after decimal separator', () => {
        expect(processKey('3',
          2,
          {locale: 'de', decimalSeparator: ','},
          {
            endsWithDecimalSeparator: true,
            formattedNumber: '12,',
            maxLength: 3,
            value: 12
          })).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '12,3',
          maxLength: 4,
          value: 12.3
        });
      });

      it('3rd digit after decimal separator', () => {
        expect(processKey('5',
          2,
          {locale: 'de', decimalSeparator: ','},
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '12,34',
            maxLength: 5,
            value: 12.34
          })).toEqual(null);
      });

      it('thousand separator', () => {
        expect(processKey('4',
          2,
          {locale: 'de', decimalSeparator: ','},
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '123',
            maxLength: 3,
            value: 123
          })).toEqual({
          endsWithDecimalSeparator: false,
          formattedNumber: '1.234',
          maxLength: 5,
          value: 1234
        });
      });

      it('character', () => {
        expect(processKey('a',
          2,
          {locale: 'de', decimalSeparator: ','},
          {
            endsWithDecimalSeparator: false,
            formattedNumber: '1',
            maxLength: 1,
            value: 1
          })).toEqual(null);
      });

      it('decimal separator first', () => {
        expect(processKey(',', 2, {locale: 'de', decimalSeparator: ','}, undefined)).toEqual({
          endsWithDecimalSeparator: true,
          formattedNumber: '0,',
          maxLength: 2,
          value: 0
        });
      });

      describe('change fractionDigits', () => {
        it('fractionDigits=0 decimal separator first', () => {
          expect(processKey(',', 0, {locale: 'de', decimalSeparator: ','}, undefined)).toEqual(null);
        });

        it('fractionDigits=0 after a few digits', () => {
          expect(processKey(',',
            0,
            {locale: 'de', decimalSeparator: ','},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '123',
              maxLength: 3,
              value: 123
            })).toEqual(null);
        });

        it('fractionDigits=3 3rd digit after decimal separator', () => {
          expect(processKey('5',
            3,
            {locale: 'de', decimalSeparator: ','},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '12,34',
              maxLength: 5,
              value: 12.34
            })).toEqual({
            endsWithDecimalSeparator: false,
            formattedNumber: '12,345',
            maxLength: 6,
            value: 12.345
          });
        });

        it('fractionDigits=3 4th digit after decimal separator', () => {
          expect(processKey('6',
            3,
            {locale: 'de', decimalSeparator: ','},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '12,345',
              maxLength: 6,
              value: 12.345
            })).toEqual(null);
        });
      });

      describe('backspace', () => {
        it('no data', () => {
          expect(processKey('Backspace', 2, {locale: 'de', decimalSeparator: ','})).toEqual(null);
        });

        it('1 digit', () => {
          expect(processKey('Backspace',
            2,
            {locale: 'de', decimalSeparator: ','},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '1',
              maxLength: 1,
              value: 1
            })).toEqual(undefined);
        });

        it('2 digits', () => {
          expect(processKey('Backspace',
            2,
            {locale: 'de', decimalSeparator: ','},
            {
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
          expect(processKey('Backspace',
            2,
            {locale: 'de', decimalSeparator: ','},
            {
              endsWithDecimalSeparator: true,
              formattedNumber: '12,',
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
          expect(processKey('Backspace',
            2,
            {locale: 'de', decimalSeparator: ','},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '12,3',
              maxLength: 4,
              value: 12.3
            })).toEqual({
            endsWithDecimalSeparator: true,
            formattedNumber: '12,',
            maxLength: 3,
            value: 12
          });
        });

        it('thousand separator', () => {
          expect(processKey('Backspace',
            2,
            {locale: 'de', decimalSeparator: ','},
            {
              endsWithDecimalSeparator: false,
              formattedNumber: '1.234',
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
  });
});
