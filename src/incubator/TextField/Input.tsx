import React, { useContext } from 'react';
import {TextInput, TextInputProps, StyleSheet, Platform} from 'react-native';
import FieldContext from './FieldContext';

export interface InputProps extends TextInputProps {
  hint?: string;
}

const Input = ({style, hint, ...props}: InputProps, ref: any) => {
  const context = useContext(FieldContext);
  const placeholder = !context.isFocused ? props.placeholder : (hint || props.placeholder);
  return (
    <TextInput
      style={[styles.input, style]}
      {...props}
      placeholder={placeholder}
      ref={ref}
      underlineColorAndroid="transparent"
    />
  );
};

export default React.forwardRef(Input);

const styles = StyleSheet.create({
  input: {
    // Setting paddingTop/Bottom separately fix height issues on iOS with multiline
    paddingTop: 0,
    paddingBottom: 0,
    ...Platform.select({
      // This reset android input inner spacing
      android: {
        padding: 0,
        textAlignVertical: 'center'
      }
    })
  }
});
