import React, {useState} from 'react';
import {LayoutChangeEvent, StyleProp, ViewStyle, FlatList} from 'react-native';
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import Item from './Item';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface SortableListProps<T> {
  /**
   * Plain array of all items
   */
  items: Array<T>;
  /**
   * Takes an item from items list and renders it into the view
   */
  renderItem: ({item, index}: { item: T, index: number }) => JSX.Element;
  /**
   * Height of each item (mandatory)
   */
  itemHeight: number;
  /**
   * Called when the animation of the sort action is finished
   */
  onOrderChange: (items: Array<T>) => void;
  /**
   * [optional] The size (in pixels) of the draggable area. Enables scrolling when set as it default to the whole width of the item component. 
   */
  draggableAreaSize?: number;
  /**
   * [optional] The side of the draggable area. defaults to left.
   */
  draggableAreaSide?: 'left' | 'right';
  /**
   * Styling for the external list View
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Styling for the internal list View
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Used to locate this view in end-to-end tests
   */
  testID?: string;
}

const SortableList = ({items, itemHeight, onOrderChange, renderItem, draggableAreaSize, draggableAreaSide = 'left', style = {}, contentContainerStyle = {}, testID}: SortableListProps<any>) => {
  const [containerHeight, setContainerHeight] = useState<number>();
  const positions = useSharedValue({...items.map((_item: any, index: number) => index)});
  const scrollY = useSharedValue(0);
  const listRef = useAnimatedRef<FlatList>();
  const contentHeight = items.length * itemHeight;

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => scrollY.value = y
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  const sortList = (positions: any) => {
    const sortedList = new Array(items.length).fill(null);
    for (let i = 0; i < items.length; ++i) {
      const sortedIndex = positions[i];
      sortedList[sortedIndex] = items[i];
    }
    onOrderChange(sortedList);
  };

  const _renderItem = ({item, index}: { item: any, index: number }) => (
    <Item
      {...{item, index, positions, scrollY, containerHeight, contentHeight, listRef, itemHeight, renderItem, draggableAreaSize, draggableAreaSide}}
      onFinish={sortList}
    />
  );

  return (
    <AnimatedFlatList
      ref={listRef}
      data={items}
      renderItem={_renderItem}
      onLayout={onLayout}
      style={style}
      contentContainerStyle={[{height: items.length * itemHeight}, contentContainerStyle]}
      bounces={false}
      scrollEventThrottle={8}
      onScroll={onScroll}
      showsVerticalScrollIndicator
      persistentScrollbar
      testID={testID}
    />
  );
};

export default SortableList;
