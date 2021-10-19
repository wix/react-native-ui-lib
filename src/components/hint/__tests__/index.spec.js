import React from 'react';
import {Hint} from 'react-native-ui-lib';
import {Colors} from '../../../style';
import {render, findStyle} from '../../../uilib-test-renderer';

const HintTestComponent = ({showHint, color}) => {
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
  it('Test Hint component background color', async () => {
    const hintTestId = 'Hint.message';

    const expectedColor = Colors.primary;
    const element = <HintTestComponent showHint/>;

    const {getByTestId, rerender} = render(element);

    const wrapper = getByTestId('Hint');
    expect(wrapper).toBeTruthy();

    const hint = getByTestId(hintTestId);
    let color = findStyle('backgroundColor', hint);

    expect(color).toBe(expectedColor);
    expect(hint).toBeTruthy();

    rerender(<HintTestComponent showHint color={Colors.white}/>);
    color = findStyle('backgroundColor', hint);
    expect(color).toBe(Colors.white);
  });

  it('Test Hint modal is not visible when showHint is false', async () => {
    const element = <HintTestComponent showHint={false}/>;

    const {queryByTestId} = render(element);

    const modal = queryByTestId('Hint.modal');

    expect(modal).toBeNull();
  });

  it('Test Hint modal is visible when showHint is true', async () => {
    const element = <HintTestComponent showHint/>;

    const {getByTestId, queryAllByTestId} = render(element);
    const hint = getByTestId('Hint');
    expect(hint).toBeTruthy();
  
    expect(queryAllByTestId('Hint.modal')).toBeTruthy();
  });
});
