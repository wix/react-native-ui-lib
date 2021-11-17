import React from 'react';
import {TextInput} from 'react-native';
import TextField from '../index';
import {fireEvent, render, within} from '@testing-library/react-native';

describe('TextField', () => {
  describe('hint', () => {
    const props = {
      testID: 'field',
      placeholder: 'Placeholder',
      hint: 'Hint'
    };

    it('should hint text replace placeholder when input is focused', () => {
      const {getByTestId, getByPlaceholderText} = render(<TextField {...props}/>);

      const input = getByTestId('field');
      expect(getByPlaceholderText(props.placeholder).props.testID).toBe(props.testID);

      fireEvent(input, 'focus');
      expect(getByPlaceholderText(props.hint).props.testID).toBe(props.testID);
    });
  });

  describe('formatter', () => {
    const priceFormatter = Intl.NumberFormat('en-US');
    const props = {
      testID: 'field',
      formatter: value => priceFormatter.format(Number(value))
    };

    it('should format value while not focused based on formatter prop', () => {
      const textField = render(<TextField {...props}/>);
      const input = within(textField.getByTestId('field'));
      fireEvent.changeText(input, '10000');
      console.log('ethan - input', input.getByDisplayValue('10000'));
      // console.log('ethan - element', getByDisplayValue('10000'));
      // expect(getByPlaceholderText(props.placeholder).props.testID).toBe(props.testID);

      // fireEvent(input, 'focus');
      // expect(getByPlaceholderText(props.hint).props.testID).toBe(props.testID);
    });
  });
});
