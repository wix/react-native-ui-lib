import _pt from "prop-types";
import React, { useContext } from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { getColorByState } from "./Presenter";
import { Colors } from "../../style";
import { Constants } from "../../helpers";
import FieldContext from "./FieldContext";
const DEFAULT_INPUT_COLOR = {
  default: Colors.grey10,
  disabled: Colors.grey40
};

const Input = ({
  style,
  hint,
  color = DEFAULT_INPUT_COLOR,
  forwardedRef,
  ...props
}) => {
  const context = useContext(FieldContext);
  const placeholder = !context.isFocused ? props.placeholder : hint || props.placeholder;
  const inputColor = getColorByState(color, context);
  const placeholderTextColor = getColorByState(props.placeholderTextColor, context);
  return <TextInput style={[styles.input, !!inputColor && {
    color: inputColor
  }, style]} {...props} placeholder={placeholder} placeholderTextColor={placeholderTextColor} ref={forwardedRef} underlineColorAndroid="transparent" accessibilityState={{
    disabled: props.editable === false
  }} />;
};

Input.propTypes = {
  /**
     * A hint text to display when focusing the field
     */
  hint: _pt.string
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