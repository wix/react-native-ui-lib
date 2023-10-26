import React, {useState} from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import TextField from '../index';
import {Constants} from '../../../commons/new';

const defaultProps = {
  testID: 'field',
  placeholder: 'Placeholder'
};

const TestCase = props => {
  const [value, setValue] = useState(props.value);
  return <TextField {...defaultProps} {...props} onChangeText={setValue} value={value}/>;
};

describe('TextField', () => {
  describe('hint prop', () => {
    it('should hint text replace placeholder when input is focused', () => {
      const renderTree = render(<TestCase hint={'Hint'}/>);

      const input = renderTree.getByTestId('field');
      renderTree.getByPlaceholderText(defaultProps.placeholder);

      fireEvent(input, 'focus');
      renderTree.getByPlaceholderText('Hint');
    });

    it('should not show hint when hint prop not passed', () => {
      const renderTree = render(<TestCase/>);

      const input = renderTree.getByTestId('field');
      renderTree.getByPlaceholderText(defaultProps.placeholder);

      fireEvent(input, 'focus');
      renderTree.getByPlaceholderText(defaultProps.placeholder);
    });
  });

  describe('formatter prop', () => {
    const priceFormatter = Intl.NumberFormat('en-US');

    const props = {
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

    describe('Mandatory Indication', () => {
      it('Should show mandatory star indication - 1', async () => {
        const renderTree = render(<TestCase testID={'field'} validate={'required'} label={'Label'} showMandatoryIndication/>);
        const label = renderTree.getByTestId('field.label');
        const text = label.children[0];
        expect(text).toEqual('Label*');
      });
      it('Should show mandatory star indication - 2', () => {
        const renderTree = render(<TestCase testID={'field'} validate={['email', 'required']} label={'Label'} showMandatoryIndication/>);
        const label = renderTree.getByTestId('field.label');
        const text = label.children[0];
        expect(text).toEqual('Label*');
      });
      it('Should not show mandatory star indication - 3', () => {
        const renderTree = render(<TestCase testID={'field'} validate={['email', 'required']} label={'Label'}/>);
        const label = renderTree.getByTestId('field.label');
        const text = label.children[0];
        expect(text).not.toEqual('Label*');
      });
      it('Should not show mandatory star indication - 3', () => {
        const renderTree = render(<TestCase testID={'field'} validate={['email']} label={'Label'} showMandatoryIndication/>);
        const label = renderTree.getByTestId('field.label');
        const text = label.children[0];
        expect(text).not.toEqual('Label*');
      });
    });
  });

  describe('defaultValue', () => {
    const props = {
      ...defaultProps,
      defaultValue: 'someDefaultValue',
      value: 'someValue'
    };

    it('value should equal defaultValue on first render when value not given', () => {
      const renderTree = render(<TestCase {...props} value={undefined}/>);

      renderTree.getByDisplayValue('someDefaultValue');
    });

    it('value should equal value on first render when given', () => {
      const renderTree = render(<TestCase {...props} defaultValue={undefined}/>);

      renderTree.getByDisplayValue('someValue');
    });

    it.each`
    platform    | isWeb
    ${'web'}    | ${true}
    ${'native'} | ${false}
    `('on $platform should reset defaultValue when prop changed after first render', (args) => {
      Constants.isWeb = args.isWeb;

      const renderTree = render(<TestCase {...props} value={undefined}/>);

      renderTree.rerender(<TestCase {...props} value={undefined} defaultValue={'someUpdatedDefaultValue'}/>);
      renderTree.getByDisplayValue('someUpdatedDefaultValue');
    });
  });
});
