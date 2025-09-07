import React from 'react';
import View from "../../view";
import Text from "../index";
import { TextDriver } from "../Text.driver";
import { Colors } from "../../../style";
const TEXT_ID = 'text_test_id';
const TEXT_CONTENT = 'text content';
describe('Text', () => {
  afterEach(() => {
    TextDriver.clear();
  });
  describe('highlightString', () => {
    const HIGHLIGHT_STRING_TEST_ID = 'highlight-string-test-id';
    describe('single highlightString', () => {
      describe('style', () => {
        it('should render highlight string with a given style', async () => {
          const component = WrapperScreenWithText({
            highlightString: {
              string: 'content',
              style: {
                color: Colors.red30,
                textDecorationLine: 'underline'
              },
              testID: HIGHLIGHT_STRING_TEST_ID
            }
          });
          const textDriver = new TextDriver({
            component,
            testID: TEXT_ID
          });
          const {
            style
          } = await textDriver.getPropsByTestId(HIGHLIGHT_STRING_TEST_ID);
          expect(style).toEqual({
            color: Colors.red30,
            textDecorationLine: 'underline'
          });
        });
        it('should render highlight string with the general highlightStyle prop style if no specific style given', async () => {
          const component = WrapperScreenWithText({
            highlightString: {
              string: 'content',
              testID: HIGHLIGHT_STRING_TEST_ID
            },
            highlightStyle: {
              color: Colors.blue50
            }
          });
          const textDriver = new TextDriver({
            component,
            testID: TEXT_ID
          });
          const {
            style
          } = await textDriver.getPropsByTestId(HIGHLIGHT_STRING_TEST_ID);
          expect(style).toEqual([{
            color: Colors.grey30
          }, {
            color: Colors.blue50
          }]);
        });
      });
      describe('onPress', () => {
        it('should press on highlighted text and run its callback', async () => {
          const onPressCallback = jest.fn();
          const component = WrapperScreenWithText({
            highlightString: {
              string: 'content',
              onPress: onPressCallback,
              testID: HIGHLIGHT_STRING_TEST_ID
            }
          });
          const textDriver = new TextDriver({
            component,
            testID: HIGHLIGHT_STRING_TEST_ID
          });
          await textDriver.press();
          expect(onPressCallback).toHaveBeenCalledTimes(1);
        });
        it('should not be pressable if onPress prop is not supplied for a highlightString', async () => {
          const component = WrapperScreenWithText({
            highlightString: {
              string: 'content',
              testID: HIGHLIGHT_STRING_TEST_ID
            }
          });
          const textDriver = new TextDriver({
            component,
            testID: HIGHLIGHT_STRING_TEST_ID
          });
          expect(await textDriver.isPressable()).toBeFalsy();
        });
      });
    });
    describe('highlightString array', () => {
      const LONGER_TEXT_CONTENT = 'a longer text content to test';
      const HIGHLIGHT_STRING_2_TEST_ID = 'highlight-string-2-test-id';
      describe('style', () => {
        it('should render multiple highlight strings, each with its given style', async () => {
          const component = WrapperScreenWithText({
            text: LONGER_TEXT_CONTENT,
            highlightString: [{
              string: 'longer',
              style: {
                color: Colors.red30,
                textDecorationLine: 'underline'
              },
              testID: HIGHLIGHT_STRING_TEST_ID
            }, {
              string: 'test',
              style: {
                color: Colors.yellow40,
                textDecorationLine: 'line-through'
              },
              testID: HIGHLIGHT_STRING_2_TEST_ID
            }]
          });
          const textDriver = new TextDriver({
            component,
            testID: TEXT_ID
          });
          const {
            style: style1
          } = await textDriver.getPropsByTestId(HIGHLIGHT_STRING_TEST_ID);
          const {
            style: style2
          } = await textDriver.getPropsByTestId(HIGHLIGHT_STRING_2_TEST_ID);
          expect(style1).toEqual({
            color: Colors.red30,
            textDecorationLine: 'underline'
          });
          expect(style2).toEqual({
            color: Colors.yellow40,
            textDecorationLine: 'line-through'
          });
        });
        it('should render highlight string with the general highlightStyle prop style if no specific style given', async () => {
          const component = WrapperScreenWithText({
            text: LONGER_TEXT_CONTENT,
            highlightString: [{
              string: 'longer',
              style: {
                color: Colors.red30,
                textDecorationLine: 'underline'
              },
              testID: HIGHLIGHT_STRING_TEST_ID
            }, {
              string: 'test',
              testID: HIGHLIGHT_STRING_2_TEST_ID
            }],
            highlightStyle: {
              color: Colors.blue50
            }
          });
          const textDriver = new TextDriver({
            component,
            testID: TEXT_ID
          });
          const {
            style
          } = await textDriver.getPropsByTestId(HIGHLIGHT_STRING_TEST_ID);
          const {
            style: style2
          } = await textDriver.getPropsByTestId(HIGHLIGHT_STRING_2_TEST_ID);
          expect(style).toEqual({
            color: Colors.red30,
            textDecorationLine: 'underline'
          });
          expect(style2).toEqual([{
            color: Colors.grey30
          }, {
            color: Colors.blue50
          }]);
        });
      });
      describe('onPress', () => {
        it('should press on highlighted texts and run their respective callbacks', async () => {
          const onPressCallback1 = jest.fn();
          const onPressCallback2 = jest.fn();
          const component = WrapperScreenWithText({
            text: LONGER_TEXT_CONTENT,
            highlightString: [{
              string: 'longer',
              onPress: onPressCallback1,
              testID: HIGHLIGHT_STRING_TEST_ID
            }, {
              string: 'test',
              onPress: onPressCallback2,
              testID: HIGHLIGHT_STRING_2_TEST_ID
            }]
          });
          const textDriver1 = new TextDriver({
            component,
            testID: HIGHLIGHT_STRING_TEST_ID
          });
          await textDriver1.press();
          expect(onPressCallback1).toHaveBeenCalledTimes(1);
          const textDriver2 = new TextDriver({
            component,
            testID: HIGHLIGHT_STRING_2_TEST_ID
          });
          await textDriver2.press();
          expect(onPressCallback2).toHaveBeenCalledTimes(1);
        });
        it('should not be pressable if onPress prop is not supplied for a highlightString', async () => {
          const onPressCallback = jest.fn();
          const component = WrapperScreenWithText({
            text: LONGER_TEXT_CONTENT,
            highlightString: [{
              string: 'longer',
              onPress: onPressCallback,
              testID: HIGHLIGHT_STRING_TEST_ID
            }, {
              string: 'test',
              testID: HIGHLIGHT_STRING_2_TEST_ID
            }]
          });
          const textDriver1 = new TextDriver({
            component,
            testID: HIGHLIGHT_STRING_TEST_ID
          });
          const textDriver2 = new TextDriver({
            component,
            testID: HIGHLIGHT_STRING_2_TEST_ID
          });
          expect(await textDriver1.isPressable()).toBeTruthy();
          expect(await textDriver2.isPressable()).toBeFalsy();
        });
      });
    });
  });
});
function WrapperScreenWithText(textProps = {}) {
  const {
    onPress,
    highlightString,
    text,
    highlightStyle
  } = textProps;
  return <View>
    <Text testID={TEXT_ID} onPress={onPress} highlightString={highlightString} highlightStyle={highlightStyle}>
      {text ?? TEXT_CONTENT}
    </Text>
  </View>;
}