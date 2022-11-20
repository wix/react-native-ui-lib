import React, {useState, useCallback, useRef} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard as RNKeyboard} from 'react-native';
import {Text, Spacings, NumberInput, NumberInputResult, View, Typography, Constants, Button} from 'react-native-ui-lib';

const NumberInputScreen = () => {
  const currentData = useRef<NumberInputResult>();
  // const [initialNumber, setInitialNumber] = useState<number>(100);
  const [text, setText] = useState<string>('');

  const onChangeNumber = useCallback((result: NumberInputResult) => {
    currentData.current = result;
  }, []);

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

  return (
    <TouchableWithoutFeedback onPress={RNKeyboard.dismiss}>
      <View flex center>
        <Text headingXL margin-20>
          Number Input
        </Text>
        <NumberInput
          // initialNumber={initialNumber}
          onChangeNumber={onChangeNumber}
          placeholder={'Price'}
          leadingText={'$'}
          leadingTextStyle={styles.leadingText}
          style={styles.mainText}
          containerStyle={styles.containerStyle}
          label={'Enter Price'}
          labelStyle={styles.label}
          validate={'required'}
          validationMessage={['Please enter a price']}
          validationMessageStyle={styles.validationMessage}
          marginLeft={Spacings.s4}
          marginRight={Spacings.s4}
          onBlur={processInput}
        />
        <Button label={'Process'} onPress={processInput}/>
        <Text marginT-s5>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NumberInputScreen;

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    marginBottom: 30,
    marginLeft: Spacings.s5,
    marginRight: Spacings.s5
  },
  mainText: {
    height: 36,
    marginVertical: Spacings.s1,
    textAlign: 'center',
    ...Typography.text30M
  },
  leadingText: {
    marginTop: Constants.isIOS ? Spacings.s2 : 0,
    ...Typography.text50M
  },
  label: {
    textAlign: 'center',
    marginBottom: Spacings.s1,
    ...Typography.bodySmallMedium
  },
  validationMessage: {
    flexGrow: 1,
    textAlign: 'center',
    ...Typography.bodySmallMedium
  }
});
