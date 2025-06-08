import {useCallback, useState, useMemo} from 'react';
import _ from 'lodash';
import {PickerProps} from '../types';
import {getItemLabel as getItemLabelPresenter, shouldFilterOut} from '../PickerPresenter';

type UsePickerSearchProps = Pick<PickerProps, 'showSearch' | 'onSearchChange' | 'children' | 'items'>;

const usePickerSearch = (props: UsePickerSearchProps) => {
  const {showSearch, onSearchChange, children, items} = props;
  const [searchValue, setSearchValue] = useState('');

  const filterItems = useCallback((items: any) => {
    if (showSearch && !_.isEmpty(searchValue)) {
      return _.filter(items, item => {
        const {label, value, getItemLabel} = item.props || item;
        const itemLabel = getItemLabelPresenter(label, value, getItemLabel);
        return !shouldFilterOut(searchValue, itemLabel);
      });
    }
    return items;
  },
  [showSearch, searchValue]);

  const filteredItems = useMemo(() => {
    return filterItems(children || items);
  }, [filterItems, items, children]);

  const _onSearchChange = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    onSearchChange?.(searchValue, filteredItems);
  },
  [onSearchChange, filteredItems]);

  return {setSearchValue, onSearchChange: _onSearchChange, filteredItems};
};

export default usePickerSearch;
