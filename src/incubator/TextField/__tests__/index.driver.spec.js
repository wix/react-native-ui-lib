import React, {useState} from 'react';
import {render, waitFor} from '@testing-library/react-native';
import View from '../../../components/view';
import {TextFieldDriver} from '../TextField.driver';
import TextField from '../index';

const TEXT_FIELD_TEST_ID = 'text_field_test_id';

function renderWrapperScreenWithTextField(textFieldProps) {
  return render(<ScreenWithTextField {...textFieldProps}/>);
}

function ScreenWithTextField(textFieldProps) {
  const [value, setValue] = useState(textFieldProps.value);
  return (<View>
    <TextField {...textFieldProps} testID={TEXT_FIELD_TEST_ID} value={value} onChangeText={setValue}/>
  </View>);
}


describe('TextField', () => {
  it('should render textField', async () => {
    const wrapperComponent = renderWrapperScreenWithTextField({});
    const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
    expect(textFieldDriver.exists()).toBe(true);
  });

  it('should render textField with correct content', async () => {
    const wrapperComponent = renderWrapperScreenWithTextField({value: 'aa'});
    const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
    expect(textFieldDriver.content()).toEqual('aa');
  });

  it('should change the text correctly', async () => {
    const wrapperComponent = renderWrapperScreenWithTextField({value: 'aa'});
    const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
    expect(textFieldDriver.content()).toEqual('aa');
    textFieldDriver.changeText('bb');
    await waitFor(() => expect(textFieldDriver.content()).toEqual('bb'));
  });

  describe('editable', () => {
    it('should be editable', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isDisabled()).toBe(false);
    });

    it('should render textField that is not editable', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({editable: false});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isDisabled()).toBe(true);
    });
  });

  describe('placeholder', () => {
    it('should render placeholder with correct text', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({placeholder: 'mock placeholder'});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isPlaceholderVisible()).toBe(true);
      expect(textFieldDriver.getPlaceholderContent()).toEqual('mock placeholder');
    });

    it('should not render placeholder', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isPlaceholderVisible()).toBe(false);
    });

    it('should not render placeholder after user changing the input text(no floating prop)', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({placeholder: 'mock placeholder'});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isPlaceholderVisible()).toBe(true);
      textFieldDriver.changeText('mock input value');
      await waitFor(() => expect(textFieldDriver.isPlaceholderVisible()).toBe(false));
    });

    it('should render placeholder(floating) after user changing text if floatingPlaceholder prop sent', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({placeholder: 'mock placeholder', floatingPlaceholder: true});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isPlaceholderVisible()).toBe(true);
      textFieldDriver.changeText('mock input value');
      await waitFor(() => expect(textFieldDriver.isPlaceholderVisible()).toBe(true));
      await waitFor(() => expect(textFieldDriver.getPlaceholderContent()).toEqual('mock placeholder'));

    });
  });

  describe('Label', () => {
    it('should not render label if prop is not passed', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isLabelExists()).toBe(false);
    });

    it('should render a label', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({label: 'mock label'});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isLabelExists()).toBe(true);
      expect(textFieldDriver.getLabelContent()).toEqual('mock label');
    });

    it('should not render label if floatingPlaceholder prop is passed', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({label: 'mock label', floatingPlaceholder: true});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isLabelExists()).toBe(false);
    });
  });

  describe('validation message', () => {
    it('should not render validationMessage if enableErrors prop not supplied', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({value: '', validate: 'required', validationMessage: 'mock message', validateOnStart: true});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isValidationMsgExists()).toBe(false);
    });

    it('should render validationMessage on start if input required and validateOnStart passed', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({value: '', validate: 'required', validationMessage: 'mock message', enableErrors: true, validateOnStart: true});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isValidationMsgExists()).toBe(true);
      expect(textFieldDriver.getValidationMsgContent()).toEqual('mock message');
    });

    it('should render validationMessage when input is requires after changing the input to empty string', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({value: 'mock value', validate: 'required', validationMessage: 'mock message', enableErrors: true, validateOnChange: true});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isValidationMsgExists()).toBe(false);
      expect(textFieldDriver.getValidationMsgContent()).toEqual('');
      textFieldDriver.changeText('');
      await waitFor(() => expect(textFieldDriver.isValidationMsgExists()).toBe(true));
      expect(textFieldDriver.getValidationMsgContent()).toEqual('mock message');
    });
  });

  describe('char counter', () => {
    it('should  render char counter.', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({showCharCounter: true, maxLength: 10});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isCharCounterExists()).toBe(true);
    });

    it('should not render counter if maxLength prop not supplied', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({showCharCounter: true});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isCharCounterExists()).toBe(false);
    });

    it('should not render counter if showCharCounter prop not supplied', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({maxLength: 10});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.isCharCounterExists()).toBe(false);
    });

    it('should render char counter, with "0/10" if value not supplied', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({showCharCounter: true, maxLength: 10});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getCharCounterContent()).toEqual('0/10');
    });

    it('should render char counter with correct content supplied', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({value: 'abc', showCharCounter: true, maxLength: 10});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getCharCounterContent()).toEqual('3/10');
    });

    it('should update char counter after changing the text', async () => {
      const wrapperComponent = renderWrapperScreenWithTextField({value: 'ab', showCharCounter: true, maxLength: 10});
      const textFieldDriver = await TextFieldDriver({wrapperComponent, testID: TEXT_FIELD_TEST_ID});
      expect(textFieldDriver.getCharCounterContent()).toEqual('2/10');
      textFieldDriver.changeText('abcd');
      await waitFor(() => expect(textFieldDriver.getCharCounterContent()).toEqual('4/10'));
    });
  });
});
