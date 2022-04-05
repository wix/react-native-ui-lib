import React, {useContext} from 'react';
import {TextInput, StyleSheet, Platform} from 'react-native';
import {Constants, ForwardRefInjectedProps} from '../../commons/new';
import {InputProps, ColorType} from './types';
import {getColorByState} from './Presenter';
import {Colors} from '../../style';
import FieldContext from './FieldContext';
import useImperativeInputHandle from './useImperativeInputHandle';

const DEFAULT_INPUT_COLOR: ColorType = {
  default: Colors.$textDefault,
  disabled: Colors.$textDisabled
};

const Input = ({
  style,
  hint,
  color = DEFAULT_INPUT_COLOR,
  forwardedRef,
  formatter,
  ...props
}: InputProps & ForwardRefInjectedProps) => {
  const inputRef = useImperativeInputHandle(forwardedRef, {onChangeText: props.onChangeText});
  const context = useContext(FieldContext);
  const placeholder = !context.isFocused ? props.placeholder : hint || props.placeholder;
  const inputColor = getColorByState(color, context);
  const placeholderTextColor = getColorByState(props.placeholderTextColor, context);

  const value = formatter && !context.isFocused ? formatter(props.value) : props.value;

  return (
    <TextInput
      style={[styles.input, !!inputColor && {color: inputColor}, style]}
      {...props}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      // @ts-expect-error
      ref={inputRef}
      underlineColorAndroid="transparent"
      accessibilityState={{disabled: props.editable === false}}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
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
