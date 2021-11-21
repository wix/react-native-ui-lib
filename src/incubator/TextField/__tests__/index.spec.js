import React from 'react';
// import {TextInput} from 'react-native';
// import TextField from '../index';
import TextFieldRenderTest from './textFieldRenderText';
import {fireEvent, render} from '@testing-library/react-native';

describe('TextField', () => {
  describe('hint prop', () => {
    const props = {
      testID: 'field',
      placeholder: 'Placeholder',
      hint: 'Hint'
    };

    it('should hint text replace placeholder when input is focused', () => {
      const {getByTestId, getByPlaceholderText} = render(<TextFieldRenderTest {...props}/>);

      const input = getByTestId('field');
      expect(getByPlaceholderText(props.placeholder).props.testID).toBe(props.testID);

      fireEvent(input, 'focus');
      expect(getByPlaceholderText(props.hint).props.testID).toBe(props.testID);
    });
  });

  describe('formatter prop', () => {
    const priceFormatter = Intl.NumberFormat('en-US');

    const props = {
      testID: 'field',
      value: '10000',
      formatter: value => priceFormatter.format(Number(value))
    };

    it('should format value while not focused based on formatter prop', () => {
      const textField = render(<TextFieldRenderTest {...props}/>);
      const input = textField.getByTestId('field');
      textField.getByDisplayValue('10,000');

      fireEvent.changeText(input, '20000');

      fireEvent(input, 'focus');
      textField.getByDisplayValue('20000');

      fireEvent(input, 'blur');
      textField.getByDisplayValue('20,000');
    });

    // it.only('should format value while not focused based on formatter prop', async () => {
    //   const textInput = render(<TextInput {...props}/>);
    //   const input = textInput.getByTestId('field');
    //   // textInput.getByDisplayValue('20000')
    //   textInput.getByDisplayValue('10000');
    //   // console.log('ethan - input', textInput.getByDisplayValue('10000'));

    //   // console.log('ethan - bla', textInput.getByDisplayValue('20000'));
    // });
  });
});
