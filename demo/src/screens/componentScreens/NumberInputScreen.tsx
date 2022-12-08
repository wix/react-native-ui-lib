import React, {useState, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard as RNKeyboard} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  Text,
  Spacings,
  NumberInput,
  NumberInputResult,
  View,
  Typography,
  Constants,
  Incubator
} from 'react-native-ui-lib';
import {renderBooleanOptionForFunction, renderMultipleSegmentOptionsForFunction} from '../ExampleScreenPresenter';

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
  const currentData = useRef<NumberInputResult>();
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
        case 'empty':
          newText = 'Empty';
          break;
        case 'error':
          newText = `Error: value '${currentData.current.userInput}' is invalid`;
          break;
      }
    }

    setText(newText);
  }, []);

  const onChangeNumber = useCallback((result: NumberInputResult) => {
    currentData.current = result;
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

  const placeholder = useMemo(() => {
    switch (exampleType) {
      case 'price':
      default:
        return 'Price';
      case 'percentage':
        return 'Discount';
      case 'number':
        return 'Any number';
    }
  }, [exampleType]);

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
  }, []);

  const isWithinDiscountPercentage = useCallback(() => {
    if (currentData.current?.type === 'valid') {
      return (
        currentData.current.number >= DISCOUNT_PERCENTAGE.min && currentData.current.number <= DISCOUNT_PERCENTAGE.max
      );
    }
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

  return (
    <TouchableWithoutFeedback onPress={RNKeyboard.dismiss}>
      <View flex centerH>
        <Text text40 margin-s10>
          Number Input
        </Text>
        {renderBooleanOptionForFunction('Show label', 'showLabel', showLabel, setShowLabel, {spread: false})}
        {renderMultipleSegmentOptionsForFunction('', 'exampleType', exampleType, setExampleType, [
          {label: 'Price', value: ExampleTypeEnum.PRICE},
          {label: 'Percentage', value: ExampleTypeEnum.PERCENTAGE},
          {label: 'Number', value: ExampleTypeEnum.ANY_NUMBER}
        ])}

        <View flex center>
          <NumberInput
            key={exampleType}
            // initialNumber={100}
            label={label}
            labelStyle={styles.label}
            placeholder={placeholder}
            fractionDigits={fractionDigits}
            onChangeNumber={onChangeNumber}
            leadingText={leadingText}
            leadingTextStyle={styles.infoText}
            trailingText={trailingText}
            trailingTextStyle={styles.infoText}
            style={styles.mainText}
            containerStyle={styles.containerStyle}
            validate={validate}
            validationMessage={validationMessage}
            validationMessageStyle={Typography.text80M}
            marginLeft={Spacings.s4}
            marginRight={Spacings.s4}
            validateOnChange
            centered
          />
          <Text marginT-s5>{text}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default gestureHandlerRootHOC(NumberInputScreen);

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
