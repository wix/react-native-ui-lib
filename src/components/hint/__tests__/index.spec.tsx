import React, {useRef} from 'react';
import {waitFor, render} from '@testing-library/react-native';
import {Hint, Colors, Button} from '../../../';
import {HintDriver} from '../Hint.driver.new';

const TEST_ID = 'Hint';

const settingsIcon = require('../../../assets/icons/check.png');

const HintTestComponent = ({
  showHint,
  color,
  onPress,
  onBackgroundPress,
  useTargetFrame = true,
  useModal,
  useIcon
}: {
  showHint: boolean;
  color?: string;
  onPress?: Function;
  onBackgroundPress?: Function;
  useTargetFrame?: boolean;
  useModal?: boolean;
  useIcon?: boolean;
}) => {
  const ref = useRef();
  return (
    <Hint
      visible={showHint}
      message={'Hint message to hint things'}
      position={Hint.positions.TOP}
      useSideTip
      key={'1'}
      targetFrame={useTargetFrame && {x: 1, y: 1, height: 1, width: 1}}
      onBackgroundPress={onBackgroundPress}
      onPress={onPress}
      color={color}
      removePaddings
      enableShadow
      testID={TEST_ID}
      useModal={useModal}
      icon={useIcon ? settingsIcon : undefined}
      ref={ref}
    >
      <Button round $backgroundDefault label="Hint Button"/>
    </Hint>
  );
};

describe('Hint Screen component test', () => {
  //TODO: Add test for Hint tip position
  describe('Test Hint style:', () => {
    it('Test Hint component background color', async () => {
      const expectedColor = Colors.$backgroundPrimaryHeavy;
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(await driver.getElement()).toBeTruthy();

      let contentColor = await driver.getBackgroundColor();
      expect(contentColor).toBe(expectedColor);

      const whiteHintRenderTree = render(<HintTestComponent showHint color={Colors.white}/>);
      const whiteHintDriver = HintDriver({renderTree: whiteHintRenderTree, testID: TEST_ID});

      contentColor = await whiteHintDriver.getBackgroundColor();
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

  describe('Test Hint content', () => {
    it('Hint should include message', async () => {
      const renderTree = render(<HintTestComponent showHint/>);
      const message = renderTree.getByTestId(`${TEST_ID}.message.text`).props.children;
      expect(message).toBe('Hint message to hint things');
    });
  });

  describe('Test Hint  visibility:', () => {
    //Note: Cannot test Hint when showHint is false, the component isn't rendered and return null or the children.
    it('Test Hint  is visible when showHint is true', async () => {
      const renderTree = render(<HintTestComponent showHint onBackgroundPress={() => {}}/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(await driver.exists()).toBeTruthy();
      expect(await driver.isModalVisible()).toBeTruthy();
    });
  });

  describe('Test Hint onPress', () => {
    let onPressCallback: jest.Mock;
    beforeEach(() => (onPressCallback = jest.fn()));
    afterEach(() => onPressCallback.mockClear());

    it('should trigger onPress callback', async () => {
      const renderTree = render(<HintTestComponent showHint onPress={onPressCallback}/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      driver.press();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(1));
    });

    it('should not trigger onPress callback when onPress isn\'t passed', async () => {
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      driver.press();
      await waitFor(() => expect(onPressCallback).toHaveBeenCalledTimes(0));
    });
  });

  describe('Test Hint  onBackgroundPress', () => {
    it('should not create touchable overlay driver when onBackgroundPress isn\'t passed', async () => {
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(driver.isBackgroundExists()).toBeFalsy();
    });
  });
});
