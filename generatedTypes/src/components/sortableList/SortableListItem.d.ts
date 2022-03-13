import { PropsWithChildren } from 'react';
import { BaseItemProps } from './types';
declare type SortableListItemProps = Pick<BaseItemProps, 'index'>;
declare type Props = PropsWithChildren<SortableListItemProps>;
declare const SortableListItem: (props: Props) => JSX.Element;
export default SortableListItem;
