import React, { PropsWithChildren } from 'react';
import { TouchableOpacityProps } from '../../components/touchableOpacity';
import { ModalProps, ModalTopBarProps } from '../../components/modal';
import { DialogMigrationProps } from '../dialog';
export interface ExpandableOverlayMethods {
    openExpandable: () => void;
    closeExpandable: () => void;
    toggleExpandable: () => void;
}
export interface RenderCustomOverlayProps extends ExpandableOverlayMethods {
    visible: boolean;
}
export type ExpandableOverlayProps = TouchableOpacityProps & DialogMigrationProps & PropsWithChildren<{
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
    renderCustomOverlay?: (props: RenderCustomOverlayProps) => React.ReactElement | undefined | null;
    /**
     * Disabled opening expandable overlay
     */
    disabled?: boolean;
}>;
declare const _default: React.ForwardRefExoticComponent<ExpandableOverlayProps & React.RefAttributes<ExpandableOverlayMethods>>;
export default _default;
