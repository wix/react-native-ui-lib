import React from 'react';
import { TextFieldProps } from '../TextField';
import { ChipProps } from '../../components/chip';
export declare enum ChipsInputChangeReason {
    Added = "added",
    Removed = "removed"
}
export declare type ChipsInputProps = Omit<TextFieldProps, 'ref'> & {
    /**
     * Chip items to render in the input
     */
    chips?: ChipProps[];
    /**
     * A default set of chip props to pass to all chips
     */
    defaultChipProps?: ChipProps;
    /**
     * Change callback for when chips changed (either added or removed)
     */
    onChange?: (chips: ChipProps[], changeReason: ChipsInputChangeReason, updatedChip: ChipProps) => void;
    /**
     * Maximum chips
     */
    maxChips?: number;
};
declare const _default: React.ForwardRefExoticComponent<Omit<TextFieldProps, "ref"> & {
    /**
     * Chip items to render in the input
     */
    chips?: ChipProps[] | undefined;
    /**
     * A default set of chip props to pass to all chips
     */
    defaultChipProps?: ChipProps | undefined;
    /**
     * Change callback for when chips changed (either added or removed)
     */
    onChange?: ((chips: ChipProps[], changeReason: ChipsInputChangeReason, updatedChip: ChipProps) => void) | undefined;
    /**
     * Maximum chips
     */
    maxChips?: number | undefined;
} & React.RefAttributes<any>>;
export default _default;
