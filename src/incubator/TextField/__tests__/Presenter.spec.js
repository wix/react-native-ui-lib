import * as uut from '../Presenter';

describe('TextField:Presenter', () => {
  describe('validate', () => {
    it('should return true if validator is undefined', () => {
      expect(uut.validate('value', undefined)).toEqual([true, undefined]);
    });

    it('should validate email', () => {
      const validator = 'email';

      expect(uut.validate('value', validator)).toEqual([false, 0]);
      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate('test@mail', validator)).toEqual([false, 0]);
      expect(uut.validate('test@mail.com', validator)).toEqual([
        true,
        undefined
      ]);
    });

    it('should validate required', () => {
      const validator = 'required';

      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate(undefined, validator)).toEqual([false, 0]);
      expect(uut.validate('value', validator)).toEqual([true, undefined]);
    });

    it('should validate a function validator', () => {
      const validator = (value) => value.length > 3;

      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate('abc', validator)).toEqual([false, 0]);
      expect(uut.validate('abcd', validator)).toEqual([true, undefined]);
    });

    it('should validate both required and email', () => {
      const validator = ['required', 'email'];

      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate('value', validator)).toEqual([false, 1]);
      expect(uut.validate('test@mail.com', validator)).toEqual([
        true,
        undefined
      ]);
    });
  });

  describe('getValidationMessage', () => {
    it('should return undefined when there is no validationMessage', () => {
      expect(uut.getRelevantValidationMessage(undefined, 0)).toBeUndefined();
    });

    it('should return the relevant validation message when there is a single message', () => {
      expect(uut.getRelevantValidationMessage('error message', 0)).toBe(
        'error message'
      );
      expect(
        uut.getRelevantValidationMessage('error message', undefined)
      ).toBeUndefined();
    });

    it('should return the relevant validation message when there are multiple messages', () => {
      const messages = ['Field is required', 'Email is invalid'];
      expect(uut.getRelevantValidationMessage(messages, 0)).toBe(messages[0]);
      expect(uut.getRelevantValidationMessage(messages, 1)).toBe(messages[1]);
      expect(
        uut.getRelevantValidationMessage(messages, undefined)
      ).toBeUndefined();
    });
  });
});
