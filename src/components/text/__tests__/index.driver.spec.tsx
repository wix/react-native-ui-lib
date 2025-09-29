import React from 'react';
import {render} from '@testing-library/react-native';
import {TextDriver} from '../Text.driver.new';
import {StyleSheet} from 'react-native';

const TEXT_ID = 'text_test_id';
const TEXT_CONTENT = 'text content';

function WrapperScreenWithText(textProps: {onPress?: jest.Mock} = {}) {
  const {onPress} = textProps;
  const Text = require('../index').default;
  return (
    <Text testID={TEXT_ID} onPress={onPress}>
      {TEXT_CONTENT}
    </Text>
  );
}

const getDriver = (textProps: {onPress?: jest.Mock} = {}) => {
  const {onPress} = textProps;
  const renderTree = render(<WrapperScreenWithText onPress={onPress}/>);
  const textDriver = TextDriver({renderTree, testID: TEXT_ID});
  return {textDriver};
};

describe('Text', () => {
  it('should render Text Component', () => {
    const {textDriver} = getDriver();
    const content = textDriver.getText();
    expect(content).toEqual(TEXT_CONTENT);
  });
  it('should return empty string', () => {
    const Text = require('../').default;
    const renderTree = render(<Text testID={TEXT_ID}/>);
    const textDriver = TextDriver({renderTree, testID: TEXT_ID});
    const content = textDriver.getText();
    expect(content).toEqual('');
  });
  it('should not return a string as text', () => {
    const Text = require('../').default;
    const renderTree = render(<Text testID={TEXT_ID}><Text>This is a text</Text></Text>);
    const textDriver = TextDriver({renderTree, testID: TEXT_ID});
    const content = textDriver.getText();
    expect(content.length).toBe(1);
    expect(typeof content[0]).not.toBe('string');
  });

  describe('onPress', () => {
    it('should press the text, and run callback', () => {
      const onPressCallback = jest.fn();
      const {textDriver} = getDriver({onPress: onPressCallback});
      textDriver.press();
      expect(onPressCallback).toHaveBeenCalledTimes(1);
    });

    it('should not be pressable if onPress prop is not supplied', () => {
      const {textDriver} = getDriver();
      expect(textDriver.hasOnPress()).toBeFalsy();
    });
  });
  const setConstants = (isAndroid: boolean, isRTL: boolean) => {
    const {Constants} = require('../../../commons/new');
    Constants.isAndroid = isAndroid;
    Constants.isIOS = !isAndroid;
    Constants.isRTL = isRTL;
  };

  describe('Text alignment', () => {
    it('Should always align text to left on Android (LTR/RTL)', () => {
      jest.isolateModules(() => {
        setConstants(true, true);
        const {textDriver} = getDriver();
        const textStyle = textDriver.getElement().props.style;
        expect(StyleSheet.flatten(textStyle).textAlign).toEqual(undefined);
      });
      jest.isolateModules(() => {
        setConstants(true, false);
        const {textDriver} = getDriver();
        const textStyle = textDriver.getElement().props.style;
        expect(StyleSheet.flatten(textStyle).textAlign).toEqual(undefined);
      });
    });
    
    it('Should have text of right on iOS RTL', () => {
      jest.isolateModules(() => {
        setConstants(false, true);
        const {textDriver} = getDriver();
        const textStyle = textDriver.getElement().props.style;
        expect(StyleSheet.flatten(textStyle).writingDirection).toEqual('rtl');
      });
    });
    it('Should have text of left on iOS LTR', () => {
      jest.isolateModules(() => {
        setConstants(false, false);
        const {textDriver} = getDriver();
        const textStyle = textDriver.getElement().props.style;
        expect(StyleSheet.flatten(textStyle).writingDirection).toEqual('ltr');
      });
    });
  });
});
