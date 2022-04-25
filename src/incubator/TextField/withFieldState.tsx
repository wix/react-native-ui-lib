// TODO: remove this file (was replaced with useFieldState hook)
import React, {useCallback, useState, useEffect, useMemo} from 'react';
import _ from 'lodash';
import hoistStatics from 'hoist-non-react-statics';
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
  /**
   * A single or multiple validator. Can be a string (required, email) or custom function.
   */
  validate?: Validator | Validator[];
}

function withFieldState(
  WrappedComponent: React.ComponentType<
    FieldStateInjectedProps & TextInputProps
  >
) {
  const WithFieldState = ({
    validate,
    validateOnBlur,
    validateOnChange,
    validateOnStart,
    ...props
  }: FieldStateProps) => {
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
          _isValid = validators[validate]?.(valueToValidate);
        }

        setIsValid(_isValid);
      },
      [value]
    );

    const onFocus = useCallback(
      (...args: any) => {
        setIsFocused(true);
        //@ts-expect-error
        props.onFocus?.(...args);
      },
      [props.onFocus]
    );

    const onBlur = useCallback(
      (...args: any) => {
        setIsFocused(false);
        //@ts-expect-error
        props.onBlur?.(...args);
        if (validateOnBlur) {
          validateField();
        }
      },
      [props.onBlur, validateOnBlur, validateField]
    );

    const onChangeText = useCallback(
      (text: string) => {
        setValue(text);
        props.onChangeText?.(text);

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
      />
    );
  };

  hoistStatics(WithFieldState, WrappedComponent);
  WithFieldState.displayName = WrappedComponent.displayName;
  return WithFieldState;
}

export default withFieldState;
