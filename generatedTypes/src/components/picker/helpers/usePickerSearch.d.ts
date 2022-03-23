/// <reference types="react" />
import { PickerProps } from '../types';
declare type UsePickerSearchProps = Pick<PickerProps, 'showSearch' | 'onSearchChange' | 'children' | 'getItemLabel'>;
declare const usePickerSearch: (props: UsePickerSearchProps) => {
    setSearchValue: import("react").Dispatch<import("react").SetStateAction<string>>;
    onSearchChange: (searchValue: string) => void;
    filteredChildren: import("react").ReactNode;
};
export default usePickerSearch;
