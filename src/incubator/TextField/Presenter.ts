import _ from 'lodash';
import {Colors} from './../../style';
import {ContextType} from './FieldContext';
import {ColorType, Validator} from './types';
import formValidators from './validators';

export function getColorByState(color: ColorType, context?: ContextType) {
  let finalColor: string | undefined = Colors.grey10;
  if (_.isString(color)) {
    finalColor = color;
  } else if (_.isPlainObject(color)) {
    if (context?.disabled) {
      finalColor = color?.disabled;
    } else if (!context?.isValid) {
      finalColor = color?.error;
    } else if (context?.isFocused) {
      finalColor = color?.focus;
    } else {
      finalColor = color?.default;
    }
  }

  return finalColor;
}

export function validate(
  value: string | undefined,
  validator?: Validator | Validator[]
): [boolean, number | undefined] {
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
      _isValid = _.invoke(formValidators, validator, value);
    }

    if (!_isValid) {
      _failingValidatorIndex = index;
      return false;
    }
  });

  return [_isValid, _failingValidatorIndex];
}

export function getRelevantValidationMessage(
  validationMessage: string | string[] | undefined,
  failingValidatorIndex: undefined | number
) {
  if (
    _.isUndefined(failingValidatorIndex) ||
    _.isUndefined(validationMessage)
  ) {
    return;
  }

  if (_.isString(validationMessage)) {
    return validationMessage;
  } else if (_.isArray(validationMessage)) {
    return validationMessage[failingValidatorIndex];
  }
}
