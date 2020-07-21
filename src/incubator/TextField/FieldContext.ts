import {createContext} from 'react';

export type ContextType = {
  isFocused: boolean;
  hasValue: boolean;
  isValid: boolean;
  disabled: boolean;
};

const FieldContext = createContext<ContextType>({
  isFocused: false,
  hasValue: false,
  isValid: true,
  disabled: false
});

export default FieldContext;
