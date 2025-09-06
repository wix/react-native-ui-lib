import React from 'react';
import type { SortableListProps, SortableListItemProps } from './types';
export { SortableListProps, SortableListItemProps };
declare const SortableList: <ItemT extends SortableListItemProps>(props: SortableListProps<ItemT>) => React.JSX.Element;
export default SortableList;
