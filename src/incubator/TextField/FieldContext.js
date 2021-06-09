import React, { createContext } from 'react';
const FieldContext = createContext({
  isFocused: false,
  hasValue: false,
  isValid: true,
  failingValidatorIndex: undefined,
  disabled: false
});
export default FieldContext;