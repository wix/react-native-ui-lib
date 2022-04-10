/* eslint-disable react-hooks/exhaustive-deps */
import {isArray, times} from 'lodash';
import React, {useMemo, useCallback} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import SortableListContext from './SortableListContext';
import SortableListItem from './SortableListItem';

function getIndices<ItemT>(data: FlatListProps<ItemT>['data']) {
  const length = isArray(data) ? data.length : 0;
  return times(length, index => index);
}

export interface SortableListProps<ItemT> extends Omit<FlatListProps<ItemT>, 'extraData' | 'data'> {
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
  const {data, onOrderChange, ...others} = props;

  const currentByInitialIndices = useSharedValue<number[]>(getIndices(data));
  const initialByCurrentIndices = useSharedValue<number[]>(getIndices(data));

  const onDragStateChange = useCallback((index?: number) => {
    if (index === undefined && isArray(data)) {
      onOrderChange(times(data.length, index => data[initialByCurrentIndices.value[index]]));
    }
  },
  [onOrderChange]);

  const context = useMemo(() => {
    return {
      currentByInitialIndices,
      initialByCurrentIndices,
      onDragStateChange
    };
  }, []);

  return (
    <SortableListContext.Provider value={context}>
      <FlatList
        {...others}
        data={data}
        CellRendererComponent={SortableListItem}
        removeClippedSubviews={false} // Workaround for crashing on Android (ArrayIndexOutOfBoundsException in ViewGroupDrawingOrderHelper.getChildDrawingOrder)
      />
    </SortableListContext.Provider>
  );
};

export default SortableList;
