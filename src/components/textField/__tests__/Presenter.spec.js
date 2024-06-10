import _ from 'lodash';
import Colors from '../../../style/colors';
import * as uut from '../Presenter';

describe('TextField:Presenter', () => {
  describe('get color by state', () => {
    const colorsByState = {
      default: 'purple',
      focus: 'green',
      error: 'orange',
      readonly: 'pink',
      disabled: 'lightblue'
    };

    const defaultContext = {
      isFocused: false,
      hasValue: false,
      isValid: true,
      failingValidatorIndex: undefined,
      disabled: false,
      readonly: false,
      validateField: _.noop,
      checkValidity: () => true,
      isMandatory: false
    };

    it('should return passed color when is a string', () => {
      expect(uut.getColorByState('blue', defaultContext)).toEqual('blue');
    });

    it('should return passed color when is design token', () => {
      expect(uut.getColorByState(Colors.$backgroundDark, defaultContext)).toEqual(Colors.$backgroundDark);
    });

    it('should return textDefault color when color is an empty object', () => {
      expect(uut.getColorByState({}, defaultContext)).toEqual(Colors.$textDefault);
    });

    it('should return textDefault color when no default color passed in color object', () => {
      expect(uut.getColorByState({error: 'red'}, defaultContext)).toEqual(Colors.$textDefault);
    });

    it('should return default color', () => {
      expect(uut.getColorByState(colorsByState, defaultContext)).toEqual(colorsByState.default);
    });

    it('should return focused color', () => {
      const context = {...defaultContext, isFocused: true};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.focus);
    });

    it('should return error color', () => {
      const context = {...defaultContext, isValid: false};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.error);
    });

    it('should return readonly color', () => {
      const context = {...defaultContext, readonly: true};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.readonly);
    });

    it('should return disabled color', () => {
      const context = {...defaultContext, disabled: true};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.disabled);
    });

    it('should return disabled color, over readonly', () => {
      const context = {...defaultContext, disabled: true, readonly: true};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.disabled);
    });

    it('should return disabled color, over error', () => {
      const context = {...defaultContext, disabled: true, isValid: false};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.disabled);
    });

    it('should return disabled color, over focused', () => {
      const context = {...defaultContext, disabled: true, isFocused: false};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.disabled);
    });

    it('should return readonly color, over error', () => {
      const context = {...defaultContext, readonly: true, isValid: false};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.readonly);
    });

    it('should return readonly color, over focused', () => {
      const context = {...defaultContext, readonly: true, isFocused: false};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.readonly);
    });

    it('should return error color, over focused', () => {
      const context = {...defaultContext, isValid: false, isFocused: true};
      expect(uut.getColorByState(colorsByState, context)).toEqual(colorsByState.error);
    });
  });

  describe('validate', () => {
    it('should return true if validator is undefined', () => {
      expect(uut.validate('value', undefined)).toEqual([true, undefined]);
    });

    it('should validate email', () => {
      const validator = 'email';

      expect(uut.validate('value', validator)).toEqual([false, 0]);
      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate('test@mail', validator)).toEqual([false, 0]);
      expect(uut.validate('test@mail.com', validator)).toEqual([true, undefined]);
    });

    it('should validate required', () => {
      const validator = 'required';

      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate(undefined, validator)).toEqual([false, 0]);
      expect(uut.validate('value', validator)).toEqual([true, undefined]);
    });

    it('should validate a function validator', () => {
      const validator = value => value.length > 3;

      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate('abc', validator)).toEqual([false, 0]);
      expect(uut.validate('abcd', validator)).toEqual([true, undefined]);
    });

    it('should validate both required and email', () => {
      const validator = ['required', 'email'];

      expect(uut.validate('', validator)).toEqual([false, 0]);
      expect(uut.validate('value', validator)).toEqual([false, 1]);
      expect(uut.validate('test@mail.com', validator)).toEqual([true, undefined]);
    });
  });

  describe('getValidationMessage', () => {
    it('should return undefined when there is no validationMessage', () => {
      expect(uut.getRelevantValidationMessage(undefined, 0)).toBeUndefined();
    });

    it('should return the validation message when there is no validate method', () => {
      expect(uut.getRelevantValidationMessage('error message', undefined)).toBe('error message');
    });

    it('should return the relevant validation message when there is a single message', () => {
      expect(uut.getRelevantValidationMessage('error message', 0)).toBe('error message');
    });

    it('should return the relevant validation message when there are multiple messages', () => {
      const messages = ['Field is required', 'Email is invalid'];
      expect(uut.getRelevantValidationMessage(messages, 0)).toBe(messages[0]);
      expect(uut.getRelevantValidationMessage(messages, 1)).toBe(messages[1]);
    });
  });

  describe('Should hide placeholder', () => {
    it('should keep it visible when floatingPlaceholder is false', () => {
      expect(uut.shouldHidePlaceholder({floatingPlaceholder: false})).toBe(false);
    });

    it('should hide it when using floatingPlaceholder', () => {
      expect(uut.shouldHidePlaceholder({floatingPlaceholder: true})).toBe(true);
    });

    it('should show it when floatingPlaceholder is true, user passed a hint text, the field is focused and floatOnFocus is true', () => {
      expect(uut.shouldHidePlaceholder({floatingPlaceholder: true, hint: 'Hint text', floatOnFocus: true}, true)).toBe(false);
    });
    
    it('should hide it when floatingPlaceholder is true, user passed a hint text, the field is focused but floatOnFocus is false', () => {
      expect(uut.shouldHidePlaceholder({floatingPlaceholder: true, hint: 'Hint text', floatOnFocus: false}, true)).toBe(true);
    });
  });

  describe('Should float placeholder', () => {
    it('should not float when isFocused is false', () => {
      const props = {floatOnFocus: true};
      const isFocused = false;
      const hasValue = undefined;
      const value = undefined;
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(false);
    });

    it('should not float when isFocused is false', () => {
      const props = {floatOnFocus: false};
      const isFocused = true;
      const hasValue = undefined;
      const value = undefined;
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(false);
    });

    it('should float when floatOnFocus and isFocused is true', () => {
      const props = {floatOnFocus: true};
      const isFocused = true;
      const hasValue = undefined;
      const value = undefined;
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(true);
    });

    it('should float when hasValue is true', () => {
      const props = {floatOnFocus: false};
      const isFocused = false;
      const hasValue = true;
      const value = undefined;
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(true);
    });

    it('should not float when hasValue is false', () => {
      const props = {floatOnFocus: false};
      const isFocused = false;
      const hasValue = false;
      const value = undefined;
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(false);
    });

    it('should float when defaultValue and value is undefined', () => {
      const props = {floatOnFocus: false, defaultValue: 'default value'};
      const isFocused = false;
      const hasValue = false;
      const value = undefined;
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(true);
    });

    it('should not float when defaultValue and value', () => {
      const props = {floatOnFocus: false, defaultValue: 'default value'};
      const isFocused = false;
      const hasValue = false;
      const value = 'value';
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(false);
    });

    it('should not float when no defaultValue and value', () => {
      const props = {floatOnFocus: false, defaultValue: undefined};
      const isFocused = false;
      const hasValue = false;
      const value = 'value';
      expect(uut.shouldPlaceholderFloat(props, isFocused, hasValue, value)).toBe(false);
    });
  });
});
