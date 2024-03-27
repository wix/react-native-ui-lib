import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import useGridLayout from './useGridLayout';
import View from '../view';
import {GridListProps, GridListBaseProps} from './types';

function GridList<T = any>(props: GridListProps<T>) {
  const {
    renderItem,
    numColumns,
    itemSpacing,
    maxItemWidth,
    listPadding = 0,
    keepItemSize,
    containerWidth,
    style,
    contentContainerStyle,
    ...others
  } = props;

  const {itemContainerStyle, numberOfColumns, listStyle} = useGridLayout({
    numColumns,
    itemSpacing,
    maxItemWidth,
    listPadding,
    keepItemSize,
    containerWidth,
    style,
    contentContainerStyle
  });

  const _renderItem = useCallback((...args: any[]) => {
    // @ts-expect-error
    return <View style={itemContainerStyle}>{renderItem?.(...args)}</View>;
  },
  [renderItem, itemContainerStyle]);

  return (
    <FlatList
      key={numberOfColumns}
      {...others}
      /* NOTE: Using style instead of contentContainerStyle because of RN issue with a flatlist nested in another flatlist 
      losing their contentContainerStyle */
      style={listStyle}
      // contentContainerStyle={listContentStyle}
      renderItem={_renderItem}
      numColumns={numberOfColumns}
    />
  );
}

export {GridListBaseProps, GridListProps};
export default GridList;
