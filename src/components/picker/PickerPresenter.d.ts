import { PickerProps, PickerSingleValue, PickerValue } from './types';
export declare function extractPickerItems(props: PickerProps): {
    value: any;
    label: any;
}[];
export declare function isItemSelected(childValue: PickerSingleValue, selectedValue?: PickerValue): boolean;
export declare function getItemLabel(label: string, value: PickerValue, getItemLabel?: PickerProps['getItemLabel']): string | undefined;
export declare function shouldFilterOut(searchValue: string, itemLabel?: string): boolean;
