import { RefObject } from 'react';
import { PickerProps, PickerValue, PickerSingleValue, PickerMultiValue } from '../types';
interface UsePickerSelectionProps extends Pick<PickerProps, 'migrate' | 'value' | 'onChange' | 'getItemValue' | 'topBarProps'> {
    pickerExpandableRef: RefObject<any>;
    setSearchValue: (searchValue: string) => void;
}
declare const usePickerSelection: (props: UsePickerSelectionProps) => {
    multiDraftValue: PickerMultiValue;
    onDoneSelecting: (item: PickerValue) => void;
    toggleItemSelection: (item: PickerSingleValue) => void;
    cancelSelect: () => void;
};
export default usePickerSelection;
