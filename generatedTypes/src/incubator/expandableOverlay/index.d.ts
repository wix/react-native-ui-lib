import React, { PropsWithChildren } from 'react';
import { TouchableOpacityProps } from '../../components/touchableOpacity';
import { ModalProps, ModalTopBarProps } from '../../components/modal';
import { DialogProps } from '../../components/dialog';
export interface RenderCustomOverlayProps {
    visible: boolean;
    openExpandable: () => void;
    closeExpandable: () => void;
    toggleExpandable: () => void;
}
export declare type ExpandableOverlayProps = TouchableOpacityProps & PropsWithChildren<{
    /**
     * The content to render inside the expandable modal/dialog
     */
    expandableContent?: React.ReactElement;
    /**
     * Whether to use a dialog as expandable container (by default the container will be a full screen modal)
     */
    useDialog?: boolean;
    /**
     * The props to pass to the modal expandable container
     */
    modalProps?: ModalProps;
    /**
     * The props to pass to the dialog expandable container
     */
    dialogProps?: DialogProps;
    /**
     * Whether to render a modal top bar (relevant only for modal)
     */
    showTopBar?: boolean;
    /**
     * The modal top bar props to pass on
     */
    topBarProps?: ModalTopBarProps;
    /**
     * A custom overlay to render instead of Modal or Dialog components
     */
    renderCustomOverlay?: (props: RenderCustomOverlayProps) => React.ReactElement | undefined;
    /**
     * Disabled opening expandable overlay
     */
    disabled?: boolean;
}>;
interface ExpandableOverlayMethods {
    openExpandable: () => void;
    closeExpandable: () => void;
}
declare const _default: React.ForwardRefExoticComponent<TouchableOpacityProps & {
    /**
     * The content to render inside the expandable modal/dialog
     */
    expandableContent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    /**
     * Whether to use a dialog as expandable container (by default the container will be a full screen modal)
     */
    useDialog?: boolean | undefined;
    /**
     * The props to pass to the modal expandable container
     */
    modalProps?: ModalProps | undefined;
    /**
     * The props to pass to the dialog expandable container
     */
    dialogProps?: DialogProps | undefined;
    /**
     * Whether to render a modal top bar (relevant only for modal)
     */
    showTopBar?: boolean | undefined;
    /**
     * The modal top bar props to pass on
     */
    topBarProps?: ModalTopBarProps | undefined;
    /**
     * A custom overlay to render instead of Modal or Dialog components
     */
    renderCustomOverlay?: ((props: RenderCustomOverlayProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined) | undefined;
    /**
     * Disabled opening expandable overlay
     */
    disabled?: boolean | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<ExpandableOverlayMethods>>;
export default _default;
