import React, {useMemo} from 'react';
import SortableGridItemAnimationWrapper from './SortableGridItemAnimationWrapper';
import {getItemSize, useSortableGridConfig} from './config';
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {View} from 'react-native-ui-lib';


interface SortableGridItemProps {
    id: string;
}

export type ItemsOrder = {
    [id: SortableGridItemProps['id']]: number
}
interface SortableGridViewProps {
    items: SortableGridItemProps[];
    numOfColumns: number;
    renderItem: (item: SortableGridItemProps) => React.ReactElement;
    itemSpacing?: number;
    viewWidth?: number;
}

const SortableGridView: React.FC<SortableGridViewProps> = ({items, numOfColumns, renderItem, itemSpacing, viewWidth}) => {
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
