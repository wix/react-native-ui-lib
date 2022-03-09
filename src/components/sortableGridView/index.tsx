// TODO: Use gesture-handler v2 API
// TODO: Start drag gesture with long press
// TODO: Support scrolling while dragging
import React, {useCallback, useMemo, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import _ from 'lodash';
import GridView from '../gridView';
import GridListItem, {GridListItemProps} from '../gridListItem';
import SortableGridItem from './SortableGridItem';
import {DEFAULT_NO_OF_COLUMNS, getItemSize, useSortableGridConfig, ItemsLayouts, WINDOW_WIDTH} from './config';

export interface SortableGridViewProps {
  /**
   * The list of itemProps to be rendered by renderItem
   */
  items: GridListItemProps[];
  /**
   * Callback with new items ordered and the new order
   */
  onChange: (newItems: GridListItemProps[], newOrder: number[]) => void;
  /**
   * Render method for sortable grid items,
   * these components will be rendered inside the assigned space calculated by the grid
   */
  renderItem: (item: GridListItemProps) => React.ReactElement;
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
    onChange,
    // renderItem,
    itemSpacing,
    numOfColumns = DEFAULT_NO_OF_COLUMNS,
    viewWidth = WINDOW_WIDTH
  } = props;
  // const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  // const scrollY = useSharedValue(0);
  const [items] = useState(props.items);
  const itemSize = useMemo(() => getItemSize(numOfColumns, viewWidth), [viewWidth, numOfColumns]);
  const itemsLayouts = useSharedValue<ItemsLayouts>(_.times(items.length, () => undefined));
  const itemsOrder = useSharedValue<number[]>(_.map(items, (_v, i) => i));
  const {getPositionByOrder, getOrderByPosition, getIdByItemOrder, getItemOrderById, updateItemLayout} =
    useSortableGridConfig(itemsLayouts, itemSize, numOfColumns);

  // useEffect(() => {
  //   itemsOrder.value = _.map(items, (_v, i) => i);
  // }, [items]);

  const _onChange = useCallback(() => {
    const newItems: GridListItemProps[] = [];
    itemsOrder.value.forEach(itemIndex => {
      newItems.push(items[itemIndex]);
    });

    onChange?.(newItems, itemsOrder.value);
  }, [onChange]);

  // const onScroll = useAnimatedScrollHandler({
  //   onScroll: ({contentOffset}) => {
  //     scrollY.value = contentOffset.y;
  //   }
  // });

  const renderGridItem = (item: GridListItemProps, index: number) => {
    return (
      <SortableGridItem
        key={`${index}`}
        index={index}
        itemsOrder={itemsOrder}
        onItemLayout={updateItemLayout}
        getPositionByOrder={getPositionByOrder}
        getOrderByPosition={getOrderByPosition}
        getIdByItemOrder={getIdByItemOrder}
        getItemOrderById={getItemOrderById}
        onChange={_onChange}
      >
        <GridListItem {...item}/>
      </SortableGridItem>
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
