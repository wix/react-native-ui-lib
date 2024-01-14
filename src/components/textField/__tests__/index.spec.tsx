import React, {useState} from 'react';
import {render} from '@testing-library/react-native';
import TextField from '../index';
import {Constants} from '../../../commons/new';
import {TextFieldDriver} from '../TextField.driver.new';

const TEXT_FIELD_TEST_ID = 'field';
const defaultProps = {
  testID: TEXT_FIELD_TEST_ID,
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
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getPlaceholderText()).toEqual(defaultProps.placeholder);
      textFieldDriver.focus();
      expect(textFieldDriver.getPlaceholderText()).toEqual('Hint');
    });

    it('should not show hint when hint prop not passed', () => {
      const renderTree = render(<TestCase/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getPlaceholderText()).toEqual(defaultProps.placeholder);
      textFieldDriver.focus();
      expect(textFieldDriver.getPlaceholderText()).toEqual(defaultProps.placeholder);
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
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getText()).toEqual('10,000');
    });

    it('should not format value while focused', () => {
      const renderTree = render(<TestCase {...props}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.focus();
      expect(textFieldDriver.getText()).toEqual('10000');
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
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.changeText('invalidEmail');
      textFieldDriver.blur();
      expect(textFieldDriver.getValidationMsgText()).toEqual(props.validationMessage);
    });

    it('should remove validation error message after entering a valid input', () => {
      const renderTree = render(<TestCase {...props} validateOnStart validateOnChange value={'invalid'}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getValidationMsgText()).toEqual(props.validationMessage);
      textFieldDriver.changeText('mail@mail.com');
      expect(textFieldDriver.isValidationMsgVisible()).toEqual(false);
    });

    describe('Mandatory Indication', () => {
      it('Should show mandatory star indication - 1', () => {
        const renderTree = render(<TestCase testID={'field'} validate={'required'} label={'Label'} showMandatoryIndication/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        expect(textFieldDriver.getLabelText()).toEqual('Label*');
      });
      it('Should show mandatory star indication - 2', () => {
        const renderTree = render(<TestCase testID={'field'} validate={['email', 'required']} label={'Label'} showMandatoryIndication/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        expect(textFieldDriver.getLabelText()).toEqual('Label*');
      });
      it('Should not show mandatory star indication - 1', () => {
        const renderTree = render(<TestCase testID={'field'} validate={['email', 'required']} label={'Label'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        expect(textFieldDriver.getLabelText()).not.toEqual('Label*');
      });
      it('Should not show mandatory star indication - 2', () => {
        const renderTree = render(<TestCase testID={'field'} validate={['email']} label={'Label'} showMandatoryIndication/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        expect(textFieldDriver.getLabelText()).not.toEqual('Label*');
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
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getText()).toEqual('someDefaultValue');
    });

    it('value should equal value on first render when given', () => {
      const renderTree = render(<TestCase {...props} defaultValue={undefined}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getText()).toEqual('someValue');
    });

    it.each`
      platform    | isWeb
      ${'web'}    | ${true}
      ${'native'} | ${false}
    `('on $platform should reset defaultValue when prop changed after first render', args => {
      Constants.isWeb = args.isWeb;

      const renderTree = render(<TestCase {...props} value={undefined}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      
      renderTree.rerender(<TestCase {...props} value={undefined} defaultValue={'someUpdatedDefaultValue'}/>);
      expect(textFieldDriver.getText()).toEqual('someUpdatedDefaultValue');
    });
  });
});
