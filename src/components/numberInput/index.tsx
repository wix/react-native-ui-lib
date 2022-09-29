import {isEmpty} from 'lodash';
import React, {useMemo, useCallback, useState} from 'react';
import {NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import {useDidUpdate} from 'hooks';
import {Constants} from '../../commons/new';
import TextField, {TextFieldProps} from '../../incubator/TextField';
import {Typography} from '../../style';
import Text, {TextProps} from '../text';

export type NumberInputProps = React.PropsWithRef<
  Omit<TextFieldProps, 'leadingAccessory' | 'trailingAccessory' | 'value' | 'onChange' | 'onChangeText'> &
    ThemeComponent
> & {
  /**
   * A valid number (in en locale, i.e. only digits and a decimal point).
   */
  initialValue?: number;
  /**
   * The locale to show the number (default 'en')
   * IMPORTANT: this might not work, depending on your intl\RN version\hermes configuration
   */
  locale?: string;
  /**
   * Callback that is called when the number value has changed (undefined in both if the user has deleted the number).
   */
  onChange: (newValue?: number, formattedNumber?: string) => void;
  /**
   * A leading text
   */
  leadingText?: string;
  /**
   * The typography of the leading text
   */
  leadingTextTypography?: string;
  /**
   * A trailing text
   */
  trailingText?: string;
  /**
   * The typography of the trailing text
   */
  trailingTextTypography?: string;
  /**
   * The margin to the left of the input
   */
  marginLeft?: number;
  /**
   * The margin to the right of the input
   */
  marginRight?: number;
};

interface Data {
  value: number;
  endsWithDecimalSeparator: boolean;
  formattedNumber: string;
  maxLength: number;
}

/**
 * `undefined` is a legitimate result (replace current data with it), while `null`
 * means data should not be set (error state or previous data is already `undefined`)
 */
type ProcessResult = Data | undefined | null;

interface LocaleOptions {
  locale: string;
  decimalSeparator: string;
}

function getDecimalSeparator(locale: string) {
  const formattedNumber = formatNumber(1.1, locale);
  return formattedNumber.replace(/1/g, '');
}

function generateLocaleOptions(locale: string) {
  return {
    locale,
    decimalSeparator: getDecimalSeparator(locale)
  };
}

function formatNumber(value: number, locale: string) {
  return value.toLocaleString(locale);
}

function deriveData(localeOptions: LocaleOptions, input?: number, endsWithDecimalSeparator = false): Data | undefined {
  if (input === undefined) {
    return;
  }

  const value = Number(input.toFixed(2));
  let formattedNumber = formatNumber(value, localeOptions.locale);
  if (endsWithDecimalSeparator) {
    formattedNumber += localeOptions.decimalSeparator;
  }

  return {
    value,
    endsWithDecimalSeparator,
    formattedNumber,
    maxLength: formattedNumber.length
  };
}

function isLastCharDecimalSeparator(str: string, localeOptions: LocaleOptions) {
  return str.length > 0 && str.charAt(str.length - 1) === localeOptions.decimalSeparator;
}

function removeLastChar(str: string) {
  return str.substring(0, str.length - 1);
}

function processNewInput(newInput: string, localeOptions: LocaleOptions, currentData?: Data) {
  let newNumber;
  const _isLastCharDecimalSeparator = isLastCharDecimalSeparator(newInput, localeOptions);
  if (_isLastCharDecimalSeparator) {
    newNumber = Number(removeLastChar(newInput));
  } else {
    newNumber = Number(newInput);
  }
  if (isNaN(newNumber)) {
    return null;
  }

  const endsWithDecimalSeparator =
    newNumber.toString().length !== newInput.length || (newInput.length === 1 && _isLastCharDecimalSeparator);
  const newData = deriveData(localeOptions, newNumber, endsWithDecimalSeparator);
  if (newData === undefined || newData?.maxLength === currentData?.maxLength) {
    return null;
  }

  return newData;
}

function processBackspace(localeOptions: LocaleOptions, currentData?: Data): ProcessResult {
  if (!currentData) {
    return null;
  }

  if (currentData.endsWithDecimalSeparator) {
    const newData = deriveData(localeOptions, currentData.value, false);
    return newData;
  }

  const currentNumberAsString = `${currentData.value}`;
  if (currentNumberAsString.length > 0) {
    const newInput = removeLastChar(currentNumberAsString);
    if (newInput.length === 0) {
      return undefined;
    } else {
      return processNewInput(newInput, localeOptions, currentData);
    }
  } else {
    return null; // will probably not get here
  }
}

function processKey(key: string, localeOptions: LocaleOptions, currentData?: Data): ProcessResult {
  let newData;
  if (key === Constants.backspaceKey) {
    newData = processBackspace(localeOptions, currentData);
  } else {
    const decimalSeparator = currentData?.endsWithDecimalSeparator ? '.' : ''; // this is not a bug, using '.' (en) because Number() only works with en locale
    const newInput = currentData ? `${currentData.value}${decimalSeparator}${key}` : key;
    newData = processNewInput(newInput, localeOptions, currentData);
  }

  return newData;
}

function NumberInput(props: NumberInputProps, ref: any) {
  const {
    initialValue,
    locale = 'en',
    onChange,
    style,
    leadingText,
    leadingTextTypography,
    marginLeft,
    trailingText,
    trailingTextTypography,
    marginRight,
    ...others
  } = props;
  const [localeOptions, setLocaleOptions] = useState<LocaleOptions>(generateLocaleOptions(locale));
  const [data, setData] = useState<Data | undefined>(deriveData(localeOptions, initialValue, false));

  useDidUpdate(() => {
    setLocaleOptions(generateLocaleOptions(locale));
  }, [locale]);

  const hasText = useMemo(() => {
    // Render both leading and trailing accessories so the text is centered AND the margin between the text and the accessories is correct
    return !isEmpty(leadingText) || !isEmpty(trailingText);
  }, [leadingText, trailingText]);

  const leadingAccessoryStyle: TextProps['style'] = useMemo(() => {
    return [
      {textAlign: 'right'},
      leadingTextTypography ? Typography[leadingTextTypography] : undefined,
      marginLeft ? {marginLeft} : undefined
    ];
  }, [leadingTextTypography, marginLeft]);

  const leadingAccessory = useMemo(() => {
    if (hasText) {
      return (
        <Text flexG style={leadingAccessoryStyle}>
          {leadingText}
        </Text>
      );
    }
  }, [hasText, leadingText, leadingAccessoryStyle]);

  const trailingAccessoryStyle: TextProps['style'] = useMemo(() => {
    return [
      trailingTextTypography ? Typography[trailingTextTypography] : undefined,
      marginRight ? {marginRight} : undefined
    ];
  }, [trailingTextTypography, marginRight]);

  const trailingAccessory = useMemo(() => {
    if (hasText) {
      return (
        <Text flexG style={trailingAccessoryStyle}>
          {trailingText}
        </Text>
      );
    }
  }, [hasText, trailingText, trailingAccessoryStyle]);

  const _style = useMemo(() => {
    return [style, leadingAccessory ? undefined : {marginLeft}, trailingAccessory ? undefined : {marginRight}];
  }, [style, leadingAccessory, marginLeft, trailingAccessory, marginRight]);

  const onKeyPress = useCallback((e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const {key} = e.nativeEvent;
    const newData = processKey(key, localeOptions, data);
    if (newData === null) {
      return;
    } else if (newData === undefined) {
      setData(undefined);
      onChange(undefined, undefined);
    } else {
      setData(newData);
      onChange(newData.value, newData.formattedNumber);
    }
  },
  [data, localeOptions, onChange]);

  return (
    <TextField
      {...others}
      value={data?.formattedNumber}
      onKeyPress={onKeyPress}
      maxLength={data?.maxLength ?? 0}
      mainInput
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

export const _forTests = {deriveData, processKey};
export default React.forwardRef<TextFieldProps, NumberInputProps>(NumberInput);
