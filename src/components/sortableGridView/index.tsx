import React, {useMemo} from 'react';
import SortableGridItem from './SortableGridItem';
import SortableGridItemAnimationWrapper from './SortableGridItemAnimationWrapper';
import {getItemSize, useSortableGridConfig} from './config';
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';

interface SortableGridItemProps {
    id: string; color: string
}

export type ItemsOrder = {
    [id: SortableGridItemProps['id']]: number
}
interface SortableGridViewProps {
    items: SortableGridItemProps[];
    numOfColumns: number;
}

const SortableGridView: React.FC<SortableGridViewProps> = ({items, numOfColumns}) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const itemSize = useMemo(() => getItemSize(numOfColumns), [numOfColumns]);
  const {getPositionByOrder, getOrderByPosition} = useSortableGridConfig(numOfColumns);
  const itemsOrder = useSharedValue<ItemsOrder>(Object.assign({},
    ...items.map((item, index) => ({[`${item.id} - ${index}`]: index}))));

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset}) => {
      scrollY.value = contentOffset.y;
    }
  });

  const renderItem = (item: SortableGridItemProps, index: number) => {
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
      >

        {/* Have support for custom renderer */}
        <SortableGridItem
          key={`${item.id} - ${index}`}
          color={item.color}
        />

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
      {items.map((item, index) => renderItem(item, index))}
    </Animated.ScrollView>
  );
};

export default SortableGridView;
