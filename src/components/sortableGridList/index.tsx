import React, {useCallback} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import _ from 'lodash';
import {Spacings} from 'style';
import GridList, {GridListProps} from '../gridList';
import SortableItem from './SortableItem';
import usePresenter, {ItemsOrder} from './usePresenter';
import {useSharedValue} from 'react-native-reanimated';

const DEFAULT_NUM_COLUMNS = 3;
const DEFAULT_ITEM_SPACINGS = Spacings.s4;

export interface SortableGridListProps<T = any> extends GridListProps<T> {
  onOrderChange?: (newData: T[], newOrder: ItemsOrder) => void;
}

function SortableGridList<T = any>(props: SortableGridListProps<T>) {
  const {renderItem, onOrderChange, ...others} = props;
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
    return (
      <SortableItem {...presenter} itemsOrder={itemsOrder} index={index} onChange={onChange}>
        {/* @ts-expect-error */}
        {renderItem({item, index})}
      </SortableItem>
    );
  }, []);

  return (
    <GestureHandlerRootView>
      <GridList {...others} renderItem={_renderItem}/>
    </GestureHandlerRootView>
  );
}

export default SortableGridList;
