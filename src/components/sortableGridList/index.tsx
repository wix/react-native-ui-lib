import React, {useCallback, useEffect} from 'react';
import {StyleSheet, ScrollView, type ListRenderItemInfo} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import _ from 'lodash';
import {useDidUpdate} from 'hooks';
import {LogService} from 'services';

import SortableItem from './SortableItem';
import usePresenter from './usePresenter';
import {type ItemsOrder, SortableGridListProps, type ItemProps} from './types';

import useGridLayout, {DEFAULT_ITEM_SPACINGS} from '../gridList/useGridLayout';

function generateItemsOrder(data: SortableGridListProps['data']) {
  return _.map(data, item => item.id);
}

function SortableGridList<T = any>(props: SortableGridListProps<T>) {
  const {renderItem, onOrderChange, flexMigration, ...others} = props;

  const {itemContainerStyle, numberOfColumns, listStyle, listContentStyle, listColumnWrapperStyle} =
    useGridLayout(props);
  const {itemSpacing = DEFAULT_ITEM_SPACINGS, data} = others;
  const itemsOrder = useSharedValue<ItemsOrder>(generateItemsOrder(data));

  // TODO: Remove once flexMigration migration is completed
  useEffect(() => {
    if (flexMigration === undefined) {
      LogService.error(`SortableGridList "flexMigration" prop is a temporary migration flag to transition to a flex behavior for SortableList. 
      Please make sure to pass it and check your UI before it becomes true by default`);
    }
  }, []);

  useDidUpdate(() => {
    itemsOrder.value = generateItemsOrder(data);
  }, [data]);

  const presenter = usePresenter(numberOfColumns, itemSpacing);

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
    return (
      <SortableItem
        key={item.id}
        data={data}
        {...presenter}
        style={itemContainerStyle}
        itemsOrder={itemsOrder}
        id={item.id}
        onChange={onChange}
      >
        {/* @ts-expect-error */}
        {renderItem({item, index})}
      </SortableItem>
    );
  },
  [data, itemContainerStyle, onChange, renderItem]);

  return (
    <GestureHandlerRootView style={flexMigration ? styles.container : undefined}>
      <ScrollView
        style={listStyle}
        contentContainerStyle={[styles.listContent, listContentStyle, listColumnWrapperStyle]}
      >
        {_.map(data, (item, index) => _renderItem({item, index} as ListRenderItemInfo<ItemProps<T>>))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export {SortableGridListProps};
export default SortableGridList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContent: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});
