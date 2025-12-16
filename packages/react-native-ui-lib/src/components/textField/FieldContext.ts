import _ from 'lodash';
import {createContext} from 'react';
import {FieldContextType} from './types';

const FieldContext = createContext<FieldContextType>({
  isFocused: false,
  hasValue: false,
  isValid: true,
  failingValidatorIndex: undefined,
  disabled: false,
  readonly: false,
  validateField: _.noop,
  checkValidity: () => true,
  isMandatory: false
});

export default FieldContext;
