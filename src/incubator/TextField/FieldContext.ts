import _ from 'lodash';
import {createContext} from 'react';

export type FieldContextType = {
  value?: string;
  isFocused: boolean;
  hasValue: boolean;
  isValid: boolean;
  failingValidatorIndex?: number;
  disabled: boolean;
  validateField: () => void
};

const FieldContext = createContext<FieldContextType>({
  isFocused: false,
  hasValue: false,
  isValid: true,
  failingValidatorIndex: undefined,
  disabled: false,
  validateField: _.noop
});

export default FieldContext;
