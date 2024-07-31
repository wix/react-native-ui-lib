import React from 'react';
import {render} from '@testing-library/react-native';
import View from '../../view';
import Text from '../../text';
import SortableGridList, {SortableGridListProps} from '../';
import {useDraggableDriver} from '../../../testkit/new/useDraggable.driver';
import {useComponentDriver} from '../../../testkit/new/Component.driver';

const testID = 'sortable-grid-list';
const TEST_DATA = Array(9)
  .fill(0)
  .map((_, index) => ({id: `${index}`}));
const itemsTestId = (id: string) => `${testID}.item.${id}`;
const testRenderItem: SortableGridListProps<(typeof TEST_DATA)[number]>['renderItem'] = ({item}) => {
  return (
    <View height={50} testID={itemsTestId(item.id)}>
      <Text>{item.id}</Text>
    </View>
  );
};

const TestCase = (props: Omit<SortableGridListProps, 'data' | 'renderItem'>) => {
  return <SortableGridList {...props} numColumns={3} testID={testID} data={TEST_DATA} renderItem={testRenderItem}/>;
};

describe('SortableGridlist', () => {
  it('should render a sortable grid list', () => {
    render(<TestCase/>);
  });
  it('should reorder by index', () => {
    const onOrderChange = jest.fn();
    const renderTree = render(<TestCase onOrderChange={onOrderChange} orderByIndex/>);
    const driverItem = useDraggableDriver(useComponentDriver({renderTree, testID: itemsTestId('0')}));
    driverItem.drag(150); // Items height is 50 but dragging 100 doesn't work for some reason. 150 works and drags one row down.
    expect(onOrderChange).toHaveBeenCalledTimes(1);
    const newOrder = [1, 2, 3, 0, 4, 5, 6, 7, 8];
    expect(onOrderChange).toHaveBeenCalledWith(newOrder.map(index => TEST_DATA[index]),
      newOrder.map(index => TEST_DATA[index].id));
  });
  it('should reorder by swapping', () => {
    const onOrderChange = jest.fn();
    const renderTree = render(<TestCase onOrderChange={onOrderChange}/>);
    const driverItem = useDraggableDriver(useComponentDriver({renderTree, testID: itemsTestId('0')}));
    driverItem.drag(150);
    expect(onOrderChange).toHaveBeenCalledTimes(1);
    const newOrder = [3, 1, 2, 0, 4, 5, 6, 7, 8];
    expect(onOrderChange).toHaveBeenCalledWith(newOrder.map(index => TEST_DATA[index]),
      newOrder.map(index => TEST_DATA[index].id));
  });
});
