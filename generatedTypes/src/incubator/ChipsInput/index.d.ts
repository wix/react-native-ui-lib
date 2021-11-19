/// <reference types="react" />
import { TextFieldProps } from '../TextField';
import { ChipProps } from '../../components/chip';
export declare type ChipsInputProps = Omit<TextFieldProps, 'ref'> & {
    chips?: ChipProps[];
    defaultChipProps: ChipProps;
    onChange?: (chips: ChipProps[]) => void;
};
declare const ChipsInput: (props: ChipsInputProps) => JSX.Element;
export default ChipsInput;
