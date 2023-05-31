import _ from 'lodash';
import React from 'react';
import {ItemProps} from './Item';
import useMiddleIndex from './helpers/useListMiddleIndex';

export type ItemValueTypes = ItemProps | number | string;

type PropTypes = {
  initialValue?: ItemValueTypes;
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
  index: number;
  height: number;
  getRowItemAtOffset: (offset: number) => RowItem;
}

const usePresenter = ({
  initialValue = 0,
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

  const items = children ? extractItemsFromChildren() : propItems || [];
  const middleIndex = useMiddleIndex({itemHeight, listSize: items.length});

  const getSelectedValueIndex = () => {
    if (_.isString(initialValue) || _.isNumber(initialValue)) {
      return _.findIndex(items, {value: initialValue});
    }
    return _.findIndex(items, {value: initialValue?.value});
  };

  const getRowItemAtOffset = (offset: number): RowItem => {
    const index = middleIndex(offset);
    const value = items[index].value;
    return {index, value};
  };

  return {
    index: getSelectedValueIndex(),
    items,
    height: itemHeight * preferredNumVisibleRows,
    getRowItemAtOffset
  };
};

export default usePresenter;
