import React from 'react';
import {render} from '@testing-library/react-native';
import View from '../../view';
import Text from '../index';
import {TextDriver} from '../Text.driver.new';
import {StyleSheet} from 'react-native';

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

// jest.mock('react-native/Libraries/ReactNative/I18nManager', () => ({
//   isRTL: true
// }));
// jest.mock('react-native', () => {
//   const actualRN = jest.requireActual('react-native');
//   actualRN.Platform.OS = 'android';
//   return actualRN;
// });
describe('Automation gap', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('Should render text on right on rtl - Android', () => {
    jest.mock('react-native', () => {
      const ReactNative = jest.requireActual('react-native');
      ReactNative.Platform.OS = 'android';
      ReactNative.Platform.select = (obj) => {
        console.log(`Nitzan - 'hello`);
        return obj.android;
      };
      ReactNative.I18nManager.isRTL = true;
      return ReactNative;
    });
    const renderTree = render(<WrapperScreenWithText/>);
    const textDriver = TextDriver({renderTree, testID: TEXT_ID});
    const textStyle = textDriver.getProps().style;
    expect(StyleSheet.flatten(textStyle).textAlign).toEqual('left');
  });
  it('Should render text on right on rtl - IOS', () => {
    jest.mock('react-native', () => {
      const ReactNative = jest.requireActual('react-native');
      ReactNative.Platform.OS = 'ios';
      ReactNative.I18nManager.isRTL = true;
      return ReactNative;
    });
    const renderTree = render(<WrapperScreenWithText/>);
    const textDriver = TextDriver({renderTree, testID: TEXT_ID});
    const textStyle = textDriver.getProps().style;
    expect(StyleSheet.flatten(textStyle).writingDirection).toEqual('rtl');
  });
});
