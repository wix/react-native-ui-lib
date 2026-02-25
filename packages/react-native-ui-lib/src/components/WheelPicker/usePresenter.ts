import _ from 'lodash';
import React, {type JSX} from 'react';
import {LogService} from '../../services';
import useMiddleIndex from './helpers/useListMiddleIndex';
import {WheelPickerItemValue} from './types';
import {WheelPickerItemProps} from './Item';

//TODO: deprecate this type

type PropTypes<T> = {
  initialValue?: T;
  children?: JSX.Element | JSX.Element[];
  items?: WheelPickerItemProps<T>[];
  itemHeight: number;
  preferredNumVisibleRows: number;
};

type RowItem<T> = {
  value: T;
  index: number;
};

const usePresenter = <T extends WheelPickerItemValue>({
  initialValue,
  children,
  items: propItems,
  itemHeight,
  preferredNumVisibleRows
}: PropTypes<T>) => {

  const extractItemsFromChildren = (): WheelPickerItemProps<T>[] => {
    const items = React.Children.map(children, child => {
      const childAsType: WheelPickerItemProps<T> = {value: child?.props.value, label: child?.props.label};
      return childAsType;
    });
    return items || [];
  };
  const items = children ? extractItemsFromChildren() : propItems || [];
  const middleIndex = useMiddleIndex({itemHeight, listSize: items.length});

  const getSelectedValueIndex = () => {
    if (_.isObject(initialValue)) {
      LogService.warn('UILib WheelPicker will stop supporting initialValue prop type as an object (ItemProps). Please pass string or number only');
      //@ts-expect-error
      return _.findIndex(items, {value: initialValue?.value});
    } else {
      return initialValue && _.findIndex(items, (item) => item.value === initialValue);
    }
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
