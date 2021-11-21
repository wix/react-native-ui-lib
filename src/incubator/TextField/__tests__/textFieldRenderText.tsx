import React, {useState} from 'react';
import TextField, {TextFieldProps} from '../index';

export default (props: TextFieldProps) => {
  const [value, setValue] = useState(props.value);
  return <TextField {...props} onChangeText={setValue} value={value}/>;
};
