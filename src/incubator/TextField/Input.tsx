import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

const Input = ({style, ...props}: TextInputProps, ref) => {
  return <TextInput style={[{flex: 1}, style]} {...props} ref={ref} />;
};

export default React.forwardRef(Input);
