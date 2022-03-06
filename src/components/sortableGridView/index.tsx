import React, {useCallback, useEffect, useMemo} from 'react';
import SortableGridItemAnimationWrapper from './SortableGridItemAnimationWrapper';
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import _ from 'lodash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import GridView, {GridViewProps} from '../gridView';
import GridListItem, {GridListItemProps} from '../gridListItem';
import {DEFAULT_NO_OF_COLUMNS, getItemSize, useSortableGridConfig, ItemsLayouts, WINDOW_WIDTH} from './config';

export interface SortableGridItemProps extends GridListItemProps {
  /**
   * unique identifier for a sortable grid item
   */
  id: string;
}
export interface SortableGridViewProps {
  /**
   * The list of itemProps to be rendered by renderItem
   */
  items: SortableGridItemProps[];
  /**
   * Callback with new items orderer
   */
  onChange: (newItems: SortableGridItemProps[]) => void;
  /**
   * Render method for sortable grid items,
   * these components will be rendered inside the assigned space calculated by the grid
   */
  renderItem: (item: SortableGridItemProps) => React.ReactElement;
  /**
   * Number of items to show in a row
   */
  numOfColumns?: number;
  /**
   * Spacing between each item
   */
  itemSpacing?: number;
  /**
   * Pass the desired grid view width (default is screen wide)
   */
  viewWidth?: number;
}

const SortableGridView: React.FC<SortableGridViewProps> = props => {
  const {
    items,
    onChange,
    // renderItem,
    itemSpacing,
    numOfColumns = DEFAULT_NO_OF_COLUMNS,
    viewWidth = WINDOW_WIDTH
  } = props;
  // const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  // const scrollY = useSharedValue(0);
  const itemSize = useMemo(() => getItemSize(numOfColumns, viewWidth), [viewWidth, numOfColumns]);
  const itemsLayouts = useSharedValue<ItemsLayouts>(_.times(items.length, () => undefined));
  const itemsOrder = useSharedValue<number[]>(_.map(items, (_v, i) => i));
  const {getPositionByOrder, getOrderByPosition, getIdByItemOrder, getItemOrderById, updateItemLayout} = useSortableGridConfig(itemsOrder,
    itemsLayouts,
    itemSize,
    numOfColumns);

  useEffect(() => {
    itemsOrder.value = _.map(items, (_v, i) => i);
  }, [items]);

  const _onChange = useCallback(() => {
    const newItems: SortableGridItemProps[] = [];
    itemsOrder.value.forEach(itemIndex => {
      newItems.push(items[itemIndex]);
    });

    onChange?.(newItems);
  }, [items, onChange]);

  // const onScroll = useAnimatedScrollHandler({
  //   onScroll: ({contentOffset}) => {
  //     scrollY.value = contentOffset.y;
  //   }
  // });

  const renderGridItem = (item: SortableGridItemProps, index: number) => {
    return (
      <SortableGridItemAnimationWrapper
        key={`${item.id} - ${index}`}
        id={item.id}
        index={index}
        itemsOrder={itemsOrder}
        onItemLayout={updateItemLayout}
        getPositionByOrder={getPositionByOrder}
        getOrderByPosition={getOrderByPosition}
        onChange={_onChange}
        getIdByItemOrder={getIdByItemOrder}
        getItemOrderById={getItemOrderById}
      >
        <GridListItem {...item}/>
      </SortableGridItemAnimationWrapper>
    );
  };

  return (
    <GestureHandlerRootView>
      {/* <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          height: Math.ceil(items.length / numOfColumns) * itemSize
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      > */}
      {/* {items.map((item, index) => renderGridItem(item, index))} */}
      <GridView items={items} numColumns={numOfColumns} itemSpacing={itemSpacing} renderCustomItem={renderGridItem}/>
      {/* </Animated.ScrollView> */}
    </GestureHandlerRootView>
  );
};

export default SortableGridView;
