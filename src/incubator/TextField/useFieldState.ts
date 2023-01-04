import {useCallback, useState, useEffect, useMemo} from 'react';
import _ from 'lodash';
import * as Presenter from './Presenter';
import {useDidUpdate} from 'hooks';
import {FieldStateProps} from './types';
import {Constants} from '../../commons/new';

export default function useFieldState({
  validate,
  validationMessage,
  validateOnBlur,
  validateOnChange,
  validateOnStart,
  onChangeValidity,
  ...props
}: FieldStateProps) {
  const [value, setValue] = useState(props.value ?? props.defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [failingValidatorIndex, setFailingValidatorIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (Constants.isWeb && !props.value && props.defaultValue && props.defaultValue !== value) {
      setValue(props.defaultValue);

      if (validateOnChange) {
        validateField(props.defaultValue);
      }
    }

    /* On purpose listen only to props.defaultValue change */
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [props.defaultValue, validateOnChange]);

  useEffect(() => {
    if (validateOnStart) {
      validateField();
    }
  }, []);

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value);

      if (validateOnChange) {
        validateField(props.value);
      }
    }
    /* On purpose listen only to props.value change */
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [props.value, validateOnChange]);

  useDidUpdate(() => {
    if (!_.isUndefined(isValid)) {
      onChangeValidity?.(isValid);
    }
  }, [isValid]);

  const checkValidity = useCallback((valueToValidate = value) => {
    const [_isValid] = Presenter.validate(valueToValidate, validate);
    return _isValid;
  }, [value, validate]);

  const validateField = useCallback((valueToValidate = value) => {
    const [_isValid, _failingValidatorIndex] = Presenter.validate(valueToValidate, validate);

    setIsValid(_isValid);
    setFailingValidatorIndex(_failingValidatorIndex);

    return _isValid;
  },
  [value, validate]);

  const onFocus = useCallback((...args: any) => {
    setIsFocused(true);
    //@ts-expect-error
    props.onFocus?.(...args);
  },
  [props.onFocus]);

  const onBlur = useCallback((...args: any) => {
    setIsFocused(false);
    //@ts-expect-error
    props.onBlur?.(...args);
    if (validateOnBlur) {
      validateField();
    }
  },
  [props.onBlur, validateOnBlur, validateField]);

  const onChangeText = useCallback((text: string) => {
    setValue(text);
    props.onChangeText?.(text);

    if (validateOnChange) {
      validateField(text);
    }
  },
  [props.onChangeText, validateOnChange, validateField]);

  const fieldState = useMemo(() => {
    return {
      value,
      hasValue: !_.isEmpty(value),
      isValid: validationMessage && !validate ? false : isValid ?? true,
      isFocused,
      failingValidatorIndex
    };
  }, [value, isFocused, isValid, failingValidatorIndex, validationMessage, validate]);

  return {
    onFocus,
    onBlur,
    onChangeText,
    fieldState,
    validateField,
    checkValidity
  };
}
