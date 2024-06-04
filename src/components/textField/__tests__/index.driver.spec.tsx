import React, {useState} from 'react';
import {render} from '@testing-library/react-native';
import Constants from '../../../commons/Constants';
import View from '../../../components/view';
import {TextFieldDriver} from '../TextField.driver.new';
import TextField from '../index';
import {TextFieldProps} from '../types';

const TEXT_FIELD_TEST_ID = 'text_field_test_id';
const placeholder = 'Placeholder';
const hint = 'Hint';

function TestCase(textFieldProps?: TextFieldProps) {
  const [value, setValue] = useState(textFieldProps?.value);
  return (
    <View>
      <TextField {...textFieldProps} testID={TEXT_FIELD_TEST_ID} value={value} onChangeText={setValue}/>
    </View>
  );
}

const validate = jest.fn((value: string) => {
  return !!value;
});

describe('TextField', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render textField', () => {
    const renderTree = render(<TestCase/>);
    const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

    expect(textFieldDriver.exists()).toBe(true);
  });

  it('should render textField with correct content', () => {
    const renderTree = render(<TestCase value={'aa'}/>);
    const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

    expect(textFieldDriver.getValue()).toEqual('aa');
  });

  it('should change the text correctly', () => {
    const renderTree = render(<TestCase value={'aa'}/>);
    const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

    expect(textFieldDriver.getValue()).toEqual('aa');

    textFieldDriver.changeText('bb');

    expect(textFieldDriver.getValue()).toEqual('bb');
  });

  describe('editable', () => {
    it('should be editable', () => {
      const renderTree = render(<TestCase/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isEnabled()).toBe(true);
    });

    it('should render textField that is not editable', () => {
      const renderTree = render(<TestCase editable={false}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isEnabled()).toBe(false);
    });
  });

  describe('readonly', () => {
    it('should render textField that is not readonly', () => {
      const renderTree = render(<TestCase/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isEnabled()).toBe(true);
    });

    it('should be readonly', () => {
      const renderTree = render(<TestCase readonly/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isEnabled()).toBe(false);
    });
  });

  describe('placeholder', () => {
    it('should render placeholder with correct text', () => {
      const renderTree = render(<TestCase placeholder={'mock placeholder'}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getPlaceholder().exists()).toBe(true);
      expect(textFieldDriver.getPlaceholder().getText()).toEqual('mock placeholder');
    });

    it('should not render placeholder', () => {
      const renderTree = render(<TestCase/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getPlaceholder().exists()).toBe(false);
    });

    it('should not render placeholder after user changing the input text(no floating prop)', () => {
      const renderTree = render(<TestCase placeholder={'mock placeholder'}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getPlaceholder().exists()).toBe(true);

      textFieldDriver.changeText('mock input value');

      expect(textFieldDriver.getPlaceholder().exists()).toBe(false);
    });

    it('should render placeholder(floating) after user changing text if floatingPlaceholder prop sent', () => {
      const renderTree = render(<TestCase placeholder={'mock placeholder'} floatingPlaceholder/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getPlaceholder().exists()).toBe(true);

      textFieldDriver.changeText('mock input value');

      expect(textFieldDriver.getPlaceholder().exists()).toBe(true);
      expect(textFieldDriver.getPlaceholder().getText()).toEqual('mock placeholder');
    });
  });

  describe('label', () => {
    it('should not render label if prop is not passed', () => {
      const renderTree = render(<TestCase/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getLabel().exists()).toBe(false);
    });

    it('should render a label', () => {
      const renderTree = render(<TestCase label={'mock label'}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getLabel().exists()).toBe(true);

      expect(textFieldDriver.getLabel().getText()).toEqual('mock label');
    });

    it('should not render label if floatingPlaceholder prop is passed', () => {
      const renderTree = render(<TestCase label={'mock label'} floatingPlaceholder/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getLabel().exists()).toBe(false);
    });
  });

  describe('validation message', () => {
    it('should not render validationMessage if enableErrors prop not supplied', () => {
      const renderTree = render(<TestCase value={''} validationMessage={'mock message'} validateOnStart/>);

      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getValidationMessage().exists()).toBe(false);
    });

    it('should render validationMessage on start if input required and validateOnStart passed', () => {
      const renderTree = render(<TestCase value={''} validationMessage={'mock message'} enableErrors validateOnStart/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
      expect(textFieldDriver.getValidationMessage().getText()).toEqual('mock message');
    });

    it('should render validationMessage when input is requires after changing the input to empty string', () => {
      const renderTree = render(<TestCase value={''} validate={'required'} validationMessage={'mock message'} enableErrors validateOnChange/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getValidationMessage().exists()).toBe(false);
      expect(textFieldDriver.getValidationMessage().getText()).toEqual('');

      textFieldDriver.changeText('');

      expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
      expect(textFieldDriver.getValidationMessage().getText()).toEqual('mock message');
    });

    it('should display validation error message when validation fail after blur', () => {
      const renderTree = render(<TestCase validate={'email'} validationMessage={'email is invalid'} enableErrors validateOnBlur/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.changeText('invalidEmail');
      textFieldDriver.blur();
      expect(textFieldDriver.getValidationMessage().getText()).toEqual('email is invalid');
    });

    it('should remove validation error message after entering a valid input', () => {
      const renderTree = render(<TestCase value={'invalid'} validate={'email'} validationMessage={'email is invalid'} enableErrors validateOnStart validateOnChange/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getValidationMessage().getText()).toEqual('email is invalid');
      textFieldDriver.changeText('mail@mail.com');
      expect(textFieldDriver.getValidationMessage().exists()).toEqual(false);
    });
  });

  describe('validateOnBlur', () => {
    it('validate is called with undefined when defaultValue is not given', () => {
      const renderTree = render(<TestCase validateOnBlur validationMessage={'Not valid'} validate={[validate]}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.focus();
      textFieldDriver.blur();
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith(undefined);
    });

    it('validate is called with defaultValue when defaultValue is given', () => {
      const defaultValue = '1';
      const renderTree = render(<TestCase validateOnBlur validationMessage={'Not valid'} validate={[validate]} defaultValue={defaultValue}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.focus();
      textFieldDriver.blur();
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith(defaultValue);
    });
  });

  describe('defaultValue', () => {
    const props = {
      testID: TEXT_FIELD_TEST_ID,
      placeholder: 'Placeholder',
      defaultValue: 'someDefaultValue',
      value: 'someValue'
    };

    it('value should equal defaultValue on first render when value not given', () => {
      const renderTree = render(<TestCase {...props} value={undefined}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getValue()).toEqual('someDefaultValue');
    });

    it('value should equal value on first render when given', () => {
      const renderTree = render(<TestCase {...props} defaultValue={undefined}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getValue()).toEqual('someValue');
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
      expect(textFieldDriver.getValue()).toEqual('someUpdatedDefaultValue');
    });
  });

  describe('char counter', () => {
    it('should  render char counter.', () => {
      const renderTree = render(<TestCase maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounter().exists()).toBe(true);
    });

    it('should not render counter if maxLength prop not supplied', () => {
      const renderTree = render(<TestCase showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounter().exists()).toBe(false);
    });

    it('should not render counter if showCharCounter prop not supplied', () => {
      const renderTree = render(<TestCase maxLength={10}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getCharCounter().exists()).toBe(false);
    });

    it('should render char counter, with "0/10" if value not supplied', () => {
      const renderTree = render(<TestCase maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounter().getText()).toEqual('0/10');
    });

    it('should render char counter with correct content supplied', () => {
      const renderTree = render(<TestCase value={'abc'} maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounter().getText()).toEqual('3/10');
    });

    it('should update char counter after changing the text', () => {
      const renderTree = render(<TestCase value={'ab'} maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounter().getText()).toEqual('2/10');

      textFieldDriver.changeText('abcd');

      expect(textFieldDriver.getCharCounter().getText()).toEqual('4/10');
    });
  });

  describe('hint', () => {
    it('should hint text replace placeholder when input is focused', () => {
      const renderTree = render(<TestCase hint={hint} placeholder={placeholder}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getPlaceholder().getText()).toEqual(placeholder);
      textFieldDriver.focus();
      expect(textFieldDriver.getPlaceholder().getText()).toEqual(hint);
    });

    it('should not show hint when hint prop not passed', () => {
      const renderTree = render(<TestCase placeholder={placeholder}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getPlaceholder().getText()).toEqual(placeholder);
      textFieldDriver.focus();
      expect(textFieldDriver.getPlaceholder().getText()).toEqual(placeholder);
    });
  });

  describe('formatter', () => {
    const priceFormatter = Intl.NumberFormat('en-US');

    const props = {
      value: '10000',
      formatter: value => priceFormatter.format(Number(value))
    };

    it('should format value while not focused based on formatter prop', () => {
      const renderTree = render(<TestCase {...props}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getValue()).toEqual('10,000');
    });

    it('should not format value while focused', () => {
      const renderTree = render(<TestCase {...props}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.focus();
      expect(textFieldDriver.getValue()).toEqual('10000');
    });
  });

  describe('Mandatory Indication', () => {
    const getTestCaseDriver = (props: TextFieldProps) => {
      const renderTree = render(<TestCase {...props}/>);
      return TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
    };
    const starReg = /.*\*$/;

    //Sanity
    it('Should show mandatory indication on the label', () => {
      const textFieldDriver = getTestCaseDriver({label: 'Label', validate: 'required', showMandatoryIndication: true});
      const labelContent = textFieldDriver.getLabel().getText();
      expect(labelContent).toMatch(starReg);
    });

    it('Should show mandatory indication on the label', () => {
      const textFieldDriver = getTestCaseDriver({
        label: 'Label',
        validate: ['required'],
        showMandatoryIndication: true
      });
      const labelContent = textFieldDriver.getLabel().getText();
      expect(labelContent).toMatch(starReg);
    });

    it('Should not show mandatory indication on label', () => {
      const textFieldDriver = getTestCaseDriver({label: 'label', showMandatoryIndication: true});
      const labelText = textFieldDriver.getLabel().getText();
      expect(labelText).not.toMatch(starReg);
    });

    it('Should not show mandatory indication on label', () => {
      const textFieldDriver = getTestCaseDriver({label: 'label', validate: 'required'});
      const labelText = textFieldDriver.getLabel().getText();
      expect(labelText).not.toMatch(starReg);
    });

    it('Should have mandatory on the placeholder', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder,
        showMandatoryIndication: true,
        validate: 'required'
      });
      const placeholderText = textFieldDriver.getPlaceholder().getText();
      expect(placeholderText).toMatch(starReg);
    });

    it('Should not have any mandatory - 1', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder,
        showMandatoryIndication: true,
        // validate: 'required',
        label: 'label'
      });
      const placeholderText = textFieldDriver.getPlaceholder().getText();
      const labelText = textFieldDriver.getLabel().getText();
      expect(placeholderText).not.toMatch(starReg);
      expect(labelText).not.toMatch(starReg);
    });

    it('Should not have any mandatory - 2', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder,
        // showMandatoryIndication: true,
        validate: 'required',
        label: 'label'
      });
      const placeholderText = textFieldDriver.getPlaceholder().getText();
      const labelText = textFieldDriver.getLabel().getText();
      expect(placeholderText).not.toMatch(starReg);
      expect(labelText).not.toMatch(starReg);
    });

    it('Should have mandatory on the floating placeholder', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder,
        floatingPlaceholder: true,
        floatOnFocus: true,
        showMandatoryIndication: true,
        validate: 'required'
      });
      const placeholderText = textFieldDriver.getPlaceholder().getText();
      expect(placeholderText).toMatch(starReg);
    });

    // Special cases
    it('Should have mandatory on the label and not on the placeholder', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder,
        showMandatoryIndication: true,
        validate: 'required',
        label: 'label'
      });
      const labelText = textFieldDriver.getLabel().getText();
      const placeholderText = textFieldDriver.getPlaceholder().getText();
      expect(labelText).toMatch(starReg);
      expect(placeholderText).not.toMatch(starReg);
    });
  });

  describe('Mandatory Indication', () => {
    it('Should show mandatory star indication - 1', () => {
      const renderTree = render(<TestCase testID={'field'} validate={'required'} label={'Label'} showMandatoryIndication/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getLabel().getText()).toEqual('Label*');
    });
    it('Should show mandatory star indication - 2', () => {
      const renderTree = render(<TestCase testID={'field'} validate={['email', 'required']} label={'Label'} showMandatoryIndication/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getLabel().getText()).toEqual('Label*');
    });
    it('Should not show mandatory star indication - 1', () => {
      const renderTree = render(<TestCase testID={'field'} validate={['email', 'required']} label={'Label'}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getLabel().getText()).not.toEqual('Label*');
    });
    it('Should not show mandatory star indication - 2', () => {
      const renderTree = render(<TestCase testID={'field'} validate={['email']} label={'Label'} showMandatoryIndication/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getLabel().getText()).not.toEqual('Label*');
    });
  });
});
