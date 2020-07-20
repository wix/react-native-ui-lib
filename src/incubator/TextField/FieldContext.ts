import {createContext} from 'react';

export type ContextType = {
  isFocused: boolean;
  hasValue: boolean;
  disabled: boolean;
};

const FieldContext = createContext<ContextType>({
  isFocused: false,
  hasValue: false,
  disabled: false
});

export default FieldContext;
