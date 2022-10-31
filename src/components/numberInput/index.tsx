import {isEmpty} from 'lodash';
import React, {useMemo, useCallback, useState} from 'react';
import {NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import {useDidUpdate} from 'hooks';
import TextField, {TextFieldProps} from '../../incubator/TextField';
import {Typography} from '../../style';
import Text, {TextProps} from '../text';
import {processKey, deriveData, generateLocaleOptions, LocaleOptions, Data} from './Presenter';

export type NumberInputProps = React.PropsWithRef<
  Omit<TextFieldProps, 'leadingAccessory' | 'trailingAccessory' | 'value' | 'onChange' | 'onChangeText'> &
    ThemeComponent
> & {
  /**
   * Callback that is called when the number value has changed (undefined in both if the user has deleted the number).
   */
  onChange: (newValue?: number, formattedNumber?: string) => void;
  /**
   * A valid number (in en locale, i.e. only digits and a decimal point).
   */
  initialValue?: number;
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

function NumberInput(props: NumberInputProps, ref: any) {
  const {
    onChange,
    initialValue,
    fractionDigits = 2,
    // @ts-expect-error
    locale = 'en',
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
  const [data, setData] = useState<Data | undefined>(deriveData(localeOptions, fractionDigits, initialValue, false));

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
    const newData = processKey(key, fractionDigits, localeOptions, data);
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
  [data, fractionDigits, localeOptions, onChange]);

  return (
    <TextField
      {...others}
      contextMenuHidden
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

export default React.forwardRef<TextFieldProps, NumberInputProps>(NumberInput);
