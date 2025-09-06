/// <reference types="react" />
import { WheelPickerItemValue } from './types';
import { WheelPickerItemProps } from './Item';
type PropTypes<T> = {
    initialValue?: T;
    children?: JSX.Element | JSX.Element[];
    items?: WheelPickerItemProps<T>[];
    itemHeight: number;
    preferredNumVisibleRows: number;
};
type RowItem<T> = {
    value: T;
    index: number;
};
declare const usePresenter: <T extends WheelPickerItemValue>({ initialValue, children, items: propItems, itemHeight, preferredNumVisibleRows }: PropTypes<T>) => {
    index: number | undefined;
    items: WheelPickerItemProps<T>[];
    height: number;
    getRowItemAtOffset: (offset: number) => RowItem<T>;
};
export default usePresenter;
