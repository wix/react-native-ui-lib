import React from 'react';
import {render} from '@testing-library/react-native';
import View from '../../view';
import Text from '../index';
import {TextDriver} from '../Text.driver.new';

const TEXT_ID = 'text_test_id';
const TEXT_CONTENT = 'text content';

function WrapperScreenWithText(textProps: {onPress?: jest.Mock} = {}) {
  const {onPress} = textProps;
  return (
    <View>
      <Text testID={TEXT_ID} onPress={onPress}>
        {TEXT_CONTENT}
      </Text>
    </View>
  );
}

describe('Text', () => {
  it('should render Text Component', () => {
    const renderTree = render(<WrapperScreenWithText/>);
    const textDriver = TextDriver({renderTree, testID: TEXT_ID});
    const content = textDriver.getText();
    expect(content).toEqual(TEXT_CONTENT);
  });

  describe('onPress', () => {
    it('should press the text, and run callback', () => {
      const onPressCallback = jest.fn();
      const renderTree = render(<WrapperScreenWithText onPress={onPressCallback}/>);
      const textDriver = TextDriver({renderTree, testID: TEXT_ID});

      textDriver.pressable.press();

      expect(onPressCallback).toHaveBeenCalledTimes(1);
    });

    it('should not be pressable if onPress prop is not supplied', () => {
      const renderTree = render(<WrapperScreenWithText/>);
      const textDriver = TextDriver({renderTree, testID: TEXT_ID});
      expect(textDriver.pressable.hasOnPress()).toBeFalsy();
    });
  });
});
