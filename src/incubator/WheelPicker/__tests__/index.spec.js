import _ from 'lodash';
import React from 'react';
import {render} from '@testing-library/react-native';
import {fireOnMomentumScrollEnd} from '../../../uilib-test-renderer';
import {Colors} from 'style';
import {WheelPicker} from '../../../incubator';


const ITEM_HEIGHT = 50;
const NUM_OF_ROWS = 7;
const onChangeMock = jest.fn();

const TestCase = props => {
  return (
    <WheelPicker
      testID={'wheel'}
      items={_.times(60, i => i).map(item => ({label: `${item}`, value: item}))}
      initialValue={0}
      onChange={onChangeMock}
      numberOfVisibleRows={NUM_OF_ROWS}
      itemHeight={ITEM_HEIGHT}
      activeTextColor={Colors.red30}
      inactiveTextColor={Colors.blue30}
      {...props}
    />
  );
};

describe('WheelPicker', () => {
  beforeEach(() => {
    onChangeMock.mockClear();
  });

  describe('FlatList', () => {
    it('should call onChange callback after scrolling', () => {
      const {getByTestId} = render(<TestCase/>);
      const flatList = getByTestId('wheel.list');

      fireOnMomentumScrollEnd(flatList, {y: 200});
      expect(onChangeMock).toHaveBeenCalledWith(4, 4);

      fireOnMomentumScrollEnd(flatList, {y: 330});
      expect(onChangeMock).toHaveBeenCalledWith(7, 7);
    });

    it('should present 7 rows', () => {
      const {getByTestId} = render(<TestCase/>);
      const flatList = getByTestId('wheel.list');

      expect(flatList.props.height).toBe(NUM_OF_ROWS * ITEM_HEIGHT);
    });
  });

  describe('initialValue', () => {
    it('should not call onChange when initialValue is updated', () => {
      const {update} = render(<TestCase/>);

      update(<TestCase initialValue={2}/>);
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });

  //TODO: make this test work
  // describe('Item', () => {
  //   it('should set activeColor to the selected index', () => {
  //     const {getByTestId} = render(<TestCase/>);
  //     const flatList = getByTestId('wheel.list');
  //     const item_0 = getByTestId('wheel.item_0.text');
  //     const item_4 = getByTestId('wheel.item_4.text');
  //     const activeStyle = {color: Colors.red30};
  //     const inactiveStyle = {color: Colors.blue30};

  //     expect(item_0).toHaveAnimatedStyle(activeStyle);
  //     expect(item_4).toHaveAnimatedStyle(inactiveStyle);

  //     fireOnMomentumScrollEnd(flatList, {y: 200});

  //     expect(item_0).toHaveAnimatedStyle(inactiveStyle);
  //     expect(item_4).toHaveAnimatedStyle(activeStyle);
  //   });
  // });
});
