import {isEmpty} from 'lodash';
import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {useDidUpdate, useThemeProps} from 'hooks';
import MaskedInput from '../maskedInput/new';
import TextField, {TextFieldProps} from '../../incubator/TextField';
import View from '../view';
import Text from '../text';
import {
  parseInput,
  generateOptions,
  getInitialNumber,
  Options,
  NumberInputData
} from './Presenter';
import {ClipboardPackage as Clipboard} from 'optionalDeps';

export {NumberInputData};

type _TextFieldProps = Omit<
  TextFieldProps,
  | 'leadingAccessory'
  | 'trailingAccessory'
  | 'value'
  | 'onChangeText'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'floatingPlaceholder'
  | 'floatingPlaceholderColor'
  | 'floatingPlaceholderStyle'
  | 'contextMenuHidden'
>;

type _NumberInputProps = {
  /**
   * Pass additional props to the TextField
   */
  textFieldProps?: _TextFieldProps;
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
  leadingTextStyle?: StyleProp<TextStyle>;
  /**
   * A trailing text
   */
  trailingText?: string;
  /**
   * The style of the trailing text
   */
  trailingTextStyle?: StyleProp<TextStyle>;
  /**
   * Container style of the whole component
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * If true, context menu is hidden. The default value is true.
   * Requires @react-native-community/clipboard to be installed.
   */
  contextMenuHidden?: boolean;
  testID?: string;
};

export type NumberInputProps = React.PropsWithRef<_NumberInputProps>;

function NumberInput(props: NumberInputProps, ref: any) {
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
  const [options, setOptions] = useState<Options>(generateOptions(locale, fractionDigits));
  const initialNumber = getInitialNumber(propsInitialNumber, options);
  const [data, setData] = useState<NumberInputData>(parseInput(`${initialNumber}`, options, propsInitialNumber));

  useEffect(() => {
    if (!contextMenuHidden && !Clipboard) {
      // eslint-disable-next-line max-len
      console.error(`RNUILib NumberInput's "contextMenuHidden" prop requires installing "@react-native-community/clipboard" dependency`);
    }
  }, [contextMenuHidden]);

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

  const handlePastedDate = useCallback((text: string) => {
    const newData = parseInput(text, options);
    onChangeNumber(newData);
    setData(newData);
  },
  [onChangeNumber, options]);

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

  const hasText = useMemo(() => {
    // Render (none or) both leading and trailing accessories together for flexness (especially when validation message is long)
    return !isEmpty(leadingText) || !isEmpty(trailingText);
  }, [leadingText, trailingText]);

  const leadingAccessory = useMemo(() => {
    if (hasText) {
      return <Text style={[styles.accessory, {textAlign: 'right'}, leadingTextStyle]}>{leadingText}</Text>;
    }
  }, [hasText, leadingText, leadingTextStyle]);
  const trailingAccessory = useMemo(() => {
    if (hasText) {
      return <Text style={[styles.accessory, trailingTextStyle]}>{trailingText}</Text>;
    }
  }, [hasText, trailingText, trailingTextStyle]);

  const onChangeText = useCallback(async (text: string) => {
    if (!contextMenuHidden && Clipboard) {
      const copiedContent = await Clipboard.getString();
      if (copiedContent !== '') {
        const isPasted = text.endsWith(copiedContent);
        if (isPasted) {
          handlePastedDate(copiedContent);
          return;
        }
      }
    }
    processInput(text);
  },
  [contextMenuHidden, handlePastedDate, processInput]);

  const formatter = useCallback(() => {
    return data?.type === 'valid' ? data.formattedNumber : data?.type === 'error' ? data.userInput : '';
  }, [data]);

  const renderNumberInput = useCallback((value?: string) => {
    return (
      <View row style={containerStyle}>
        {/* @ts-expect-error ref is somehow required, not sure from where */}
        <TextField
          {...textFieldProps}
          testID={`${testID}.visual`}
          value={value}
          onChangeText={onChangeText}
          formatter={formatter}
          floatingPlaceholder={false}
          leadingAccessory={leadingAccessory}
          trailingAccessory={trailingAccessory}
          containerStyle={[styles.textFieldContainerStyle, textFieldProps?.containerStyle]}
          keyboardType={'numeric'}
        />
      </View>
    );
  },
  [onChangeText, containerStyle, formatter, leadingAccessory, textFieldProps, trailingAccessory, testID]);

  return (
    <MaskedInput
      testID={testID}
      ref={ref}
      renderMaskedText={renderNumberInput}
      keyboardType={'numeric'}
      initialValue={initialNumber ? `${initialNumber}` : undefined}
      onChangeText={onChangeText}
      contextMenuHidden={contextMenuHidden}
    />
  );
}

export default React.forwardRef<TextFieldProps, NumberInputProps>(NumberInput);

const styles = StyleSheet.create({
  textFieldContainerStyle: {
    flexShrink: 1
  },
  accessory: {
    flexGrow: 999
  }
});
