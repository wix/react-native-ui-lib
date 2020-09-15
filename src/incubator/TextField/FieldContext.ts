import {createContext} from 'react';

export type ContextType = {
  value?: string;
  isFocused: boolean;
  hasValue: boolean;
  isValid: boolean;
  failingValidatorIndex?: number;
  disabled: boolean;
};

const FieldContext = createContext<ContextType>({
  isFocused: false,
  hasValue: false,
  isValid: true,
  failingValidatorIndex: undefined,
  disabled: false
});

export default FieldContext;
