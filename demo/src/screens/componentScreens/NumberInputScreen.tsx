import React, {useState, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard as RNKeyboard} from 'react-native';
import {
  Text,
  Spacings,
  NumberInput,
  NumberInputData,
  View,
  Typography,
  Constants,
  Incubator
} from 'react-native-ui-lib';
import {renderBooleanOption, renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

enum ExampleTypeEnum {
  PRICE = 'price',
  PERCENTAGE = 'percentage',
  ANY_NUMBER = 'number'
}

type ExampleType = ExampleTypeEnum | `${ExampleTypeEnum}`;

const VALIDATION_MESSAGE = 'Please enter a valid number';
const MINIMUM_PRICE = 5000;
const MINIMUM_PRICE_VALIDATION_MESSAGE = `Make sure your number is above ${MINIMUM_PRICE}`;
const DISCOUNT_PERCENTAGE = {min: 1, max: 80};
// eslint-disable-next-line max-len
const DISCOUNT_PERCENTAGE_VALIDATION_MESSAGE = `Make sure your number is between ${DISCOUNT_PERCENTAGE.min} and ${DISCOUNT_PERCENTAGE.max}`;

const NumberInputScreen = () => {
  const currentData = useRef<NumberInputData>(undefined);
  const [text, setText] = useState<string>('');
  const [showLabel, setShowLabel] = useState<boolean>(true);
  const [exampleType, setExampleType] = useState<ExampleType>('price');

  const processInput = useCallback(() => {
    let newText = '';
    if (currentData.current) {
      switch (currentData.current.type) {
        case 'valid':
          newText = currentData.current.formattedNumber;
          break;
        case 'error':
          newText = `Error: value '${currentData.current.userInput}' is invalid`;
          break;
      }
    }

    setText(newText);
  }, []);

  const onChangeNumber = useCallback((data: NumberInputData) => {
    currentData.current = data;
    processInput();
  },
  [processInput]);

  const label = useMemo(() => {
    if (showLabel) {
      switch (exampleType) {
        case 'price':
        default:
          return 'Enter price';
        case 'percentage':
          return 'Enter discount percentage';
        case 'number':
          return 'Enter any number';
      }
    }
  }, [showLabel, exampleType]);

  const fractionDigits = useMemo(() => {
    switch (exampleType) {
      case 'price':
      case 'number':
      default:
        return undefined;
      case 'percentage':
        return 0;
    }
  }, [exampleType]);

  const leadingText = useMemo(() => {
    switch (exampleType) {
      case 'price':
        return '$';
      case 'percentage':
      case 'number':
      default:
        return undefined;
    }
  }, [exampleType]);

  const trailingText = useMemo(() => {
    switch (exampleType) {
      case 'percentage':
        return '%';
      case 'price':
      case 'number':
      default:
        return undefined;
    }
  }, [exampleType]);

  const isValid = useCallback(() => {
    return currentData.current?.type === 'valid';
  }, []);

  const isAboveMinimumPrice = useCallback(() => {
    if (currentData.current?.type === 'valid') {
      return currentData.current.number > MINIMUM_PRICE;
    }
    return false;
  }, []);

  const isWithinDiscountPercentage = useCallback(() => {
    if (currentData.current?.type === 'valid') {
      return (
        currentData.current.number >= DISCOUNT_PERCENTAGE.min && currentData.current.number <= DISCOUNT_PERCENTAGE.max
      );
    }
    return false;
  }, []);

  const validate = useMemo((): Incubator.TextFieldProps['validate'] => {
    switch (exampleType) {
      case 'price':
        return [isValid, isAboveMinimumPrice];
      case 'percentage':
        return [isValid, isWithinDiscountPercentage];
      default:
        return isValid;
    }
  }, [exampleType, isValid, isAboveMinimumPrice, isWithinDiscountPercentage]);

  const validationMessage = useMemo((): Incubator.TextFieldProps['validationMessage'] => {
    switch (exampleType) {
      case 'price':
        return [VALIDATION_MESSAGE, MINIMUM_PRICE_VALIDATION_MESSAGE];
      case 'percentage':
        return [VALIDATION_MESSAGE, DISCOUNT_PERCENTAGE_VALIDATION_MESSAGE];
      default:
        return VALIDATION_MESSAGE;
    }
  }, [exampleType]);

  const textStyle = useMemo(() => {
    return [styles.mainText, !leadingText && {marginLeft: Spacings.s4}, !trailingText && {marginRight: Spacings.s4}];
  }, [leadingText, trailingText]);

  const textFieldProps = useMemo(() => {
    return {
      label,
      labelStyle: styles.label,
      style: textStyle,
      maxLength: 6,
      validate,
      validationMessage,
      validationMessageStyle: Typography.text80M,
      validateOnChange: true,
      centered: true
    };
  }, [label, textStyle, validate, validationMessage]);

  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={RNKeyboard.dismiss}>
      <View centerH flex>
        <Text text40 margin-s10>
          Number Input
        </Text>
        {renderBooleanOption('Show label', 'showLabel', {spread: false, state: showLabel, setState: setShowLabel})}
        {renderMultipleSegmentOptions('',
          'exampleType',
          [
            {label: 'Price', value: ExampleTypeEnum.PRICE},
            {label: 'Percentage', value: ExampleTypeEnum.PERCENTAGE},
            {label: 'Number', value: ExampleTypeEnum.ANY_NUMBER}
          ],
          {state: exampleType, setState: setExampleType})}

        <View marginT-50 centerH>
          <NumberInput
            key={exampleType}
            // initialNumber={12.1}
            // contextMenuHidden={false}
            textFieldProps={textFieldProps}
            fractionDigits={fractionDigits}
            onChangeNumber={onChangeNumber}
            leadingText={leadingText}
            leadingTextStyle={leadingText && [styles.infoText, {marginLeft: Spacings.s4}]}
            trailingText={trailingText}
            trailingTextStyle={trailingText && [styles.infoText, {marginRight: Spacings.s4}]}
            containerStyle={styles.containerStyle}
          />
          <Text marginT-s5>{text}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NumberInputScreen;

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 30,
    marginLeft: Spacings.s5,
    marginRight: Spacings.s5
  },
  mainText: {
    height: 36,
    marginVertical: Spacings.s1,
    ...Typography.text30M
  },
  infoText: {
    marginTop: Constants.isIOS ? Spacings.s2 : 0,
    ...Typography.text50M
  },
  label: {
    marginBottom: Spacings.s1,
    ...Typography.text80M
  }
});
