import React, {useMemo} from 'react';
import SortableGridItemAnimationWrapper from './SortableGridItemAnimationWrapper';
import {DEFAULT_NO_OF_COLUMNS, getItemSize, useSortableGridConfig, ItemsOrder} from './config';
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {View} from 'react-native-ui-lib';


export interface SortableGridItemProps {
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

const SortableGridView: React.FC<SortableGridViewProps> = (props) => {
  const {items, numOfColumns = DEFAULT_NO_OF_COLUMNS, renderItem, itemSpacing, viewWidth} = props;
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const itemSize = useMemo(() => getItemSize(numOfColumns, viewWidth), [viewWidth, numOfColumns]);
  const {getPositionByOrder, getOrderByPosition} = useSortableGridConfig(itemSize, numOfColumns);
  const itemsOrder = useSharedValue<ItemsOrder>(Object.assign({},
    ...items.map((item, index) => ({[`${item.id} - ${index}`]: index}))));

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset}) => {
      scrollY.value = contentOffset.y;
    }
  });

  const renderGridItem = (item: SortableGridItemProps, index: number) => {
    return (
      <SortableGridItemAnimationWrapper
        key={`${item.id} - ${index}`}
        id={`${item.id} - ${index}`}
        itemSize={itemSize}
        itemsOrder={itemsOrder}
        numOfColumns={numOfColumns}
        scrollViewRef={scrollViewRef}
        scrollY={scrollY}
        getPositionByOrder={getPositionByOrder}
        getOrderByPosition={getOrderByPosition}
        itemSpacing={itemSpacing}
      >
        <View flex key={`${item.id} - ${index}`}>
          {renderItem(item)}
        </View>
      </SortableGridItemAnimationWrapper>
    );
  };
    
  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{
        height: Math.ceil(items.length / numOfColumns) * itemSize
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {items.map((item, index) => renderGridItem(item, index))}
    </Animated.ScrollView>
  );
};

export default SortableGridView;
