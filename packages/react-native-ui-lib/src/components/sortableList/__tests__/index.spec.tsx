import _ from 'lodash';
import React, {useCallback} from 'react';
import {render} from '@testing-library/react-native';
import Text from '../../text';
import View from '../../view';
import SortableList from '../index';
import {SortableListDriver} from '../SortableList.driver.new';
import {SortableListItemDriver} from '../SortableListItem.driver.new';

const defaultProps = {
  testID: 'sortableList'
};

const ITEMS = _.times(5, index => {
  return {
    text: `${index}`,
    id: `${index}`
  };
});

const TestCase = props => {
  const renderItem = useCallback(({item}) => {
    return (
      <Text center testID={`item${item.id}`}>
        {item.text}
      </Text>
    );
  }, []);

  return (
    <View flex>
      <View flex useSafeArea>
        <SortableList data={ITEMS} renderItem={renderItem} {...defaultProps} {...props}/>
      </View>
    </View>
  );
};

describe('SortableList', () => {
  it('SortableList onOrderChange is called - down', async () => {
    const onOrderChange = jest.fn();
    const renderTree = render(<TestCase onOrderChange={onOrderChange}/>);
    const sortableListDriver = SortableListDriver({renderTree, testID: 'sortableList'});
    expect(await sortableListDriver.exists()).toBeTruthy();
    expect(onOrderChange).toHaveBeenCalledTimes(0);
    const item1Driver = SortableListItemDriver({renderTree, testID: 'item1'});
    expect(await item1Driver.exists()).toBeTruthy();
    await item1Driver.dragDown(1);
    expect(onOrderChange).toHaveBeenCalledTimes(1);
    expect(onOrderChange).toHaveBeenCalledWith([
      {id: '0', text: '0'},
      {id: '2', text: '2'},
      {id: '1', text: '1'},
      {id: '3', text: '3'},
      {id: '4', text: '4'}
    ], {from: 1, to: 2});
  });

  it('SortableList onOrderChange is called - up', async () => {
    const onOrderChange = jest.fn();
    const renderTree = render(<TestCase onOrderChange={onOrderChange}/>);
    const sortableListDriver = SortableListDriver({renderTree, testID: 'sortableList'});
    expect(await sortableListDriver.exists()).toBeTruthy();
    expect(onOrderChange).toHaveBeenCalledTimes(0);
    const item4Driver = SortableListItemDriver({renderTree, testID: 'item4'});
    expect(await item4Driver.exists()).toBeTruthy();
    await item4Driver.dragUp(3);
    expect(onOrderChange).toHaveBeenCalledTimes(1);
    expect(onOrderChange).toHaveBeenCalledWith([
      {id: '0', text: '0'},
      {id: '4', text: '4'},
      {id: '1', text: '1'},
      {id: '2', text: '2'},
      {id: '3', text: '3'}
    ], {from: 4, to: 1});
  });
});
