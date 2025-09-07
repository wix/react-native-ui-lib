import _isEmpty from "lodash/isEmpty";
import _isFunction from "lodash/isFunction";
import _forEach from "lodash/forEach";
import _isArray from "lodash/isArray";
import _isUndefined from "lodash/isUndefined";
import _isPlainObject from "lodash/isPlainObject";
import _isString from "lodash/isString";
import { Colors } from "../../style";

// TODO: Fix this import after moving all TextField types to a single file after we move to the new docs

import formValidators from "./validators";
export function getColorByState(color, context) {
  let finalColor;
  if (_isString(color)) {
    finalColor = color;
  } else if (Colors.isDesignToken(color)) {
    finalColor = color?.toString();
  } else if (_isPlainObject(color)) {
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
export function validate(value, validator) {
  if (_isUndefined(validator)) {
    return [true, undefined];
  }
  let _isValid = true;
  let _failingValidatorIndex;
  const _validators = _isArray(validator) ? validator : [validator];
  _forEach(_validators, (validator, index) => {
    if (_isFunction(validator)) {
      _isValid = validator(value);
    } else if (_isString(validator)) {
      _isValid = formValidators[validator]?.(value || '');
    }
    if (!_isValid) {
      _failingValidatorIndex = index;
      return false;
    }
  });
  return [_isValid, _failingValidatorIndex];
}
export function getRelevantValidationMessage(validationMessage, failingValidatorIndex) {
  if (_isUndefined(failingValidatorIndex)) {
    return validationMessage;
  } else if (_isUndefined(validationMessage)) {
    return;
  }
  if (_isString(validationMessage)) {
    return validationMessage;
  } else if (_isArray(validationMessage)) {
    return validationMessage[failingValidatorIndex];
  }
}
export function shouldHidePlaceholder({
  floatingPlaceholder,
  hint,
  floatOnFocus
}, isFocused) {
  if (floatingPlaceholder) {
    if (hint && isFocused) {
      return !floatOnFocus;
    }
    return true;
  } else {
    return false;
  }
}
export function shouldPlaceholderFloat({
  defaultValue,
  floatOnFocus
}, isFocused, hasValue, value) {
  const useDefaultValue = !_isEmpty(defaultValue) && value === undefined; // To consider a user that has deleted the defaultValue (and then the placeholder should un-float when losing focus)
  return floatOnFocus && isFocused || hasValue || useDefaultValue;
}