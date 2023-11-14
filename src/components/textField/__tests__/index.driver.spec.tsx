import React, {useState} from 'react';
import {waitFor} from '@testing-library/react-native';
import View from '../../../components/view';
import {TextFieldDriver} from '../TextField.driver';
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
    TextFieldDriver.clear();
    jest.clearAllMocks();
  });

  it('should render textField', async () => {
    const component = <TestCase/>;
    const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

    expect(await textFieldDriver.exists()).toBe(true);
  });

  it('should render textField with correct content', async () => {
    const component = <TestCase value={'aa'}/>;
    const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

    expect(await textFieldDriver.getContent()).toEqual('aa');
  });

  it('should change the text correctly', async () => {
    const component = <TestCase value={'aa'}/>;
    const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

    expect(await textFieldDriver.getContent()).toEqual('aa');

    await textFieldDriver.changeText('bb');

    await waitFor(async () => expect(await textFieldDriver.getContent()).toEqual('bb'));
  });

  describe('editable', () => {
    it('should be editable', async () => {
      const component = <TestCase/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isDisabled()).toBe(false);
    });

    it('should render textField that is not editable', async () => {
      const component = <TestCase editable={false}/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isDisabled()).toBe(true);
    });
  });

  describe('readonly', () => {
    it('should render textField that is not readonly', async () => {
      const component = <TestCase/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isDisabled()).toBe(false);
    });

    it('should be readonly', async () => {
      const component = <TestCase readonly/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isDisabled()).toBe(true);
    });
  });

  describe('placeholder', () => {
    it('should render placeholder with correct text', async () => {
      const component = <TestCase placeholder={'mock placeholder'}/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isPlaceholderVisible()).toBe(true);
      expect(await textFieldDriver.getPlaceholderContent()).toEqual('mock placeholder');
    });

    it('should not render placeholder', async () => {
      const component = <TestCase/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isPlaceholderVisible()).toBe(false);
    });

    it('should not render placeholder after user changing the input text(no floating prop)', async () => {
      const component = <TestCase placeholder={'mock placeholder'}/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
      expect(await textFieldDriver.isPlaceholderVisible()).toBe(true);

      textFieldDriver.changeText('mock input value');

      await waitFor(async () => expect(await textFieldDriver.isPlaceholderVisible()).toBe(false));
    });

    it('should render placeholder(floating) after user changing text if floatingPlaceholder prop sent', async () => {
      const component = <TestCase placeholder={'mock placeholder'} floatingPlaceholder/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
      expect(await textFieldDriver.isPlaceholderVisible()).toBe(true);

      textFieldDriver.changeText('mock input value');

      await waitFor(async () => expect(await textFieldDriver.isPlaceholderVisible()).toBe(true));
      await waitFor(async () => expect(await textFieldDriver.getPlaceholderContent()).toEqual('mock placeholder'));
    });
  });

  describe('Label', () => {
    it('should not render label if prop is not passed', async () => {
      const component = <TestCase/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isLabelExists()).toBe(false);
    });

    it('should render a label', async () => {
      const component = <TestCase label={'mock label'}/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
      expect(await textFieldDriver.isLabelExists()).toBe(true);

      expect(await textFieldDriver.getLabelContent()).toEqual('mock label');
    });

    it('should not render label if floatingPlaceholder prop is passed', async () => {
      const component = <TestCase label={'mock label'} floatingPlaceholder/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
      expect(await textFieldDriver.isLabelExists()).toBe(false);
    });
  });

  describe('validation message', () => {
    it('should not render validationMessage if enableErrors prop not supplied', async () => {
      const component = <TestCase value={''} validationMessage={'mock message'} validateOnStart/>;

      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isValidationMsgExists()).toBe(false);
    });

    it('should render validationMessage on start if input required and validateOnStart passed', async () => {
      const component = <TestCase value={''} validationMessage={'mock message'} enableErrors validateOnStart/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isValidationMsgExists()).toBe(true);
      expect(await textFieldDriver.getValidationMsgContent()).toEqual('mock message');
    });

    it('should render validationMessage when input is requires after changing the input to empty string', async () => {
      const component = (
        <TestCase value={''} validate={'required'} validationMessage={'mock message'} enableErrors validateOnChange/>
      );
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isValidationMsgExists()).toBe(false);
      expect(await textFieldDriver.getValidationMsgContent()).toEqual('');

      await textFieldDriver.changeText('');

      await waitFor(async () => expect(await textFieldDriver.isValidationMsgExists()).toBe(true));
      expect(await textFieldDriver.getValidationMsgContent()).toEqual('mock message');
    });
  });

  describe('char counter', () => {
    it('should  render char counter.', async () => {
      const component = <TestCase maxLength={10} showCharCounter/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isCharCounterExists()).toBe(true);
    });

    it('should not render counter if maxLength prop not supplied', async () => {
      const component = <TestCase showCharCounter/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isCharCounterExists()).toBe(false);
    });

    it('should not render counter if showCharCounter prop not supplied', async () => {
      const component = <TestCase maxLength={10}/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
      expect(await textFieldDriver.isCharCounterExists()).toBe(false);
    });

    it('should render char counter, with "0/10" if value not supplied', async () => {
      const component = <TestCase maxLength={10} showCharCounter/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.getCharCounterContent()).toEqual('0/10');
    });

    it('should render char counter with correct content supplied', async () => {
      const component = <TestCase value={'abc'} maxLength={10} showCharCounter/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.getCharCounterContent()).toEqual('3/10');
    });

    it('should update char counter after changing the text', async () => {
      const component = <TestCase value={'ab'} maxLength={10} showCharCounter/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.getCharCounterContent()).toEqual('2/10');

      textFieldDriver.changeText('abcd');

      await waitFor(async () => expect(await textFieldDriver.getCharCounterContent()).toEqual('4/10'));
    });
  });

  describe('validateOnBlur', () => {
    it('validate is called with undefined when defaultValue is not given', async () => {
      const component = <TestCase validateOnBlur validationMessage={'Not valid'} validate={[validate]}/>;
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.focus();
      textFieldDriver.blur();
      await waitFor(() => expect(validate).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(validate).toHaveBeenCalledWith(undefined));
    });

    it('validate is called with defaultValue when defaultValue is given', async () => {
      const defaultValue = '1';
      const component = (
        <TestCase validateOnBlur validationMessage={'Not valid'} validate={[validate]} defaultValue={defaultValue}/>
      );
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
      textFieldDriver.focus();
      textFieldDriver.blur();
      await waitFor(() => expect(validate).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(validate).toHaveBeenCalledWith(defaultValue));
    });
  });
  describe('Mandatory Indication', () => {
    const getTestCaseDriver = (props: TextFieldProps) => {
      const component = <TestCase {...props}/>;
      return new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});
    };
    const starReg = /.*\*$/;

    //Sanity
    it('Should show mandatory indication on the label', async () => {
      const textFieldDriver = getTestCaseDriver({label: 'Label', validate: 'required', showMandatoryIndication: true});
      const labelContent = await textFieldDriver.getLabelContent();
      expect(labelContent).toMatch(starReg);
    });
    it('Should show mandatory indication on the label', async () => {
      const textFieldDriver = getTestCaseDriver({
        label: 'Label',
        validate: ['required'],
        showMandatoryIndication: true
      });
      const labelContent = await textFieldDriver.getLabelContent();
      expect(labelContent).toMatch(starReg);
    });
    it('Should not show mandatory indication on label', async () => {
      const textFieldDriver = getTestCaseDriver({label: 'label', showMandatoryIndication: true});
      const labelText = await textFieldDriver.getLabelContent();
      expect(labelText).not.toMatch(starReg);
    });
    it('Should not show mandatory indication on label', async () => {
      const textFieldDriver = getTestCaseDriver({label: 'label', validate: 'required'});
      const labelText = await textFieldDriver.getLabelContent();
      expect(labelText).not.toMatch(starReg);
    });
    it('Should have mandatory on the placeholder', async () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        showMandatoryIndication: true,
        validate: 'required'
      });
      const placeholderText = await textFieldDriver.getPlaceholderContent();
      expect(placeholderText).toMatch(starReg);
    });
    it('Should not have any mandatory - 1', async () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        showMandatoryIndication: true,
        // validate: 'required',
        label: 'label'
      });
      const placeholderText = await textFieldDriver.getPlaceholderContent();
      const labelText = await textFieldDriver.getLabelContent();
      expect(placeholderText).not.toMatch(starReg);
      expect(labelText).not.toMatch(starReg);
    });
    it('Should not have any mandatory - 2', async () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        // showMandatoryIndication: true,
        validate: 'required',
        label: 'label'
      });
      const placeholderText = await textFieldDriver.getPlaceholderContent();
      const labelText = await textFieldDriver.getLabelContent();
      expect(placeholderText).not.toMatch(starReg);
      expect(labelText).not.toMatch(starReg);
    });
    it('Should have mandatory on the floating placeholder', async () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        floatingPlaceholder: true,
        floatOnFocus: true,
        showMandatoryIndication: true,
        validate: 'required'
      });
      const placeholderText = await textFieldDriver.getPlaceholderContent();
      expect(placeholderText).toMatch(starReg);
    });

    // Special cases
    it('Should have mandatory on the label and not on the placeholder', async () => {
      const textFieldDriver = getTestCaseDriver({
        placeholder: 'placeholder',
        showMandatoryIndication: true,
        validate: 'required',
        label: 'label'
      });
      const labelText = await textFieldDriver.getLabelContent();
      const placeholderText = await textFieldDriver.getPlaceholderContent();
      expect(labelText).toMatch(starReg);
      expect(placeholderText).not.toMatch(starReg);
    });
  });
});
