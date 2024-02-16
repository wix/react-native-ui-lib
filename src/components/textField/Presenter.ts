import _ from 'lodash';
import {Colors} from '../../style';
import {ColorType, Validator, FieldContextType, FloatingPlaceholderProps} from './types';
// TODO: Fix this import after moving all TextField types to a single file after we move to the new docs
import {TextFieldProps} from './index';
import formValidators from './validators';

export function getColorByState(color?: ColorType, context?: FieldContextType) {
  let finalColor: string | undefined;
  if (_.isString(color)) {
    finalColor = color;
  } else if (Colors.isDesignToken(color)) {
    finalColor = color?.toString();
  } else if (_.isPlainObject(color)) {
    if (context?.disabled) {
      finalColor = color?.disabled;
    } else if (context?.readonly) {
      finalColor = color?.readonly;
    } else if (!context?.isValid) {
      finalColor = color?.error;
    } else if (context?.isFocused) {
      finalColor = color?.focus;
    }

    finalColor = finalColor || color?.default || Colors.$textDefault;
  }
  return finalColor;
}

export function validate(value?: string, validator?: Validator | Validator[]): [boolean, number?] {
  if (_.isUndefined(validator)) {
    return [true, undefined];
  }

  let _isValid = true;
  let _failingValidatorIndex;
  const _validators = _.isArray(validator) ? validator : [validator];

  _.forEach(_validators, (validator: Validator, index) => {
    if (_.isFunction(validator)) {
      _isValid = validator(value);
    } else if (_.isString(validator)) {
      _isValid = formValidators[validator]?.(value || '');
    }

    if (!_isValid) {
      _failingValidatorIndex = index;
      return false;
    }
  });

  return [_isValid, _failingValidatorIndex];
}

export function getRelevantValidationMessage(validationMessage: string | string[] | undefined,
  failingValidatorIndex: undefined | number) {
  if (_.isUndefined(failingValidatorIndex)) {
    return validationMessage;
  } else if (_.isUndefined(validationMessage)) {
    return;
  }

  if (_.isString(validationMessage)) {
    return validationMessage;
  } else if (_.isArray(validationMessage)) {
    return validationMessage[failingValidatorIndex];
  }
}

export function shouldHidePlaceholder({floatingPlaceholder, hint, floatOnFocus}: TextFieldProps, isFocused: boolean) {
  if (floatingPlaceholder) {
    if (hint && isFocused) {
      return !floatOnFocus;
    }
    return true;
  } else {
    return false;
  }
}

export function shouldPlaceholderFloat({defaultValue, floatOnFocus}: FloatingPlaceholderProps,
  isFocused: boolean,
  hasValue: boolean,
  value?: string) {
  const useDefaultValue = !_.isEmpty(defaultValue) && value === undefined; // To consider a user that has deleted the defaultValue (and then the placeholder should un-float when losing focus)
  return (floatOnFocus && isFocused) || hasValue || useDefaultValue;
}
