import React, {useCallback, useState} from 'react';
import _ from 'lodash';
import {TextInputProps} from 'react-native';
import validators from './validators';

export type Validator = Function | keyof typeof validators;

export interface FieldState {
  isFocused: boolean;
  isValid: boolean;
  onFocus: Function;
  onBlur: Function;
}

export interface FieldStateProps extends TextInputProps {
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validate: Validator | Validator[];
}

function withFieldState<PROPS>(WrappedComponent: React.ComponentType) {
  const WithFieldState = (
    {
      validate,
      validateOnBlur,
      validateOnChange,
      validateOnStart,
      ...props
    }: PROPS & FieldStateProps,
    ref
  ) => {
    const [value, setValue] = useState(props.value);
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const validateField = useCallback(() => {
      let _isValid = true;
      if (_.isFunction(validate)) {
        _isValid = validate(value);
      } else if (_.isString(validate)) {
        _isValid = _.invoke(validators, validate, value);
      }

      setIsValid(_isValid);
    }, [value]);

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
      [onBlur, validateOnBlur, validateField]
    );

    const onChangeText = useCallback(
      (text) => {
        setValue(text);
        _.invoke(props, 'onChangeText', text);
      },
      [props.onChangeText]
    );

    return (
      <WrappedComponent
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        isFocused={isFocused}
        isValid={isValid}
        ref={ref}
      />
    );
  };

  return React.forwardRef(WithFieldState);
}

export default withFieldState;
