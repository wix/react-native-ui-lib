import _ from 'lodash';
import React from 'react';
import {ItemProps} from './Item';
import useMiddleIndex from './helpers/useListMiddleIndex';

export type ItemValueTypes = ItemProps | number | string;

type PropTypes<T> = {
  initialValue?: ItemProps<T> | T;
  children?: JSX.Element | JSX.Element[];
  items?: ItemProps<T>[];
  itemHeight: number;
  preferredNumVisibleRows: number;
};

type RowItem<T> = {
  value: T;
  index: number;
};

interface Presenter<T> {
  items: ItemProps<T>[];
  index: number;
  height: number;
  getRowItemAtOffset: (offset: number) => RowItem<T>;
}

const usePresenter = <T extends string | number = string>({
  initialValue, // = 0
  children,
  items: propItems,
  itemHeight,
  preferredNumVisibleRows
}: PropTypes<T>): Presenter<T> => {
  const extractItemsFromChildren = (): ItemProps[] => {
    const items = React.Children.map(children, child => {
      const childAsType: ItemProps = {value: child?.props.value, label: child?.props.label};
      return childAsType;
    });
    return items || [];
  };

  const items = children ? extractItemsFromChildren() : propItems || [];
  const middleIndex = useMiddleIndex({itemHeight, listSize: items.length});

  const getSelectedValueIndex = () => {
    if (_.isString(initialValue) || _.isNumber(initialValue)) {
      return _.findIndex(items, {value: initialValue});
    }
    return _.findIndex(items, {value: initialValue?.value});
  };

  const getRowItemAtOffset = (offset: number): RowItem<T> => {
    const index = middleIndex(offset);
    const value = items[index].value;
    return {value, index};
  };

  return {
    index: getSelectedValueIndex(),
    items,
    height: itemHeight * preferredNumVisibleRows,
    getRowItemAtOffset
  };
};

export default usePresenter;
