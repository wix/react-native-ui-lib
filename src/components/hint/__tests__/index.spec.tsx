import React from 'react';
import {waitFor, render} from '@testing-library/react-native';
import {Hint, Colors} from 'react-native-ui-lib';
import {HintDriver} from '../Hint.driver.new';

const TEST_ID = 'Hint';

const settingsIcon = require('../../../assets/icons/check.png');

const HintTestComponent = ({
  showHint,
  color,
  onPress,
  onBackgroundPress,
  useModal,
  useIcon
}: {
  showHint: boolean;
  color?: string;
  onPress?: Function;
  onBackgroundPress?: Function;
  useModal?: boolean;
  useIcon?: boolean;
}) => {
  return (
    <Hint
      visible={showHint}
      message={'Hint message to hint things'}
      position={Hint.positions.TOP}
      useSideTip
      key={'1'}
      targetFrame={{x: 1, y: 1, height: 1, width: 1}}
      onBackgroundPress={onBackgroundPress}
      onPress={onPress}
      color={color}
      removePaddings
      enableShadow
      testID={TEST_ID}
      useModal={useModal}
      icon={useIcon ? settingsIcon : undefined}
    />
  );
};

//TODO: Add test for onPress functionality
describe('Hint Screen component test', () => {
  describe('Test Hint style:', () => {
    it('Test Hint component background color', async () => {
      const expectedColor = Colors.$backgroundPrimaryHeavy;
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(await driver.getElement()).toBeTruthy();

      let contentColor = await driver.getContentStyle().backgroundColor;
      expect(contentColor).toBe(expectedColor);

      const whiteHintRenderTree = render(<HintTestComponent showHint color={Colors.white}/>);
      const whiteHintDriver = HintDriver({renderTree: whiteHintRenderTree, testID: TEST_ID});

      contentColor = await whiteHintDriver.getContentStyle().backgroundColor;
      expect(contentColor).toBe(Colors.white);
    });
  });

  describe('Test Hint icon', () => {
    it('Hint should include icon', async () => {
      const renderTree = render(<HintTestComponent showHint useIcon/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(driver.getIcon().exists()).toBeTruthy();
    });

    it('Hint shouldn\'t include icon', async () => {
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(driver.getIcon().exists()).toBeFalsy();
    });
  });

  describe('Test Hint modal visibility:', () => {
    it('Test Hint modal is not visible when showHint is false', async () => {
      const renderTree = render(<HintTestComponent showHint={false}/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(await driver.getModal().exists()).toBeFalsy();
    });

    it('Test Hint modal is visible when showHint is true', async () => {
      const renderTree = render(<HintTestComponent showHint onBackgroundPress={() => {}}/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(await driver.exists()).toBeTruthy();
      expect(await driver.getModal().exists()).toBeTruthy();
    });
  });

  describe('Test Hint onPress & onBackgroundPress', () => {
    let onPressCallback: jest.Mock;
    beforeEach(() => (onPressCallback = jest.fn()));
    afterEach(() => onPressCallback.mockClear());

    it('should trigger onPress callback', async () => {
      const renderTree = render(<HintTestComponent showHint onPress={onPressCallback}/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      driver.getHintTouchable().press();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(1));
    });

    //TODO - fix this test for onBackgroundTest
    // it('should trigger onBackgroundPress callback', async () => {
    //   jest.useFakeTimers();
    //   const renderTree = render(<HintTestComponent showHint onBackgroundPress={onPressCallback} useModal={false}/>);
    //   const driver = HintDriver({renderTree, testID: TEST_ID});
    //   act(() => {
    //     driver.getOverlayTouchable().press();
    //   });
    //   await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(1));
    // });

    it('should not trigger onPress callback when onPress isn\'t passed', async () => {
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      driver.getHintTouchable().press();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(0));
    });

    it('should not create touchable overlay driver when onBackgroundPress isn\'t passed', async () => {
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(driver.getOverlayTouchable().exists()).toBeFalsy();
    });
  });

  describe('Test Hint tip', () => {});
});
