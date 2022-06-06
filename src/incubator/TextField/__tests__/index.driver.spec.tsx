import React, {useState} from 'react';
import {waitFor} from '@testing-library/react-native';
import View from '../../../components/view';
import {TextFieldDriver} from '../TextField.driver';
import TextField from '../index';
import {Validator} from '../types';

const TEXT_FIELD_TEST_ID = 'text_field_test_id';
interface TextFieldProps {
  value?: string;
  placeholder?: string;
  label?: string;
  validationMessage?: string;
  validate?: Validator;
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  enableErrors?: boolean;
  editable?: boolean;
  floatingPlaceholder?: boolean;
  showCharCounter?: boolean;
  maxLength?: number;
}

function TestCase(textFieldProps?: TextFieldProps) {
  const [value, setValue] = useState(textFieldProps?.value);
  return (<View>
    <TextField {...textFieldProps} testID={TEXT_FIELD_TEST_ID} value={value} onChangeText={setValue}/>
  </View>);
}


describe('TextField', () => {
  afterEach(() => TextFieldDriver.clear());

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

      console.log('await textFieldDriver.isLabelExists(): ', await textFieldDriver.isLabelExists());
      expect(await textFieldDriver.isLabelExists()).toBe(false);
    });
  });

  describe('validation message', () => {
    it('should not render validationMessage if enableErrors prop not supplied', async () => {
      const component = (
        <TestCase
          value={''}
          validationMessage={'mock message'}
          validateOnStart
        />);

      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isValidationMsgExists()).toBe(false);
    });

    it('should render validationMessage on start if input required and validateOnStart passed', async () => {
      const component = (
        <TestCase
          value={''}
          validationMessage={'mock message'}
          enableErrors
          validateOnStart
        />);
      const textFieldDriver = new TextFieldDriver({component, testID: TEXT_FIELD_TEST_ID});

      expect(await textFieldDriver.isValidationMsgExists()).toBe(true);
      expect(await textFieldDriver.getValidationMsgContent()).toEqual('mock message');
    });

    it('should render validationMessage when input is requires after changing the input to empty string', async () => {
      const component = (
        <TestCase
          value={''}
          validate={'required'}
          validationMessage={'mock message'}
          enableErrors
          validateOnChange
        />);
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
});
