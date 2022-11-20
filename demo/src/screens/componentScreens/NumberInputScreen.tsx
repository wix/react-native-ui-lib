import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard as RNKeyboard} from 'react-native';
import {Text, Spacings, NumberInput, NumberInputResult, View, Typography, Constants, Button} from 'react-native-ui-lib';

export default class NumberInputScreen extends Component {
  state = {
    initialNumber: 100
  };

  onChangeNumber = (result: NumberInputResult) => {
    switch (result.type) {
      case 'valid':
        console.log('NumberInputScreen',
          'onChangeNumber',
          'newValue =',
          result.number,
          'formattedNumber =',
          result.formattedNumber);
        break;
      case 'empty':
        console.log('Miki', 'empty');
        break;
      case 'error':
        console.log('Miki', 'error', result.userInput);
        break;
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={RNKeyboard.dismiss}>
        <View flex>
          <Text headingXL margin-20>
            Number Input
          </Text>
          <NumberInput
            // initialNumber={this.state.initialNumber}
            onChangeNumber={this.onChangeNumber}
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
          />
          <Button label={'bla'} onPress={() => this.setState({initialNumber: this.state.initialNumber + 1})}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

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
    textAlign: 'center',
    ...Typography.bodySmallMedium
  }
});
