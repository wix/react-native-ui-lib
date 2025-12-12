import _ from 'lodash';
import React from 'react';
import {render /* , act, waitFor */} from '@testing-library/react-native';
import {Colors} from '../../../style';
import WheelPicker from '../index';
import {WheelPickerDriver} from '../WheelPicker.driver';
import {WheelPickerItemDriver} from '../WheelPickerItem.driver';

const ITEM_HEIGHT = 50;
const NUM_OF_ROWS = 10;
const testID = 'wheel';
const onChange = jest.fn();

const TestCase = props => {
  return (
    <WheelPicker
      testID={testID}
      items={_.times(60, i => i).map(item => ({label: `item #${item}`, value: item, testID: `${item}`}))}
      initialValue={0}
      onChange={onChange}
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
    onChange.mockClear();
  });

  describe('FlatList', () => {
    it('should present $NUM_OF_ROWS rows', () => {
      const renderTree = render(<TestCase/>);
      const driver = WheelPickerDriver({renderTree, testID});
      expect(driver.getListHeight()).toBe(NUM_OF_ROWS * ITEM_HEIGHT);
    });

    it('should call onChange after scrolling ends with default itemHeight and numberOfRows', () => {
      const props = {itemHeight: undefined, numberOfVisibleRows: undefined};
      const renderTree = render(<TestCase {...props}/>);
      const driver = WheelPickerDriver({renderTree, testID});

      driver.moveToItem(4);
      expect(onChange).toHaveBeenCalledWith(4, 4);

      driver.moveToItem(7);
      expect(onChange).toHaveBeenCalledWith(7, 7);
    });

    it('should call onChange after scrolling ends', () => {
      const renderTree = render(<TestCase/>);
      const driver = WheelPickerDriver({renderTree, testID});

      driver.moveToItem(4, ITEM_HEIGHT);
      expect(onChange).toHaveBeenCalledWith(4, 4);

      driver.moveToItem(7, ITEM_HEIGHT);
      expect(onChange).toHaveBeenCalledWith(7, 7);
    });
  });

  describe('initialValue', () => {
    it('should not call onChange when initialValue is updated', () => {
      const renderTree = render(<TestCase/>);
      renderTree.rerender(<TestCase initialValue={2}/>);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('label', () => {
    it('should return label', () => {
      const label = 'Hours';
      const renderTree = render(<TestCase label={label}/>);
      const driver = WheelPickerDriver({renderTree, testID});
      expect(driver.getLabel()).toEqual(label);
    });
  });

  describe('PickerItem', () => {
    it('should get first item\'s label', () => {
      const renderTree = render(<TestCase/>);
      const index = 0;
      const driver = WheelPickerItemDriver({renderTree, testID: `${index}`});
      expect(driver.getLabel()).toEqual('item #0');
    });

    it('should get first item\'s text style when no active/inactive colors', () => {
      const renderTree = render(<TestCase textStyle={{color: Colors.green30}}/>);
      const index = 0;
      const driver = WheelPickerItemDriver({renderTree, testID: `${index}`});
      expect(driver.getLabelStyle()?.color).toEqual(Colors.green30);
    });

    //TODO: Fix these test's using AnimatedStyle mocking
    // it('should call onChange after second item is pressed', async () => {
    //   const renderTree = render(<TestCase/>);
    //   const index = 1;
    //   const driver = WheelPickerItemDriver({renderTree, testID: `${index}`});

    //   driver.press();

    //   expect(await onChange).toHaveBeenCalledTimes(1);
    //   expect(onChange).toHaveBeenCalledWith(1);
    // });

    // it('should not call onChange after first item is pressed', async () => {
    //   const renderTree = render(<TestCase/>);
    //   const index = 0;
    //   const driver = WheelPickerItemDriver({renderTree, testID: `${index}`});

    //   driver.press();

    //   expect(onChange).not.toHaveBeenCalledTimes(1);
    // });
  });
});
