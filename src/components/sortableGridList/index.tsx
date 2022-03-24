import React, {useCallback} from 'react';
import {FlatListProps, ScrollView, ScrollViewProps} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import _ from 'lodash';
import {GridListBaseProps} from '../gridList';
import SortableItem from './SortableItem';
import usePresenter, {ItemsOrder} from './usePresenter';

import useGridLayout, {DEFAULT_ITEM_SPACINGS, DEFAULT_NUM_COLUMNS} from '../gridList/useGridLayout';

export interface SortableGridListProps<T = any> extends GridListBaseProps, ScrollViewProps {
  data: FlatListProps<T>['data'];
  renderItem: FlatListProps<T>['renderItem'];
  onOrderChange?: (newData: T[], newOrder: ItemsOrder) => void;
}

function SortableGridList<T = any>(props: SortableGridListProps<T>) {
  const {renderItem, onOrderChange, contentContainerStyle, ...others} = props;

  const {itemContainerStyle, numberOfColumns} = useGridLayout(props);
  const {numColumns = DEFAULT_NUM_COLUMNS, itemSpacing = DEFAULT_ITEM_SPACINGS, data} = others;
  const itemsOrder = useSharedValue<number[]>(_.map(props.data, (_v, i) => i));

  // TODO: Get the number of columns from GridList calculation somehow
  const presenter = usePresenter(props.data?.length ?? 0, numColumns, itemSpacing);

  const onChange = useCallback(() => {
    const newData: T[] = [];
    if (data?.length) {
      itemsOrder.value.forEach(itemIndex => {
        newData.push(data[itemIndex]);
      });
    }

    onOrderChange?.(newData, itemsOrder.value);
  }, [onOrderChange, data]);

  const _renderItem = useCallback(({item, index}) => {
    const lastItemInRow = (index + 1) % numberOfColumns === 0;
    return (
      <SortableItem
        {...presenter}
        style={[itemContainerStyle, lastItemInRow && {marginRight: 0}]}
        itemsOrder={itemsOrder}
        index={index}
        onChange={onChange}
      >
        {/* @ts-expect-error */}
        {renderItem({item, index})}
      </SortableItem>
    );
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={[{flexWrap: 'wrap', flexDirection: 'row'}, contentContainerStyle]}>
        {data?.map((item, index) => _renderItem({item, index}))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default SortableGridList;
