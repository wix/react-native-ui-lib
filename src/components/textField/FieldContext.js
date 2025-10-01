import _noop from "lodash/noop";
import { createContext } from 'react';
const FieldContext = createContext({
  isFocused: false,
  hasValue: false,
  isValid: true,
  failingValidatorIndex: undefined,
  disabled: false,
  readonly: false,
  validateField: _noop,
  checkValidity: () => true,
  isMandatory: false
});
export default FieldContext;