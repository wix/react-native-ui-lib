import { RefObject } from 'react';
import { PickerProps, PickerValue, PickerSingleValue, PickerMultiValue } from '../types';
interface UsePickerSelectionProps extends Pick<PickerProps, 'migrate' | 'value' | 'onChange' | 'getItemValue' | 'topBarProps' | 'mode' | 'items'> {
    pickerExpandableRef: RefObject<any>;
    setSearchValue: (searchValue: string) => void;
}
declare const usePickerSelection: (props: UsePickerSelectionProps) => {
    multiDraftValue: PickerMultiValue;
    onDoneSelecting: (item: PickerValue) => void;
    toggleItemSelection: (item: PickerSingleValue) => void;
    cancelSelect: () => void;
    areAllItemsSelected: boolean;
    selectedCount: number;
    toggleAllItemsSelection: (selectAll: boolean) => void;
};
export default usePickerSelection;
