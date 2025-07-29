import React, {useState} from 'react';
import {waitFor, render} from '@testing-library/react-native';
import View from '../../view';
import Text from '../../text';
import {TextDriver} from '../../text/Text.driver.new';
import {ButtonDriver} from '../Button.driver.new';
import Button, {ButtonProps} from '../index';

const BUTTON_ID = 'button_test_id';
const CHILDREN_TEXT_ID = 'children_test_id';
const CHILDREN_TEXT = 'custom button text';

// TODO: This tests are flaky and only fail on CI - we should investigate why
describe('Button', () => {
  it('should render a button', async () => {
    const renderTree = render(<WrapperScreenWithButton/>);
    const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
    expect(await buttonDriver.exists()).toBeTruthy();
  });

  describe('style', () => { 
    it('should render a button with custom style', async () => {
      const style = {borderWidth: 2, borderColor: 'green'};
      const renderTree = render(<WrapperScreenWithButton style={style}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      
      expect(buttonDriver.exists()).toBeTruthy();
      expect(await buttonDriver.getStyle().borderWidth).toEqual(style.borderWidth);
      expect(await buttonDriver.getStyle().borderColor).toEqual(style.borderColor);
    });
  });

  describe('custom button', () => {
    it('should render a custom button', async () => {
      const renderTree = render(<WrapperScreenWithCustomButton/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      expect(buttonDriver.exists()).toBeTruthy();
    });

    it('should render the children with correct text', async () => {
      const renderTree = render(<WrapperScreenWithCustomButton/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      expect(buttonDriver.exists()).toBeTruthy();
      const childrenTextDriver = TextDriver({renderTree, testID: CHILDREN_TEXT_ID});
      expect(await childrenTextDriver.getText()).toEqual(CHILDREN_TEXT);
    });
  });

  describe('onPress', () => {
    let onPressCallback: jest.Mock;
    beforeEach(() => (onPressCallback = jest.fn()));
    afterEach(() => onPressCallback.mockClear());

    it('should trigger onPress callback', async () => {
      const props = {onPress: onPressCallback};
      const renderTree = render(<WrapperScreenWithButton {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      buttonDriver.press();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(1));
    });

    it('should not trigger onPress callback if button disabled', async () => {
      const props = {disabled: true, onPress: onPressCallback};
      const renderTree = render(<WrapperScreenWithButton {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      buttonDriver.press();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(0));
    });
    it.each([true, false])(`button should be disabled when disabled is %s`, (disabled) => {
      const renderTree = render(<WrapperScreenWithButton disabled={disabled}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      expect(buttonDriver.isDisabled()).toBe(disabled);
    });
  });

  describe('label', () => {
    const LABEL = 'mock label';
    it('should render a button with correct content', async () => {
      const props = {label: LABEL};
      const renderTree = render(<WrapperScreenWithButton {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      expect(await buttonDriver.getLabel().getText()).toEqual(LABEL);
    });

    it('should render a button with correct label content. ', async () => {
      const props = {label: LABEL};
      const renderTree = render(<WrapperScreenWithButton {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      expect(await buttonDriver.getLabel().getText()).toEqual(LABEL);
    });

    it('should render a button without label. ', async () => {
      const renderTree = render(<WrapperScreenWithButton/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      expect(await buttonDriver.getLabel().exists()).toBeFalsy();
    });
  });

  describe('icon', () => {
    it('should render a button without an icon. ', async () => {
      const renderTree = render(<WrapperScreenWithButton/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});
      expect(await buttonDriver.getIcon().exists()).toBeFalsy();
    });

    it('should render a button with icon. ', async () => {
      const ICON = 12;
      const props = {iconSource: ICON};
      const renderTree = render(<WrapperScreenWithButton {...props}/>);
      const buttonDriver = ButtonDriver({renderTree, testID: 'button_test_id'});

      expect(await buttonDriver.getIcon().exists()).toBeTruthy();
    });
  });

  describe('more complicated screen', () => {
    //todo take it out of this file. to the demo screens maybe
    it('should change text values according to state changes from buttons pressing', async () => {
      const renderTree = render(StatefulScreen());
      const text1Driver = TextDriver({testID: `text_1`, renderTree});
      const text2Driver = TextDriver({testID: `text_2`, renderTree});
      const button2Driver = ButtonDriver({testID: `${BUTTON_ID}2`, renderTree});
      const button1Driver = ButtonDriver({testID: `${BUTTON_ID}1`, renderTree});

      expect(await text1Driver.getText()).toBe('button 1 pressed 0 times');
      expect(await text2Driver.getText()).toBe('button 2 pressed 0 times');

      await button1Driver.press();
      await button1Driver.press();
      await button2Driver.press();

      await waitFor(async () => expect(await text1Driver.getText()).toBe('button 1 pressed 2 times'));
      await waitFor(async () => expect(await text2Driver.getText()).toBe('button 2 pressed 1 times'));
    });
  });
});

function WrapperScreenWithButton(buttonProps: ButtonProps = {}) {
  return (
    <View testID={'wrapper_screen_test_id'}>
      <Button {...buttonProps} testID={BUTTON_ID}/>
    </View>
  );
}

function WrapperScreenWithCustomButton(buttonProps: {onPress?: () => void} = {}) {
  const {onPress} = buttonProps;
  return (
    <View testID={'wrapper_screen_test_id'}>
      <Button testID={BUTTON_ID} onPress={onPress}>
        <Text testID={CHILDREN_TEXT_ID}>{CHILDREN_TEXT}</Text>
      </Button>
    </View>
  );
}

const StatefulScreen = () => <StatefulScreenWithTextsAndButtons/>;

const StatefulScreenWithTextsAndButtons = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <View testID={'stateful_wrapper_screen_test_id'}>
      <Text testID={'text_1'}>{`button 1 pressed ${count1} times`}</Text>
      <Text testID={'text_2'}>{`button 2 pressed ${count2} times`}</Text>
      <Button testID={`${BUTTON_ID}1`} onPress={() => setCount1(count1 + 1)}/>
      <Button testID={`${BUTTON_ID}2`} onPress={() => setCount2(count2 + 1)}/>
    </View>
  );
};
