import React, {useState} from 'react';
import {render} from '@testing-library/react-native';
import View from '../../../components/view';
import {TextFieldDriver} from '../TextField.driver.new';
import TextField from '../index';
import {TextFieldProps} from '../types';

const TEXT_FIELD_TEST_ID = 'text_field_test_id';

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

    expect(textFieldDriver.getText()).toEqual('aa');
  });

  it('should change the text correctly', () => {
    const renderTree = render(<TestCase value={'aa'}/>);
    const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

    expect(textFieldDriver.getText()).toEqual('aa');

    textFieldDriver.changeText('bb');

    expect(textFieldDriver.getText()).toEqual('bb');
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

      expect(textFieldDriver.isPlaceholderVisible()).toBe(true);
      expect(textFieldDriver.getPlaceholderText()).toEqual('mock placeholder');
    });

    it('should not render placeholder', () => {
      const renderTree = render(<TestCase/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isPlaceholderVisible()).toBe(false);
    });

    it('should not render placeholder after user changing the input text(no floating prop)', () => {
      const renderTree = render(<TestCase placeholder={'mock placeholder'}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isPlaceholderVisible()).toBe(true);

      textFieldDriver.changeText('mock input value');

      expect(textFieldDriver.isPlaceholderVisible()).toBe(false);
    });

    it('should render placeholder(floating) after user changing text if floatingPlaceholder prop sent', () => {
      const renderTree = render(<TestCase placeholder={'mock placeholder'} floatingPlaceholder/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isPlaceholderVisible()).toBe(true);

      textFieldDriver.changeText('mock input value');

      expect(textFieldDriver.isPlaceholderVisible()).toBe(true);
      expect(textFieldDriver.getPlaceholderText()).toEqual('mock placeholder');
    });
  });

  describe('Label', () => {
    it('should not render label if prop is not passed', () => {
      const renderTree = render(<TestCase/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isLabelVisible()).toBe(false);
    });

    it('should render a label', () => {
      const renderTree = render(<TestCase label={'mock label'}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isLabelVisible()).toBe(true);

      expect(textFieldDriver.getLabelText()).toEqual('mock label');
    });

    it('should not render label if floatingPlaceholder prop is passed', () => {
      const renderTree = render(<TestCase label={'mock label'} floatingPlaceholder/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isLabelVisible()).toBe(false);
    });
  });

  describe('validation message', () => {
    it('should not render validationMessage if enableErrors prop not supplied', () => {
      const renderTree = render(<TestCase value={''} validationMessage={'mock message'} validateOnStart/>);

      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isValidationMsgVisible()).toBe(false);
    });

    it('should render validationMessage on start if input required and validateOnStart passed', () => {
      const renderTree = render(<TestCase value={''} validationMessage={'mock message'} enableErrors validateOnStart/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isValidationMsgVisible()).toBe(true);
      expect(textFieldDriver.getValidationMsgText()).toEqual('mock message');
    });

    it('should render validationMessage when input is requires after changing the input to empty string', () => {
      const renderTree = render(<TestCase value={''} validate={'required'} validationMessage={'mock message'} enableErrors validateOnChange/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isValidationMsgVisible()).toBe(false);
      expect(textFieldDriver.getValidationMsgText()).toEqual('');

      textFieldDriver.changeText('');

      expect(textFieldDriver.isValidationMsgVisible()).toBe(true);
      expect(textFieldDriver.getValidationMsgText()).toEqual('mock message');
    });
  });

  describe('char counter', () => {
    it('should  render char counter.', () => {
      const renderTree = render(<TestCase maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isCharCounterVisible()).toBe(true);
    });

    it('should not render counter if maxLength prop not supplied', () => {
      const renderTree = render(<TestCase showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.isCharCounterVisible()).toBe(false);
    });

    it('should not render counter if showCharCounter prop not supplied', () => {
      const renderTree = render(<TestCase maxLength={10}/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isCharCounterVisible()).toBe(false);
    });

    it('should render char counter, with "0/10" if value not supplied', () => {
      const renderTree = render(<TestCase maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounterText()).toEqual('0/10');
    });

    it('should render char counter with correct content supplied', () => {
      const renderTree = render(<TestCase value={'abc'} maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounterText()).toEqual('3/10');
    });

    it('should update char counter after changing the text', () => {
      const renderTree = render(<TestCase value={'ab'} maxLength={10} showCharCounter/>);
      const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

      expect(textFieldDriver.getCharCounterText()).toEqual('2/10');

      textFieldDriver.changeText('abcd');

      expect(textFieldDriver.getCharCounterText()).toEqual('4/10');
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
  describe('Mandatory Indication', () => {
    const getTestCaseDriver = (props: TextFieldProps) => {
      const renderTree = render(<TestCase {...props}/>);
      return TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
    };
    const starReg = /.*\*$/;

    //Sanity
    it('Should show mandatory indication on the label', () => {
      const textFieldDriver = getTestCaseDriver({label: 'Label', validate: 'required', showMandatoryIndication: true});
      const labelContent = textFieldDriver.getLabelText();
      expect(labelContent).toMatch(starReg);
    });
    it('Should show mandatory indication on the label', () => {
      const textFieldDriver = getTestCaseDriver({
        label: 'Label',
        validate: ['required'],
        showMandatoryIndication: true
      });
      const labelContent = textFieldDriver.getLabelText();
      expect(labelContent).toMatch(starReg);
    });
    it('Should not show mandatory indication on label', () => {
      const textFieldDriver = getTestCaseDriver({label: 'label', showMandatoryIndication: true});
      const labelText = textFieldDriver.getLabelText();
      expect(labelText).not.toMatch(starReg);
    });
    it('Should not show mandatory indication on label', () => {
      const textFieldDriver = getTestCaseDriver({label: 'label', validate: 'required'});
      const labelText = textFieldDriver.getLabelText();
      expect(labelText).not.toMatch(starReg);
    });
    it('Should have mandatory on the placeholder', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        showMandatoryIndication: true,
        validate: 'required'
      });
      const placeholderText = textFieldDriver.getPlaceholderText();
      expect(placeholderText).toMatch(starReg);
    });
    it('Should not have any mandatory - 1', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        showMandatoryIndication: true,
        // validate: 'required',
        label: 'label'
      });
      const placeholderText = textFieldDriver.getPlaceholderText();
      const labelText = textFieldDriver.getLabelText();
      expect(placeholderText).not.toMatch(starReg);
      expect(labelText).not.toMatch(starReg);
    });
    it('Should not have any mandatory - 2', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        // showMandatoryIndication: true,
        validate: 'required',
        label: 'label'
      });
      const placeholderText = textFieldDriver.getPlaceholderText();
      const labelText = textFieldDriver.getLabelText();
      expect(placeholderText).not.toMatch(starReg);
      expect(labelText).not.toMatch(starReg);
    });
    it('Should have mandatory on the floating placeholder', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        floatingPlaceholder: true,
        floatOnFocus: true,
        showMandatoryIndication: true,
        validate: 'required'
      });
      const placeholderText = textFieldDriver.getPlaceholderText();
      expect(placeholderText).toMatch(starReg);
    });

    // Special cases
    it('Should have mandatory on the label and not on the placeholder', () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        showMandatoryIndication: true,
        validate: 'required',
        label: 'label'
      });
      const labelText = textFieldDriver.getLabelText();
      const placeholderText = textFieldDriver.getPlaceholderText();
      expect(labelText).toMatch(starReg);
      expect(placeholderText).not.toMatch(starReg);
    });
  });
});
