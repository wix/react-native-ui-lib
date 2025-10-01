import _isEmpty from "lodash/isEmpty";
import React, { useMemo, useCallback, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDidUpdate, useThemeProps } from "../../hooks";
import { Colors } from "../../style";
import MaskedInput from "../maskedInput/new";
import TextField from "../textField";
import View from "../view";
import Text from "../text";
import { parseInput, generateOptions, getInitialNumber, NumberInputData } from "./Presenter";
export { NumberInputData };
function NumberInput(props, ref) {
  const themeProps = useThemeProps(props, 'NumberInput');
  const {
    textFieldProps,
    onChangeNumber,
    initialNumber: propsInitialNumber,
    fractionDigits = 2,
    // @ts-expect-error
    locale = 'en',
    containerStyle,
    contextMenuHidden = true,
    leadingText,
    leadingTextStyle,
    trailingText,
    trailingTextStyle,
    testID
  } = themeProps;
  const [options, setOptions] = useState(generateOptions(locale, fractionDigits));
  const initialNumber = getInitialNumber(propsInitialNumber, options);
  const [data, setData] = useState(parseInput(`${initialNumber}`, options, propsInitialNumber));
  const textField = useRef();
  const [isFocused, setIsFocused] = useState(textFieldProps?.autoFocus ?? false);
  useDidUpdate(() => {
    setOptions(generateOptions(locale, fractionDigits));
  }, [locale, fractionDigits]);
  const handleInitialValueChange = () => {
    const newData = parseInput(`${initialNumber}`, options, propsInitialNumber);
    onChangeNumber(newData);
    setData(newData);
  };
  useDidUpdate(() => {
    handleInitialValueChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNumber]);
  const processInput = useCallback(text => {
    const newData = parseInput(text, options);
    onChangeNumber(newData);
    setData(newData);
  }, [onChangeNumber, options]);
  useDidUpdate(() => {
    if (data?.type === 'valid') {
      // 1. This will not work properly for changing locale
      // 2. This will not work properly for changing fractionDigits with only an initialNumber
      processInput(data.userInput);
    }
  }, [options]);
  const hasText = useMemo(() => {
    // Render (none or) both leading and trailing accessories together for flexness (especially when validation message is long)
    return !_isEmpty(leadingText) || !_isEmpty(trailingText);
  }, [leadingText, trailingText]);
  const leadingAccessory = useMemo(() => {
    if (hasText) {
      return <Text style={[styles.accessory, {
        textAlign: 'right'
      }, leadingTextStyle]}>{leadingText}</Text>;
    }
  }, [hasText, leadingText, leadingTextStyle]);
  const trailingAccessory = useMemo(() => {
    if (hasText) {
      return <Text style={[styles.accessory, trailingTextStyle]}>{trailingText}</Text>;
    }
  }, [hasText, trailingText, trailingTextStyle]);
  const onChangeText = useCallback(async text => {
    processInput(text);
  }, [processInput]);
  const formatter = useCallback(() => {
    return data?.type === 'valid' ? data.formattedNumber : data?.type === 'error' ? data.userInput : '';
  }, [data]);
  const onBlur = useCallback(() => {
    setIsFocused(false);
    if (textFieldProps?.validateOnBlur) {
      textField.current?.validate();
    }
  }, [textFieldProps?.validateOnBlur]);
  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const dynamicFieldStyle = useCallback(() => {
    return isFocused ? {
      borderBottomColor: Colors.$outlinePrimary
    } : undefined;
  }, [isFocused]);
  const renderNumberInput = useCallback(value => {
    return <View row style={containerStyle}>
        <TextField {...textFieldProps}
      // @ts-expect-error
      ref={textField} testID={`${testID}.visual`} value={value} formatter={formatter} dynamicFieldStyle={dynamicFieldStyle} floatingPlaceholder={false} leadingAccessory={leadingAccessory} trailingAccessory={trailingAccessory} containerStyle={[styles.textFieldContainerStyle, textFieldProps?.containerStyle]} keyboardType={'numeric'} autoFocus={false} />
      </View>;
  }, [containerStyle, dynamicFieldStyle, formatter, leadingAccessory, textFieldProps, trailingAccessory, testID]);
  return <MaskedInput testID={testID} ref={ref} maxLength={textFieldProps?.maxLength} renderMaskedText={renderNumberInput} keyboardType={'numeric'} initialValue={initialNumber ? `${initialNumber}` : undefined} onChangeText={onChangeText} contextMenuHidden={contextMenuHidden} onBlur={onBlur} onFocus={onFocus} editable={textFieldProps?.editable} autoFocus={textFieldProps?.autoFocus} />;
}
export default React.forwardRef(NumberInput);
const styles = StyleSheet.create({
  textFieldContainerStyle: {
    flexShrink: 1
  },
  accessory: {
    flexGrow: 999
  }
});