import {useMemo} from 'react';
import {Spacings} from 'style';
import {useOrientation} from 'hooks';
import {Constants} from '../../commons/new';
import {GridListBaseProps} from './types';

export const DEFAULT_NUM_COLUMNS = 3;
export const DEFAULT_ITEM_SPACINGS = Spacings.s4;

const useGridLayout = (props: GridListBaseProps) => {
  const {
    numColumns = DEFAULT_NUM_COLUMNS,
    itemSpacing: minItemSpacing = DEFAULT_ITEM_SPACINGS,
    maxItemWidth,
    listPadding = 0,
    keepItemSize,
    containerWidth,
    style,
    contentContainerStyle,
    columnWrapperStyle
  } = props;

  const {orientation} = useOrientation();

  const _containerWidth = useMemo(() => {
    return (containerWidth ?? Constants.windowWidth - 2 * Constants.getPageMargins()) - listPadding * 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPadding, orientation, containerWidth]);

  const numberOfColumns = useMemo(() => {
    if (maxItemWidth) {
      let currentWidth = _containerWidth - maxItemWidth;
      let currentColumns = 1;
      while (currentWidth > maxItemWidth + minItemSpacing) {
        currentWidth -= maxItemWidth + minItemSpacing;
        ++currentColumns;
      }

      return currentColumns;
    } else {
      return numColumns;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numColumns, maxItemWidth, minItemSpacing, keepItemSize ? _containerWidth : undefined]);

  const itemWidth = useMemo(() => {
    const width = (_containerWidth - minItemSpacing * (numberOfColumns - 1)) / numberOfColumns;
    return maxItemWidth ? Math.min(width, maxItemWidth) : width;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfColumns, minItemSpacing, keepItemSize ? undefined : _containerWidth]);

  const itemSpacing = useMemo(() => {
    if (maxItemWidth) {
      return Math.max((_containerWidth - maxItemWidth * numberOfColumns) / (numberOfColumns - 1), minItemSpacing);
    } else {
      return minItemSpacing;
    }
  }, [maxItemWidth, _containerWidth, numberOfColumns, minItemSpacing]);

  const itemContainerStyle = useMemo(() => {
    return {width: itemWidth /* , marginRight: itemSpacing, marginBottom: itemSpacing */};
  }, [itemWidth]);

  const listContentStyle = useMemo(() => {
    return [{/* paddingHorizontal: listPadding, */ rowGap: itemSpacing}, contentContainerStyle];
  }, [itemSpacing, contentContainerStyle]);

  const listStyle = useMemo(() => {
    return [{paddingHorizontal: listPadding, rowGap: itemSpacing}, style];
  }, [listPadding, itemSpacing, style]);

  const listColumnWrapperStyle = useMemo(() => {
    return [{columnGap: itemSpacing}, columnWrapperStyle];
  }, [itemSpacing, columnWrapperStyle]);

  return {
    itemContainerStyle,
    numberOfColumns,
    itemWidth,
    itemSpacing,
    listStyle,
    listContentStyle,
    listColumnWrapperStyle
  };
};

export default useGridLayout;
