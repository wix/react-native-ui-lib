import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PanningDirections, PanningDirectionsEnum } from '../panView';
import { ModalProps } from '../../components/modal';
import { AlignmentModifiers } from '../../commons/modifiers';
declare type DialogDirections = PanningDirections;
declare const DialogDirectionsEnum: typeof PanningDirectionsEnum;
export { DialogDirections, DialogDirectionsEnum };
interface _DialogProps extends AlignmentModifiers {
    /**
     * Control visibility of the dialog.
     */
    visible?: boolean;
    /**
     * Callback that is called after the dialog's dismiss (after the animation has ended).
     */
    onDismiss?: (props?: DialogProps) => void;
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
export declare type DialogProps = PropsWithChildren<_DialogProps>;
declare const Dialog: {
    (props: DialogProps): JSX.Element;
    displayName: string;
    directions: typeof PanningDirectionsEnum;
};
export default Dialog;
