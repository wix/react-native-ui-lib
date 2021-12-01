import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PanningDirections, PanningDirectionsEnum } from '../panView';
import { ModalProps } from '../../components/modal';
import { AlignmentModifiers } from '../../commons/modifiers';
declare type DialogDirections = PanningDirections;
declare const DialogDirectionsEnum: typeof PanningDirectionsEnum;
export { DialogDirections, DialogDirectionsEnum };
interface _DialogProps extends AlignmentModifiers {
    /**
     * The initial visibility of the dialog.
     */
    initialVisibility?: boolean;
    /**
     * Callback that is called after the dialog's dismiss (after the animation has ended).
     */
    onDismiss?: (props?: ImperativeDialogProps) => void;
    /**
     * The direction from which and to which the dialog is animating \ panning (default bottom).
     */
    direction?: DialogDirections;
    /**
     * The Dialog`s container style (it is set to {position: 'absolute'})
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Whether or not to ignore background press.
     */
    ignoreBackgroundPress?: boolean;
    /**
     * Additional props for the modal.
     */
    modalProps?: ModalProps;
    /**
     * Used to locate this view in end-to-end tests
     * The container has the unchanged id.
     * Currently supported inner IDs:
     * TODO: add missing <TestID>(s?)
     * <TestID>.modal - the Modal's id.
     * <TestID>.overlayFadingBackground - the fading background id.
     */
    testID?: string;
}
export declare type ImperativeDialogProps = PropsWithChildren<_DialogProps>;
export interface ImperativeDialogMethods {
    open: () => void;
    close: () => void;
}
declare const _default: React.ForwardRefExoticComponent<_DialogProps & {
    children?: React.ReactNode;
} & React.RefAttributes<ImperativeDialogMethods>>;
export default _default;
