import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

export default ({style, ...props}: TextInputProps) => {
  return <TextInput style={[{flex: 1}, style]} {...props} />;
};
