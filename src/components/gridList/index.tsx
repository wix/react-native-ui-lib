import React, {useCallback, useMemo} from 'react';
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
    contentContainerStyle,
    ...others
  } = props;

  const {itemContainerStyle, numberOfColumns} = useGridLayout({
    numColumns,
    itemSpacing,
    maxItemWidth,
    listPadding,
    keepItemSize,
    containerWidth
  });

  const listContentStyle = useMemo(() => {
    return [{paddingHorizontal: listPadding}, contentContainerStyle];
  }, [listPadding, contentContainerStyle]);

  const _renderItem = useCallback((...args: any[]) => {
    // @ts-expect-error
    return <View style={itemContainerStyle}>{renderItem?.(...args)}</View>;
  },
  [renderItem, itemContainerStyle]);

  return (
    <FlatList
      key={numberOfColumns}
      {...others}
      contentContainerStyle={listContentStyle}
      renderItem={_renderItem}
      numColumns={numberOfColumns}
    />
  );
}

export {GridListBaseProps, GridListProps};
export default GridList;
