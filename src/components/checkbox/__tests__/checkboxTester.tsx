import React, {useState, useCallback} from 'react';
import Checkbox, {CheckboxProps} from '../index';
export const testID = 'checkbox';

export default (props: CheckboxProps) => {
  const {value, onValueChange, ...others} = props;

  const [_value, _setValue] = useState(value);
  const _onValueChange = useCallback(newValue => {
    _setValue(newValue);
    onValueChange?.(newValue);
  },
  [_setValue, onValueChange]);

  return <Checkbox {...others} onValueChange={_onValueChange} value={_value} testID={testID}/>;
};
