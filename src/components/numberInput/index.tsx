import {isEmpty} from 'lodash';
import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {StyleSheet, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
import {useDidUpdate} from 'hooks';
import TextField, {TextFieldProps} from '../../incubator/TextField';
import Text, {TextProps} from '../text';
import {getInitialResult, parseInput, generateOptions, Options, NumberInputResult} from './Presenter';

export {NumberInputResult};

export type NumberInputProps = React.PropsWithRef<
  Omit<TextFieldProps, 'leadingAccessory' | 'trailingAccessory' | 'value'> & ThemeComponent
> & {
  /**
   * Callback that is called when the number value has changed (undefined in both if the user has deleted the number).
   */
  onChangeNumber: (result: NumberInputResult) => void;
  /**
   * A valid number (in en locale, i.e. only digits and a decimal point).
   */
  initialNumber?: number;
  /**
   * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   */
  fractionDigits?: number;
  /**
   * The locale to show the number (default 'en')
   * IMPORTANT: this might not work, depending on your intl\RN version\hermes configuration
   */
  // locale?: string;
  /**
   * A leading text
   */
  leadingText?: string;
  /**
   * The style of the leading text
   */
  leadingTextStyle?: StyleProp<ViewStyle>;
  /**
   * A trailing text
   */
  trailingText?: string;
  /**
   * The style of the trailing text
   */
  trailingTextStyle?: StyleProp<ViewStyle>;
  /**
   * The margin to the left of the input
   */
  marginLeft?: number;
  /**
   * The margin to the right of the input
   */
  marginRight?: number;
};

function NumberInput(props: NumberInputProps, ref: any) {
  const {
    onChangeNumber,
    initialNumber,
    fractionDigits = 2,
    // @ts-expect-error
    locale = 'en',
    style,
    leadingText,
    leadingTextStyle,
    marginLeft,
    trailingText,
    trailingTextStyle,
    marginRight,
    onChangeText,
    onBlur,
    onFocus,
    ...others
  } = props;
  const [options, setOptions] = useState<Options>(generateOptions(locale, fractionDigits));
  const [data, setData] = useState<NumberInputResult>();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useDidUpdate(() => {
    setOptions(generateOptions(locale, fractionDigits));
  }, [locale, fractionDigits]);

  const handleInitialValueChange = () => {
    const newData = getInitialResult(options, initialNumber);
    onChangeNumber(newData);
    setData(newData);
  };

  useEffect(() => {
    handleInitialValueChange();
  }, []);

  useDidUpdate(() => {
    handleInitialValueChange();
  }, [initialNumber]);

  const hasText = useMemo(() => {
    // Render both leading and trailing accessories so the text is centered AND the margin between the text and the accessories is correct
    return !isEmpty(leadingText) || !isEmpty(trailingText);
  }, [leadingText, trailingText]);

  const leadingAccessoryStyle: TextProps['style'] = useMemo(() => {
    return [{textAlign: 'right'}, leadingTextStyle, marginLeft ? {marginLeft} : undefined];
  }, [leadingTextStyle, marginLeft]);

  const leadingAccessory = useMemo(() => {
    if (hasText) {
      return <Text style={[styles.accessory, leadingAccessoryStyle]}>{leadingText}</Text>;
    }
  }, [hasText, leadingText, leadingAccessoryStyle]);

  const trailingAccessoryStyle: TextProps['style'] = useMemo(() => {
    return [trailingTextStyle, marginRight ? {marginRight} : undefined];
  }, [trailingTextStyle, marginRight]);

  const trailingAccessory = useMemo(() => {
    if (hasText) {
      return <Text style={[styles.accessory, trailingAccessoryStyle]}>{trailingText}</Text>;
    }
  }, [hasText, trailingText, trailingAccessoryStyle]);

  const _style = useMemo(() => {
    return [style, leadingAccessory ? undefined : {marginLeft}, trailingAccessory ? undefined : {marginRight}];
  }, [style, leadingAccessory, marginLeft, trailingAccessory, marginRight]);

  const _onChangeText = useCallback((text: string) => {
    const newData = parseInput(text, options);
    onChangeNumber(newData);
    setData(newData);
    onChangeText?.(text);
  },
  [onChangeNumber, options, onChangeText]);

  const _onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  },
  [onBlur]);

  const _onFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  },
  [onFocus]);

  const value = useMemo(() => {
    if (!isFocused && data?.type === 'valid') {
      return data.formattedNumber;
    }

    return data?.type === 'valid' || data?.type === 'error' ? data.userInput : '';
  }, [isFocused, data]);

  return (
    <TextField
      {...others}
      value={value}
      onChangeText={_onChangeText}
      onBlur={_onBlur}
      onFocus={_onFocus}
      ref={ref}
      floatingPlaceholder={false}
      leadingAccessory={leadingAccessory}
      trailingAccessory={trailingAccessory}
      style={_style}
      validationMessagePosition={TextField.validationMessagePositions.BOTTOM}
      keyboardType={'numeric'}
    />
  );
}

export default React.forwardRef<TextFieldProps, NumberInputProps>(NumberInput);

const styles = StyleSheet.create({
  accessory: {
    flexGrow: 999 // This handles a case where the validation message is long
  }
});
