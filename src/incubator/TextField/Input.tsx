import React, { useContext } from 'react';
import {TextInput, TextInputProps, StyleSheet, Platform} from 'react-native';
import {ForwardRefInjectedProps} from '../../commons/new';
import {Constants} from '../../helpers'
import FieldContext from './FieldContext';

export interface InputProps extends TextInputProps, React.ComponentPropsWithRef<typeof TextInput> {
  /**
   * A hint text to display when focusing the field
   */
  hint?: string;
}

const Input = ({style, hint, forwardedRef, ...props}: InputProps & ForwardRefInjectedProps) => {
  const context = useContext(FieldContext);
  const placeholder = !context.isFocused ? props.placeholder : (hint || props.placeholder);
  return (
    <TextInput
      style={[styles.input, style]}
      {...props}
      placeholder={placeholder}
      ref={forwardedRef}
      underlineColorAndroid="transparent"
      accessibilityState={{disabled: props.editable === false}}
    />
  );
};


const styles = StyleSheet.create({
  input: {
    textAlign: Constants.isRTL ? 'right' : 'left',
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

Input.displayName = 'Incubator.TextField';
export default Input;
