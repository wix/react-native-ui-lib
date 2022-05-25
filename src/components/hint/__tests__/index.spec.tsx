import React from 'react';
import {Hint} from 'react-native-ui-lib';
import {Colors} from '../../../style';
import {findStyle} from '../../../uilib-test-renderer';
import {HintDriver} from '../Hint.driver';

const HintTestComponent = ({
  showHint,
  color
}: {
  showHint: boolean;
  color?: string;
}) => {
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
      testID={'Hint'}
    />
  );
};

describe('Hint Screen component test', () => {
  afterEach(() => {
    HintDriver.clear();
  });

  it('Test Hint component background color', async () => {
    const expectedColor = Colors.primary;
    const component = <HintTestComponent showHint/>;

    const driver = new HintDriver({component, testID: 'Hint'});
    expect(await driver.getElement()).toBeTruthy();

    const hintContent = await driver.getHintContent();
    let color = findStyle('backgroundColor', hintContent);

    expect(color).toBe(expectedColor);
    expect(hintContent).toBeTruthy();

    const WhiteHint = <HintTestComponent showHint color={Colors.white}/>;
    const WhiteHintDriver = new HintDriver({component: WhiteHint, testID: 'Hint'});

    const WhiteHintContent = await WhiteHintDriver.getHintContent();
    color = findStyle('backgroundColor', WhiteHintContent);
    expect(color).toBe(Colors.white);
  });

  it('Test Hint modal is not visible when showHint is false', async () => {
    const component = <HintTestComponent showHint={false}/>;
    const driver = new HintDriver({component, testID: 'Hint'});
    expect(await driver.getHintModal()).toBeFalsy();
  });

  it('Test Hint modal is visible when showHint is true', async () => {
    const component = <HintTestComponent showHint/>;
    const driver = new HintDriver({component, testID: 'Hint'});
    expect(await driver.getElement()).toBeTruthy();
    expect(await driver.getHintModal()).toBeTruthy();
  });
});
