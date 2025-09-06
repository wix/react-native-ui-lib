/// <reference types="react" />
import { PickerProps } from '../types';
type UsePickerSearchProps = Pick<PickerProps, 'showSearch' | 'onSearchChange' | 'children' | 'getItemLabel' | 'items'>;
declare const usePickerSearch: (props: UsePickerSearchProps) => {
    setSearchValue: import("react").Dispatch<import("react").SetStateAction<string>>;
    onSearchChange: (searchValue: string) => void;
    filteredItems: any;
};
export default usePickerSearch;
