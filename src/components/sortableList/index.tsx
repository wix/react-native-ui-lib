/* eslint-disable react-hooks/exhaustive-deps */
import {map, mapKeys} from 'lodash';
import React, {useMemo, useCallback} from 'react';
import {FlatList, FlatListProps, LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SortableListContext from './SortableListContext';
import SortableListItem from './SortableListItem';
import {useDidUpdate} from 'hooks';

interface ItemWithId {
  id: string;
}

export interface SortableListProps<ItemT extends ItemWithId> extends Omit<FlatListProps<ItemT>, 'extraData' | 'data'> {
  /**
   * The data of the list, do not update the data.
   */
  data: FlatListProps<ItemT>['data'];
  /**
   * A callback to get the new order (or swapped items).
   */
  onOrderChange: (data: ItemT[] /* TODO: add more data? */) => void;
  /**
   * Whether to enable the haptic feedback
   * (please note that react-native-haptic-feedback does not support the specific haptic type on Android starting on an unknown version, you can use 1.8.2 for it to work properly)
   */
  enableHaptic?: boolean;
}

function generateItemsOrder<ItemT extends ItemWithId>(data: SortableListProps<ItemT>['data']) {
  return map(data, item => item.id);
}

const SortableList = <ItemT extends ItemWithId>(props: SortableListProps<ItemT>) => {
  const {data, onOrderChange, enableHaptic, ...others} = props;

  const itemsOrder = useSharedValue<string[]>(generateItemsOrder(data));
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
      onChange,
      itemHeight,
      onItemLayout,
      enableHaptic
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
