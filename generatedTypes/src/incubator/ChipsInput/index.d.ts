import React from 'react';
import { TextFieldProps } from '../TextField';
import { ChipProps } from '../../components/chip';
export declare enum ChipsInputChangeReason {
    Added = "added",
    Removed = "removed"
}
export declare type ChipsInputProps = Omit<TextFieldProps, 'ref'> & {
    chips?: ChipProps[];
    defaultChipProps?: ChipProps;
    onChange?: (chips: ChipProps[], changeReason: ChipsInputChangeReason, updatedChip: ChipProps) => void;
    /**
     * Maximum chips
     */
    maxChips?: number;
};
declare const _default: React.ForwardRefExoticComponent<Omit<TextFieldProps, "ref"> & {
    chips?: ChipProps[] | undefined;
    defaultChipProps?: ChipProps | undefined;
    onChange?: ((chips: ChipProps[], changeReason: ChipsInputChangeReason, updatedChip: ChipProps) => void) | undefined;
    /**
     * Maximum chips
     */
    maxChips?: number | undefined;
} & React.RefAttributes<any>>;
export default _default;
