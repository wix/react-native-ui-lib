/* eslint-disable react-hooks/exhaustive-deps */
import {map, mapKeys, filter, reduce} from 'lodash';
import React, {useMemo, useCallback} from 'react';
import {FlatList, LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SortableListContext from './SortableListContext';
import SortableListItem from './SortableListItem';
import {useDidUpdate, useThemeProps} from 'hooks';
import {SortableListProps, SortableListItemProps} from './types';
export {SortableListProps, SortableListItemProps};

function generateItemsOrder<ItemT extends SortableListItemProps>(data: SortableListProps<ItemT>['data']) {
  return map(data, item => item.id);
}

function generateLockedIds<ItemT extends SortableListItemProps>(data: SortableListProps<ItemT>['data']) {
  return reduce(filter(data, item => item.locked),
    (item, cur) => ({...item, [(cur as ItemT).id]: true}),
    {});
}

const SortableList = <ItemT extends SortableListItemProps>(props: SortableListProps<ItemT>) => {
  const themeProps = useThemeProps(props, 'SortableList');
  const {data, onOrderChange, enableHaptic, scale, ...others} = themeProps;

  const itemsOrder = useSharedValue<string[]>(generateItemsOrder(data));
  const lockedIds = useSharedValue<Dictionary<boolean>>(generateLockedIds(data));
  const itemHeight = useSharedValue<number>(52);

  useDidUpdate(() => {
    itemsOrder.value = generateItemsOrder(data);
  }, [data]);

  const onChange = useCallback(() => {
    const newData: ItemT[] = [];
    const dataByIds = mapKeys(data, 'id');
    if (data?.length) {
      itemsOrder.value.forEach(itemId => {
        newData.push(dataByIds[itemId]);
      });
    }

    onOrderChange?.(newData);
  }, [onOrderChange, data]);

  const onItemLayout = useCallback((event: LayoutChangeEvent) => {
    // Round height for Android
    const newHeight = Math.round(event.nativeEvent.layout.height);
    itemHeight.value = newHeight;
  }, []);

  const context = useMemo(() => {
    return {
      data,
      itemsOrder,
      lockedIds,
      onChange,
      itemHeight,
      onItemLayout,
      enableHaptic,
      scale
    };
  }, [data]);

  return (
    <GestureHandlerRootView>
      <SortableListContext.Provider value={context}>
        <FlatList
          {...others}
          data={data}
          CellRendererComponent={SortableListItem}
          removeClippedSubviews={false} // Workaround for crashing on Android (ArrayIndexOutOfBoundsException in ViewGroupDrawingOrderHelper.getChildDrawingOrder)
        />
      </SortableListContext.Provider>
    </GestureHandlerRootView>
  );
};

export default SortableList;
