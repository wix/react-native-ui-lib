import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import useGridLayout from "./useGridLayout";
import View from "../view";
import { GridListProps, GridListBaseProps } from "./types";
function GridList(props) {
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
  const {
    itemContainerStyle,
    numberOfColumns,
    listStyle,
    listContentStyle,
    listColumnWrapperStyle
  } = useGridLayout({
    numColumns,
    itemSpacing,
    maxItemWidth,
    listPadding,
    keepItemSize,
    containerWidth,
    style,
    contentContainerStyle
  });
  const _renderItem = useCallback((...args) => {
    // @ts-expect-error
    return <View style={itemContainerStyle}>{renderItem?.(...args)}</View>;
  }, [renderItem, itemContainerStyle]);
  return <FlatList key={numberOfColumns} {...others}
  /* NOTE: Using style with contentContainerStyle because of RN issue with a flatlist nested in another flatlist 
  losing their contentContainerStyle */ style={listStyle} columnWrapperStyle={numberOfColumns > 1 ? listColumnWrapperStyle : undefined} contentContainerStyle={listContentStyle} renderItem={_renderItem} numColumns={numberOfColumns} />;
}
export { GridListBaseProps, GridListProps };
export default GridList;