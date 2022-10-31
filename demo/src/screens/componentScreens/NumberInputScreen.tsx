import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard as RNKeyboard} from 'react-native';
import {Text, Spacings, NumberInput, View, Typography, Constants} from 'react-native-ui-lib';

export default class NumberInputScreen extends Component {
  onChange = (newValue?: number, formattedNumber?: string) => {
    console.log('NumberInputScreen', 'onChange', 'newValue =', newValue, 'formattedNumber =', formattedNumber);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={RNKeyboard.dismiss}>
        <View flex>
          <Text headingXL margin-20>
            Number Input
          </Text>
          <NumberInput
            // initialValue={1506}
            onChange={this.onChange}
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
