/* eslint-disable react-hooks/exhaustive-deps */
import {map, mapKeys, filter, reduce} from 'lodash';
import React, {useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogService} from 'services';
import SortableListContext from './SortableListContext';
import SortableListItem, {DEFAULT_LIST_ITEM_SIZE} from './SortableListItem';
import {useDidUpdate, useThemeProps} from 'hooks';
import type {SortableListProps, SortableListItemProps, OrderChangeInfo} from './types';
import type {Dictionary} from '../../typings/common';

export {SortableListProps, SortableListItemProps};

function generateItemsOrder<ItemT extends SortableListItemProps>(data: SortableListProps<ItemT>['data']) {
  return map(data, item => item.id);
}

function generateLockedIds<ItemT extends SortableListItemProps>(data: SortableListProps<ItemT>['data']) {
  // @ts-expect-error - not worth further time investment IMO, maybe it'll work some day
  return reduce(filter(data, item => item.locked),
    // @ts-expect-error - not worth further time investment IMO, maybe it'll work some day
    (item, cur) => ({...item, [(cur as ItemT).id]: true}),
    {});
}

const SortableList = <ItemT extends SortableListItemProps>(props: SortableListProps<ItemT>) => {
  const themeProps = useThemeProps(props, 'SortableList');
  const {data, onOrderChange, enableHaptic, scale, itemProps, horizontal, listRef, flexMigration, ...others} =
    themeProps;

  const itemsOrder = useSharedValue<string[]>(generateItemsOrder(data));
  const lockedIds = useSharedValue<Dictionary<boolean>>(generateLockedIds(data));
  const itemSize = useSharedValue<number>(DEFAULT_LIST_ITEM_SIZE);

  // TODO: Remove once flexMigration migration is completed 
  useEffect(() => {
    if (flexMigration === undefined) {
      LogService.error(`SortableList "flexMigration" prop is a temporary migration flag to transition to a flex behavior for SortableList. 
      Please make sure to pass it and check your UI before it becomes true by default`);
    }
  }, []);

  useDidUpdate(() => {
    itemsOrder.value = generateItemsOrder(data);
  }, [data]);

  const onChange = useCallback((info: OrderChangeInfo) => {
    const newData: ItemT[] = [];
    const dataByIds = mapKeys(data, 'id');
    if (data?.length) {
      itemsOrder.value.forEach(itemId => {
        newData.push(dataByIds[itemId]);
      });
    }

    onOrderChange?.(newData, info);
  }, [onOrderChange, data]);

  const onItemLayout = useCallback((event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    // Round for Android
    const newSize = Math.round(horizontal ? width : height);
    // Check validity for tests
    if (newSize) {
      const margins = horizontal
        ? (itemProps?.margins?.marginLeft ?? 0) + (itemProps?.margins?.marginRight ?? 0)
        : (itemProps?.margins?.marginTop ?? 0) + (itemProps?.margins?.marginBottom ?? 0);
      itemSize.value = newSize + margins;
    }
  }, []);

  const context = useMemo(() => {
    return {
      data,
      itemsOrder,
      lockedIds,
      onChange,
      itemSize,
      horizontal,
      itemProps,
      onItemLayout,
      enableHaptic,
      scale
    };
  }, [data, onChange]);

  return (
    <GestureHandlerRootView style={flexMigration ? styles.container : undefined}>
      <SortableListContext.Provider value={context}>
        <FlatList
          {...others}
          ref={listRef}
          horizontal={horizontal}
          data={data}
          CellRendererComponent={SortableListItem}
          removeClippedSubviews={false} // Workaround for crashing on Android (ArrayIndexOutOfBoundsException in ViewGroupDrawingOrderHelper.getChildDrawingOrder)
        />
      </SortableListContext.Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});

export default SortableList;
