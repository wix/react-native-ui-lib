import { PickerProps, PickerSingleValue, PickerValue } from './types';
export declare function isItemSelected(childValue: PickerSingleValue, selectedValue?: PickerValue): boolean;
export declare function getItemLabel(label: string, value: PickerValue, getItemLabel: PickerProps['getItemLabel']): any;
export declare function shouldFilterOut(searchValue: string, itemLabel: string): boolean;
