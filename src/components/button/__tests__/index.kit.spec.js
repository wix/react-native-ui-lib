import React, {useState} from 'react';
import {render, waitFor} from '@testing-library/react-native';
import Button from '../index';
import View from '../../view';
import ButtonTestKit from '../Button.driver';
import {Text} from '../../text/index';
import TextTestKit from '../../text/Text.driver';

const BUTTON_ID = 'button_test_id';
const CHILDREN_TEXT_ID = 'children_test_id';
const CHILDREN_TEXT = 'custom button text';

describe('Button', () => {
  it('should render a button', async () => {
    const wrapper = renderWrapperScreenWithButton({});
    const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
    expect(button.exists()).toBeTruthy();
  });

  describe('custom button', () => {
    it('should render a custom button', async () => {
      const wrapper = renderWrapperScreenWithCustomButton({});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      expect(button.exists()).toBeTruthy();
    });

    it('should render the children with correct text', async () => {
      const wrapper = renderWrapperScreenWithCustomButton({});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      expect(button.exists()).toBeTruthy();
      const childrenText = await TextTestKit({wrapperComponent: wrapper, testID: CHILDREN_TEXT_ID});
      expect(childrenText.getTextContent()).toEqual(CHILDREN_TEXT);
    });
  });

  describe('OnPress', () => {
    let onPressCallback;
    beforeEach(() => onPressCallback = jest.fn());
    afterEach(() => onPressCallback.mockClear());
    it('should trigger onPress callback', async () => {
      const wrapper = renderWrapperScreenWithButton({onPress: onPressCallback});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      button.click();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(1));
    });

    it('should not trigger onPress callback if button disabled', async () => {
      const wrapper = renderWrapperScreenWithButton({onPress: onPressCallback, disabled: true});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      button.click();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(0));
    });
  });

  describe('label', () => {
    const LABEL = 'mock label';
    it('should render a button with correct content', async () => {
      const wrapper = renderWrapperScreenWithButton({label: LABEL});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      expect(button.getLabelContent()).toEqual(LABEL);
    });

    xit('should render a button with correct label content. ', async () => {
    // todo import @testing-library/jest-native(/extend-expect)
      const wrapper = renderWrapperScreenWithButton({label: LABEL});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      expect(button.getLabelRootElement()).toHaveTextContent(LABEL);
    });

    it('should render a button without label. ', async () => {
      const wrapper = renderWrapperScreenWithButton({});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      expect(button.isLabelExists()).toBeFalsy();
    });
  });

  describe('icon', () => {
    it('should render a button without an icon. ', async () => {
      const wrapper = renderWrapperScreenWithButton({});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      expect(button.isIconExists()).toBeFalsy();
    });

    it('should render a button with icon. ', async () => {
      const ICON = 12;
      const wrapper = renderWrapperScreenWithButton({iconSource: ICON});
      const button = await ButtonTestKit({wrapperComponent: wrapper, testID: BUTTON_ID});
      expect(button.isIconExists()).toBeTruthy();
    });
  });

  describe('more complicated screen', () => {
    //todo take it out of this file. to the demo screens maybe
    it('should change text values according to state changes from buttons pressing', async () => {
      const wrapper = renderMoreComplicatedScreen();
      const text1 = await TextTestKit({wrapperComponent: wrapper, testID: `text_1`});
      const text2 = await TextTestKit({wrapperComponent: wrapper, testID: `text_2`});
      const button1 = await ButtonTestKit({wrapperComponent: wrapper, testID: `${BUTTON_ID}1`});
      const button2 = await ButtonTestKit({wrapperComponent: wrapper, testID: `${BUTTON_ID}2`});
      expect(text1.getTextContent()).toBe('button 1 pressed 0 times');
      expect(text2.getTextContent()).toBe('button 2 pressed 0 times');
      button1.click();
      button1.click();
      button2.click();
      await waitFor(() => expect(text1.getTextContent()).toBe('button 1 pressed 2 times'));
      await waitFor(() => expect(text2.getTextContent()).toBe('button 2 pressed 1 times'));
    });
  });
});

function renderWrapperScreenWithButton(buttonProps) {
  const {onPress, label, iconSource, disabled} = buttonProps;
  return render(<View testID={'wrapper_screen_test_id'}>
    <Button testID={BUTTON_ID} onPress={onPress} label={label} iconSource={iconSource} disabled={disabled}/>
  </View>);
}

function renderWrapperScreenWithCustomButton(buttonProps) {
  const {onPress} = buttonProps;
  return render(<View testID={'wrapper_screen_test_id'}>
    <Button testID={BUTTON_ID} onPress={onPress}>
      <Text modifiers={{}} testID={CHILDREN_TEXT_ID}>{CHILDREN_TEXT}</Text>
    </Button>
  </View>);
}

function renderMoreComplicatedScreen() {
  return render(<StatefulScreenWithTextsAndButtons/>);
}

const StatefulScreenWithTextsAndButtons = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <View testID={'stateful_wrapper_screen_test_id'}>
      <Text testID={'text_1'} modifiers={{}}>{`button 1 pressed ${count1} times`}</Text>
      <Text testID={'text_2'} modifiers={{}}>{`button 2 pressed ${count2} times`}</Text>
      <Button testID={`${BUTTON_ID}1`} onPress={() => setCount1(count1 + 1)}/>
      <Button testID={`${BUTTON_ID}2`} onPress={() => setCount2(count2 + 1)}/>
    </View>
  );
};
