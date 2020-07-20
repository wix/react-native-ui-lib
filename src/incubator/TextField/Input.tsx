import React from 'react';
import {TextInput, TextInputProps, StyleSheet, Platform} from 'react-native';

const Input = ({style, ...props}: TextInputProps, ref) => {
  return (
    <TextInput
      style={[styles.input, style]}
      {...props}
      ref={ref}
      underlineColorAndroid="transparent"
    />
  );
};

export default React.forwardRef(Input);

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      // This reset android input inner spacing
      android: {
        padding: 0,
        textAlignVertical: 'center'
      }
    })
  }
});
