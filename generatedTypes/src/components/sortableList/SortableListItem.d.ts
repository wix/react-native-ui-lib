import { PropsWithChildren } from 'react';
import { BaseItemProps } from './types';
declare type Props = PropsWithChildren<Pick<BaseItemProps, 'index'>>;
declare const SortableListItem: (props: Props) => JSX.Element;
export default SortableListItem;
