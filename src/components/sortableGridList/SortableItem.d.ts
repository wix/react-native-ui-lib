import React, { PropsWithChildren } from 'react';
import usePresenter from './usePresenter';
import { SortableItemProps } from './types';
declare function SortableItem(props: PropsWithChildren<SortableItemProps & ReturnType<typeof usePresenter>>): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof SortableItem>;
export default _default;
