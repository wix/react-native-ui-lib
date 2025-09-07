import React, { useContext, useMemo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { TextInput as RNTextInput } from "./textInput";
import { Constants } from "../../commons/new";
import { getColorByState } from "./Presenter";
import { Colors } from "../../style";
import FieldContext from "./FieldContext";
import useImperativeInputHandle from "./useImperativeInputHandle";
const Input = ({
  // (!) extract flex prop to avoid passing them on Android
  // TODO: extract alignment (top, right, ...) props till we manage to exclude them from typings
  /* eslint-disable */
  // @ts-ignore (does not exist on props)
  flex,
  // @ts-ignore
  left,
  // @ts-ignore
  top,
  // @ts-ignore
  right,
  // @ts-ignore
  bottom,
  /* eslint-enable */
  style,
  hint,
  color = {
    default: Colors.$textDefault,
    disabled: Colors.$textDisabled,
    readonly: Colors.$textNeutral
  },
  forwardedRef,
  formatter,
  useGestureHandlerInput,
  readonly,
  recorderTag,
  pointerEvents,
  showMandatoryIndication,
  ...props
}) => {
  const inputRef = useImperativeInputHandle(forwardedRef, {
    onChangeText: props.onChangeText
  });
  const context = useContext(FieldContext);
  const placeholder = !context.isFocused ? props.placeholder : hint || props.placeholder;
  const inputColor = getColorByState(color, context);
  const placeholderTextColor = getColorByState(props.placeholderTextColor, context);
  const value = formatter && !context.isFocused ? formatter(props.value) : props.value;
  const disabled = props.editable === false || readonly;
  const shouldRenderIndication = context.isMandatory && showMandatoryIndication;
  const TextInput = useMemo(() => {
    if (useGestureHandlerInput) {
      const {
        TextInput: GestureTextInput
      } = require('react-native-gesture-handler');
      return GestureTextInput;
    } else {
      return RNTextInput;
    }
  }, [useGestureHandlerInput]);
  return <TextInput fsTagName={recorderTag} style={[styles.input, !!inputColor && {
    color: inputColor
  }, style, Constants.isWeb && styles.webStyle]} {...props} editable={!disabled} value={value} placeholder={shouldRenderIndication ? placeholder?.concat('*') : placeholder} placeholderTextColor={placeholderTextColor}
  // @ts-expect-error
  ref={inputRef} underlineColorAndroid="transparent" accessibilityState={{
    disabled
  }} pointerEvents={disabled ? 'none' : pointerEvents} />;
};
const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    textAlign: Constants.isRTL ? 'right' : undefined,
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
  },
  webStyle: {
    // @ts-expect-error
    outlineWidth: 0
  }
});
Input.displayName = 'Incubator.TextField';
export default Input;