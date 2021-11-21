import _ from 'lodash';
import React from 'react';
import {WheelPicker} from '../../../incubator';
import {fireEvent, render} from '@testing-library/react-native';

const ITEM_HEIGHT = 50;
const NUM_OF_ROWS = 7;
const onChange = jest.fn();
const props = {
  testID: 'wheel',
  items: _.times(60, i => i).map(item => ({label: `${item}`, value: item})),
  onChange,
  numberOfVisibleRows: NUM_OF_ROWS,
  itemHeight: ITEM_HEIGHT,
  initialIndex: 0,
  activeTextColor: 'red',
  inactiveTextColor: 'blue'
};

describe('WheelPicker', () => {
  describe('FlatList', () => {
    it('should call onChange callback after scrolling', () => {
      const {getByTestId} = render(<WheelPicker {...props}/>);
      const flatList = getByTestId('wheel.list');

      fireEvent(flatList, 'onMomentumScrollEnd', {nativeEvent: {contentOffset: {y: 200}}});

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(4, 4);

      fireEvent(flatList, 'onMomentumScrollEnd', {nativeEvent: {contentOffset: {y: 330}}});

      expect(onChange).toHaveBeenCalledWith(7, 7);
    });

    it('should present 7 rows', () => {
      const {getByTestId} = render(<WheelPicker {...props}/>);
      const flatList = getByTestId('wheel.list');

      expect(flatList.props.height).toBe(NUM_OF_ROWS * ITEM_HEIGHT);
    });
  });

  //   describe('Item', () => {
  //     it('should color selected index with activeColor', () => {
  //       const {getByTestId} = render(<WheelPicker {...props}/>);
  //       const flatList = getByTestId('wheel.list');
  //       const item_0 = getByTestId('wheel.item_0.text');
  //       const item_4 = getByTestId('wheel.item_4.text');
  //       const activeStyle = {color: 'red'};
  //       const inactiveStyle = {color: 'blue'};

  //       expect(item_0).toHaveAnimatedStyle(activeStyle);
  //       expect(item_4).toHaveAnimatedStyle(inactiveStyle);

  //       fireEvent(flatList, 'onMomentumScrollEnd', {nativeEvent: {contentOffset: {y: 200}}});

  //       expect(item_0).toHaveAnimatedStyle(inactiveStyle);
  //       expect(item_4).toHaveAnimatedStyle(activeStyle);
  //     });
  //   });
});
