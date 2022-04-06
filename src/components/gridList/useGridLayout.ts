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
    itemSpacing = DEFAULT_ITEM_SPACINGS,
    maxItemWidth,
    listPadding = 0,
    keepItemSize,
    containerWidth
  } = props;

  const {orientation} = useOrientation();

  const _containerWidth = useMemo(() => {
    return (containerWidth ?? Constants.screenWidth) - listPadding * 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPadding, orientation, containerWidth]);

  const numberOfColumns = useMemo(() => {
    if (maxItemWidth) {
      return Math.ceil((_containerWidth + itemSpacing) / (maxItemWidth + itemSpacing));
    } else {
      return numColumns;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numColumns, maxItemWidth, itemSpacing, keepItemSize ? _containerWidth : undefined]);

  const itemWidth = useMemo(() => {
    return (_containerWidth - itemSpacing * (numberOfColumns - 1)) / numberOfColumns;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfColumns, itemSpacing, keepItemSize ? undefined : _containerWidth]);

  const itemContainerStyle = useMemo(() => {
    return {width: itemWidth /* + itemSpacing */, marginRight: itemSpacing, marginBottom: itemSpacing};
  }, [itemWidth, itemSpacing]);

  return {itemContainerStyle, numberOfColumns};
};

export default useGridLayout;
