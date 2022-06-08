import React, {useState} from 'react';
import {waitFor} from '@testing-library/react-native';
import View from '../../view';
import Text from '../../text';
import Button from '../index';
import {ImageSourcePropType} from 'react-native';
import {ButtonDriver} from '../Button.driver';
import {TextDriver} from '../../text/Text.driver';

const BUTTON_ID = 'button_test_id';
const CHILDREN_TEXT_ID = 'children_test_id';
const CHILDREN_TEXT = 'custom button text';

// TODO: This tests are flaky and only fail on CI - we should investigate why
describe('Button', () => {
  afterEach(() => {
    ButtonDriver.clear();
  });

  it('should render a button', async () => {
    const component = WrapperScreenWithButton();
    const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

    expect(await buttonDriver.exists()).toBeTruthy();
  });

  describe('custom button', () => {
    it('should render a custom button', async () => {
      const component = WrapperScreenWithCustomButton();
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      expect(buttonDriver.exists()).toBeTruthy();
    });

    it('should render the children with correct text', async () => {
      const component = WrapperScreenWithCustomButton();
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      expect(buttonDriver.exists()).toBeTruthy();

      const childrenTextDriver = new TextDriver({component, testID: CHILDREN_TEXT_ID});

      expect(await childrenTextDriver.getTextContent()).toEqual(CHILDREN_TEXT);
    });
  });

  describe('OnPress', () => {
    let onPressCallback: jest.Mock;
    beforeEach(() => onPressCallback = jest.fn());
    afterEach(() => onPressCallback.mockClear());

    it.skip('should trigger onPress callback', async () => {
      const component = WrapperScreenWithButton({onPress: onPressCallback});
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      buttonDriver.press();

      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(1));
    });

    it('should not trigger onPress callback if button disabled', async () => {
      const component = WrapperScreenWithButton({onPress: onPressCallback, disabled: true});
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      buttonDriver.press();

      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(0));
    });
  });

  describe('label', () => {
    const LABEL = 'mock label';
    it('should render a button with correct content', async () => {
      const component = WrapperScreenWithButton({label: LABEL});
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      expect(await buttonDriver.getLabelContent()).toEqual(LABEL);
    });

    it('should render a button with correct label content. ', async () => {
      const component = WrapperScreenWithButton({label: LABEL});
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      expect(await buttonDriver.getLabelContent()).toEqual(LABEL);
    });

    it('should render a button without label. ', async () => {
      const component = WrapperScreenWithButton();
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      expect(await buttonDriver.isLabelExists()).toBeFalsy();
    });
  });

  describe('icon', () => {
    it('should render a button without an icon. ', async () => {
      const component = WrapperScreenWithButton();
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      expect(await buttonDriver.isIconExists()).toBeFalsy();
    });

    it('should render a button with icon. ', async () => {
      const ICON = 12;
      const component = WrapperScreenWithButton({iconSource: ICON});
      const buttonDriver = new ButtonDriver({component, testID: BUTTON_ID});

      expect(await buttonDriver.isIconExists()).toBeTruthy();
    });
  });

  describe('more complicated screen', () => {
    //todo take it out of this file. to the demo screens maybe
    it('should change text values according to state changes from buttons pressing', async () => {
      const component = StatefulScreenWithTextsAndButtonss();
      const text1Driver = new TextDriver({testID: `text_1`, component});
      const text2Driver = new TextDriver({testID: `text_2`, component});
      const button1Driver = new ButtonDriver({testID: `${BUTTON_ID}1`, component});
      const button2Driver = new ButtonDriver({testID: `${BUTTON_ID}2`, component});

      expect(await text1Driver.getTextContent()).toBe('button 1 pressed 0 times');
      expect(await text2Driver.getTextContent()).toBe('button 2 pressed 0 times');

      await button1Driver.press();
      await button1Driver.press();
      await button2Driver.press();

      await waitFor(async () => expect(await text1Driver.getTextContent()).toBe('button 1 pressed 2 times'));
      await waitFor(async () => expect(await text2Driver.getTextContent()).toBe('button 2 pressed 1 times'));
    });
  });
});

function WrapperScreenWithButton(buttonProps: {
  onPress?: () => void;
  label?: string;
  iconSource?: ImageSourcePropType;
  disabled?: boolean;
} = {}) {
  const {onPress, label, iconSource, disabled} = buttonProps;
  return (<View testID={'wrapper_screen_test_id'}>
    <Button testID={BUTTON_ID} onPress={onPress} label={label} iconSource={iconSource} disabled={disabled}/>
  </View>);
}

function WrapperScreenWithCustomButton(buttonProps: {onPress?: () => void} = {}) {
  const {onPress} = buttonProps;
  return (<View testID={'wrapper_screen_test_id'}>
    <Button testID={BUTTON_ID} onPress={onPress}>
      <Text testID={CHILDREN_TEXT_ID}>{CHILDREN_TEXT}</Text>
    </Button>
  </View>);
}

const StatefulScreenWithTextsAndButtonss = () => <StatefulScreenWithTextsAndButtons/>;

const StatefulScreenWithTextsAndButtons = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <View testID={'stateful_wrapper_screen_test_id'}>
      <Text testID={'text_1'} >{`button 1 pressed ${count1} times`}</Text>
      <Text testID={'text_2'} >{`button 2 pressed ${count2} times`}</Text>
      <Button testID={`${BUTTON_ID}1`} onPress={() => setCount1(count1 + 1)}/>
      <Button testID={`${BUTTON_ID}2`} onPress={() => setCount2(count2 + 1)}/>
    </View>
  );
};
