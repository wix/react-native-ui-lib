import React, { PropsWithChildren } from 'react';
export interface InternalSortableListItemProps {
    index: number;
}
type Props = PropsWithChildren<InternalSortableListItemProps>;
export declare const DEFAULT_LIST_ITEM_SIZE = 52;
declare const _default: React.MemoExoticComponent<(props: Props) => React.JSX.Element>;
export default _default;
