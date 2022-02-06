import React from 'react';
import {render} from '@testing-library/react-native';
import TextTestKit from '../Text.driver';
import View from '../../view';
import Text from '../index';

const TEXT_ID = 'text_test_id';
const TEXT_CONTENT = 'text content';
describe('Text', () => {
  it('should render Text Component', async () => {
    const wrapperComponent = renderWrapperScreenWithText({});
    const textDriver = await TextTestKit({wrapperComponent, testID: TEXT_ID});
    expect(textDriver.getTextContent()).toEqual(TEXT_CONTENT);
  });

  describe('onPress', () => {
    it('should press the text, and run callback', async () => {
      const onPressCallback = jest.fn();
      const wrapperComponent = renderWrapperScreenWithText({onPress: () => onPressCallback()});
      const textDriver = await TextTestKit({wrapperComponent, testID: TEXT_ID});
      textDriver.click();
      expect(onPressCallback).toHaveBeenCalledTimes(1);
    });

    it('should not be pressable if onPress prop is not supplied', async () => {
      const wrapperComponent = renderWrapperScreenWithText({});
      const textDriver = await TextTestKit({wrapperComponent, testID: TEXT_ID});
      expect(textDriver.isClickable()).toBeFalsy();
    });
  });
});

function renderWrapperScreenWithText(textProps) {
  const {onPress} = textProps;
  return render(<View>
    <Text testID={TEXT_ID} onPress={onPress} modifiers={{}}>{TEXT_CONTENT}</Text>
  </View>);
}
