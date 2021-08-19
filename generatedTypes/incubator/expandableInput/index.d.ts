import React, { PropsWithChildren } from 'react';
import { TouchableOpacityProps } from '../../components/touchableOpacity';
import { ModalProps } from '../../components/modal';
import { DialogProps } from '../../components/dialog';
export declare type ExpandableInputProps = TouchableOpacityProps & PropsWithChildren<{
    expandableContent?: React.ReactElement;
    useDialog?: boolean;
    modalProps?: ModalProps;
    dialogProps?: DialogProps;
}>;
interface ExpandableInputMethods {
    openExpandable: () => void;
    closeExpandable: () => void;
}
declare const _default: React.ForwardRefExoticComponent<TouchableOpacityProps & {
    expandableContent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    useDialog?: boolean | undefined;
    modalProps?: ModalProps | undefined;
    dialogProps?: DialogProps | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<ExpandableInputMethods>>;
export default _default;
