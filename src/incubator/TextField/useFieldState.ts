import {useCallback, useState, useEffect, useMemo} from 'react';
import {TextInputProps} from 'react-native';
import _ from 'lodash';
import validators from './validators';

export type Validator = Function | keyof typeof validators;

export interface FieldStateProps extends TextInputProps {
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  /**
   * A single or multiple validator. Can be a string (required, email) or custom function.
   */
  validate?: Validator | Validator[];
}

export default function useFieldState({
  validate,
  validateOnBlur,
  validateOnChange,
  validateOnStart,
  ...props
}: FieldStateProps) {
  const [value, setValue] = useState(props.value);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (validateOnStart) {
      validateField();
    }
  }, []);

  const validateField = useCallback(
    (valueToValidate = value) => {
      let _isValid = true;
      if (_.isFunction(validate)) {
        _isValid = validate(valueToValidate);
      } else if (_.isString(validate)) {
        _isValid = _.invoke(validators, validate, valueToValidate);
      }

      setIsValid(_isValid);
    },
    [value, validate]
  );

  const onFocus = useCallback(
    (...args: any) => {
      setIsFocused(true);
      _.invoke(props, 'onFocus', ...args);
    },
    [props.onFocus]
  );

  const onBlur = useCallback(
    (...args: any) => {
      setIsFocused(false);
      _.invoke(props, 'onBlur', ...args);
      if (validateOnBlur) {
        validateField();
      }
    },
    [props.onBlur, validateOnBlur, validateField]
  );

  const onChangeText = useCallback(
    (text) => {
      setValue(text);
      _.invoke(props, 'onChangeText', text);

      if (validateOnChange) {
        validateField(text);
      }
    },
    [props.onChangeText, validateOnChange, validateField]
  );

  const fieldState = useMemo(() => {
    return {value, hasValue: !_.isEmpty(value), isValid, isFocused};
  }, [value, isFocused, isValid]);

  return {
    onFocus,
    onBlur,
    onChangeText,
    fieldState
  };
}
