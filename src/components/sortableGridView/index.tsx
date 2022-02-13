import React, {useMemo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import SortableGridItem from './SortableGridItem';
import SortableGridItemAnimationWrapper from './SortableGridItemAnimationWrapper';
import {getItemSize} from './config';
import {useSharedValue} from 'react-native-reanimated';

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
  const itemSize = useMemo(() => getItemSize(numOfColumns), [numOfColumns]);
  const itemsOrder = useSharedValue<ItemsOrder>(Object.assign({},
    ...items.map((item, index) => ({[`${item.id} - ${index}`]: index}))));

  const renderItem = (item: SortableGridItemProps, index: number) => {
    return (
      <SortableGridItemAnimationWrapper
        key={`${item.id} - ${index}`}
        id={`${item.id} - ${index}`}
        itemSize={itemSize}
        itemsOrder={itemsOrder}
        numOfColumns={numOfColumns}
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
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(items.length / numOfColumns) * itemSize
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
    >
      {items.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
};

export default SortableGridView;
