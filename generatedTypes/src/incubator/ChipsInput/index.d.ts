import React from 'react';
import { TextFieldProps } from '../TextField';
import { ChipProps } from '../../components/chip';
export declare type ChipsInputProps = Omit<TextFieldProps, 'ref'> & {
    chips?: ChipProps[];
    defaultChipProps?: ChipProps;
    onChange?: (chips: ChipProps[]) => void;
    /**
     * Maximum chips
     */
    maxChips?: number;
};
declare const _default: React.ForwardRefExoticComponent<Omit<TextFieldProps, "ref"> & {
    chips?: ChipProps[] | undefined;
    defaultChipProps?: ChipProps | undefined;
    onChange?: ((chips: ChipProps[]) => void) | undefined;
    /**
     * Maximum chips
     */
    maxChips?: number | undefined;
} & React.RefAttributes<any>>;
export default _default;
