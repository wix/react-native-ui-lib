import React, { useRef } from 'react';
import _ from 'lodash';
import useMiddleIndex from "./helpers/useListMiddleIndex";

const usePresenter = ({
  selectedValue,
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

  const items = useRef(children ? extractItemsFromChildren() : propItems).current;
  const middleIndex = useMiddleIndex({
    itemHeight,
    listSize: items.length
  });

  const getSelectedValueIndex = () => {
    if (_.isString(selectedValue) || _.isNumber(selectedValue)) {
      return _.findIndex(items, {
        value: selectedValue
      });
    }

    return _.findIndex(items, {
      value: selectedValue?.value
    });
  };

  const shouldControlComponent = offset => {
    return offset >= 0 && selectedValue !== getRowItemAtOffset(offset).value;
  };

  const getRowItemAtOffset = offset => {
    const index = middleIndex(offset);
    const value = items[index].value;
    return {
      index,
      value
    };
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