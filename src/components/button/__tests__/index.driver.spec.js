import React, {useState} from 'react';
import {render, waitFor} from '@testing-library/react-native';
import Button from '../index';
import View from '../../view';
import ButtonTestKit from '../Button.driver';
import Text from '../../text';
import TextTestKit from '../../text/Text.driver';

const BUTTON_ID = 'button_test_id';
const CHILDREN_TEXT_ID = 'children_test_id';
const CHILDREN_TEXT = 'custom button text';

// TODO: This tests are flaky and only fail on CI - we should investigate why
describe.skip('Button', () => {
  it('should render a button', async () => {
    const wrapperComponent = renderWrapperScreenWithButton({});
    const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
    expect(buttonDriver.exists()).toBeTruthy();
  });

  describe('custom button', () => {
    it('should render a custom button', async () => {
      const wrapperComponent = renderWrapperScreenWithCustomButton({});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      expect(buttonDriver.exists()).toBeTruthy();
    });

    it('should render the children with correct text', async () => {
      const wrapperComponent = renderWrapperScreenWithCustomButton({});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      expect(buttonDriver.exists()).toBeTruthy();
      const childrenTextDriver = await TextTestKit({wrapperComponent, testID: CHILDREN_TEXT_ID});
      expect(childrenTextDriver.getTextContent()).toEqual(CHILDREN_TEXT);
    });
  });

  describe('OnPress', () => {
    let onPressCallback;
    beforeEach(() => onPressCallback = jest.fn());
    afterEach(() => onPressCallback.mockClear());
    
    it('should trigger onPress callback', async () => {
      const wrapperComponent = renderWrapperScreenWithButton({onPress: onPressCallback});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      buttonDriver.click();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(1));
    });

    it('should not trigger onPress callback if button disabled', async () => {
      const wrapperComponent = renderWrapperScreenWithButton({onPress: onPressCallback, disabled: true});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      buttonDriver.click();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(0));
    });
  });

  describe('label', () => {
    const LABEL = 'mock label';
    it('should render a button with correct content', async () => {
      const wrapperComponent = renderWrapperScreenWithButton({label: LABEL});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      expect(buttonDriver.getLabelContent()).toEqual(LABEL);
    });

    xit('should render a button with correct label content. ', async () => {
    // todo import @testing-library/jest-native(/extend-expect)
      const wrapperComponent = renderWrapperScreenWithButton({label: LABEL});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      expect(buttonDriver.getLabelRootElement()).toHaveTextContent(LABEL);
    });

    it('should render a button without label. ', async () => {
      const wrapperComponent = renderWrapperScreenWithButton({});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      expect(buttonDriver.isLabelExists()).toBeFalsy();
    });
  });

  describe('icon', () => {
    it('should render a button without an icon. ', async () => {
      const wrapperComponent = renderWrapperScreenWithButton({});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      expect(buttonDriver.isIconExists()).toBeFalsy();
    });

    it('should render a button with icon. ', async () => {
      const ICON = 12;
      const wrapperComponent = renderWrapperScreenWithButton({iconSource: ICON});
      const buttonDriver = await ButtonTestKit({wrapperComponent, testID: BUTTON_ID});
      expect(buttonDriver.isIconExists()).toBeTruthy();
    });
  });

  describe('more complicated screen', () => {
    //todo take it out of this file. to the demo screens maybe
    it('should change text values according to state changes from buttons pressing', async () => {
      const wrapperComponent = renderMoreComplicatedScreen();
      const text1Driver = await TextTestKit({wrapperComponent, testID: `text_1`});
      const text2Driver = await TextTestKit({wrapperComponent, testID: `text_2`});
      const button1Driver = await ButtonTestKit({wrapperComponent, testID: `${BUTTON_ID}1`});
      const button2Driver = await ButtonTestKit({wrapperComponent, testID: `${BUTTON_ID}2`});
      expect(text1Driver.getTextContent()).toBe('button 1 pressed 0 times');
      expect(text2Driver.getTextContent()).toBe('button 2 pressed 0 times');
      button1Driver.click();
      button1Driver.click();
      button2Driver.click();
      await waitFor(() => expect(text1Driver.getTextContent()).toBe('button 1 pressed 2 times'));
      await waitFor(() => expect(text2Driver.getTextContent()).toBe('button 2 pressed 1 times'));
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
