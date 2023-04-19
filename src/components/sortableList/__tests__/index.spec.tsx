import _ from 'lodash';
import React, {useCallback} from 'react';
import Text from '../../text';
import View from '../../view';
import SortableList from '../index';
import {ComponentDriver, SortableListItemDriver} from '../../../testkit';

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
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    ComponentDriver.clear();
    SortableListItemDriver.clear();
  });

  it('SortableList onOrderChange is called - down', async () => {
    const onOrderChange = jest.fn();
    const component = <TestCase onOrderChange={onOrderChange}/>;
    const sortableListDriver = new ComponentDriver({component, testID: 'sortableList'});
    expect(await sortableListDriver.exists()).toBeTruthy();
    expect(onOrderChange).toHaveBeenCalledTimes(0);
    const item1Driver = new SortableListItemDriver({component, testID: 'item1'});
    expect(await item1Driver.exists()).toBeTruthy();
    await item1Driver.dragDown(1);
    expect(onOrderChange).toHaveBeenCalledTimes(1);
    expect(onOrderChange).toHaveBeenCalledWith([
      {id: '0', text: '0'},
      {id: '2', text: '2'},
      {id: '1', text: '1'},
      {id: '3', text: '3'},
      {id: '4', text: '4'}
    ]);
  });

  it('SortableList onOrderChange is called - up', async () => {
    const onOrderChange = jest.fn();
    const component = <TestCase onOrderChange={onOrderChange}/>;
    const sortableListDriver = new ComponentDriver({component, testID: 'sortableList'});
    expect(await sortableListDriver.exists()).toBeTruthy();
    expect(onOrderChange).toHaveBeenCalledTimes(0);
    const item4Driver = new SortableListItemDriver({component, testID: 'item4'});
    expect(await item4Driver.exists()).toBeTruthy();
    await item4Driver.dragUp(3);
    expect(onOrderChange).toHaveBeenCalledTimes(1);
    expect(onOrderChange).toHaveBeenCalledWith([
      {id: '0', text: '0'},
      {id: '4', text: '4'},
      {id: '1', text: '1'},
      {id: '2', text: '2'},
      {id: '3', text: '3'}
    ]);
  });
});
