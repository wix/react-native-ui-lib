import React, {useCallback, useState, useEffect, useMemo} from 'react';
import _ from 'lodash';
import {TextInputProps} from 'react-native';
import validators from './validators';

export type Validator = Function | keyof typeof validators;

interface FieldState {
  value?: string;
  isFocused: boolean;
  isValid: boolean;
  hasValue: boolean;
}

export interface FieldStateInjectedProps {
  fieldState: FieldState;
  onFocus: Function;
  onBlur: Function;
  ref?: any;
}

export interface FieldStateProps extends TextInputProps {
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validate?: Validator | Validator[];
}


function withFieldState<PROPS>(WrappedComponent: React.ComponentType<FieldStateInjectedProps & TextInputProps>): React.ComponentType<PROPS> {
  const WithFieldState = (
    {
      validate,
      validateOnBlur,
      validateOnChange,
      validateOnStart,
      ...props
    }: FieldStateProps,
    ref: any
  ) => {
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
      [value]
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
      [props.onChangeText, validateOnChange]
    );

    const fieldState = useMemo(() => {
      return {value, hasValue: !_.isEmpty(value), isValid, isFocused};
    }, [value, isFocused, isValid]);

    return (
      <WrappedComponent
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        fieldState={fieldState}
        ref={ref}
      />
    );
  };

  return React.forwardRef(WithFieldState) as any;
}

export default withFieldState;
