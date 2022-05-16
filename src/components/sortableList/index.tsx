/* eslint-disable react-hooks/exhaustive-deps */
import {map} from 'lodash';
import React, {useMemo, useCallback} from 'react';
import {FlatList, FlatListProps, LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SortableListContext from './SortableListContext';
import SortableListItem, {SortableListItemProps} from './SortableListItem';

export interface SortableListProps<ItemT>
  extends Omit<FlatListProps<ItemT>, 'extraData' | 'data'>,
    Pick<SortableListItemProps, 'disableHaptic'> {
  /**
   * The data of the list, do not update the data.
   */
  data: FlatListProps<ItemT>['data'];
  /**
   * A callback to get the new order (or swapped items).
   */
  onOrderChange: (data: ItemT[] /* TODO: add more data? */) => void;
}

const SortableList = <ItemT extends unknown>(props: SortableListProps<ItemT>) => {
  const {data, onOrderChange, disableHaptic, ...others} = props;

  const itemsOrder = useSharedValue<number[]>(map(props.data, (_v, i) => i));
  const itemHeight = useSharedValue<number>(1);

  const onChange = useCallback(() => {
    const newData: ItemT[] = [];
    if (data?.length) {
      itemsOrder.value.forEach(itemIndex => {
        newData.push(data[itemIndex]);
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
      itemsOrder,
      onChange,
      itemHeight,
      onItemLayout,
      disableHaptic
    };
  }, []);

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
