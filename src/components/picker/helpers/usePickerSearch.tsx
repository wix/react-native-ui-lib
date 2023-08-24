import {useCallback, useState, useMemo, useEffect} from 'react';
import _ from 'lodash';
import {PickerProps} from '../types';
import {getItemLabel as getItemLabelPresenter, shouldFilterOut} from '../PickerPresenter';

type UsePickerSearchProps = Pick<
  PickerProps,
  'showSearch' | 'onSearchChange' | 'children' | 'getItemLabel' | 'onFilterChange'
>;

const usePickerSearch = (props: UsePickerSearchProps) => {
  const {showSearch, onSearchChange, children, getItemLabel, onFilterChange} = props;
  const [searchValue, setSearchValue] = useState('');

  const _onSearchChange = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    onSearchChange?.(searchValue);
  },
  [onSearchChange]);

  const filteredChildren = useMemo(() => {
    if (showSearch && !_.isEmpty(searchValue)) {
      // @ts-expect-error need to fix children type
      return _.filter(children, child => {
        // @ts-expect-error need to fix children type to be based on PickerItemProps
        const {label, value, getItemLabel: childGetItemLabel} = child.props;
        const itemLabel = getItemLabelPresenter(label, value, childGetItemLabel || getItemLabel);
        return !shouldFilterOut(searchValue, itemLabel);
      });
    }

    return children;
  }, [showSearch, onFilterChange, searchValue, children]);

  useEffect(() => {
    onFilterChange?.(filteredChildren);
  }, [filteredChildren, onFilterChange]);

  return {setSearchValue, onSearchChange: _onSearchChange, filteredChildren};
};

export default usePickerSearch;
