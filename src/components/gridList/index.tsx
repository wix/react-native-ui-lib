import React, {useCallback, useMemo} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {Spacings} from 'style';
import {useOrientation} from 'hooks';
import {Constants} from '../../commons/new';
import View from '../view';

const DEFAULT_NUM_COLUMNS = 3;
const DEFAULT_ITEM_SPACINGS = Spacings.s4;

export interface GridListProps<T> extends FlatListProps<T> {
  /**
   * Allow a responsive item width to the maximum item width
   */
  maxItemWidth?: number;
  /**
   * Number of items to show in a row (ignored when passing maxItemWidth)
   */
  numColumns?: number;
  /**
   * Spacing between each item
   */
  itemSpacing?: number;
  /**
   * List padding (used for item size calculation)
   */
  listPadding?: number;
  /**
   * whether to keep the items initial size when orientation changes,
   * in which case the apt number of columns will be calculated automatically.
   * Ignored when passing 'maxItemWidth'
   */
  keepItemSize?: boolean;
  /**
   * Pass when you want to use a custom container width for calculation
   */
  containerWidth?: number;
}

function GridList<T = any>(props: GridListProps<T>) {
  const {
    renderItem,
    numColumns = DEFAULT_NUM_COLUMNS,
    itemSpacing = DEFAULT_ITEM_SPACINGS,
    maxItemWidth,
    listPadding = 0,
    keepItemSize,
    ...others
  } = props;

  const {orientation} = useOrientation();

  const containerWidth = useMemo(() => {
    return (props.containerWidth ?? Constants.screenWidth) - listPadding * 2;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPadding, orientation]);

  const numberOfColumns = useMemo(() => {
    if (maxItemWidth) {
      return Math.ceil((containerWidth + itemSpacing) / (maxItemWidth + itemSpacing));
    } else {
      return numColumns;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numColumns, maxItemWidth, itemSpacing, keepItemSize ? containerWidth : undefined]);

  const itemSize = useMemo(() => {
    return (containerWidth - itemSpacing * (numberOfColumns - 1)) / numberOfColumns;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfColumns, itemSpacing, keepItemSize ? undefined : containerWidth]);

  const itemContainerStyle = useMemo(() => {
    return {width: itemSize + itemSpacing, paddingRight: itemSpacing, marginBottom: itemSpacing};
  }, [itemSize, itemSpacing]);

  const _renderItem = useCallback((...args) => {
    // @ts-expect-error
    return <View style={[itemContainerStyle]}>{renderItem?.(...args)}</View>;
  },
  [renderItem, itemContainerStyle]);

  return <FlatList key={numberOfColumns} {...others} renderItem={_renderItem} numColumns={numberOfColumns}/>;
}

export default GridList;
