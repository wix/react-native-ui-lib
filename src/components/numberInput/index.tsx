import {isEmpty} from 'lodash';
import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useDidUpdate} from 'hooks';
import TextField, {TextFieldProps} from '../../incubator/TextField';
import Text from '../text';
import {getInitialData, parseInput, generateOptions, Options, NumberInputData} from './Presenter';

export {NumberInputData};

export type NumberInputProps = React.PropsWithRef<
  Omit<TextFieldProps, 'leadingAccessory' | 'trailingAccessory' | 'value' | 'onChangeText'> & ThemeComponent
> & {
  /**
   * Callback that is called when the number value has changed (undefined in both if the user has deleted the number).
   */
  onChangeNumber: (data: NumberInputData) => void;
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
};

function NumberInput(props: NumberInputProps, ref: any) {
  const {
    onChangeNumber,
    initialNumber,
    fractionDigits = 2,
    // @ts-expect-error
    locale = 'en',
    containerStyle,
    leadingText,
    leadingTextStyle,
    trailingText,
    trailingTextStyle,
    placeholder,
    ...others
  } = props;
  const [options, setOptions] = useState<Options>(generateOptions(locale, fractionDigits));
  const [data, setData] = useState<NumberInputData>();

  useDidUpdate(() => {
    setOptions(generateOptions(locale, fractionDigits));
  }, [locale, fractionDigits]);

  const handleInitialValueChange = () => {
    const newData = getInitialData(options, initialNumber);
    onChangeNumber(newData);
    setData(newData);
  };

  useEffect(() => {
    handleInitialValueChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNumber]);

  const processInput = useCallback((text: string) => {
    const newData = parseInput(text, options);
    onChangeNumber(newData);
    setData(newData);
  },
  [onChangeNumber, options]);

  useDidUpdate(() => {
    if (data?.type === 'valid') {
      // 1. This will not work properly for changing locale
      // 2. This will not work properly for changing fractionDigits with only an initialNumber
      processInput(data.userInput);
    }
  }, [options]);
  const leadingAccessory = useMemo(() => {
    if (leadingText) {
      return <Text style={leadingTextStyle}>{leadingText}</Text>;
    }
  }, [leadingText, leadingTextStyle]);
  const trailingAccessory = useMemo(() => {
    if (trailingText) {
      return <Text style={trailingTextStyle}>{trailingText}</Text>;
    }
  }, [trailingText, trailingTextStyle]);

  const _containerStyle = useMemo(() => {
    return [styles.containerStyle, containerStyle];
  }, [containerStyle]);

  const _onChangeText = useCallback((text: string) => {
    processInput(text);
  },
  [processInput]);

  const value = useMemo(() => {
    return data?.type === 'valid' || data?.type === 'error' ? data.userInput : '';
  }, [data]);

  const formatter = useCallback(() => {
    return data?.type === 'valid' ? data.formattedNumber : data?.type === 'error' ? data.userInput : '';
  }, [data]);

  // Fixing RN bug in Android (placeholder + trailingText) - https://github.com/facebook/react-native/issues/35611
  const _placeholder = useMemo(() => {
    return isEmpty(value) ? placeholder : undefined;
  }, [placeholder, value]);

  return (
    <TextField
      {...others}
      placeholder={_placeholder}
      value={value}
      onChangeText={_onChangeText}
      formatter={formatter}
      ref={ref}
      floatingPlaceholder={false}
      leadingAccessory={leadingAccessory}
      trailingAccessory={trailingAccessory}
      containerStyle={_containerStyle}
      validationMessagePosition={TextField.validationMessagePositions.BOTTOM}
      keyboardType={'numeric'}
    />
  );
}

export default React.forwardRef<TextFieldProps, NumberInputProps>(NumberInput);

const styles = StyleSheet.create({
  containerStyle: {
    overflow: 'hidden'
  }
});
