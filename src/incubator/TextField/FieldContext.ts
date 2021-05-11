import {createContext} from 'react';

export type FieldContextType = {
  value?: string;
  isFocused: boolean;
  hasValue: boolean;
  isValid: boolean;
  failingValidatorIndex?: number;
  disabled: boolean;
};

const FieldContext = createContext<FieldContextType>({
  isFocused: false,
  hasValue: false,
  isValid: true,
  failingValidatorIndex: undefined,
  disabled: false
});

export default FieldContext;
