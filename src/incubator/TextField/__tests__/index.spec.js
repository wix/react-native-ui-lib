import React, {useState} from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import TextField from '../index';

describe('TextField', () => {
  describe('hint prop', () => {
    const props = {
      testID: 'field',
      placeholder: 'Placeholder',
      hint: 'Hint'
    };

    it('should hint text replace placeholder when input is focused', () => {
      const renderTree = render(<TestCase {...props}/>);

      const input = renderTree.getByTestId('field');
      renderTree.getByPlaceholderText(props.placeholder);

      fireEvent(input, 'focus');
      renderTree.getByPlaceholderText(props.hint);
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
      const renderTree = render(<TestCase {...props}/>);
      renderTree.getByDisplayValue('10,000');
    });

    it('should not format value while focused', () => {
      const renderTree = render(<TestCase {...props}/>);
      const input = renderTree.getByTestId('field');
      fireEvent(input, 'focus');
      renderTree.getByDisplayValue('10000');
    });
  });

  describe('validation', () => {
    const props = {
      testID: 'field',
      enableErrors: true,
      validate: 'email',
      validationMessage: 'email is invalid'
    };

    it('should display validation error message when validation fail after blur', () => {
      const renderTree = render(<TestCase {...props} validateOnBlur/>);
      const input = renderTree.getByTestId('field');
      fireEvent.changeText(input, 'invalidEmail');
      fireEvent(input, 'blur');
      renderTree.getByText(props.validationMessage);
    });

    it('should remove validation error message after entering a valid input', async () => {
      const renderTree = render(<TestCase {...props} validateOnStart validateOnChange value={'invalid'}/>);
      const input = renderTree.getByTestId('field');

      renderTree.getByText(props.validationMessage);

      fireEvent.changeText(input, 'mail@mail.com');
      const validationMessageElement = renderTree.queryByText(props.validationMessage);
      expect(validationMessageElement).toBe(null);
    });
  });
});

const TestCase = props => {
  const [value, setValue] = useState(props.value);
  return <TextField {...props} onChangeText={setValue} value={value}/>;
};
