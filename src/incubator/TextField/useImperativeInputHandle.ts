import React, {useContext, useImperativeHandle, useRef} from 'react';
import {TextInput} from 'react-native';
import FieldContext from './FieldContext';

const useImperativeInputHandle = (ref: React.Ref<any>) => {
  const inputRef = useRef<TextInput>();
  const context = useContext(FieldContext);
  useImperativeHandle(ref, () => {
    return {
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
      validate: () => {
        context.validateField();
      }
    };
  });

  return inputRef;
};

export default useImperativeInputHandle;
