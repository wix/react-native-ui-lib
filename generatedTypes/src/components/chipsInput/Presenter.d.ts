import { ChipProps, ChipsInputProps } from './index';
export declare const isContainsInvalid: (chips: Array<ChipProps>) => boolean;
export declare const getValidationBasedColor: (chips: Array<ChipProps>, defaultChip?: ChipProps | undefined) => string;
export declare const getCounterTextColor: (stateChips: Array<ChipProps>, props: ChipsInputProps) => string;
export declare const getCounterText: (count: number, maxLength: number) => string;
export declare const getChipDismissColor: (chip: ChipProps, isSelected: boolean, defaultChipProps?: ChipProps | undefined) => string;
export declare const isDisabled: (props: ChipsInputProps) => boolean;
