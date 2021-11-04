import { ChipsInputChipProps, ChipsInputProps } from './index';
export declare const hasInvalidChip: (chips: Array<ChipsInputChipProps>) => boolean;
export declare const getValidationBasedColor: (chips: Array<ChipsInputChipProps>, defaultChip?: ChipsInputChipProps | undefined) => string;
export declare const getCounterTextColor: (stateChips: Array<ChipsInputChipProps>, props: ChipsInputProps) => string;
export declare const getCounterText: (count: number, maxLength: number) => string;
export declare const getChipDismissColor: (chip: ChipsInputChipProps, isSelected: boolean, defaultChipProps?: ChipsInputChipProps | undefined) => string;
export declare const isDisabled: (props: ChipsInputProps) => boolean;
