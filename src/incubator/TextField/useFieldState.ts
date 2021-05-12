import {useCallback, useState, useEffect, useMemo} from 'react';
import _ from 'lodash';
import * as Presenter from './Presenter';
import {useDidUpdate} from 'hooks';
import {Validator} from './types';
import {InputProps} from './Input';


export interface FieldStateProps extends InputProps {
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  /**
   * A single or multiple validator. Can be a string (required, email) or custom function.
   */
  validate?: Validator | Validator[];
  /**
   * Callback for when field validity has changed
   */
  onChangeValidity?: (isValid: boolean) => void
}

export default function useFieldState({
  validate,
  validateOnBlur,
  validateOnChange,
  validateOnStart,
  onChangeValidity,
  ...props
}: FieldStateProps) {
  const [value, setValue] = useState(props.value);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [failingValidatorIndex, setFailingValidatorIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (validateOnStart) {
      validateField();
    }
  }, []);

  useDidUpdate(() => {
    onChangeValidity?.(isValid);
  }, [isValid]);

  const validateField = useCallback((valueToValidate = value) => {
    const [_isValid, _failingValidatorIndex] = Presenter.validate(valueToValidate, validate);

    setIsValid(_isValid);
    setFailingValidatorIndex(_failingValidatorIndex);
  },
  [value, validate]);

  const onFocus = useCallback((...args: any) => {
    setIsFocused(true);
    _.invoke(props, 'onFocus', ...args);
  },
  [props.onFocus]);

  const onBlur = useCallback((...args: any) => {
    setIsFocused(false);
    _.invoke(props, 'onBlur', ...args);
    if (validateOnBlur) {
      validateField();
    }
  },
  [props.onBlur, validateOnBlur, validateField]);

  const onChangeText = useCallback(text => {
    setValue(text);
    _.invoke(props, 'onChangeText', text);

    if (validateOnChange) {
      validateField(text);
    }
  },
  [props.onChangeText, validateOnChange, validateField]);

  const fieldState = useMemo(() => {
    return {value, hasValue: !_.isEmpty(value), isValid, isFocused, failingValidatorIndex};
  }, [value, isFocused, isValid, failingValidatorIndex]);

  return {
    onFocus,
    onBlur,
    onChangeText,
    fieldState
  };
}
