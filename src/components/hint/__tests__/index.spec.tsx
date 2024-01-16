import React from 'react';
import {render} from '@testing-library/react-native';
import {Hint, Colors} from 'react-native-ui-lib';
import {HintDriver} from '../Hint.driver.new';

const TEST_ID = 'Hint';

const HintTestComponent = ({showHint, color}: {showHint: boolean; color?: string}) => {
  return (
    <Hint
      visible={showHint}
      message={'Hint message to hint things'}
      position={Hint.positions.TOP}
      useSideTip
      key={'1'}
      targetFrame={{x: 1, y: 1, height: 1, width: 1}}
      onBackgroundPress={() => {}}
      color={color}
      removePaddings
      enableShadow
      testID={TEST_ID}
    />
  );
};

//TODO: Add test for onPress functionality
describe('Hint Screen component test', () => {
  describe('Test Hint style, background color:', () => {
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

  describe('Test Hint modal visibility:', () => {
    it('Test Hint modal is not visible when showHint is false', async () => {
      const renderTree = render(<HintTestComponent showHint={false}/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(await driver.getModalExists()).toBeFalsy();
    });

    it('Test Hint modal is visible when showHint is true', async () => {
      const renderTree = render(<HintTestComponent showHint/>);
      const driver = HintDriver({renderTree, testID: TEST_ID});
      expect(await driver.exists()).toBeTruthy();
      expect(await driver.getModalExists()).toBeTruthy();
    });
  });
});
