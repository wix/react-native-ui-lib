import React from 'react';
import View from '../../view';
import Text from '../index';
import {TextDriver} from '../Text.driver';

const TEXT_ID = 'text_test_id';
const TEXT_CONTENT = 'text content';
describe('Text', () => {
  afterEach(() => {
    TextDriver.clear();
  });

  it('should render Text Component', async () => {
    const component = WrapperScreenWithText();
    const textDriver = new TextDriver({component, testID: TEXT_ID});
    const content = await textDriver.getTextContent();
    expect(content).toEqual(TEXT_CONTENT);
  });

  describe('onPress', () => {
    it('should press the text, and run callback', async () => {
      const onPressCallback = jest.fn();
      const component = WrapperScreenWithText({onPress: onPressCallback});
      const textDriver = new TextDriver({component, testID: TEXT_ID});

      await textDriver.press();

      expect(onPressCallback).toHaveBeenCalledTimes(1);
    });

    it('should not be pressable if onPress prop is not supplied', async () => {
      const component = WrapperScreenWithText();
      const textDriver = new TextDriver({component, testID: TEXT_ID});
      expect(await textDriver.isPressable()).toBeFalsy();
    });
  });
});

function WrapperScreenWithText(textProps: {onPress?: jest.Mock} = {}) {
  const {onPress} = textProps;
  return (<View>
    <Text testID={TEXT_ID} onPress={onPress} >{TEXT_CONTENT}</Text>
  </View>);
}
