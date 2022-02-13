import React, {useMemo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import SortableGridItem from './SortableGridItem';
import SortableGridItemAnimationWrapper from './SortableGridItemAnimationWrapper';
import {getItemSize} from './config';

interface SortableGridItemProps {
    id: string; color: string
}
interface SortableGridViewProps {
    items: SortableGridItemProps[];
    numOfColumns: number;
}

const SortableGridView: React.FC<SortableGridViewProps> = ({items, numOfColumns}) => {
  const itemSize = useMemo(() => getItemSize(numOfColumns), [numOfColumns]);

  const renderItem = (item: SortableGridItemProps, index: number) => {
    return (
      <SortableGridItemAnimationWrapper key={`${item.id} - ${index}`} id={`${item.id} - ${index}`}>

        {/* Have support for custom renderer */}
        <SortableGridItem color={item.color} key={`${item.id} - ${index}`} itemSize={itemSize}/>

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
