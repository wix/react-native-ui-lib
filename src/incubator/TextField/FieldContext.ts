import {createContext} from 'react';

export type ContextType = {
  value?: string;
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
