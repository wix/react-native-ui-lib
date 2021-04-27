import React, {useRef} from 'react';
import _ from 'lodash';
import {ItemProps} from './Item';
import useMiddleIndex from './helpers/useListMiddleIndex';

export type ItemValueTypes = ItemProps | number | string;

type PropTypes = {
  selectedValue: ItemValueTypes;
  children?: JSX.Element | JSX.Element[];
  items?: ItemProps[];
  itemHeight: number;
  preferredNumVisibleRows: number;
};

type RowItem = {
  value: string | number;
  index: number;
};

interface Presenter {
  items: ItemProps[];
  shouldControlComponent: (offset: number) => boolean;
  index: number;
  height: number;
  getRowItemAtOffset: (offset: number) => RowItem;
}

const usePresenter = ({
  selectedValue,
  children,
  items: propItems,
  itemHeight,
  preferredNumVisibleRows
}: PropTypes): Presenter => {
  
  const extractItemsFromChildren = (): ItemProps[] => {
    const items = React.Children.map(children, child => {
      const childAsType: ItemProps = {value: child?.props.value, label: child?.props.label};
      return childAsType;
    });
    return items || [];
  };

  const items = useRef<ItemProps[]>(children ? extractItemsFromChildren() : propItems!).current;
  const middleIndex = useMiddleIndex({itemHeight, listSize: items.length});

  const getSelectedValueIndex = (): number => {
    if (_.isString(selectedValue) || _.isNumber(selectedValue)) {
      return _.findIndex(items, {value: selectedValue});
    }
    return _.findIndex(items, {value: selectedValue?.value});
  };

  const shouldControlComponent = (offset: number): boolean => {
    return offset >= 0 && selectedValue !== getRowItemAtOffset(offset).value;
  };

  const getRowItemAtOffset = (offset: number): RowItem => {
    const index = middleIndex(offset);
    const value = items[index].value;
    return {index, value};
  };

  return {
    shouldControlComponent,
    index: getSelectedValueIndex(),
    items,
    height: itemHeight * preferredNumVisibleRows,
    getRowItemAtOffset
  };
};

export default usePresenter;
