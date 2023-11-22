import React, {useContext, useImperativeHandle, useRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import FieldContext from './FieldContext';

const useImperativeInputHandle = (ref: React.Ref<any>, props: Pick<TextInputProps, 'onChangeText'>) => {
  const inputRef = useRef<TextInput>();
  const context = useContext(FieldContext);
  useImperativeHandle(ref, () => {
    return {
      isFocused: () => inputRef.current?.isFocused(),
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => {
        inputRef.current?.clear();
        // NOTE: This fixes an RN issue - when triggering imperative clear method, it doesn't call onChangeText
        props.onChangeText?.('');
      },
      validate: () => {
        return context.validateField();
      },
      // Note: This returns field validity without actually validating it
      isValid: () => {
        return context.checkValidity();
      }
    };
  });

  return inputRef;
};

export default useImperativeInputHandle;
