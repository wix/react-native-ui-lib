import _findIndex from "lodash/findIndex";
import _isObject from "lodash/isObject";
import React from 'react';
import { LogService } from "../../services";
import useMiddleIndex from "./helpers/useListMiddleIndex";

//TODO: deprecate this type

const usePresenter = ({
  initialValue,
  children,
  items: propItems,
  itemHeight,
  preferredNumVisibleRows
}) => {
  const extractItemsFromChildren = () => {
    const items = React.Children.map(children, child => {
      const childAsType = {
        value: child?.props.value,
        label: child?.props.label
      };
      return childAsType;
    });
    return items || [];
  };
  const items = children ? extractItemsFromChildren() : propItems || [];
  const middleIndex = useMiddleIndex({
    itemHeight,
    listSize: items.length
  });
  const getSelectedValueIndex = () => {
    if (_isObject(initialValue)) {
      LogService.warn('UILib WheelPicker will stop supporting initialValue prop type as an object (ItemProps). Please pass string or number only');
      //@ts-expect-error
      return _findIndex(items, {
        value: initialValue?.value
      });
    } else {
      return initialValue && _findIndex(items, item => item.value === initialValue);
    }
  };
  const getRowItemAtOffset = offset => {
    const index = middleIndex(offset);
    const value = items[index].value;
    return {
      value,
      index
    };
  };
  return {
    index: getSelectedValueIndex(),
    items,
    height: itemHeight * preferredNumVisibleRows,
    getRowItemAtOffset
  };
};
export default usePresenter;