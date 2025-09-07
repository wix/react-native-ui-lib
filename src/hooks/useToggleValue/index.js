import _isBoolean from "lodash/isBoolean";
import { useState, useRef } from 'react';
const useToggleValue = (initial, second) => {
  const initialValue = useRef(initial).current;
  const secondValue = useRef(second).current;
  const [value, setValue] = useState(initial);
  const toggle = () => {
    if (_isBoolean(initialValue)) {
      setValue(!initialValue);
    } else if (value === initialValue) {
      setValue(secondValue);
    } else {
      setValue(initialValue);
    }
  };
  return [value, toggle, setValue];
};
export default useToggleValue;