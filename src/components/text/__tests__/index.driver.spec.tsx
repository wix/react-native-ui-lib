import React from 'react';
import {render} from '@testing-library/react-native';
import {TextDriver} from '../Text.driver.new';
import {StyleSheet} from 'react-native';

const TEXT_ID = 'text_test_id';
const TEXT_CONTENT = 'text content';

function WrapperScreenWithText(textProps: {onPress?: jest.Mock} = {}) {
  const {onPress} = textProps;
  const Text = require('../../text').default;
  return (
    <Text testID={TEXT_ID} onPress={onPress}>
      {TEXT_CONTENT}
    </Text>
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

      textDriver.press();

      expect(onPressCallback).toHaveBeenCalledTimes(1);
    });

    it('should not be pressable if onPress prop is not supplied', () => {
      const renderTree = render(<WrapperScreenWithText/>);
      const textDriver = TextDriver({renderTree, testID: TEXT_ID});
      expect(textDriver.hasOnPress()).toBeFalsy();
    });
  });
});
const setConstants = (isAndroid: boolean, isRTL: boolean) => {
  const {Constants} = require('../../../commons/new');
  Constants.isAndroid = isAndroid;
  Constants.isIOS = !isAndroid;
  Constants.isRTL = isRTL;
};

describe('Automation gap', () => {
  it('Should render text on right on rtl - Android', () => {
    jest.isolateModules(() => {
      setConstants(true, true);
      const renderTree = render(<WrapperScreenWithText/>);
      const textDriver = TextDriver({renderTree, testID: TEXT_ID});
      const textStyle = textDriver.getProps().style;
      expect(StyleSheet.flatten(textStyle).textAlign).toEqual('left');
    });
  });
  it('Should render text on right on rtl - IOS', () => {
    jest.isolateModules(() => {
      setConstants(false, true);
      const renderTree = render(<WrapperScreenWithText/>);
      const textDriver = TextDriver({renderTree, testID: TEXT_ID});
      const textStyle = textDriver.getProps().style;
      expect(StyleSheet.flatten(textStyle).writingDirection).toEqual('rtl');
    });
  });
});
