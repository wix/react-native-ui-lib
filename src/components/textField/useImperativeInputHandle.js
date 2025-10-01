import { useContext, useImperativeHandle, useRef } from 'react';
import { findNodeHandle } from 'react-native';
import FieldContext from "./FieldContext";
const useImperativeInputHandle = (ref, props) => {
  const inputRef = useRef();
  const context = useContext(FieldContext);
  useImperativeHandle(ref, () => {
    return {
      getNodeHandle: () => inputRef.current ? findNodeHandle(inputRef.current) : null,
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