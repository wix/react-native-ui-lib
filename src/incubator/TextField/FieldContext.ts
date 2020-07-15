import {createContext} from 'react';

export type ContextType = {
  isFocused: boolean;
  disabled: boolean;
};

const FieldContext = createContext<ContextType>({
  isFocused: false,
  disabled: false
});

export default FieldContext;
