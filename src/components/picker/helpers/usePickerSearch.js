import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";
import { useCallback, useState, useMemo } from 'react';
import { getItemLabel as getItemLabelPresenter, shouldFilterOut } from "../PickerPresenter";
const usePickerSearch = props => {
  const {
    showSearch,
    onSearchChange,
    children,
    getItemLabel,
    items
  } = props;
  const [searchValue, setSearchValue] = useState('');
  const filterItems = useCallback(items => {
    if (showSearch && !_isEmpty(searchValue)) {
      return _filter(items, item => {
        const {
          label,
          value,
          getItemLabel: childGetItemLabel
        } = item.props || item;
        const itemLabel = getItemLabelPresenter(label, value, childGetItemLabel || getItemLabel);
        return !shouldFilterOut(searchValue, itemLabel);
      });
    }
    return items;
  }, [showSearch, searchValue, getItemLabel]);
  const filteredItems = useMemo(() => {
    return filterItems(children || items);
  }, [filterItems, items, children]);
  const _onSearchChange = useCallback(searchValue => {
    setSearchValue(searchValue);
    onSearchChange?.(searchValue, filteredItems);
  }, [onSearchChange, filteredItems]);
  return {
    setSearchValue,
    onSearchChange: _onSearchChange,
    filteredItems
  };
};
export default usePickerSearch;