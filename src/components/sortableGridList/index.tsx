import React, {useCallback} from 'react';
import {StyleSheet, FlatListProps, ScrollView, ScrollViewProps, ListRenderItemInfo} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import _ from 'lodash';
import {useDidUpdate} from 'hooks';
import {GridListBaseProps} from '../gridList';
import SortableItem from './SortableItem';
import usePresenter, {ItemsOrder} from './usePresenter';

import useGridLayout, {DEFAULT_ITEM_SPACINGS, DEFAULT_NUM_COLUMNS} from '../gridList/useGridLayout';

type ItemProps<T> = T & {id: string};

export interface SortableGridListProps<T = any> extends GridListBaseProps, ScrollViewProps {
  data: FlatListProps<ItemProps<T>>['data'];
  renderItem: FlatListProps<ItemProps<T>>['renderItem'];
  onOrderChange?: (newData: ItemProps<T>[], newOrder: ItemsOrder) => void;
}

function generateItemsOrder(data: SortableGridListProps['data']) {
  return _.map(data, (item) => item.id);
}

function SortableGridList<T = any>(props: SortableGridListProps<T>) {
  const {renderItem, onOrderChange, contentContainerStyle, ...others} = props;

  const {itemContainerStyle, numberOfColumns} = useGridLayout(props);
  const {numColumns = DEFAULT_NUM_COLUMNS, itemSpacing = DEFAULT_ITEM_SPACINGS, data} = others;
  const itemsOrder = useSharedValue<ItemsOrder>(generateItemsOrder(data));

  useDidUpdate(() => {
    itemsOrder.value = generateItemsOrder(data);
  }, [data]);

  // TODO: Get the number of columns from GridList calculation somehow
  const presenter = usePresenter(numColumns, itemSpacing);

  const onChange = useCallback(() => {
    const newData: ItemProps<T>[] = [];
    const dataByIds = _.mapKeys(data, 'id');
    if (data?.length) {
      itemsOrder.value.forEach(itemId => {
        newData.push(dataByIds[itemId]);
      });
    }

    onOrderChange?.(newData, itemsOrder.value);
  }, [onOrderChange, data]);

  const _renderItem = useCallback(({item, index}: ListRenderItemInfo<ItemProps<T>>) => {
    const lastItemInRow = (index + 1) % numberOfColumns === 0;

    return (
      <SortableItem
        key={index}
        data={data}
        {...presenter}
        style={[itemContainerStyle, lastItemInRow && {marginRight: 0}]}
        itemsOrder={itemsOrder}
        id={item.id}
        onChange={onChange}
      >
        {/* @ts-expect-error */}
        {renderItem({item, index})}
      </SortableItem>
    );
  },
  [data]);

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={[styles.listContent, contentContainerStyle]}>
        {data?.map((item, index) => _renderItem({item, index} as ListRenderItemInfo<ItemProps<T>>))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default SortableGridList;

const styles = StyleSheet.create({
  listContent: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});
