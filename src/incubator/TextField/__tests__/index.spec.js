import React from 'react';
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
      const renderTree = render(<TextFieldRenderTest {...props}/>);

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
      const renderTree = render(<TextFieldRenderTest {...props}/>);
      renderTree.getByDisplayValue('10,000');
    });

    it('should not format value while focused', () => {
      const renderTree = render(<TextFieldRenderTest {...props}/>);
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
      const renderTree = render(<TextFieldRenderTest {...props} validateOnBlur/>);
      const input = renderTree.getByTestId('field');
      fireEvent.changeText(input, 'invalidEmail');
      fireEvent(input, 'blur');
      renderTree.getByText(props.validationMessage);
    });

    it('should remove validation error message after entering a valid input', async () => {
      const renderTree = render(<TextFieldRenderTest {...props} validateOnStart validateOnChange value={'invalid'}/>);
      const input = renderTree.getByTestId('field');

      renderTree.getByText(props.validationMessage);

      fireEvent.changeText(input, 'mail@mail.com');
      const validationMessageElement = renderTree.queryByText(props.validationMessage);
      expect(validationMessageElement).toBe(null);
    });
  });
});
