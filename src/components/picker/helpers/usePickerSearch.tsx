import {useCallback, useState, useMemo} from 'react';
import _ from 'lodash';
import {PickerProps} from '../types';
import {getItemLabel as getItemLabelPresenter, shouldFilterOut} from '../PickerPresenter';

type UsePickerSearchProps = Pick<PickerProps, 'showSearch' | 'onSearchChange' | 'children' | 'getItemLabel' | 'items'>;

const usePickerSearch = (props: UsePickerSearchProps) => {
  const {showSearch, onSearchChange, children, getItemLabel: getItemLabelPickerProp, items} = props;
  const [searchValue, setSearchValue] = useState('');

  const filterItems = (items: any) => {
    if (showSearch && !_.isEmpty(searchValue)) {
      return _.filter(items, item => {
        //item.props is from children
        const {label, value, getItemLabel} = item.props || item;
        const itemLabel = getItemLabelPresenter(label, value, getItemLabel || getItemLabelPickerProp);
        return !shouldFilterOut(searchValue, itemLabel);
      });
    }
    return items;
  };

  const filteredItems = useMemo(() => filterItems(children || items), [showSearch, searchValue, items, children]);

  const _onSearchChange = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    onSearchChange?.(searchValue, filteredItems);
  },
  [onSearchChange, filteredItems]);

  return {setSearchValue, onSearchChange: _onSearchChange, filteredItems};
};

export default usePickerSearch;
